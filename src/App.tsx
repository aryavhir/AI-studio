import React, { useState } from 'react';
import './App.css';
import ImageUpload from './components/ImageUpload';
import PromptInput from './components/PromptInput';
import StyleSelector, { type StyleOption } from './components/StyleSelector';
import LiveSummary from './components/LiveSummary';
import GenerateSection from './components/GenerateSection';
import HistorySection, { type Generation } from './components/HistorySection';
import HeroSection from './components/HeroSection';

const styleOptions: StyleOption[] = [
  {
    id: 'editorial',
    name: 'Editorial',
    description:
      'Clean, professional style perfect for magazines and publications',
  },
  {
    id: 'streetwear',
    name: 'Streetwear',
    description: 'Urban, contemporary aesthetic with bold colors and graphics',
  },
  {
    id: 'vintage',
    name: 'Vintage',
    description:
      'Nostalgic, retro-inspired with classic styling and warm tones',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple, clean design with focus on essential elements',
  },
  {
    id: 'artistic',
    name: 'Artistic',
    description:
      'Creative, expressive style with painterly effects and unique textures',
  },
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
  const handleImageChange = (
    imageDataUrl: string | null,
    filename: string | null
  ) => {
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
        imageUrl:
          'https://via.placeholder.com/400x300/6366f1/ffffff?text=Generated+Image',
        prompt: prompt,
        style: style,
        createdAt: new Date(),
      };

      // Add to history (keep only last 5)
      setHistory((prev) => [newGeneration, ...prev.slice(0, 4)]);
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900/40">
      {/* Hero Section */}
      <HeroSection />

      {/* Create Section - Full Length */}
      <section
        id="create-section"
        className="relative min-h-screen flex items-center justify-center bg-black"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Create{' '}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Amazing
              </span>{' '}
              Content
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional AI-powered image generation with enterprise-grade
              tools and stunning results
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto"></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 animate-fadeInUp max-w-6xl mx-auto">
            {/* Left Column - Create Tools */}
            <div className="space-y-12 animate-slideInLeft">
              <div className="backdrop-blur-md rounded-2xl shadow-2xl p-8" style={{ backgroundColor: '#151515' }}>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl shadow-2xl shadow-pink-400/40 group-hover:shadow-pink-400/60 transition-all duration-500">
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                        <path
                          fillRule="evenodd"
                          d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-pink-100 transition-colors duration-300">
                      Create
                    </h2>
                    <p className="text-sm text-gray-400 font-medium">
                      Design Your Vision
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <ImageUpload
                    onImageChange={handleImageChange}
                    currentImage={image}
                  />

                  <PromptInput value={prompt} onChange={handlePromptChange} />

                  <StyleSelector
                    value={style}
                    onChange={handleStyleChange}
                    options={styleOptions}
                  />
                </div>
              </div>

              <div className="backdrop-blur-md rounded-2xl shadow-2xl p-8" style={{ backgroundColor: '#151515' }}>
                <GenerateSection
                  onGenerate={handleGenerate}
                  onAbort={handleAbort}
                  isGenerating={isGenerating}
                  error={generationError}
                  canGenerate={!!canGenerate}
                />
              </div>
            </div>

            {/* Right Column - Live Preview */}
            <div className="animate-slideInRight">
              <div className="backdrop-blur-md rounded-2xl shadow-2xl" style={{ backgroundColor: '#151515' }}>
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
        </div>
      </section>

      {/* History Section - Full Length */}
      <section
        id="history-section"
        className="relative min-h-screen flex items-center justify-center bg-black"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Your{' '}
              <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
                Creative
              </span>{' '}
              History
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore your AI-generated masterpieces and revisit your creative
              journey
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-violet-500 to-pink-600 rounded-full mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto animate-fadeInUp">
            <div className="backdrop-blur-md rounded-2xl shadow-2xl p-8" style={{ backgroundColor: '#151515' }}>
              <HistorySection
                history={history}
                onSelectGeneration={handleSelectGeneration}
                selectedId={selectedGenerationId}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Cinematic Style */}
      <footer className="relative bg-gradient-to-t from-black via-gray-900/30 to-purple-900 backdrop-blur-lg border-t border-gray-700/30">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/30 to-purple-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Footer Content */}
          <div className="text-center space-y-8">
            {/* Brand Section */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/40">
                <span className="text-white font-bold text-2xl">AI</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">AI Studio Pro</h3>
                <p className="text-gray-400">Enterprise AI Platform</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Professional-grade AI image generation for creators, designers, and enterprises worldwide.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700/50 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-gray-400 text-center md:text-left">
                © 2024 AI Studio Pro. Enterprise AI Generation Platform. All
                rights reserved.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>Enterprise Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
