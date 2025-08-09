import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 200);
          return 100;
        }
        return prev + 5; // Faster loading
      });
    }, 30); // Faster interval

    // Update loading text
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Loading...') return 'Loading';
        return prev + '.';
      });
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Logo/Initial */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl animate-pulse">
            AU
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-2xl font-semibold text-white mb-8 animate-pulse">
          {loadingText}
        </h2>

        {/* Progress bar container */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="text-center mt-4">
            <span className="text-white/80 text-sm font-medium">
              {progress}%
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-white/60 text-sm mt-6 animate-fade-in-scale">
          Preparing your experience...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
