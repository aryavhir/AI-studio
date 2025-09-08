import React from 'react';

interface GenerateSectionProps {
  onGenerate: () => void;
  onAbort: () => void;
  isGenerating: boolean;
  error: string | null;
  canGenerate: boolean;
}

const GenerateSection: React.FC<GenerateSectionProps> = ({
  onGenerate,
  onAbort,
  isGenerating,
  error,
  canGenerate
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Generate</h3>
        
        {isGenerating && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Generating...</span>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        type="button"
        onClick={isGenerating ? onAbort : onGenerate}
        disabled={!canGenerate && !isGenerating}
        className={`w-full py-3 px-4 rounded-lg font-medium focus-visible transition-all ${
          isGenerating
            ? 'bg-red-600 hover:bg-red-700 text-white'
            : canGenerate
            ? 'button-primary'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        aria-label={isGenerating ? 'Abort generation' : 'Start generation'}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center space-x-2">
            <span>Abort Generation</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
        ) : (
          'Generate'
        )}
      </button>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-red-800">Generation Error</h4>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading Progress */}
      {isGenerating && (
        <div className="space-y-2">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            This may take a moment...
          </p>
        </div>
      )}

      {/* Requirements */}
      {!canGenerate && !isGenerating && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>To generate:</strong> Upload an image or enter a prompt, and select a style.
          </p>
        </div>
      )}
    </div>
  );
};

export default GenerateSection;