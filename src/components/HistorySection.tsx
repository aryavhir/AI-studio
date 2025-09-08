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
        <h3 className="text-lg font-medium text-gray-900">Recent Generations</h3>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <div className="mx-auto w-12 h-12 text-gray-400 mb-4">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500">No generations yet</p>
          <p className="text-sm text-gray-400 mt-1">Your recent creations will appear here</p>
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
        <h3 className="text-lg font-medium text-gray-900">Recent Generations</h3>
        <span className="text-sm text-gray-500">{history.length}/5</span>
      </div>

      <div className="grid gap-4">
        {history.map((generation) => (
          <button
            key={generation.id}
            onClick={() => onSelectGeneration(generation)}
            className={`text-left p-4 rounded-lg border transition-all focus:outline-none ${
              selectedId === generation.id
                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-20'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
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