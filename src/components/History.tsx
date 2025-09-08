import React from 'react';

interface HistoryItem {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

interface HistoryProps {
  items: HistoryItem[];
  onItemClick: (item: HistoryItem) => void;
  onClear?: () => void;
}

export const History: React.FC<HistoryProps> = ({ items, onItemClick, onClear }) => {
  if (items.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center border border-gray-200">
        <div className="text-gray-400 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-gray-600 mb-1">No generation history</h3>
        <p className="text-xs text-gray-500">Your recent generations will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Recent Generations</h3>
        {onClear && (
          <button
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none focus:underline"
          >
            Clear history
          </button>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onItemClick(item)}
            className="w-full text-left bg-white border border-gray-200 rounded-lg p-3 
                       hover:bg-gray-50 hover:border-gray-300 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                       transition-colors group"
          >
            <div className="flex items-start space-x-3">
              <img
                src={item.imageUrl}
                alt={`Generated: ${item.prompt.slice(0, 30)}...`}
                className="w-16 h-16 rounded-lg object-cover border border-gray-200 
                           group-hover:border-gray-300 transition-colors"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.prompt.length > 50 ? `${item.prompt.slice(0, 50)}...` : item.prompt}
                </p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    {item.style.charAt(0).toUpperCase() + item.style.slice(1)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};