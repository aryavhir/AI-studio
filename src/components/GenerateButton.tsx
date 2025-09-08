import React from 'react';

interface GenerateButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  canGenerate: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ 
  onClick, 
  disabled = false, 
  isLoading = false,
  canGenerate
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || !canGenerate || isLoading}
      className={`w-full flex items-center justify-center px-6 py-3 border border-transparent 
                  text-base font-medium rounded-md transition-colors duration-200 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${
                    disabled || !canGenerate || isLoading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
                  }`}
      aria-describedby="generate-button-description"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Generating...
        </>
      ) : (
        'Generate Image'
      )}
    </button>
  );
};

export const AbortButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full mt-2 px-4 py-2 border border-red-300 text-red-700 
                 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 
                 focus:ring-red-500 focus:ring-offset-2 transition-colors"
    >
      Abort Generation
    </button>
  );
};