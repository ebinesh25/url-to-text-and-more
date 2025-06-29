import React from 'react';
import { Globe } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b" style={{ 
      background: 'white',
      borderColor: '#decbb7'
    }}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ background: '#f7f0f5' }}>
              <Globe className="w-6 h-6" style={{ color: '#5c5552' }} />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: '#433633' }}>ContentHarvest</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: '#5c5552' }}>
              Home
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: '#5c5552' }}>
              Features
            </a>
            <a href="#" className="text-sm font-medium transition-colors hover:opacity-80" style={{ color: '#5c5552' }}>
              API
            </a>
            <button 
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #5c5552 0%, #433633 100%)' }}
            >
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};