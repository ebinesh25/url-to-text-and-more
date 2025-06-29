import React from 'react';
import { Globe, ExternalLink, LinkedinIcon } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b" style={{ 
      background: 'white',
      borderColor: '#decbb7'
    }}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 rounded-lg" style={{ background: '#f7f0f5' }}>
              <Globe className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#5c5552' }} />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold" style={{ color: '#433633' }}>Extract From Url</h1>
            </div>
          </div>
          
          <nav className="flex items-center gap-3 md:gap-6">
            {/* Desktop navigation */}
            
            {/* GitHub button - responsive sizing */}
            <a 
              href="https://www.linkedin.com/in/ebinesh/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg:white text-black flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-lg transition-all hover:opacity-90"
              style={{ border: '1px solid #5c5552' }}

            >
              <LinkedinIcon className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden xs:inline md:inline">LinkedIn</span>
              <span className="xs:hidden md:hidden">LinkedIn</span>
            </a>

            {/* GitHub button - responsive sizing */}
            <a 
              href="https://github.com/positron/urlToText" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white rounded-lg transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #5c5552 0%, #433633 100%)' }}
            >
              <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span className="hidden xs:inline md:inline">GitHub</span>
              <span className="xs:hidden md:hidden">Git</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};