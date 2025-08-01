import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home, User, Code, Briefcase, GraduationCap, FolderOpen, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo - Enhanced for all screen sizes */}
            <div 
              onClick={() => scrollToSection('#hero')}
              className="cursor-pointer group"
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                    AU
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-20 animate-pulse" />
                </div>
                <div className="hidden xs:block">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    Abdullah Uzair
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Software Engineer</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation - Enhanced for medium screens */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(`#${item.id}`)}
                    className={`group relative px-2 lg:px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-sm lg:text-base ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center space-x-1 lg:space-x-2">
                      <IconComponent size={14} className={`lg:hidden transform group-hover:scale-110 transition-transform duration-300 ${isActive ? 'text-white' : ''}`} />
                      <IconComponent size={16} className={`hidden lg:block transform group-hover:scale-110 transition-transform duration-300 ${isActive ? 'text-white' : ''}`} />
                      <span className="hidden lg:block">{item.label}</span>
                      <span className="lg:hidden text-xs">{item.label.slice(0, 4)}</span>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white rounded-full animate-pulse" />
                    )}
                    
                    {/* Hover effect */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tablet Navigation - For medium screens */}
            <div className="hidden sm:flex md:hidden items-center space-x-1">
              {navItems.slice(0, 4).map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(`#${item.id}`)}
                    className={`group relative p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <IconComponent size={18} className={`transform group-hover:scale-110 transition-transform duration-300 ${isActive ? 'text-white' : ''}`} />
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Dark mode toggle */}
              <Button
                onClick={toggleDarkMode}
                variant="ghost"
                size="sm"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
              >
                {darkMode ? (
                  <Sun size={16} className="sm:w-[18px] sm:h-[18px] text-yellow-500" />
                ) : (
                  <Moon size={16} className="sm:w-[18px] sm:h-[18px] text-purple-600" />
                )}
              </Button>

              {/* Mobile menu button */}
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                size="sm"
                className="md:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
              >
                {isOpen ? (
                  <X size={16} className="sm:w-[18px] sm:h-[18px] text-gray-700 dark:text-gray-300" />
                ) : (
                  <Menu size={16} className="sm:w-[18px] sm:h-[18px] text-gray-700 dark:text-gray-300" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced for all small screens */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'max-h-screen opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 max-h-[70vh] overflow-y-auto">
              {navItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(`#${item.id}`)}
                    className={`group w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <IconComponent size={18} className={`sm:w-5 sm:h-5 transform group-hover:scale-110 transition-transform duration-300 ${isActive ? 'text-white' : ''}`} />
                    <span>{item.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;

