import React, { useState } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { PromptInput } from './components/PromptInput';
import { StyleSelector } from './components/StyleSelector';
import { LiveSummary } from './components/LiveSummary';
import { GenerateButton, AbortButton } from './components/GenerateButton';
import { History } from './components/History';

// Mock history data for UI demonstration
const mockHistoryItems = [
  {
    id: '1',
    imageUrl: 'https://via.placeholder.com/512x512/9b59b6/ffffff?text=ARTISTIC',
    prompt: 'A beautiful sunset over the mountains with clouds',
    style: 'artistic',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: '2',
    imageUrl: 'https://via.placeholder.com/512x512/ff6b6b/ffffff?text=STREETWEAR',
    prompt: 'Urban street scene with graffiti and modern architecture',
    style: 'streetwear',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];

export default function App() {
  const [imageDataUrl, setImageDataUrl] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [historyItems] = useState(mockHistoryItems);

  const canGenerate = imageDataUrl && prompt.trim() && style;

  const handleGenerate = () => {
    if (!canGenerate) return;
    
    setIsGenerating(true);
    // Mock generation process - in next iteration this will call the actual API
    setTimeout(() => {
      setIsGenerating(false);
      alert('Generation complete! (This is a UI demo - API integration comes next)');
    }, 2000);
  };

  const handleAbort = () => {
    setIsGenerating(false);
  };

  const handleHistoryItemClick = (item: typeof mockHistoryItems[0]) => {
    // Restore the selected item to the main interface
    setImageDataUrl(item.imageUrl);
    setPrompt(item.prompt);
    setStyle(item.style);
  };

  const handleClearHistory = () => {
    alert('Clear history clicked! (This will be implemented with localStorage in the next iteration)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Image Generator
          </h1>
          <p className="text-lg text-gray-600">
            Upload an image, add a prompt, and transform it with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Upload & Settings
              </h2>
              
              <div className="space-y-4">
                <ImageUpload
                  onImageSelected={setImageDataUrl}
                  currentImage={imageDataUrl}
                />
                
                <PromptInput
                  value={prompt}
                  onChange={setPrompt}
                />
                
                <StyleSelector
                  value={style}
                  onChange={setStyle}
                />
              </div>
            </div>

            {/* Generate Button */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <GenerateButton
                onClick={handleGenerate}
                isLoading={isGenerating}
                canGenerate={!!canGenerate}
              />
              
              {isGenerating && (
                <AbortButton onClick={handleAbort} />
              )}
              
              {!canGenerate && (
                <p className="mt-2 text-sm text-gray-500 text-center">
                  Upload an image, add a prompt, and select a style to generate
                </p>
              )}
            </div>
          </div>

          {/* Middle Column - Live Preview */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Preview
              </h2>
              <LiveSummary
                imageDataUrl={imageDataUrl}
                prompt={prompt}
                style={style}
              />
            </div>
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <History
                items={historyItems}
                onItemClick={handleHistoryItemClick}
                onClear={handleClearHistory}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            This is a UI demonstration. API integration will be added in the next iteration.
          </p>
        </div>
      </div>
    </div>
  );
}