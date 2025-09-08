import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import PromptInput from './components/PromptInput';
import StyleSelector, { type StyleOption } from './components/StyleSelector';
import LiveSummary from './components/LiveSummary';
import GenerateSection from './components/GenerateSection';
import HistorySection, { type Generation } from './components/HistorySection';

const styleOptions: StyleOption[] = [
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Clean, professional style perfect for magazines and publications'
  },
  {
    id: 'streetwear',
    name: 'Streetwear', 
    description: 'Urban, contemporary aesthetic with bold colors and graphics'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description: 'Nostalgic, retro-inspired with classic styling and warm tones'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple, clean design with focus on essential elements'
  },
  {
    id: 'artistic',
    name: 'Artistic',
    description: 'Creative, expressive style with painterly effects and unique textures'
  }
];

function App() {
  // Form state
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  
  // History state
  const [history, setHistory] = useState<Generation[]>([]);
  const [selectedGenerationId, setSelectedGenerationId] = useState<string>();

  // Handlers
  const handleImageChange = (imageDataUrl: string | null, filename: string | null) => {
    setImage(imageDataUrl);
    setImageName(filename);
    setSelectedGenerationId(undefined); // Clear selection when changing source
  };

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
    setSelectedGenerationId(undefined); // Clear selection when changing prompt
  };

  const handleStyleChange = (newStyle: string) => {
    setStyle(newStyle);
    setSelectedGenerationId(undefined); // Clear selection when changing style
  };

  const handleGenerate = () => {
    // Placeholder for generate functionality
    setIsGenerating(true);
    setGenerationError(null);
    
    // Simulate API call
    setTimeout(() => {
      // Simulate random error (20% chance)
      if (Math.random() < 0.2) {
        setGenerationError('Model overloaded. Please try again in a moment.');
        setIsGenerating(false);
        return;
      }
      
      // Simulate successful generation
      const newGeneration: Generation = {
        id: Date.now().toString(),
        imageUrl: 'https://via.placeholder.com/400x300/6366f1/ffffff?text=Generated+Image',
        prompt: prompt,
        style: style,
        createdAt: new Date()
      };
      
      // Add to history (keep only last 5)
      setHistory(prev => [newGeneration, ...prev.slice(0, 4)]);
      setIsGenerating(false);
      
      // Clear form
      setImage(null);
      setImageName(null);
      setPrompt('');
      setStyle('');
    }, 2000);
  };

  const handleAbort = () => {
    setIsGenerating(false);
    setGenerationError(null);
  };

  const handleSelectGeneration = (generation: Generation) => {
    setSelectedGenerationId(generation.id);
    // Restore the generation parameters
    setPrompt(generation.prompt);
    setStyle(generation.style);
    // Note: We can't restore the original image from history in this demo
    setImage(null);
    setImageName(null);
  };

  // Determine if we can generate
  const canGenerate = (image || prompt.trim()) && style;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900">
      {/* Header */}
      <header className="bg-purple-900/80 backdrop-blur-sm shadow-2xl border-b border-purple-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">AI Studio</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400/50"></div>
              <p className="text-sm text-purple-200">Create amazing content with AI</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <div className="bg-purple-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-700/30 p-6 hover:shadow-purple-500/20 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-6 h-6 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full shadow-lg shadow-violet-400/30"></div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">Create</h2>
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

            <div className="bg-gradient-to-br from-purple-800/60 to-violet-900/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-700/30 p-6 hover:shadow-violet-500/20 hover:shadow-2xl transition-all duration-300">
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
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-purple-800/60 to-violet-900/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-700/30 hover:shadow-violet-500/20 hover:shadow-2xl transition-all duration-300">
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
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-800/60 to-violet-900/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-700/30 p-6 sticky top-24 hover:shadow-violet-500/20 hover:shadow-2xl transition-all duration-300">
              <HistorySection
                history={history}
                onSelectGeneration={handleSelectGeneration}
                selectedId={selectedGenerationId}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-purple-900/50 backdrop-blur-sm border-t border-purple-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-sm bg-gradient-to-r from-purple-300 to-violet-400 bg-clip-text text-transparent font-medium">
            AI Studio Demo - Purple Theme
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;