import React from 'react';
import { STYLE_OPTIONS, StyleOption } from '../types';

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="w-full">
      <label htmlFor="style-select" className="block text-sm font-medium text-gray-700 mb-2">
        Style
      </label>
      <select
        id="style-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   bg-white"
        aria-describedby="style-description"
      >
        <option value="">Select a style...</option>
        {STYLE_OPTIONS.map((option: StyleOption) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <p id="style-description" className="mt-1 text-xs text-gray-500">
        Choose a style that matches your vision
      </p>
    </div>
  );
};