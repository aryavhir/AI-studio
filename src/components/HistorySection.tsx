import React from 'react';

export interface Generation {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: Date;
}

interface HistorySectionProps {
  history: Generation[];
  onSelectGeneration: (generation: Generation) => void;
  selectedId?: string;
}

const HistorySection: React.FC<HistorySectionProps> = ({
  history,
  onSelectGeneration,
  selectedId
}) => {
  if (history.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-400/30">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white">Recent Generations</h3>
        </div>
        <div className="bg-gray-800/30 border-2 border-dashed border-gray-600/50 rounded-2xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-2xl shadow-pink-400/20">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-300 font-medium">No generations yet</p>
          <p className="text-sm text-gray-400 mt-2">Your amazing creations will appear here</p>
        </div>
      </div>
    );
  }

  const formatTime = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-400/30">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white">Recent Generations</h3>
        </div>
        <span className="text-sm font-medium text-gray-300 bg-gray-800/50 px-2 py-1 rounded-full border border-gray-600/30">{history.length}/5</span>
      </div>

      <div className="grid gap-4">
        {history.map((generation) => (
          <button
            key={generation.id}
            onClick={() => onSelectGeneration(generation)}
            className={`text-left p-4 rounded-xl border transition-all focus:outline-none shadow-sm hover:shadow-md ${
              selectedId === generation.id
                ? 'border-pink-400/50 bg-gray-800/70 ring-2 ring-pink-400/30 shadow-lg shadow-pink-400/10'
                : 'border-gray-600/50 hover:border-pink-400/50 hover:bg-gray-800/50'
            }`}
            aria-label={`View generation: ${generation.prompt.slice(0, 50)}...`}
          >
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <img
                  src={generation.imageUrl}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg border border-gray-600/30"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-200 line-clamp-2">
                      {generation.prompt || 'No prompt'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {generation.style} • {formatTime(generation.createdAt)}
                    </p>
                  </div>
                  
                  {selectedId === generation.id && (
                    <div className="flex-shrink-0 ml-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full shadow-sm shadow-pink-400/50"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistorySection;