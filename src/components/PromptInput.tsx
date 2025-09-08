import React, { useCallback, useMemo, KeyboardEvent } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  onEnterKey?: () => void;
}

const PromptInput: React.FC<PromptInputProps> = React.memo(({
  value,
  onChange,
  placeholder = 'Describe what you want to create...',
  maxLength = 500,
  onEnterKey,
}) => {
  // Memoize expensive calculations
  const characterWarning = useMemo(() => 
    value.length > maxLength * 0.9, [value.length, maxLength]
  );

  // Memoize event handlers to prevent unnecessary re-renders
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }, [onChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl/Cmd + Enter to trigger generate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && onEnterKey) {
      e.preventDefault();
      onEnterKey();
    }
  }, [onEnterKey]);

  return (
    <div className="space-y-2">
      <label
        htmlFor="prompt-input"
        className="block text-sm font-medium text-white"
      >
        Prompt
        {onEnterKey && (
          <span className="text-xs text-gray-400 ml-2">
            (Ctrl+Enter to generate)
          </span>
        )}
      </label>

      <div className="relative">
        <textarea
          id="prompt-input"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={4}
          tabIndex={1}
          className="w-full px-3 py-2 border border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-pink-400/50 focus:border-pink-400 text-gray-200 placeholder-gray-400 transition-all duration-200"
          style={{ backgroundColor: 'rgb(21, 21, 21)' }}
          aria-describedby="prompt-counter"
        />

        <div
          id="prompt-counter"
          className="absolute bottom-2 right-2 text-xs text-gray-400 bg-gray-900/70 px-1 rounded"
          aria-live="polite"
        >
          {value.length}/{maxLength}
        </div>
      </div>

      {characterWarning && (
        <p className="text-sm text-yellow-400">
          You're approaching the character limit
        </p>
      )}
    </div>
  );
});

// Add display name for debugging
PromptInput.displayName = 'PromptInput';

export default PromptInput;
