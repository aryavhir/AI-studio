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
          <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-green-400/30">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Generate</h3>
        </div>
        
        {isGenerating && (
          <div className="flex items-center space-x-2 text-sm text-blue-300 bg-gray-700/70 px-3 py-1 rounded-full border border-gray-600">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
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
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/30 hover:shadow-red-500/50 hover:shadow-2xl transform hover:-translate-y-0.5'
            : canGenerate
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-blue-500/30 hover:shadow-blue-500/50 hover:shadow-2xl transform hover:-translate-y-0.5'
            : 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-400 cursor-not-allowed shadow-gray-800/30'
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
        <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl backdrop-blur-sm" role="alert">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-red-200">Generation Error</h4>
              <p className="text-sm text-red-300 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading Progress */}
      {isGenerating && (
        <div className="space-y-3 bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-4 rounded-xl border border-gray-600/50 backdrop-blur-sm">
          <div className="bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full animate-pulse w-3/4 shadow-lg"></div>
          </div>
          <p className="text-sm text-gray-200 text-center font-medium">
            ✨ Creating your masterpiece...
          </p>
        </div>
      )}

      {/* Requirements */}
      {!canGenerate && !isGenerating && (
        <div className="p-4 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/50 rounded-xl shadow-sm backdrop-blur-sm">
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 text-yellow-400 mt-0.5">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
            </div>
            <p className="text-sm text-yellow-200 font-medium">
              <strong>Ready to create?</strong> Upload an image or enter a prompt, then select your style.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateSection;