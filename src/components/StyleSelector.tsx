import React from 'react';

export type StyleOption = {
  id: string;
  name: string;
  description: string;
};

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: StyleOption[];
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ value, onChange, options }) => {
  return (
    <div className="space-y-2">
      <label htmlFor="style-select" className="block text-sm font-medium text-white">
        Style
      </label>
      
      <div className="relative group">
        <select
          id="style-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-black border-none rounded-lg focus:outline-none focus:ring-0 focus:border-none text-white appearance-none cursor-pointer transition-all duration-300 hover:bg-gray-900/80 group-hover:shadow-lg group-hover:shadow-pink-500/20"
          aria-describedby="style-description"
        >
          <option value="">Choose a style...</option>
          {options.map((option) => (
            <option key={option.id} value={option.id} className="bg-black text-white py-2">
              {option.name}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow with gradient */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none group-hover:scale-110 transition-transform duration-300">
          <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-600/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      
      {value && (
        <div className="animate-slideInUp">
          <p 
            id="style-description"
            className="text-sm text-gray-300 bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-3 rounded-lg border border-pink-500/20 backdrop-blur-sm shadow-lg shadow-pink-500/10 transition-all duration-300"
            aria-live="polite"
          >
            <span className="inline-block w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mr-2"></span>
            {options.find(opt => opt.id === value)?.description || ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default StyleSelector;