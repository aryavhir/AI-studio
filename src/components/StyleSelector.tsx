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
          className="w-full px-4 py-3 border-none rounded-lg focus:outline-none focus:ring-0 focus:border-none text-white appearance-none cursor-pointer transition-all duration-300 hover:bg-gray-900/80"
          style={{ backgroundColor: 'rgb(21, 21, 21)' }}
          aria-describedby="style-description"
        >
          <option value="">Choose a style...</option>
          {options.map((option) => (
            <option key={option.id} value={option.id} className="text-white py-2" style={{ backgroundColor: 'rgb(21, 21, 21)' }}>
              {option.name}
            </option>
          ))}
        </select>
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