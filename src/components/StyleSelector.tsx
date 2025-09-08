import React, { useCallback, useMemo, KeyboardEvent, useRef } from 'react';

export type StyleOption = {
  id: string;
  name: string;
  description: string;
};

interface StyleSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: StyleOption[];
  onEnterKey?: () => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = React.memo(({ 
  value, 
  onChange, 
  options, 
  onEnterKey 
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  // Memoize the selected option to prevent unnecessary lookups
  const selectedOption = useMemo(() => 
    options.find(opt => opt.id === value), [options, value]
  );

  // Memoize event handlers
  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLSelectElement>) => {
    if (e.key === 'Enter' && onEnterKey && value) {
      e.preventDefault();
      onEnterKey();
    }
    
    // Arrow key navigation for custom dropdown feel
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      const currentIndex = options.findIndex(opt => opt.id === value);
      let newIndex;
      
      if (e.key === 'ArrowDown') {
        newIndex = currentIndex === -1 ? 0 : Math.min(currentIndex + 1, options.length - 1);
      } else {
        newIndex = currentIndex === -1 ? options.length - 1 : Math.max(currentIndex - 1, 0);
      }
      
      onChange(options[newIndex].id);
    }
  }, [onEnterKey, value, options, onChange]);

  return (
    <div className="space-y-2">
      <label htmlFor="style-select" className="block text-sm font-medium text-white">
        Style
        {onEnterKey && value && (
          <span className="text-xs text-gray-400 ml-2">
            (Enter to generate)
          </span>
        )}
      </label>
      
      <div className="relative group">
        <select
          ref={selectRef}
          id="style-select"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          tabIndex={2}
          className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400 text-white appearance-none cursor-pointer transition-all duration-300 hover:bg-gray-900/80"
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
            {selectedOption?.description || ''}
          </p>
        </div>
      )}
    </div>
  );
});

// Add display name for debugging
StyleSelector.displayName = 'StyleSelector';

export default StyleSelector;