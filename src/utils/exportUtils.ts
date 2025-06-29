import { ExtractedContent } from '../types';

export const copyToClipboard = async (content: ExtractedContent): Promise<void> => {
  try {
    await navigator.clipboard.writeText(content.content);
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = content.content;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};

export const downloadAsText = (content: ExtractedContent): void => {
  const filename = generateFilename(content.url, 'txt');
  const blob = new Blob([content.content], { type: 'text/plain' });
  downloadBlob(blob, filename);
};

export const downloadAsHtml = (content: ExtractedContent): void => {
  const filename = generateFilename(content.url, 'html');
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(content.title)}</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      color: #433633;
      background: linear-gradient(135deg, #f7f0f5 0%, #decbb7 100%);
    }
    .header {
      background: linear-gradient(135deg, #5c5552 0%, #433633 100%);
      color: #f7f0f5;
      padding: 2rem;
      border-radius: 1rem;
      margin-bottom: 2rem;
      text-align: center;
    }
    h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: bold;
    }
    .meta {
      background: #f7f0f5;
      padding: 1.5rem;
      border-radius: 0.75rem;
      margin-bottom: 2rem;
      border: 1px solid #decbb7;
      box-shadow: 0 1px 3px rgba(67, 54, 51, 0.1);
    }
    .meta p {
      margin: 0.5rem 0;
      color: #8f857d;
      font-size: 0.875rem;
    }
    .content {
      background: #f7f0f5;
      padding: 2rem;
      border-radius: 0.75rem;
      border: 1px solid #decbb7;
      box-shadow: 0 1px 3px rgba(67, 54, 51, 0.1);
    }
    .watermark {
      margin-top: 3rem;
      padding-top: 1rem;
      border-top: 1px solid #decbb7;
      font-size: 0.875rem;
      color: #8f857d;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${escapeHtml(content.title)}</h1>
    <p>Extracted by ContentHarvest</p>
  </div>
  <div class="meta">
    <p><strong>Source:</strong> <a href="${escapeHtml(content.url)}" target="_blank" style="color: #5c5552;">${escapeHtml(content.url)}</a></p>
    <p><strong>Extracted:</strong> ${new Date(content.extractedAt).toLocaleDateString()}</p>
    <p><strong>Word Count:</strong> ${content.wordCount}</p>
  </div>
  <div class="content">
    ${content.content.split('\n\n').map(paragraph => 
      `<p style="margin-bottom: 1rem;">${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`
    ).join('')}
  </div>
  <div class="watermark">
    Extracted using ContentHarvest - Extract, Preview, Export
  </div>
</body>
</html>`;
  
  const blob = new Blob([htmlContent], { type: 'text/html' });
  downloadBlob(blob, filename);
};

export const downloadAsMarkdown = (content: ExtractedContent): void => {
  const filename = generateFilename(content.url, 'md');
  const markdownContent = `# ${content.title}

**Source:** [${content.url}](${content.url})  
**Extracted:** ${new Date(content.extractedAt).toLocaleDateString()}  
**Word Count:** ${content.wordCount}

---

${content.content.split('\n\n').map(paragraph => paragraph.trim()).join('\n\n')}

---

*Extracted using ContentHarvest - Extract, Preview, Export*
`;
  
  const blob = new Blob([markdownContent], { type: 'text/markdown' });
  downloadBlob(blob, filename);
};

const generateFilename = (url: string, extension: string): string => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace(/^www\./, '');
    const path = urlObj.pathname.replace(/\//g, '-').replace(/^-+|-+$/g, '');
    const timestamp = new Date().toISOString().slice(0, 10);
    
    let filename = hostname;
    if (path && path !== 'index') {
      filename += `-${path}`;
    }
    filename += `-${timestamp}.${extension}`;
    
    return filename.toLowerCase();
  } catch {
    return `contentharvest-${Date.now()}.${extension}`;
  }
};

const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};