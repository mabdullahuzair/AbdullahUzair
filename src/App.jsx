import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects3D from './components/Projects3D';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActionButton from './components/FloatingActionButton';
import StarfieldBackground from './components/StarfieldBackground';
import CursorTrail from './components/CursorTrail';
import './App.css';

function App() {
  const [showLoading, setShowLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Default to dark mode
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Optimized custom cursor effect
  useEffect(() => {
    // Enable on all devices but with different behavior
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Simple custom cursor - different sizes for different devices
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const cursorSize = window.innerWidth <= 768 ? 16 : 20;
    cursor.style.cssText = `
      position: fixed;
      width: ${cursorSize}px;
      height: ${cursorSize}px;
      background: rgba(147, 51, 234, ${isTouchDevice ? '0.6' : '0.8'});
      border: 2px solid rgba(147, 51, 234, 0.4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 999999;
      transition: transform 0.1s ease-out;
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
      display: block !important;
      visibility: visible !important;
    `;
    document.body.appendChild(cursor);

    // Set cursor to none on all elements with higher specificity
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
      *, *:before, *:after {
        cursor: none !important;
      }
      @media (max-width: 768px) {
        .custom-cursor {
          opacity: ${isTouchDevice ? '0.7' : '1'} !important;
        }
      }
    `;
    document.head.appendChild(cursorStyle);

    const updateCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    // Add both mouse and touch event listeners
    document.addEventListener('mousemove', updateCursor, { passive: true });

    // For touch devices, show cursor at touch points
    if (isTouchDevice) {
      document.addEventListener('touchstart', (e) => {
        if (e.touches[0]) {
          cursor.style.left = e.touches[0].clientX + 'px';
          cursor.style.top = e.touches[0].clientY + 'px';
          cursor.style.opacity = '0.8';
        }
      }, { passive: true });

      document.addEventListener('touchmove', (e) => {
        if (e.touches[0]) {
          cursor.style.left = e.touches[0].clientX + 'px';
          cursor.style.top = e.touches[0].clientY + 'px';
        }
      }, { passive: true });

      document.addEventListener('touchend', () => {
        cursor.style.opacity = '0.3';
      });
    }

    return () => {
      document.removeEventListener('mousemove', updateCursor);

      if (isTouchDevice) {
        document.removeEventListener('touchstart', updateCursor);
        document.removeEventListener('touchmove', updateCursor);
        document.removeEventListener('touchend', updateCursor);
      }

      // Remove the cursor style
      if (document.head.contains(cursorStyle)) {
        document.head.removeChild(cursorStyle);
      }

      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 transition-colors duration-300 relative">
      <StarfieldBackground />
      <CursorTrail />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects3D />
        <Education />
        <Contact />
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}

export default App;
