import { useState, useEffect } from 'react';
import { ArrowUp, Terminal, X } from 'lucide-react';
import TerminalBot from './TerminalBot.jsx';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsOpen(false);
  };

  const openTerminal = () => {
    setIsTerminalOpen(true);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {/* Sub-buttons (Terminal and Scroll Up) */}
        <div className={`flex flex-col space-y-3 mb-3 transition-all duration-300 transform ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}>
          {/* Terminal Button */}
          <button
            onClick={openTerminal}
            className="group relative w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
            title="Open Terminal"
          >
            <Terminal size={20} className="group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Open Terminal
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-transparent border-l-gray-900"></div>
            </div>
          </button>

          {/* Scroll to Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="group relative w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
              title="Scroll to Top"
            >
              <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                Scroll to Top
                <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-transparent border-l-gray-900"></div>
              </div>
            </button>
          )}
        </div>

        {/* Main Toggle Button */}
        <button
          onClick={toggleMenu}
          className={`group relative w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${
            isOpen ? 'rotate-45' : 'rotate-0'
          }`}
          title={isOpen ? 'Close Menu' : 'Quick Actions'}
        >
          {isOpen ? (
            <X size={24} className="transition-transform duration-300" />
          ) : (
            <div className="relative">
              {/* Plus icon made of two lines */}
              <div className="w-6 h-0.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-0.5 h-6 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          )}
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-active:opacity-30 transition-opacity duration-300"></div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-lg opacity-50 scale-110 group-hover:opacity-70 transition-opacity duration-300"></div>
        </button>

        {/* Background Overlay when open */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>

      {/* Terminal Bot */}
      <TerminalBot isOpen={isTerminalOpen} setIsOpen={setIsTerminalOpen} />
    </>
  );
};

export default FloatingActionButton;
