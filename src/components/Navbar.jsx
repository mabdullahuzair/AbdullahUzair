import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home, User, Code, Briefcase, GraduationCap, FolderOpen, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  const navbarBgClass = scrolled
    ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50'
    : 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm';

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 w-full ${navbarBgClass}`}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo */}
            <div 
              onClick={() => scrollToSection('#hero')}
              className="cursor-pointer group flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg lg:text-xl transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                  AU
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  Abdullah Uzair
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
              </div>
            </div>

            {/* Desktop Navigation - FORCED VISIBILITY */}
            <div
              style={{
                display: isLargeScreen ? 'flex !important' : 'none !important',
                alignItems: 'center',
                gap: '0.25rem',
                visibility: isLargeScreen ? 'visible' : 'hidden'
              }}
              className={isLargeScreen ? 'flex' : 'hidden'}
            >
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(`#${item.id}`)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.75rem',
                      transition: 'all 0.3s ease',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                    className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = darkMode ? 'rgba(31, 41, 55, 1)' : 'rgba(243, 244, 246, 1)';
                      e.target.style.color = darkMode ? 'rgb(168, 85, 247)' : 'rgb(147, 51, 234)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = darkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)';
                    }}
                  >
                    <IconComponent size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              {/* Dark mode toggle */}
              <Button
                onClick={toggleDarkMode}
                variant="ghost"
                size="sm"
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              >
                {darkMode ? (
                  <Sun size={18} className="text-yellow-500" />
                ) : (
                  <Moon size={18} className="text-purple-600" />
                )}
              </Button>

              {/* Mobile menu button - FORCED HIDDEN ON LARGE SCREENS */}
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                size="sm"
                style={{ display: isLargeScreen ? 'none' : 'flex' }}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                {isOpen ? (
                  <X size={18} className="text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu size={18} className="text-gray-700 dark:text-gray-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - FORCED HIDDEN ON LARGE SCREENS */}
        <div 
          style={{ 
            display: isLargeScreen ? 'none' : 'block',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            maxHeight: isOpen ? '500px' : '0px',
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? 'visible' : 'hidden'
          }}
        >
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="px-4 py-6 space-y-2 max-h-[70vh] overflow-y-auto">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(`#${item.id}`)}
                    className="group w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <IconComponent size={20} className="group-hover:scale-110 transition-transform duration-300" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay - FORCED HIDDEN ON LARGE SCREENS */}
      {isOpen && !isLargeScreen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
