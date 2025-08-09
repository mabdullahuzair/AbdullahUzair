import { useState, useEffect } from 'react';

const CursorTrail = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    // Only enable on desktop
    if (window.innerWidth <= 768 || 'ontouchstart' in window) return;

    let animationFrame;
    
    const handleMouseMove = (e) => {
      if (animationFrame) return;
      
      animationFrame = requestAnimationFrame(() => {
        setTrail(prevTrail => {
          const newTrail = [
            { 
              x: e.clientX, 
              y: e.clientY, 
              id: Date.now() + Math.random(),
              timestamp: Date.now()
            },
            ...prevTrail.slice(0, 8) // Keep only last 8 trail points
          ];
          return newTrail;
        });
        animationFrame = null;
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Clean up old trail points
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setTrail(prevTrail => 
        prevTrail.filter(point => now - point.timestamp < 1000)
      );
    }, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearInterval(cleanupInterval);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999998]">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-60"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            transform: `scale(${1 - index * 0.1})`,
            opacity: 0.8 - index * 0.1,
            transition: 'all 0.3s ease-out',
            background: `linear-gradient(45deg, 
              hsl(${280 + index * 20}, 70%, 60%), 
              hsl(${260 + index * 15}, 80%, 70%))`
          }}
        />
      ))}
    </div>
  );
};

export default CursorTrail;
