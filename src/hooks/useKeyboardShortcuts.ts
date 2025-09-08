import { useEffect, useCallback } from 'react';

interface KeyboardShortcutConfig {
  onGenerate?: () => void;
  onAbort?: () => void;
  isGenerating?: boolean;
  canGenerate?: boolean;
}

export const useKeyboardShortcuts = ({ 
  onGenerate, 
  onAbort, 
  isGenerating = false, 
  canGenerate = false 
}: KeyboardShortcutConfig) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts if user is typing in an input field
    const target = event.target as HTMLElement;
    const isInputField = target.tagName === 'INPUT' || 
                        target.tagName === 'TEXTAREA' || 
                        target.tagName === 'SELECT' ||
                        target.isContentEditable;

    // Escape key to abort generation (works globally)
    if (event.key === 'Escape' && isGenerating && onAbort) {
      event.preventDefault();
      onAbort();
      return;
    }

    // Only allow global shortcuts when not in input fields
    if (isInputField) return;

    // Global keyboard shortcuts
    switch (event.key) {
      case 'Enter':
        if (canGenerate && !isGenerating && onGenerate) {
          event.preventDefault();
          onGenerate();
        }
        break;
      
      case 'g':
      case 'G':
        if (canGenerate && !isGenerating && onGenerate) {
          event.preventDefault();
          onGenerate();
        }
        break;
    }
  }, [onGenerate, onAbort, isGenerating, canGenerate]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    // Return helpful info about active shortcuts
    shortcuts: {
      generate: canGenerate && !isGenerating ? ['Enter', 'G'] : null,
      abort: isGenerating ? ['Escape'] : null,
    }
  };
};