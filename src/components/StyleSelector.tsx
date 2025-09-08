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
      
      <select
        id="style-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-black border-none rounded-lg focus:outline-none focus:ring-0 focus:border-none text-gray-200"
        aria-describedby="style-description"
      >
        <option value="">Choose a style...</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      
      {value && (
        <p 
          id="style-description"
          className="text-sm text-gray-300 bg-gray-800/50 p-2 rounded border border-gray-600/30"
          aria-live="polite"
        >
          {options.find(opt => opt.id === value)?.description || ''}
        </p>
      )}
    </div>
  );
};

export default StyleSelector;