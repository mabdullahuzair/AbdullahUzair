import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
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

  // Enhanced cursor trail effect with better performance
  useEffect(() => {
    let lastTime = 0;
    const throttleDelay = 8; // ~120fps for ultra-smooth experience
    let trailPool = [];
    const maxTrails = 15;

    const createTrail = (e) => {
      const now = performance.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      // Reuse existing trail elements for better performance
      let trail = trailPool.pop();
      if (!trail) {
        trail = document.createElement('div');
        trail.className = 'cursor-trail';
      }

      trail.style.left = e.clientX + 'px';
      trail.style.top = e.clientY + 'px';
      trail.style.opacity = '1';
      trail.style.transform = 'translate(-50%, -50%) scale(1)';
      
      document.body.appendChild(trail);
      
      // Use requestAnimationFrame for smooth animation
      requestAnimationFrame(() => {
        trail.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        trail.style.opacity = '0';
        trail.style.transform = 'translate(-50%, -50%) scale(0.1)';
        
        setTimeout(() => {
          if (document.body.contains(trail)) {
            document.body.removeChild(trail);
            if (trailPool.length < maxTrails) {
              trailPool.push(trail);
            }
          }
        }, 600);
      });
    };

    // Add smooth cursor following effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
      position: fixed;
      width: 22px;
      height: 22px;
      background: radial-gradient(circle, rgba(147, 51, 234, 0.9) 0%, rgba(59, 130, 246, 0.7) 70%, transparent 100%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transition: transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      transform: translate(-50%, -50%);
      border: 1px solid rgba(147, 51, 234, 0.2);
    `;
    document.body.appendChild(cursor);

    const updateCursor = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', createTrail, { passive: true });
    document.addEventListener('mousemove', updateCursor, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', createTrail);
      document.removeEventListener('mousemove', updateCursor);
      document.body.style.cursor = 'auto';
      
      // Clean up cursor and trails
      if (document.body.contains(cursor)) {
        document.body.removeChild(cursor);
      }
      
      const trails = document.querySelectorAll('.cursor-trail');
      trails.forEach(trail => {
        if (document.body.contains(trail)) {
          document.body.removeChild(trail);
        }
      });
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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

