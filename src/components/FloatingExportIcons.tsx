import React, { useState } from 'react';
import { Copy, FileText, Code, FileDown, Check, X } from 'lucide-react';
import { ExtractedContent } from '../types';
import { copyToClipboard, downloadAsText, downloadAsHtml, downloadAsMarkdown } from '../utils/exportUtils';

interface FloatingExportIconsProps {
  content: ExtractedContent | null;
}

export const FloatingExportIcons: React.FC<FloatingExportIconsProps> = ({ content }) => {
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const showFeedback = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleCopyToClipboard = async () => {
    if (!content) return;
    try {
      await copyToClipboard(content);
      showFeedback('Copied to clipboard!');
    } catch {
      showFeedback('Failed to copy', 'error');
    }
  };

  const handleDownloadText = () => {
    if (!content) return;
    try {
      downloadAsText(content);
      showFeedback('TXT downloaded!');
    } catch {
      showFeedback('Download failed', 'error');
    }
  };

  const handleDownloadHtml = () => {
    if (!content) return;
    try {
      downloadAsHtml(content);
      showFeedback('HTML downloaded!');
    } catch {
      showFeedback('Download failed', 'error');
    }
  };

  const handleDownloadMarkdown = () => {
    if (!content) return;
    try {
      downloadAsMarkdown(content);
      showFeedback('Markdown downloaded!');
    } catch {
      showFeedback('Download failed', 'error');
    }
  };

  const exportActions = [
    {
      id: 'clipboard',
      label: 'Copy to Clipboard',
      icon: Copy,
      onClick: handleCopyToClipboard,
    },
    {
      id: 'txt',
      label: 'Download as TXT',
      icon: FileText,
      onClick: handleDownloadText,
    },
    {
      id: 'html',
      label: 'Download as HTML',
      icon: Code,
      onClick: handleDownloadHtml,
    },
    {
      id: 'md',
      label: 'Download as Markdown',
      icon: FileDown,
      onClick: handleDownloadMarkdown,
    }
  ];

  if (!content) {
    return null;
  }

  return (
    <>
      {/* Floating Export Icons */}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-2">
        {exportActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <div key={action.id} className="relative">
              <button
                onClick={action.onClick}
                onMouseEnter={() => setHoveredAction(action.id)}
                onMouseLeave={() => setHoveredAction(null)}
                className="w-10 h-10 rounded-lg shadow-md transition-all duration-200 transform hover:scale-110 hover:shadow-lg flex items-center justify-center"
                style={{
                  background: 'white',
                  color: '#5c5552',
                  border: '1px solid #decbb7',
                  animationDelay: `${index * 100}ms`
                }}
              >
                <IconComponent className="w-4 h-4" />
              </button>
              
              {/* Tooltip */}
              {hoveredAction === action.id && (
                <div 
                  className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium z-60 animate-in slide-in-from-right-2 duration-200"
                  style={{
                    background: '#433633',
                    color: '#f7f0f5'
                  }}
                >
                  {action.label}
                  <div 
                    className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-t-4 border-b-4 border-transparent"
                    style={{ borderLeftColor: '#433633' }}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div 
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300"
          style={{
            background: feedback.type === 'success' ? '#decbb7' : '#8f857d',
            color: '#433633'
          }}
        >
          {feedback.type === 'success' ? (
            <Check className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{feedback.message}</span>
        </div>
      )}
    </>
  );
};