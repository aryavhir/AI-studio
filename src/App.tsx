import React, { useState, useCallback } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import PromptInput from './components/PromptInput';
import StyleSelector from './components/StyleSelector';
import GenerateSection from './components/GenerateSection';
import LiveSummary from './components/LiveSummary';
import HistorySection from './components/HistorySection';

export interface Generation {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  timestamp: Date;
}

export interface StyleOption {
  id: string;
  name: string;
  description: string;
}

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [history, setHistory] = useState<Generation[]>([]);
  const [selectedGenerationId, setSelectedGenerationId] = useState<string | null>(null);

  const styleOptions: StyleOption[] = [
    { id: 'editorial', name: 'Editorial', description: 'Clean, professional photography style' },
    { id: 'streetwear', name: 'Streetwear', description: 'Urban, modern aesthetic' },
    { id: 'vintage', name: 'Vintage', description: 'Retro, classic film look' },
    { id: 'minimalist', name: 'Minimalist', description: 'Simple, clean composition' },
    { id: 'artistic', name: 'Artistic', description: 'Creative, expressive style' }
  ];

  const handleImageChange = useCallback((newImage: string | null, newImageName: string | null) => {
    setImage(newImage);
    setImageName(newImageName);
    setGenerationError(null);
  }, []);

  const handlePromptChange = useCallback((newPrompt: string) => {
    setPrompt(newPrompt);
    setGenerationError(null);
  }, []);

  const handleStyleChange = useCallback((newStyle: string) => {
    setStyle(newStyle);
    setGenerationError(null);
  }, []);

  const handleGenerate = useCallback(async () => {
    if ((!image && !prompt.trim()) || !style) {
      setGenerationError('Please provide either an image or prompt, and select a style');
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const mockImageUrl = `https://picsum.photos/512/512?random=${Date.now()}`;
      const newGeneration: Generation = {
        id: Math.random().toString(36).substr(2, 9),
        imageUrl: mockImageUrl,
        prompt: prompt || 'Generated from uploaded image',
        style,
        timestamp: new Date()
      };

      setHistory(prev => [newGeneration, ...prev.slice(0, 4)]);
      setIsGenerating(false);
    } catch (error) {
      setGenerationError('Failed to generate image. Please try again.');
      setIsGenerating(false);
    }
  }, [image, prompt, style]);

  const handleAbort = () => {
    setIsGenerating(false);
    setGenerationError(null);
  };

  const handleSelectGeneration = (generation: Generation) => {
    setSelectedGenerationId(generation.id);
    setPrompt(generation.prompt);
    setStyle(generation.style);
    setImage(null);
    setImageName(null);
  };

  const canGenerate = (image || prompt.trim()) && style;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/40">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md shadow-2xl border-b border-gray-800/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/30">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h1 className="text-2xl font-bold text-white">AI Studio <span className="text-sm text-pink-400 font-normal">Pro</span></h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm shadow-green-400/50"></div>
              <div className="flex items-center space-x-3">
                <p className="text-sm text-gray-300">Enterprise Ready</p>
                <div className="w-1 h-4 bg-gray-600"></div>
                <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">v2.1.0</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {/* Floating Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse animation-delay-300"></div>
            <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse animation-delay-150"></div>
            <div className="absolute top-60 right-1/3 w-28 h-28 bg-cyan-500/8 rounded-full blur-2xl animate-pulse animation-delay-150"></div>
            <div className="absolute bottom-20 right-10 w-36 h-36 bg-purple-600/6 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <div className="relative grid lg:grid-cols-12 gap-6 animate-fadeInUp">
            {/* Left Column - Inputs */}
            <div className="lg:col-span-4 space-y-6 animate-slideInLeft">
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/40 p-6 hover:shadow-pink-500/30 hover:shadow-2xl transition-all duration-500 hover:border-pink-500/50 hover:scale-[1.02] transform animate-float">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg shadow-pink-400/50 animate-pulse-glow"></div>
                  <h2 className="text-lg font-bold text-white">Create</h2>
                  <div className="flex space-x-1 ml-auto">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping animation-delay-150"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping animation-delay-300"></div>
                  </div>
                </div>
              
                <div className="space-y-6">
                  <ImageUpload
                    onImageChange={handleImageChange}
                    currentImage={image}
                  />
                  
                  <PromptInput
                    value={prompt}
                    onChange={handlePromptChange}
                  />
                  
                  <StyleSelector
                    value={style}
                    onChange={handleStyleChange}
                    options={styleOptions}
                  />
                </div>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/40 p-6 hover:shadow-purple-500/30 hover:shadow-2xl transition-all duration-500 hover:border-purple-500/50 hover:scale-[1.02] transform">
                <GenerateSection
                  onGenerate={handleGenerate}
                  onAbort={handleAbort}
                  isGenerating={isGenerating}
                  error={generationError}
                  canGenerate={!!canGenerate}
                />
              </div>
            </div>

            {/* Middle Column - Preview */}
            <div className="lg:col-span-4 lg:mt-12">
              <div className="sticky top-32">
                <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/40 hover:shadow-blue-500/30 hover:shadow-2xl transition-all duration-500 hover:border-blue-500/50 hover:scale-[1.02] transform animate-bounce-glow">
                  <LiveSummary
                    image={image}
                    imageName={imageName}
                    prompt={prompt}
                    style={style}
                    styleOptions={styleOptions}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - History */}
            <div className="lg:col-span-4 lg:mt-6 animate-slideInLeft animation-delay-300">
              <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/40 p-6 sticky top-28 hover:shadow-cyan-500/30 hover:shadow-2xl transition-all duration-500 hover:border-cyan-500/50 hover:scale-[1.02] transform animate-float animation-delay-150">
                <HistorySection
                  history={history}
                  onSelectGeneration={handleSelectGeneration}
                  selectedId={selectedGenerationId}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-black/60 backdrop-blur-md border-t border-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">© 2024 AI Studio Pro - Enterprise AI Generation Platform</p>
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-600">v2.1.0</span>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-600">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;