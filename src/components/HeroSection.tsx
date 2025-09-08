import React, { useState, useCallback } from 'react';

interface HeroSectionProps {
  className?: string;
}

export const HeroSection = ({ className = '' }: HeroSectionProps) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const openVideoModal = useCallback(() => {
    setShowVideoModal(true);
  }, []);

  const closeVideoModal = useCallback(() => {
    setShowVideoModal(false);
  }, []);
  return (
    <section className={`relative h-screen w-full overflow-hidden ${className}`}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.7) contrast(1.1)' }}
      >
        <source src="/Fashion Promo ( After Effects Template ) ★ AE Templates.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/50 to-purple-900/60"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeInUp">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-500/30 animate-pulse-glow">
                <span className="text-white font-bold text-2xl">AI</span>
              </div>
              <div>
                <h1 className="text-6xl md:text-7xl font-bold text-white">
                  AI Studio <span className="text-pink-400">Pro</span>
                </h1>
                <p className="text-xl text-gray-300 mt-2">Enterprise AI Generation Platform</p>
              </div>
            </div>

            {/* Hero Text */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Transform Your Creative Vision with 
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"> AI-Powered Generation</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Professional-grade AI image generation for creators, designers, and enterprises. 
                Upload, prompt, style, and generate stunning visuals with cutting-edge technology.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button 
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 transform hover:-translate-y-1 text-lg"
                onClick={() => {
                  document.getElementById('create-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Creating Now
              </button>
              <button 
                className="border-2 border-gray-400 hover:border-white text-gray-300 hover:text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 backdrop-blur-sm bg-white/5 hover:bg-white/10 text-lg"
                onClick={openVideoModal}
              >
                Watch Demo
              </button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                '✨ AI-Powered Generation',
                '🎨 Multiple Art Styles', 
                '⚡ Real-time Preview',
                '📱 Enterprise Ready',
                '🔒 Secure & Private'
              ].map((feature, index) => (
                <span 
                  key={feature}
                  className="bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:border-pink-400/50 transition-all duration-300 animate-slideInLeft"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full h-full max-w-6xl max-h-screen p-4 md:p-8">
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-60 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-gray-700"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Player */}
            <div className="w-full h-full flex items-center justify-center">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain rounded-lg shadow-2xl"
                style={{ maxHeight: 'calc(100vh - 6rem)' }}
              >
                <source src="/Screen Recording 2025-09-08 164754.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Video Title */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <h3 className="text-white text-xl font-bold bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                AI Studio Pro Demo
              </h3>
            </div>
          </div>
          
          {/* Click outside to close */}
          <div 
            className="absolute inset-0 z-40" 
            onClick={closeVideoModal}
          ></div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;