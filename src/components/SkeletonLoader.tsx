interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export const SkeletonLoader = ({ className = '', width = 'w-full', height = 'h-4' }: SkeletonProps) => {
  return (
    <div 
      className={`${width} ${height} bg-gradient-to-r from-gray-800/50 via-gray-700/30 to-gray-800/50 rounded animate-pulse ${className}`}
      style={{
        backgroundSize: '200% 100%',
        animation: 'shimmer 2s ease-in-out infinite'
      }}
    />
  );
};

interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard = ({ className = '' }: SkeletonCardProps) => {
  return (
    <div className={`bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <SkeletonLoader width="w-6" height="h-6" className="rounded-full" />
          <SkeletonLoader width="w-32" height="h-5" />
        </div>
        <SkeletonLoader height="h-20" />
        <div className="space-y-2">
          <SkeletonLoader height="h-4" />
          <SkeletonLoader height="h-4" width="w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;