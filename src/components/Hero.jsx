import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowDown, Code, Database, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import TerminalBot from './TerminalBot.jsx';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Mouse tracking for interactive background elements
    const handleMouseMove = (e) => {
      const rect = document.getElementById('hero')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
        });
      }
    };

    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openTerminal = () => {
    setIsTerminalOpen(true);
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-slate-900 pt-20 md:pt-24">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `translate(${mousePosition.x * (10 + i * 2)}px, ${mousePosition.y * (10 + i * 2)}px)`,
              transition: 'transform 0.3s ease-out'
            }}
          />
        ))}
        
        {/* Large Floating Shapes */}
        <div 
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px) rotate(${mousePosition.x * 10}deg)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
        <div 
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-10 animate-bounce"
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px) rotate(${mousePosition.x * -15}deg)`,
            transition: 'transform 0.4s ease-out'
          }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-10 animate-pulse"
          style={{ 
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(${1 + mousePosition.x * 0.1})`,
            transition: 'transform 0.6s ease-out'
          }}
        />

        {/* Geometric Shapes */}
        <div 
          className="absolute top-1/4 left-1/3 w-16 h-16 border-4 border-purple-300 opacity-20 animate-spin"
          style={{
            animationDuration: '20s',
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px) rotate(${mousePosition.x * 45}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-blue-300 opacity-20 animate-bounce"
          style={{
            animationDelay: '0.5s',
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) rotate(${mousePosition.x * -30}deg)`,
            transition: 'transform 0.4s ease-out'
          }}
        />

        {/* Floating Rings */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`ring-${i}`}
            className="absolute border-2 border-purple-300 rounded-full opacity-10 animate-spin"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDuration: `${15 + i * 5}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              transform: `translate(${mousePosition.x * (5 + i * 3)}px, ${mousePosition.y * (5 + i * 3)}px) rotate(${mousePosition.x * (10 + i * 5)}deg)`,
              transition: 'transform 0.5s ease-out'
            }}
          />
        ))}

        {/* 3D Geometric Elements */}
        <div 
          className="absolute top-16 right-16 transform-3d"
          style={{
            transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px) rotateX(${mousePosition.y * 20}deg) rotateY(${mousePosition.x * 20}deg)`,
            transition: 'transform 0.4s ease-out'
          }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 opacity-20 transform rotate-45 animate-pulse" />
        </div>
        <div 
          className="absolute bottom-16 left-16 transform-3d"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px) rotateX(${mousePosition.y * -25}deg) rotateY(${mousePosition.x * -25}deg)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-500 opacity-20 rounded-lg animate-bounce" />
        </div>

        {/* Code-themed floating elements */}
        <div 
          className="absolute top-1/3 right-1/3 text-4xl opacity-10 animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px) rotate(${mousePosition.x * 5}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <Code className="text-purple-500" />
        </div>
        <div 
          className="absolute bottom-1/4 right-1/2 text-3xl opacity-10 animate-bounce"
          style={{
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * -18}px, ${mousePosition.y * -18}px) rotate(${mousePosition.x * -8}deg)`,
            transition: 'transform 0.4s ease-out'
          }}
        >
          <Database className="text-blue-500" />
        </div>
        <div 
          className="absolute top-2/3 left-1/2 text-3xl opacity-10 animate-pulse"
          style={{
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * 22}px, ${mousePosition.y * 22}px) rotate(${mousePosition.x * 12}deg)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          <Globe className="text-green-500" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-4 cursor-default transform transition-all duration-500" 
              style={{ 
                fontFamily: "'Playfair Display', 'Crimson Text', 'Cormorant Garamond', serif", 
                fontWeight: 700, 
                letterSpacing: '-0.01em',
                textShadow: '0 2px 4px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)',
                color: 'var(--hero-text-color)'
              }}
          >
            <span className="inline-block transform transition-all duration-300">
              Hi, I'm Muhammad Abdullah Uzair
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
            Software Engineering Student & Full-Stack Developer
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
            <Button 
              onClick={() => scrollToSection('#projects')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
            >
              View Projects
            </Button>
            <Button 
              onClick={() => scrollToSection('#contact')}
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-2xl transform hover:scale-105 transition-all duration-300"
            >
              Contact Me
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-8 sm:mb-12 px-4">
            <a 
              href="https://github.com/mabdullahuzair" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300"
            >
              <Github size={20} className="sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
            </a>
            <a 
              href="https://www.linkedin.com/in/abdullah-uzair-2a18b9278/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300"
            >
              <Linkedin size={20} className="sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors duration-300" />
            </a>
            <a 
              href="mailto:abdullahuzair860@gmail.com"
              className="group bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300"
            >
              <Mail size={20} className="sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300 group-hover:text-green-600 transition-colors duration-300" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ArrowDown size={32} className="text-gray-400 mx-auto" />
          </div>

          {/* Small Terminal Window in Hero */}
          <div className="mt-8 sm:mt-12 max-w-sm sm:max-w-md mx-auto px-4">
            <div 
              className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={openTerminal}
            >
              {/* Terminal Header */}
              <div className="bg-gray-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="flex space-x-1 sm:space-x-2">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="font-mono text-xs sm:text-sm text-gray-300">terminal</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openTerminal();
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm font-mono"
                >
                  Open Full Terminal
                </button>
              </div>
              
              {/* Terminal Content */}
              <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm">
                <div className="text-green-400 mb-1 sm:mb-2">$ whoami</div>
                <div className="text-gray-300 mb-2 sm:mb-3">muhammad-abdullah-uzair</div>
                <div className="text-green-400 mb-1 sm:mb-2">$ cat about.txt</div>
                <div className="text-gray-300 mb-2 sm:mb-3 text-xs sm:text-sm">Software Engineering Student<br/>Full-Stack Developer<br/>Passionate about creating innovative solutions</div>
                <div className="text-green-400 mb-1 sm:mb-2">$ ls skills/</div>
                <div className="text-blue-400 mb-2 sm:mb-3 text-xs sm:text-sm">react.js  node.js  python  mongodb  mysql</div>
                <div className="text-green-400 flex items-center">
                  $ <span className="ml-2 animate-pulse">|</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal Bot */}
      <TerminalBot isOpen={isTerminalOpen} setIsOpen={setIsTerminalOpen} />
    </section>
  );
};

export default Hero;

