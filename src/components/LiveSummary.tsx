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
      <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 border-2 border-dashed border-gray-200 rounded-2xl p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Preview</h3>
            <p className="text-gray-500 italic">
              Upload an image, enter a prompt, or select a style to see a preview
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
        </div>
        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Preview</h3>
      </div>
      
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