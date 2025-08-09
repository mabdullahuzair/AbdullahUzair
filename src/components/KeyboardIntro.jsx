import { useState, useEffect } from 'react';
import { Sparkles, Star, Zap } from 'lucide-react';

const KeyboardIntro = ({ onEnter }) => {
  const [pressedKey, setPressedKey] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [magicKey, setMagicKey] = useState('');
  const [particles, setParticles] = useState([]);
  const [showMagicEffect, setShowMagicEffect] = useState(false);

  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  // Generate random magic key on component mount
  useEffect(() => {
    const allKeys = keyboardLayout.flat();
    const randomKey = allKeys[Math.floor(Math.random() * allKeys.length)];
    setMagicKey(randomKey);
  }, []);

  // Create particle effect
  const createParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 2,
      });
    }
    setParticles(newParticles);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isVisible) {
        const key = event.key.toUpperCase();
        handleKeyAction(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible, magicKey]);

  const handleKeyAction = (key) => {
    if (!isVisible) return;
    
    setPressedKey(key);
    
    if (key === magicKey) {
      // Magic key pressed!
      setShowMagicEffect(true);
      createParticles();
      
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onEnter();
        }, 800);
      }, 1500);
    } else {
      // Regular key pressed
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onEnter();
        }, 500);
      }, 200);
    }
  };

  const handleKeyClick = (key) => {
    handleKeyAction(key);
  };

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50 transition-opacity duration-500 opacity-0">
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50 transition-opacity duration-500 overflow-hidden">
      {/* Magic Particles */}
      {showMagicEffect && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            animationDelay: `${particle.delay}s`,
            animationDuration: '2s',
          }}
        >
          <Sparkles 
            size={particle.size} 
            className="text-yellow-400 animate-pulse" 
          />
        </div>
      ))}

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            <Star size={16} className="text-purple-400 opacity-30" />
          </div>
        ))}
      </div>

      <div className="text-center relative z-10">
        <div className={`transition-all duration-1000 ${showMagicEffect ? 'scale-110 rotate-2' : ''}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-pulse">
            ✨ Welcome to the Magic Portal ✨
          </h1>
          <p className="text-xl text-gray-300 mb-6 animate-bounce">
            Find and click the <span className="text-yellow-400 font-bold animate-pulse">MAGIC KEY</span> to continue
          </p>
          <p className="text-lg text-purple-300 mb-8">
            Hint: Look for the key that sparkles with magic! ⭐
          </p>
        </div>
        
        <div className="space-y-2 max-w-2xl mx-auto px-4">
          {keyboardLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((key) => {
                const isMagicKey = key === magicKey;
                return (
                  <button
                    key={key}
                    onClick={() => handleKeyClick(key)}
                    className={`
                      relative w-12 h-12 border border-gray-600 rounded-lg
                      text-white font-semibold transition-all duration-200
                      hover:scale-110 hover:shadow-lg active:scale-95
                      ${isMagicKey 
                        ? 'bg-gradient-to-br from-yellow-400 via-purple-500 to-pink-500 animate-pulse shadow-lg shadow-yellow-400/50 border-yellow-400' 
                        : 'bg-gray-800 hover:bg-gray-700'
                      }
                      ${pressedKey === key ? 'scale-95 shadow-lg' : ''}
                      ${isMagicKey && showMagicEffect ? 'animate-bounce scale-125' : ''}
                    `}
                  >
                    {isMagicKey && (
                      <div className="absolute -top-1 -right-1">
                        <Zap size={12} className="text-yellow-300 animate-pulse" />
                      </div>
                    )}
                    {key}
                    {isMagicKey && (
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-purple-500/20 rounded-lg animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          {showMagicEffect ? (
            <div className="text-center">
              <div className="text-2xl text-yellow-400 font-bold animate-bounce mb-4">
                🎉 MAGIC ACTIVATED! 🎉
              </div>
              <div className="inline-block w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="inline-block w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-400">
          <p>Or press any key on your keyboard to continue normally</p>
        </div>
      </div>

      <style jsx={true}>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default KeyboardIntro;
