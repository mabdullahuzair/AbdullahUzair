import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Home, User, Code, Briefcase, GraduationCap, FolderOpen, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
      <style jsx>{`
        .navbar-desktop-menu {
          display: none !important;
        }
        
        @media (min-width: 1024px) {
          .navbar-desktop-menu {
            display: flex !important;
            align-items: center;
            gap: 0.25rem;
          }
          .navbar-mobile-toggle {
            display: none !important;
          }
          .navbar-mobile-menu {
            display: none !important;
          }
        }
        
        .navbar-mobile-toggle {
          display: flex !important;
        }
        
        @media (max-width: 1023px) {
          .navbar-desktop-menu {
            display: none !important;
          }
        }
      `}</style>
      
      <nav className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 w-full ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50'
          : 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm'
      }`}>
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

            {/* Desktop Navigation */}
            <div className="navbar-desktop-menu">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(`#${item.id}`)}
                    className="group flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium"
                  >
                    <IconComponent size={18} className="group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm">{item.label}</span>
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

              {/* Mobile menu button */}
              <Button
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                size="sm"
                className="navbar-mobile-toggle w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
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

        {/* Mobile Navigation */}
        <div className={`navbar-mobile-menu transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? 'max-h-screen opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}>
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

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
