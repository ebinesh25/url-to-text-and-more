import React from 'react';
import { FileText, Clock, Hash, Globe, Copy } from 'lucide-react';
import { ExtractedContent } from '../types';

interface ContentPreviewProps {
  content: ExtractedContent | null;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({ content }) => {
  if (!content) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(content.content);
    } catch (error) {
      console.error('Failed to copy content:', error);
    }
  };

  return (
    <div className="rounded-xl shadow-lg border overflow-hidden" style={{ 
      background: 'white',
      borderColor: '#decbb7'
    }}>
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between" style={{ 
        background: '#f7f0f5',
        borderColor: '#decbb7'
      }}>
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2" style={{ color: '#433633' }}>{content.title}</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: '#5c5552' }}>
            <div className="flex items-center gap-1">
              <Hash className="w-4 h-4" />
              <span>{content.wordCount.toLocaleString()} words</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Extracted {formatDate(content.extractedAt)}</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Globe className="w-4 h-4" style={{ color: '#8f857d' }} />
            <a
              href={content.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline break-all transition-colors hover:opacity-80"
              style={{ color: '#5c5552' }}
            >
              {content.url}
            </a>
          </div>
        </div>
        
        <button
          onClick={handleCopyContent}
          className="ml-4 p-2 rounded-lg transition-colors hover:bg-gray-100"
          style={{ color: '#5c5552' }}
          title="Copy content"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="max-h-96 overflow-y-auto">
          <div className="prose max-w-none">
            {content.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-sm" style={{ color: '#433633' }}>
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};