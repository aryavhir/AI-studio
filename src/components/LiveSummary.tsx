import React from 'react';
import type { StyleOption } from './StyleSelector';

interface LiveSummaryProps {
  image: string | null;
  imageName: string | null;
  prompt: string;
  style: string;
  styleOptions: StyleOption[];
}

const LiveSummary: React.FC<LiveSummaryProps> = ({
  image,
  imageName,
  prompt,
  style,
  styleOptions
}) => {
  const selectedStyle = styleOptions.find(opt => opt.id === style);
  const hasContent = image || prompt.trim() || style;

  if (!hasContent) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
        <p className="text-gray-500 italic">
          Upload an image, enter a prompt, or select a style to see a preview
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
      
      <div className="space-y-4">
        {/* Image Preview */}
        {image && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Source Image</h4>
            <div className="relative">
              <img
                src={image}
                alt="Source preview"
                className="w-full h-32 object-cover rounded-lg border"
              />
              {imageName && (
                <p className="text-xs text-gray-500 mt-1">{imageName}</p>
              )}
            </div>
          </div>
        )}

        {/* Prompt Preview */}
        {prompt.trim() && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Prompt</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-800">{prompt}</p>
            </div>
          </div>
        )}

        {/* Style Preview */}
        {style && selectedStyle && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Style</h4>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <p className="font-medium text-blue-900">{selectedStyle.name}</p>
              <p className="text-sm text-blue-700 mt-1">{selectedStyle.description}</p>
            </div>
          </div>
        )}

        {/* Generation Summary */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Ready to generate {image ? 'with source image' : 'from prompt'}
            {style && selectedStyle && ` in ${selectedStyle.name.toLowerCase()} style`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveSummary;