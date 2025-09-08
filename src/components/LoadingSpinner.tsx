interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner = ({ size = 'md', className = '' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 rounded-full border-2 border-gray-600 opacity-25"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-pink-500 animate-spin"></div>
        <div className="absolute inset-1 rounded-full border-2 border-transparent border-t-purple-400 animate-spin animation-delay-150"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;