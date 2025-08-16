import { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import TerminalBot from './TerminalBot.jsx';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-32 lg:pt-20">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 sm:mb-8 leading-tight px-4 cursor-default transform transition-all duration-500"
              style={{
                fontFamily: "'Playfair Display', 'Crimson Text', 'Cormorant Garamond', serif",
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
          >
            <span className="inline-block transform transition-all duration-300 text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text"
                  style={{
                    textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                    WebkitTextStroke: '1px rgba(147, 51, 234, 0.3)',
                  }}>
              Muhammad Abdullah
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-200 mb-8 sm:mb-10 max-w-4xl mx-auto px-4 font-medium">
            <span className="block">Software Engineering Student</span>
            <span className="block mt-2 text-purple-700 dark:text-purple-300 font-bold">& Full-Stack Developer</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-10 sm:mb-14 px-4">
            <Button
              onClick={() => scrollToSection('#projects')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
            >
              View Projects
            </Button>
            <Button
              onClick={() => scrollToSection('#contact')}
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-bold rounded-2xl transform hover:scale-105 transition-all duration-300"
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
