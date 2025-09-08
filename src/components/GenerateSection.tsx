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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Generate</h3>
        </div>
        
        {isGenerating && (
          <div className="flex items-center space-x-2 text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="font-medium">Generating...</span>
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        type="button"
        onClick={isGenerating ? onAbort : onGenerate}
        disabled={!canGenerate && !isGenerating}
        className={`w-full py-4 px-6 rounded-xl font-bold text-lg focus:outline-none transition-all duration-300 shadow-lg ${
          isGenerating
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-200 hover:shadow-red-300 hover:shadow-2xl transform hover:-translate-y-0.5'
            : canGenerate
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-200 hover:shadow-blue-300 hover:shadow-2xl transform hover:-translate-y-0.5'
            : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-500 cursor-not-allowed shadow-gray-100'
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
        <div className="space-y-3 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-100">
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full animate-pulse w-3/4 shadow-lg"></div>
          </div>
          <p className="text-sm text-gray-700 text-center font-medium">
            ✨ Creating your masterpiece...
          </p>
        </div>
      )}

      {/* Requirements */}
      {!canGenerate && !isGenerating && (
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-yellow-500 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-sm text-yellow-800 font-medium">
              <strong>Ready to create?</strong> Upload an image or enter a prompt, then select your style.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateSection;