import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  value, 
  onChange, 
  placeholder = "Describe what you want to create...",
  maxLength = 500
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-700">
        Prompt
      </label>
      
      <div className="relative">
        <textarea
          id="prompt-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
          aria-describedby="prompt-counter"
        />
        
        <div 
          id="prompt-counter"
          className="absolute bottom-2 right-2 text-xs text-gray-400"
          aria-live="polite"
        >
          {value.length}/{maxLength}
        </div>
      </div>
      
      {value.length > maxLength * 0.9 && (
        <p className="text-sm text-yellow-600">
          You're approaching the character limit
        </p>
      )}
    </div>
  );
};

export default PromptInput;