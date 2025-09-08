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
      <label htmlFor="prompt-input" className="block text-sm font-medium text-purple-200">
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
          className="w-full px-3 py-2 bg-purple-800/30 border border-purple-600/50 rounded-lg resize-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 text-purple-100 placeholder-purple-300 backdrop-blur-sm"
          aria-describedby="prompt-counter"
        />
        
        <div 
          id="prompt-counter"
          className="absolute bottom-2 right-2 text-xs text-purple-300 bg-purple-900/70 px-1 rounded"
          aria-live="polite"
        >
          {value.length}/{maxLength}
        </div>
      </div>
      
      {value.length > maxLength * 0.9 && (
        <p className="text-sm text-violet-300">
          You're approaching the character limit
        </p>
      )}
    </div>
  );
};

export default PromptInput;