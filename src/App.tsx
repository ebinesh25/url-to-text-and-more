import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Header } from './components/Header';
import { UrlInput } from './components/UrlInput';
import { FloatingExportIcons } from './components/FloatingExportIcons';
import { ContentPreview } from './components/ContentPreview';
import { extractContent } from './utils/contentExtractor';
import { ExtractedContent } from './types';

function App() {
  const [content, setContent] = useState<ExtractedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtractContent = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setContent(null);

    try {
      const extractedContent = await extractContent(url);
      setContent(extractedContent);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <div 
      className="min-h-screen" 
      style={{ 
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        background: '#f7f0f5'
      }}
    >
      <Header />
      
      {/* Floating Export Icons */}
      <FloatingExportIcons content={content} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 border-2 rounded-xl flex items-start gap-3 shadow-sm" style={{
            background: '#fef2f2',
            borderColor: '#fecaca'
          }}>
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-800 mb-1">Extraction Error</h4>
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button
              onClick={dismissError}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* URL Input Section */}
        <UrlInput onExtract={handleExtractContent} isLoading={isLoading} />

        {/* Content Preview Section */}
        <ContentPreview content={content} />

        {/* Footer */}
        <footer className="mt-12 text-center text-sm" style={{ color: '#8f857d' }}>
          <div className="rounded-lg p-4 shadow-sm border" style={{
            background: 'rgba(247, 240, 245, 0.8)',
            borderColor: '#decbb7'
          }}>
            <p className="font-medium" style={{ color: '#5c5552' }}>ContentHarvest</p>
            <p className="mt-1">Extract, preview, and export web content with ease</p>
            <p className="mt-2 text-xs">
              <strong>Note:</strong> Some websites may block content extraction due to CORS policies.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;