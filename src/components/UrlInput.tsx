import React, { useState, useEffect } from 'react';
import { Globe, AlertCircle, Loader2, Settings, ChevronDown } from 'lucide-react';
import { validateUrl } from '../utils/urlValidator';
import { ValidationResult } from '../types';

interface UrlInputProps {
  onExtract: (url: string) => void;
  isLoading: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({ onExtract, isLoading }) => {
  const [url, setUrl] = useState('');
  const [validation, setValidation] = useState<ValidationResult>({ isValid: false, message: '' });
  const [showValidation, setShowValidation] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [outputFormat, setOutputFormat] = useState('text');
  const [extractMainContent, setExtractMainContent] = useState(true);
  const [waitForJS, setWaitForJS] = useState(false);

  useEffect(() => {
    if (url.trim()) {
      const result = validateUrl(url);
      setValidation(result);
      setShowValidation(true);
    } else {
      setShowValidation(false);
    }
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validation.isValid && !isLoading) {
      onExtract(url);
    }
  };

  return (
    <div className="mb-8">
      {/* Main Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#433633' }}>
          Website Content Extractor
        </h1>
        <p className="text-lg" style={{ color: '#5c5552' }}>
          Simply enter the URL of the webpage you want to analyze, and our tool will quickly scan the page and extract the main body text.
        </p>
      </div>

      {/* Input Form */}
      <div className="rounded-xl shadow-lg border mb-6" style={{ 
        background: 'white',
        borderColor: '#decbb7'
      }}>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: '#5c5552' }}>
                Enter an URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.example.com/article"
                  className={`w-full px-4 py-4 text-lg border-2 rounded-lg transition-all ${
                    showValidation
                      ? validation.isValid
                        ? 'border-green-400 bg-green-50'
                        : 'border-red-400 bg-red-50'
                      : 'border-gray-300 hover:border-gray-400 focus:border-blue-500'
                  }`}
                  style={{
                    color: '#433633'
                  }}
                  disabled={isLoading}
                />
                {showValidation && (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {validation.isValid ? (
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {showValidation && (
                <p className={`mt-2 text-sm ${validation.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {validation.message}
                </p>
              )}
            </div>

            {/* Output Format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#5c5552' }}>
                  Output Format:
                </label>
                <div className="relative">
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg appearance-none bg-white focus:border-blue-500 transition-all"
                    style={{ color: '#433633' }}
                  >
                    <option value="text">Text</option>
                    <option value="html">HTML</option>
                    <option value="markdown">Markdown</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Main Content Toggle */}
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={extractMainContent}
                    onChange={(e) => setExtractMainContent(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`relative w-12 h-6 rounded-full transition-colors ${
                    extractMainContent ? 'bg-blue-500' : 'bg-gray-300'
                  }`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      extractMainContent ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
                  </div>
                  <span className="ml-3 text-sm font-medium" style={{ color: '#5c5552' }}>
                    Extract Only Main Content with AI
                  </span>
                </label>
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <div className="border-t pt-4" style={{ borderColor: '#decbb7' }}>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: '#5c5552' }}
              >
                <Settings className="w-4 h-4" />
                Advanced Options
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </button>

              {showAdvanced && (
                <div className="mt-4 space-y-4 p-4 rounded-lg" style={{ background: '#f7f0f5' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Wait for JS */}
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={waitForJS}
                        onChange={(e) => setWaitForJS(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`relative w-12 h-6 rounded-full transition-colors ${
                        waitForJS ? 'bg-blue-500' : 'bg-gray-300'
                      }`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          waitForJS ? 'translate-x-6' : 'translate-x-0'
                        }`}></div>
                      </div>
                      <span className="ml-3 text-sm" style={{ color: '#5c5552' }}>
                        Wait for JS
                      </span>
                    </label>

                    {/* Include Elements */}
                    <div>
                      <label className="block text-xs font-medium mb-1" style={{ color: '#8f857d' }}>
                        Include Elements
                      </label>
                      <input
                        type="text"
                        placeholder="article, main, .content"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:border-blue-500"
                        style={{ color: '#433633' }}
                      />
                    </div>

                    {/* Exclude Elements */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium mb-1" style={{ color: '#8f857d' }}>
                        Exclude Elements
                      </label>
                      <input
                        type="text"
                        placeholder="nav, footer, .ads"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:border-blue-500"
                        style={{ color: '#433633' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Extract Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={!validation.isValid || isLoading}
                className="flex-1 inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #5c5552 0%, #433633 100%)'
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <Globe className="w-5 h-5 mr-2" />
                    Extract Content
                  </>
                )}
              </button>

              <button
                type="button"
                className="px-6 py-4 text-lg font-semibold rounded-lg border-2 transition-all hover:opacity-80"
                style={{
                  color: '#5c5552',
                  borderColor: '#decbb7',
                  background: 'transparent'
                }}
              >
                Copy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};