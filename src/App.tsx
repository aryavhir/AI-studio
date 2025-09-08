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
          <div>
            {/* Left Column - Create Tools */}
            <div className="space-y-8 animate-slideInLeft">
              <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 p-8 hover:shadow-pink-500/30 hover:shadow-2xl transition-all duration-700 hover:border-pink-500/30 hover:scale-[1.02] group">
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

              <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 p-8 hover:shadow-purple-500/30 hover:shadow-2xl transition-all duration-700 hover:border-purple-500/30 hover:scale-[1.02] group">
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
              <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 hover:shadow-blue-500/30 hover:shadow-2xl transition-all duration-700 hover:border-blue-500/30 hover:scale-[1.02] group">
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
            <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700/50 p-8 hover:shadow-violet-500/30 hover:shadow-2xl transition-all duration-700 hover:border-violet-500/30 hover:scale-[1.02] group">
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
      <footer className="relative bg-gradient-to-t from-black via-gray-900/80 to-gray-800/60 backdrop-blur-lg border-t border-gray-700/30">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-gray-900/30 to-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/40">
                  <span className="text-white font-bold text-lg">AI</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    AI Studio Pro
                  </h3>
                  <p className="text-sm text-gray-400">
                    Enterprise AI Platform
                  </p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Professional-grade AI image generation for creators, designers,
                and enterprises worldwide.
              </p>
            </div>

            {/* Status Section */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">System Status</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-800/50 rounded-xl p-4">
                  <span className="text-gray-300 font-medium">
                    Platform Status
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-green-300 font-medium">
                      Operational
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-800/50 rounded-xl p-4">
                  <span className="text-gray-300 font-medium">
                    API Response
                  </span>
                  <span className="text-blue-300 font-medium">&lt; 100ms</span>
                </div>
              </div>
            </div>

            {/* Version Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-bold text-white">Version Info</h4>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300 font-medium">
                      Current Version
                    </span>
                    <span className="text-pink-300 font-mono font-bold">
                      v2.1.0
                    </span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Latest stable release with enhanced performance
                  </div>
                </div>
              </div>
            </div>
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
