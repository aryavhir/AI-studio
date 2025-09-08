import React from 'react';

interface LiveSummaryProps {
  imageDataUrl?: string;
  prompt: string;
  style: string;
}

export const LiveSummary: React.FC<LiveSummaryProps> = ({ imageDataUrl, prompt, style }) => {
  const hasContent = imageDataUrl || prompt || style;

  if (!hasContent) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Generation Preview</h3>
        <p className="text-sm text-gray-500">
          Upload an image, add a prompt, and select a style to see a preview
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Generation Preview</h3>
      </div>
      
      <div className="p-4 space-y-4">
        {imageDataUrl && (
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-2">Source Image</h4>
            <img
              src={imageDataUrl}
              alt="Source preview"
              className="w-full max-w-xs rounded-lg shadow-sm"
            />
          </div>
        )}

        {prompt && (
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-1">Prompt</h4>
            <p className="text-sm text-gray-900 bg-gray-50 rounded p-2">
              "{prompt}"
            </p>
          </div>
        )}

        {style && (
          <div>
            <h4 className="text-xs font-medium text-gray-600 mb-1">Style</h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};