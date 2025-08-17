import { useState, useEffect, useRef } from 'react';
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Power, 
  Terminal, 
  Code, 
  Database, 
  Globe, 
  Palette, 
  Layers, 
  Zap, 
  Wrench, 
  Brain, 
  Target,
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Keyboard,
  ChevronDown,
  ChevronRight,
  Star,
  Trophy,
  Award,
  TrendingUp,
  Grid3X3,
  List,
  X,
  Info,
  Sparkles
} from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [typedText, setTypedText] = useState('');
  const [isTypingMode, setIsTypingMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotationX, setRotationX] = useState(-5);
  const [rotationY, setRotationY] = useState(0);
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [menuViewMode, setMenuViewMode] = useState('grid');
  const [selectedMenuSkill, setSelectedMenuSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null);
  const [isDraggingKeyboard, setIsDraggingKeyboard] = useState(false);
  const [keyboardRotation, setKeyboardRotation] = useState({ x: -5, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastRotation, setLastRotation] = useState({ x: -5, y: 0 });
  const sectionRef = useRef(null);
  const keyboardRef = useRef(null);

  // Skills data organized by categories
  const skillsData = {
    frontend: {
      name: 'Frontend Development',
      color: '#3B82F6',
      icon: Palette,
      description: 'Creating beautiful and responsive user interfaces',
      skills: [
        { name: 'HTML5', level: 95, years: 1, projects: 5, icon: Code, color: '#E34F26', description: 'Semantic markup and modern web standards', key: 'H' },
        { name: 'CSS3', level: 92, years: 1, projects: 5, icon: Palette, color: '#1572B6', description: 'Advanced styling and responsive design', key: 'C' },
        { name: 'JavaScript', level: 85, years: 1, projects: 5, icon: Zap, color: '#F7DF1E', description: 'Modern ES6+ and DOM manipulation', key: 'J' },
        { name: 'React.js', level: 82, years: 1, projects: 5, icon: Layers, color: '#61DAFB', description: 'Component-based architecture', key: 'R' },
        { name: 'Tailwind CSS', level: 90, years: 1, projects: 5, icon: Wrench, color: '#06B6D4', description: 'Utility-first CSS framework', key: 'T' },
        { name: 'Bootstrap', level: 88, years: 1, projects: 5, icon: Grid3X3, color: '#7952B3', description: 'Responsive component library', key: 'B' }
      ]
    },
    backend: {
      name: 'Backend Development',
      color: '#10B981',
      icon: Database,
      description: 'Building robust server-side applications',
      skills: [
        { name: 'PHP', level: 80, years: 1, projects: 5, icon: Code, color: '#777BB4', description: 'Server-side scripting', key: 'P' },
        { name: 'Node.js', level: 75, years: 1, projects: 5, icon: Cpu, color: '#339933', description: 'JavaScript runtime environment', key: 'N' },
        { name: 'Express.js', level: 75, years: 1, projects: 5, icon: Globe, color: '#000000', description: 'Web framework for Node.js', key: 'E' }
      ]
    },
    database: {
      name: 'Database & Tools',
      color: '#8B5CF6',
      icon: HardDrive,
      description: 'Data management and development tools',
      skills: [
        { name: 'MySQL', level: 78, years: 1, projects: 5, icon: Database, color: '#4479A1', description: 'Relational database management', key: 'M' },
        { name: 'MongoDB', level: 70, years: 1, projects: 5, icon: Layers, color: '#47A248', description: 'NoSQL document database', key: 'O' },
        { name: 'Git & GitHub', level: 88, years: 1, projects: 5, icon: Code, color: '#F05032', description: 'Version control system', key: 'G' },
        { name: 'VS Code', level: 95, years: 1, projects: 5, icon: Monitor, color: '#007ACC', description: 'Advanced IDE usage', key: 'V' }
      ]
    },
    programming: {
      name: 'Programming Languages',
      color: '#F59E0B',
      icon: Brain,
      description: 'Core programming languages and paradigms',
      skills: [
        { name: 'Python', level: 75, years: 1, projects: 5, icon: Brain, color: '#3776AB', description: 'Versatile programming language', key: 'Y' },
        { name: 'Machine Learning', level: 65, years: 1, projects: 5, icon: Star, color: '#FF6B6B', description: 'AI and data science', key: 'L' }
      ]
    }
  };

  // Create a clean keyboard layout with skills mapped to easy-to-remember keys
  const keyboardLayout = [
    // Top row - Frontend skills
    [
      { key: 'H', skill: skillsData.frontend.skills.find(s => s.key === 'H'), label: 'HTML', category: 'frontend' },
      { key: 'C', skill: skillsData.frontend.skills.find(s => s.key === 'C'), label: 'CSS', category: 'frontend' },
      { key: 'J', skill: skillsData.frontend.skills.find(s => s.key === 'J'), label: 'JS', category: 'frontend' },
      { key: 'R', skill: skillsData.frontend.skills.find(s => s.key === 'R'), label: 'React', category: 'frontend' },
      { key: 'T', skill: skillsData.frontend.skills.find(s => s.key === 'T'), label: 'Tailwind', category: 'frontend' },
      { key: 'B', skill: skillsData.frontend.skills.find(s => s.key === 'B'), label: 'Bootstrap', category: 'frontend' }
    ],
    // Second row - Backend skills
    [
      { key: 'P', skill: skillsData.backend.skills.find(s => s.key === 'P'), label: 'PHP', category: 'backend' },
      { key: 'N', skill: skillsData.backend.skills.find(s => s.key === 'N'), label: 'Node', category: 'backend' },
      { key: 'E', skill: skillsData.backend.skills.find(s => s.key === 'E'), label: 'Express', category: 'backend' },
      { key: 'Space1', empty: true, label: '', category: 'spacer' },
      { key: 'Space2', empty: true, label: '', category: 'spacer' },
      { key: 'Space3', empty: true, label: '', category: 'spacer' }
    ],
    // Third row - Database & Tools
    [
      { key: 'M', skill: skillsData.database.skills.find(s => s.key === 'M'), label: 'MySQL', category: 'database' },
      { key: 'O', skill: skillsData.database.skills.find(s => s.key === 'O'), label: 'MongoDB', category: 'database' },
      { key: 'G', skill: skillsData.database.skills.find(s => s.key === 'G'), label: 'Git', category: 'database' },
      { key: 'V', skill: skillsData.database.skills.find(s => s.key === 'V'), label: 'VS Code', category: 'database' },
      { key: 'Space4', empty: true, label: '', category: 'spacer' },
      { key: 'Space5', empty: true, label: '', category: 'spacer' }
    ],
    // Fourth row - Programming
    [
      { key: 'Y', skill: skillsData.programming.skills.find(s => s.key === 'Y'), label: 'Python', category: 'programming' },
      { key: 'L', skill: skillsData.programming.skills.find(s => s.key === 'L'), label: 'ML', category: 'programming' },
      { key: 'Space6', empty: true, label: '', category: 'spacer' },
      { key: 'Space7', empty: true, label: '', category: 'spacer' },
      { key: 'Space8', empty: true, label: '', category: 'spacer' },
      { key: 'Space9', empty: true, label: '', category: 'spacer' }
    ]
  ];

  // Responsive design detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto rotation for 3D effect
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setRotationY(prev => (prev + 0.5) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Enhanced drag functionality for keyboard
  useEffect(() => {
    const handleStart = (e) => {
      if (keyboardRef.current?.contains(e.target)) {
        setIsDraggingKeyboard(true);
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        setDragStart({ x: clientX, y: clientY });
        setLastRotation(keyboardRotation);
        e.preventDefault();
      }
    };

    const handleMove = (e) => {
      if (isDraggingKeyboard) {
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        const deltaX = clientX - dragStart.x;
        const deltaY = clientY - dragStart.y;
        const sensitivity = isMobile ? 0.5 : 0.3;

        const newRotationY = lastRotation.y + (deltaX * sensitivity);
        const newRotationX = lastRotation.x + (deltaY * sensitivity * -1);

        setKeyboardRotation({
          x: Math.max(-45, Math.min(45, newRotationX)),
          y: newRotationY
        });
        e.preventDefault();
      }
    };

    const handleEnd = () => {
      setIsDraggingKeyboard(false);
    };

    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchstart', handleStart, { passive: false });
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousedown', handleStart);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchstart', handleStart);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDraggingKeyboard, dragStart, keyboardRotation, lastRotation, isMobile]);

  // Keyboard input handling
  useEffect(() => {
    if (!isTypingMode) return;

    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      setPressedKeys(prev => new Set(prev).add(key));

      // Find skill for this key
      const keyData = keyboardLayout.flat().find(k => k.key === key && k.skill);
      if (keyData && keyData.skill) {
        setSelectedSkill(keyData.skill);
        setTypedText(prev => prev + key);
        
        // Play sound effect
        if (soundEnabled) {
          try {
            const audio = new AudioContext();
            const oscillator = audio.createOscillator();
            const gainNode = audio.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audio.destination);
            
            oscillator.frequency.setValueAtTime(600 + Math.random() * 200, audio.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audio.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.2);
            
            oscillator.start(audio.currentTime);
            oscillator.stop(audio.currentTime + 0.2);
          } catch (error) {
            // Ignore audio errors in case of no user interaction
          }
        }
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toUpperCase();
      setPressedKeys(prev => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isTypingMode, soundEnabled, keyboardLayout]);

  const resetRotation = () => {
    setKeyboardRotation({ x: -5, y: 0 });
  };

  const getCategoryColor = (category) => {
    const colors = {
      frontend: '#3B82F6',
      backend: '#10B981', 
      database: '#8B5CF6',
      programming: '#F59E0B',
      spacer: 'transparent'
    };
    return colors[category] || '#6B7280';
  };

  const getKeyStyle = (keyData) => {
    if (keyData.empty) return 'w-16 sm:w-20 lg:w-24 h-12 sm:h-14 lg:h-16 invisible';
    
    const isPressed = pressedKeys.has(keyData.key);
    const isSelected = selectedSkill?.name === keyData.skill?.name;
    const categoryColor = getCategoryColor(keyData.category);
    
    return `
      w-16 sm:w-20 lg:w-24 h-12 sm:h-14 lg:h-16 rounded-xl font-bold text-xs sm:text-sm lg:text-base
      transition-all duration-200 transform cursor-pointer
      ${isPressed ? 'scale-95 shadow-inner' : 'shadow-lg hover:shadow-xl'} 
      ${isSelected ? 'ring-2 ring-blue-500 dark:ring-white ring-opacity-75 scale-105' : ''}
      bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 hover:scale-105
      border-gray-400 dark:border-gray-600 hover:border-opacity-75
    `;
  };

  const getKeyContent = (keyData) => {
    if (keyData.empty) return null;
    
    const skill = keyData.skill;
    if (!skill) return null;
    
    const IconComponent = skill.icon;
    
    return (
      <div className="flex flex-col items-center justify-center h-full p-1">
        <IconComponent 
          size={isMobile ? 16 : 20} 
          style={{ color: skill.color }} 
          className="mb-1" 
        />
        <span className="text-xs text-gray-600 dark:text-gray-300 text-center leading-tight">
          {keyData.label}
        </span>
        <div 
          className="absolute bottom-1 left-1 right-1 h-1 bg-gradient-to-r from-transparent via-current to-transparent rounded opacity-60"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${skill.color}, transparent)`,
            width: `${skill.level}%`
          }}
        />
      </div>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-10 sm:py-16 lg:py-20 relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <Terminal className="w-8 h-8 sm:w-12 sm:h-12 text-green-400 mr-2 sm:mr-4 animate-pulse" />
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold font-mono">
              <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Write Skills Here
              </span>
            </h2>
            <Keyboard className="w-8 h-8 sm:w-12 sm:h-12 text-blue-400 ml-2 sm:ml-4" />
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-mono px-4">
            Type any skill key to explore my technical expertise
          </p>
        </div>

        {/* Control Panel */}
        <div className={`flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Typing Mode Toggle */}
          <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-md rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-gray-600">
            <Keyboard className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            <button
              onClick={() => setIsTypingMode(!isTypingMode)}
              className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                isTypingMode ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {isTypingMode ? 'Typing ON' : 'Click Only'}
            </button>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-md rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-gray-600">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="flex items-center space-x-2"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />}
              <span className="text-gray-300 text-xs sm:text-sm">{soundEnabled ? 'Sound' : 'Muted'}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-md rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-gray-600">
            <button
              onClick={resetRotation}
              className="p-1 rounded hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-1"
            >
              <RotateCcw size={14} className="text-gray-300" />
              <span className="text-gray-300 text-xs hidden sm:inline">Reset</span>
            </button>
            <span className="text-gray-400 text-xs">
              {isMobile ? '👆 Drag to rotate' : '🖱️ Drag to rotate'}
            </span>
          </div>
        </div>

        {/* Typed Text Display */}
        {typedText && (
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-block bg-black/50 backdrop-blur-md rounded-lg px-4 sm:px-6 py-2 sm:py-3 border border-green-400/30">
              <div className="text-green-400 font-mono text-xs sm:text-sm mb-1">TYPED:</div>
              <div className="text-white font-mono text-sm sm:text-lg">
                {typedText}
                <span className="animate-pulse">|</span>
              </div>
              <button
                onClick={() => setTypedText('')}
                className="text-gray-400 hover:text-white text-xs mt-2"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* 3D Keyboard */}
        <div className={`flex justify-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div 
            ref={keyboardRef}
            className="relative"
            style={{ 
              perspective: isMobile ? '800px' : '1200px',
              transformStyle: 'preserve-3d'
            }}
          >
            <div
              className={`transform-3d transition-transform duration-300 ease-out ${isDraggingKeyboard ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{
                transform: `rotateX(${keyboardRotation.x}deg) rotateY(${keyboardRotation.y}deg)`,
                transformStyle: 'preserve-3d',
                touchAction: 'none'
              }}
            >
              <div className="relative bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-1 sm:p-2 md:p-4 lg:p-6 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
                {/* Keyboard Header */}
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-gray-500 dark:text-gray-400 font-mono text-xs">SKILLS KEYBOARD v3.0</div>
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400">Clean & User-Friendly Layout</div>
                </div>

                {/* Category Labels */}
                <div className="flex justify-between mb-2 sm:mb-4 px-2">
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-mono">Frontend</div>
                  <div className="text-xs text-green-600 dark:text-green-400 font-mono">Backend</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400 font-mono">Database</div>
                  <div className="text-xs text-orange-600 dark:text-orange-400 font-mono">Programming</div>
                </div>

                {/* Keyboard Layout */}
                <div className="space-y-0.5 sm:space-y-1 md:space-y-2 overflow-x-hidden">
                  {keyboardLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex justify-center space-x-0.5 sm:space-x-1 md:space-x-2 px-0.5 sm:px-1">
                      {row.map((keyData, keyIndex) => (
                        <button
                          key={`${rowIndex}-${keyIndex}`}
                          className={getKeyStyle(keyData)}
                          onClick={() => {
                            if (keyData.skill) {
                              setSelectedSkill(keyData.skill);
                              setTypedText(prev => prev + keyData.key);

                              // Play sound effect on click too
                              if (soundEnabled) {
                                try {
                                  const audio = new AudioContext();
                                  const oscillator = audio.createOscillator();
                                  const gainNode = audio.createGain();

                                  oscillator.connect(gainNode);
                                  gainNode.connect(audio.destination);

                                  oscillator.frequency.setValueAtTime(600 + Math.random() * 200, audio.currentTime);
                                  oscillator.type = 'sine';

                                  gainNode.gain.setValueAtTime(0.1, audio.currentTime);
                                  gainNode.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.2);

                                  oscillator.start(audio.currentTime);
                                  oscillator.stop(audio.currentTime + 0.2);
                                } catch (error) {
                                  // Ignore audio errors
                                }
                              }
                            }
                          }}
                          style={{
                            borderColor: keyData.skill ? keyData.skill.color : '#6B7280'
                          }}
                        >
                          {getKeyContent(keyData)}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Status LEDs */}
                <div className="flex justify-end space-x-2 mt-4">
                  <div className={`w-2 h-2 rounded-full ${isTypingMode ? 'bg-green-400' : 'bg-gray-400 dark:bg-gray-600'}`} />
                  <div className={`w-2 h-2 rounded-full ${soundEnabled ? 'bg-blue-400' : 'bg-gray-400 dark:bg-gray-600'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Skill Details */}
        {selectedSkill && (
          <div className={`mt-8 sm:mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-4xl mx-auto bg-gray-900/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-700/50 shadow-2xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                  <div 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4 shadow-lg"
                    style={{ backgroundColor: `${selectedSkill.color}20` }}
                  >
                    <selectedSkill.icon size={isMobile ? 24 : 32} style={{ color: selectedSkill.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{selectedSkill.name}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">{selectedSkill.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-200 self-end sm:self-start"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                <div className="bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-yellow-400" />
                  <div className="text-lg sm:text-2xl font-bold text-white mb-1">{selectedSkill.level}%</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Proficiency</div>
                </div>
                
                <div className="bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-blue-400" />
                  <div className="text-lg sm:text-2xl font-bold text-white mb-1">{selectedSkill.years}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Year{selectedSkill.years !== 1 ? 's' : ''}</div>
                </div>
                
                <div className="bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-green-400" />
                  <div className="text-lg sm:text-2xl font-bold text-white mb-1">{selectedSkill.projects}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Projects</div>
                </div>
                
                <div className="bg-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center col-span-1 sm:col-span-3 lg:col-span-1">
                  <Keyboard className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-purple-400" />
                  <div className="text-lg sm:text-2xl font-bold text-white mb-1">{selectedSkill.key}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Key</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Categories Section */}
        <div className={`mt-16 sm:mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                Skills Categories
              </span>
            </h3>
            <p className="text-gray-400 text-sm sm:text-lg">Explore my expertise organized by technology categories</p>
          </div>

          {/* Skills Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto px-4">
            {Object.entries(skillsData).map(([categoryKey, category]) => {
              const isFlipped = flippedCard === categoryKey;
              const IconComponent = category.icon;
              const avgLevel = Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length);

              return (
                <div
                  key={categoryKey}
                  className="relative h-64 sm:h-56 md:h-60 lg:h-64 cursor-pointer group"
                  style={{ perspective: '1000px' }}
                  onClick={() => setFlippedCard(isFlipped ? null : categoryKey)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front Side - Category Overview */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-5 md:p-6 flex flex-col hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl overflow-hidden">
                      <div className="flex items-start space-x-3 mb-4 flex-shrink-0">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          <IconComponent size={isMobile ? 18 : 22} style={{ color: category.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 dark:text-white font-bold text-sm sm:text-base md:text-lg leading-tight break-words">{category.name}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-gray-500 dark:text-gray-400 text-xs">Level:</span>
                            <span className="font-bold text-sm" style={{ color: category.color }}>{avgLevel}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-h-0">
                        <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed break-words mb-4">{category.description}</p>

                        <div className="space-y-3">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="h-full rounded-full transition-all duration-1000 group-hover:animate-pulse"
                              style={{
                                width: `${avgLevel}%`,
                                backgroundColor: category.color
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400 text-xs">{category.skills.length} Skills</span>
                            <div
                              className="px-3 py-1 rounded-full text-xs font-semibold"
                              style={{
                                backgroundColor: `${category.color}20`,
                                color: category.color
                              }}
                            >
                              Click to explore
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back Side - Skills List */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 flex flex-col bg-white dark:bg-gray-800 overflow-hidden" style={{ background: `linear-gradient(135deg, ${category.color}10, ${category.color}05)` }}>
                      <div className="flex items-center mb-3 flex-shrink-0">
                        <div
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center mr-2 sm:mr-3"
                          style={{ backgroundColor: `${category.color}30` }}
                        >
                          <IconComponent size={isMobile ? 14 : 18} style={{ color: category.color }} />
                        </div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-sm sm:text-base leading-tight break-words">{category.name}</h4>
                      </div>

                      <div className="space-y-2 flex-1 overflow-y-auto min-h-0">
                        {category.skills.map((skill, index) => {
                          const SkillIcon = skill.icon;
                          return (
                            <div
                              key={index}
                              className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-2 sm:p-3 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSkill(skill);
                              }}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center min-w-0 flex-1">
                                  <SkillIcon size={isMobile ? 12 : 14} style={{ color: skill.color }} className="mr-1.5 flex-shrink-0" />
                                  <span className="text-gray-900 dark:text-white text-xs sm:text-sm font-semibold truncate">{skill.name}</span>
                                </div>
                                <span className="text-xs flex-shrink-0 ml-2" style={{ color: skill.color }}>{skill.level}%</span>
                              </div>
                              <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-1">
                                <div
                                  className="h-full rounded-full transition-all duration-500"
                                  style={{
                                    width: `${skill.level}%`,
                                    backgroundColor: skill.color
                                  }}
                                />
                              </div>
                              <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
                                <span>{skill.years}y</span>
                                <span>{skill.projects}p</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Selected Menu Skill Modal */}
        {selectedMenuSkill && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 max-w-2xl w-full border border-gray-200 dark:border-gray-700 shadow-2xl">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="flex items-center">
                  <div 
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 sm:mr-4"
                    style={{ backgroundColor: `${selectedMenuSkill.color}20` }}
                  >
                    <selectedMenuSkill.icon size={isMobile ? 24 : 32} style={{ color: selectedMenuSkill.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">{selectedMenuSkill.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{selectedMenuSkill.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMenuSkill(null)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-xl sm:text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                  <Trophy className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-yellow-500" />
                  <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">{selectedMenuSkill.level}%</div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Proficiency</div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                  <Award className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-blue-500" />
                  <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">{selectedMenuSkill.years}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Year{selectedMenuSkill.years !== 1 ? 's' : ''}</div>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center">
                  <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-green-500" />
                  <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">{selectedMenuSkill.projects}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Projects</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* CSS for 3D effects */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-3d {
          transform-style: preserve-3d;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        kbd {
          font-family: monospace;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
      `}</style>
    </section>
  );
};

export default Skills;
