import { useState, useEffect } from 'react';
import { Code, Database, Globe } from 'lucide-react';

const GlobalParticles = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Disable mouse tracking on mobile for better performance
    if (window.innerWidth <= 768 || 'ontouchstart' in window) {
      return;
    }

    // Optimized mouse tracking with throttling for desktop only
    let animationFrame;
    const handleMouseMove = (e) => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 1.5, // Reduced intensity
          y: (e.clientY / window.innerHeight - 0.5) * 1.5
        });
        animationFrame = null;
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Particles - Heavily reduced for performance */}
      {[...Array(window.innerWidth > 768 ? 8 : 3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-purple-400 dark:bg-purple-500 rounded-full opacity-20 animate-pulse"
          style={{
            left: `${(Math.random() * 100).toFixed(1)}%`,
            top: `${(Math.random() * 100).toFixed(1)}%`,
            animationDelay: `${(Math.random() * 3).toFixed(2)}s`,
            animationDuration: `${(2 + Math.random() * 3).toFixed(2)}s`,
            transform: window.innerWidth > 768 ? `translate(${(mousePosition.x || 0) * (3 + i)}px, ${(mousePosition.y || 0) * (3 + i)}px)` : 'none',
            transition: window.innerWidth > 768 ? 'transform 0.3s ease-out' : 'none'
          }}
        />
      ))}
      
      {/* Large Floating Shapes */}
      <div 
        className="absolute top-1/4 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-600 dark:to-pink-600 rounded-full opacity-5 animate-pulse"
        style={{
          transform: `translate(${(mousePosition.x || 0) * 20}px, ${(mousePosition.y || 0) * 20}px) rotate(${(mousePosition.x || 0) * 5}deg)`,
          transition: 'transform 0.5s ease-out',
          animationDuration: '4s'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-28 h-28 md:w-40 md:h-40 bg-gradient-to-br from-blue-400 to-cyan-400 dark:from-blue-600 dark:to-cyan-600 rounded-full opacity-5 animate-bounce"
        style={{
          transform: `translate(${(mousePosition.x || 0) * -15}px, ${(mousePosition.y || 0) * -15}px) rotate(${(mousePosition.x || 0) * -8}deg)`,
          transition: 'transform 0.4s ease-out',
          animationDuration: '3s'
        }}
      />
      <div 
        className="absolute top-2/3 right-1/3 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-400 to-emerald-400 dark:from-green-600 dark:to-emerald-600 rounded-full opacity-5 animate-pulse"
        style={{ 
          animationDelay: '1s',
          animationDuration: '5s',
          transform: `translate(${(mousePosition.x || 0) * 12}px, ${(mousePosition.y || 0) * 12}px) scale(${1 + (mousePosition.x || 0) * 0.05})`,
          transition: 'transform 0.6s ease-out'
        }}
      />

      {/* Geometric Shapes */}
      <div 
        className="absolute top-1/3 left-1/2 w-12 h-12 md:w-16 md:h-16 border-2 border-purple-300 dark:border-purple-600 opacity-10 animate-spin"
        style={{
          animationDuration: '20s',
          transform: `translate(${(mousePosition.x || 0) * 10}px, ${(mousePosition.y || 0) * 10}px) rotate(${(mousePosition.x || 0) * 30}deg)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute bottom-1/2 left-1/4 w-8 h-8 md:w-12 md:h-12 bg-blue-300 dark:bg-blue-600 opacity-10 animate-bounce"
        style={{
          animationDelay: '0.5s',
          animationDuration: '2s',
          transform: `translate(${(mousePosition.x || 0) * -15}px, ${(mousePosition.y || 0) * -15}px) rotate(${(mousePosition.x || 0) * -20}deg)`,
          transition: 'transform 0.4s ease-out'
        }}
      />

      {/* Floating Rings */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`ring-${i}`}
          className="absolute border border-purple-300 dark:border-purple-600 rounded-full opacity-5 animate-spin"
          style={{
            width: `${60 + i * 30}px`,
            height: `${60 + i * 30}px`,
            left: `${20 + i * 20}%`,
            top: `${40 + i * 15}%`,
            animationDuration: `${15 + i * 5}s`,
            animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
            transform: `translate(${(mousePosition.x || 0) * (3 + i * 2)}px, ${(mousePosition.y || 0) * (3 + i * 2)}px) rotate(${(mousePosition.x || 0) * (5 + i * 3)}deg)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
      ))}

      {/* Code-themed floating elements */}
      <div 
        className="absolute top-1/2 right-1/3 text-2xl md:text-3xl opacity-5 animate-pulse"
        style={{
          transform: `translate(${(mousePosition.x || 0) * 8}px, ${(mousePosition.y || 0) * 8}px) rotate(${(mousePosition.x || 0) * 3}deg)`,
          transition: 'transform 0.3s ease-out',
          animationDuration: '3s'
        }}
      >
        <Code className="text-purple-500 dark:text-purple-400" />
      </div>
      <div 
        className="absolute bottom-1/3 right-1/2 text-xl md:text-2xl opacity-5 animate-bounce"
        style={{
          animationDelay: '1s',
          animationDuration: '4s',
          transform: `translate(${(mousePosition.x || 0) * -12}px, ${(mousePosition.y || 0) * -12}px) rotate(${(mousePosition.x || 0) * -5}deg)`,
          transition: 'transform 0.4s ease-out'
        }}
      >
        <Database className="text-blue-500 dark:text-blue-400" />
      </div>
      <div 
        className="absolute top-3/4 left-1/2 text-xl md:text-2xl opacity-5 animate-pulse"
        style={{
          animationDelay: '2s',
          animationDuration: '6s',
          transform: `translate(${(mousePosition.x || 0) * 15}px, ${(mousePosition.y || 0) * 15}px) rotate(${(mousePosition.x || 0) * 8}deg)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <Globe className="text-green-500 dark:text-green-400" />
      </div>

      {/* 3D Geometric Elements */}
      <div 
        className="absolute top-20 right-20 transform-3d hidden md:block"
        style={{
          transform: `translate(${(mousePosition.x || 0) * 18}px, ${(mousePosition.y || 0) * 18}px) rotateX(${(mousePosition.y || 0) * 15}deg) rotateY(${(mousePosition.x || 0) * 15}deg)`,
          transition: 'transform 0.4s ease-out'
        }}
      >
        <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 opacity-10 transform rotate-45 animate-pulse" />
      </div>
      <div 
        className="absolute bottom-20 left-20 transform-3d hidden md:block"
        style={{
          transform: `translate(${(mousePosition.x || 0) * -20}px, ${(mousePosition.y || 0) * -20}px) rotateX(${(mousePosition.y || 0) * -18}deg) rotateY(${(mousePosition.x || 0) * -18}deg)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-cyan-500 dark:from-green-600 dark:to-cyan-600 opacity-10 rounded-lg animate-bounce" />
      </div>
    </div>
  );
};

export default GlobalParticles;
