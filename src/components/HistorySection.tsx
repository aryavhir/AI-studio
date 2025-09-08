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
          <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Recent Generations</h3>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-pink-50/30 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">No generations yet</p>
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
          <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Recent Generations</h3>
        </div>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{history.length}/5</span>
      </div>

      <div className="grid gap-4">
        {history.map((generation) => (
          <button
            key={generation.id}
            onClick={() => onSelectGeneration(generation)}
            className={`text-left p-4 rounded-xl border transition-all focus:outline-none shadow-sm hover:shadow-md ${
              selectedId === generation.id
                ? 'border-pink-300 bg-gradient-to-r from-pink-50 to-rose-50 ring-2 ring-pink-200 shadow-lg'
                : 'border-gray-200 hover:border-pink-200 hover:bg-gradient-to-r hover:from-gray-50 hover:to-pink-50/30'
            }`}
            aria-label={`View generation: ${generation.prompt.slice(0, 50)}...`}
          >
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <img
                  src={generation.imageUrl}
                  alt=""
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {generation.prompt || 'No prompt'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {generation.style} • {formatTime(generation.createdAt)}
                    </p>
                  </div>
                  
                  {selectedId === generation.id && (
                    <div className="flex-shrink-0 ml-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
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