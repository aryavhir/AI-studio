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
      <div className="bg-gray-800/30 border-2 border-dashed border-gray-600/50 rounded-2xl p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-400/20">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Preview</h3>
            <p className="text-gray-400 italic">
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
        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-pink-400/40 group-hover:shadow-blue-400/60 transition-all duration-500">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">Preview</h3>
          <p className="text-sm text-gray-400 font-medium">Live Summary</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Image Preview */}
        {image && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Source Image</h4>
            <div className="relative">
              <img
                src={image}
                alt="Source preview"
                className="w-full h-32 object-cover rounded-lg border border-gray-600/50 shadow-lg"
              />
              {imageName && (
                <p className="text-xs text-gray-400 mt-1">{imageName}</p>
              )}
            </div>
          </div>
        )}

        {/* Prompt Preview */}
        {prompt.trim() && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Prompt</h4>
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600/30">
              <p className="text-sm text-gray-200">{prompt}</p>
            </div>
          </div>
        )}

        {/* Style Preview */}
        {style && selectedStyle && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-300">Style</h4>
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-600/30">
              <p className="font-medium text-gray-200">{selectedStyle.name}</p>
              <p className="text-sm text-gray-300 mt-1">{selectedStyle.description}</p>
            </div>
          </div>
        )}

        {/* Generation Summary */}
        <div className="pt-4 border-t border-gray-600/50">
          <p className="text-sm text-gray-300">
            Ready to generate {image ? 'with source image' : 'from prompt'}
            {style && selectedStyle && ` in ${selectedStyle.name.toLowerCase()} style`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveSummary;