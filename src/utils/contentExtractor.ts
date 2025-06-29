import { ExtractedContent } from '../types';

// Multiple CORS proxy options for better reliability
const CORS_PROXIES = [
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/get?url=',
];

const fetchWithProxy = async (url: string, proxyIndex = 0): Promise<string> => {
  if (proxyIndex >= CORS_PROXIES.length) {
    throw new Error('All CORS proxies failed');
  }

  const proxy = CORS_PROXIES[proxyIndex];
  let proxyUrl: string;
  
  // Different proxies have different URL formats
  if (proxy.includes('allorigins.win')) {
    proxyUrl = `${proxy}${encodeURIComponent(url)}`;
  } else if (proxy.includes('codetabs.com')) {
    proxyUrl = `${proxy}${encodeURIComponent(url)}`;
  } else {
    proxyUrl = `${proxy}${url}`;
  }

  try {
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/html, */*',
        'User-Agent': 'Mozilla/5.0 (compatible; ContentExtractor/1.0)',
      },
      timeout: 10000, // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle different response formats from different proxies
    const contentType = response.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const data = await response.json();
      // Handle allorigins.win format
      if (data.contents) {
        return data.contents;
      }
      // Handle other JSON formats
      return data.body || data.data || JSON.stringify(data);
    } else {
      // Direct HTML response
      return await response.text();
    }
  } catch (error) {
    console.warn(`Proxy ${proxyIndex + 1} failed:`, error);
    // Try next proxy
    return fetchWithProxy(url, proxyIndex + 1);
  }
};

export const extractContent = async (url: string): Promise<ExtractedContent> => {
  try {
    // Validate URL format
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      throw new Error('Only HTTP and HTTPS URLs are supported');
    }

    let htmlContent: string;
    
    try {
      htmlContent = await fetchWithProxy(url);
    } catch {
      // If all proxies fail, provide a helpful error message
      throw new Error(
        'Unable to fetch content due to CORS restrictions. This can happen when:\n' +
        '• The website blocks cross-origin requests\n' +
        '• CORS proxy services are temporarily unavailable\n' +
        '• The target website is down or unreachable\n\n' +
        'Try again later or use a different URL.'
      );
    }

    if (!htmlContent || htmlContent.trim().length === 0) {
      throw new Error('No content received from the URL');
    }

    // Create a temporary DOM element to parse HTML
    const parser = new DOMParser();
    let doc: Document;
    
    try {
      doc = parser.parseFromString(htmlContent, 'text/html');
    } catch {
      throw new Error('Failed to parse HTML content');
    }

    // Check if parsing was successful
    if (!doc || !doc.body) {
      throw new Error('Invalid HTML content received');
    }
    
    // Extract title with fallbacks
    const title = doc.querySelector('title')?.textContent?.trim() || 
                  doc.querySelector('h1')?.textContent?.trim() || 
                  urlObj.hostname || 
                  'Untitled';
    
    // Remove unwanted elements
    const unwantedSelectors = [
      'script', 'style', 'nav', 'header', 'footer', 'aside',
      '.advertisement', '.ads', '.social-share', '.comments',
      '[class*="ad-"]', '[id*="ad-"]', '.sidebar'
    ];
    
    unwantedSelectors.forEach(selector => {
      const elements = doc.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });
    
    // Try to find main content areas in order of preference
    const contentSelectors = [
      'main',
      'article',
      '[role="main"]',
      '.content',
      '.post-content',
      '.entry-content',
      '.article-content',
      '#content',
      '.main-content',
      'body'
    ];
    
    let contentElement: Element | null = null;
    for (const selector of contentSelectors) {
      contentElement = doc.querySelector(selector);
      if (contentElement && contentElement.textContent?.trim()) {
        break;
      }
    }
    
    if (!contentElement) {
      contentElement = doc.body;
    }
    
    // Extract and clean text content
    let textContent = contentElement?.textContent || '';
    
    if (!textContent.trim()) {
      throw new Error('No readable content found on the page');
    }
    
    // Clean up whitespace and normalize
    textContent = textContent
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/\n\s*\n/g, '\n\n') // Preserve paragraph breaks
      .replace(/^\s+|\s+$/gm, '') // Trim lines
      .trim();
    
    // Count words (excluding very short "words")
    const wordCount = textContent
      .split(/\s+/)
      .filter(word => word.length > 1)
      .length;
    
    if (wordCount < 10) {
      throw new Error('Content appears to be too short or may not have extracted properly');
    }
    
    return {
      title: title.substring(0, 200), // Limit title length
      content: textContent,
      url,
      wordCount,
      extractedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Content extraction error:', error);
    
    // Provide user-friendly error messages
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Unable to connect to the URL. Please check your internet connection and try again.');
    }
    
    if (error instanceof Error) {
      throw error; // Re-throw our custom errors
    }
    
    throw new Error('An unexpected error occurred while extracting content. Please try again.');
  }
};