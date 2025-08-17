import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Eye, Star, Calendar, Play, Pause, Code, Sparkles, Zap, Box } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Projects3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastRotation, setLastRotation] = useState(0);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const projects = [
    {
      title: 'MacroMate',
      description: 'AI-powered health and fitness web application designed as my Final Year Project. Features intelligent meal recommendations and comprehensive nutrition tracking with machine learning algorithms.',
      image: '/api/placeholder/600/400',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'AI/ML', 'Express.js', 'Python'],
      features: [
        'AI-powered meal recommendations',
        'Real-time nutrition tracking',
        'Progress visualization',
        'Personalized fitness plans',
        'Machine learning algorithms'
      ],
      liveUrl: '#',
      githubUrl: '#',
      status: 'In Development',
      rating: 4.8,
      year: '2025',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      category: 'Full Stack AI'
    },
    {
      title: 'XRevStudio.com',
      description: 'Portfolio website for a creative studio built during internship at Levelup Solutions. Focused on cross-browser compatibility and mobile responsiveness with modern UI/UX.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'PHP', 'SEO'],
      features: [
        'Responsive design',
        'Cross-browser compatibility',
        'Interactive portfolio gallery',
        'Contact form integration',
        'SEO optimized structure'
      ],
      liveUrl: 'https://xrevstudio.com',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.6,
      year: '2024',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      category: 'Professional Web'
    },
    {
      title: 'ObecheInterior.com',
      description: 'Visually appealing landing page for an interior design company. Designed and developed during internship with focus on modern aesthetics and user experience.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'],
      features: [
        'Modern design aesthetics',
        'Smooth animations',
        'Gallery showcase',
        'Service descriptions',
        'Mobile optimization'
      ],
      liveUrl: 'https://obecheinterior.com',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.7,
      year: '2024',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      category: 'Landing Page'
    },
    {
      title: 'LevelUpSol.com.pk',
      description: 'Company website for a software agency. Contributed to UI/UX enhancements and page optimization for better performance and user engagement.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap', 'SEO'],
      features: [
        'UI/UX enhancements',
        'Page optimization',
        'Service portfolio',
        'Team showcase',
        'Performance optimized'
      ],
      liveUrl: 'https://levelupsol.com.pk',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.5,
      year: '2024',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      category: 'Corporate Web'
    },
    {
      title: 'CricketX.net',
      description: 'Cricket website developed during internship at Levelup Solutions. Focused on layout design, responsiveness, and sports content management.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'],
      features: [
        'Responsive layout design',
        'Cricket content management',
        'Interactive features',
        'Mobile optimization',
        'Fast loading performance'
      ],
      liveUrl: 'https://cricketx.net',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.4,
      year: '2024',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      category: 'Sports Web'
    },
    {
      title: 'Talha Portfolio',
      description: 'Modern and elegant portfolio website showcasing creative design and development skills. Built with attention to detail and user experience.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Animation'],
      features: [
        'Creative design aesthetics',
        'Smooth scroll animations',
        'Interactive elements',
        'Mobile responsive',
        'Fast loading'
      ],
      liveUrl: 'https://talhakhalil.netlify.app/',
      githubUrl: 'https://github.com/NobodyNoseMeme/Talha-Portfolio',
      status: 'Completed',
      rating: 4.6,
      year: '2024',
      gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
      category: 'Portfolio'
    },
    {
      title: 'Abdullah Portfolio',
      description: 'Personal portfolio website showcasing projects and skills with modern design patterns. Features clean UI/UX and optimized performance.',
      image: '/api/placeholder/600/400',
      technologies: ['React.js', 'CSS3', 'JavaScript', 'Responsive Design', 'Vercel'],
      features: [
        'Modern UI/UX design',
        'Project showcase',
        'Skills visualization',
        'Contact integration',
        'SEO optimized'
      ],
      liveUrl: 'https://abdullahcodes.vercel.app/',
      githubUrl: 'https://github.com/mabdullahuzair/AbdullahUzair',
      status: 'Completed',
      rating: 4.8,
      year: '2024',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      category: 'Portfolio'
    },
    {
      title: 'SignalForge',
      description: 'Automate SEO Signal Building with AI. Stop wasting time on manual submissions. SignalForge finds top directories, creates accounts, and submits listings for you.',
      image: '/api/placeholder/600/400',
      technologies: ['React.js', 'Node.js', 'AI/ML', 'Automation', 'SEO', 'API Integration'],
      features: [
        'AI-powered directory discovery',
        'Automated account creation',
        'Smart listing submissions',
        'SEO signal optimization',
        'Free tier available'
      ],
      liveUrl: 'https://signalforge.floot.app/',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.7,
      year: '2024',
      gradient: 'from-green-500 via-blue-500 to-purple-500',
      category: 'AI Automation'
    }
  ];

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

  // Optimized mouse tracking for 3D perspective effects
  useEffect(() => {
    let animationFrame;
    const handleMouseMove = (e) => {
      if (animationFrame || isDragging) return;
      animationFrame = requestAnimationFrame(() => {
        if (carouselRef.current && !isDragging) {
          const rect = carouselRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const mouseX = ((e.clientX - centerX) / rect.width) * 20; // Further reduced range
          const mouseY = ((e.clientY - centerY) / rect.height) * 10; // Further reduced range
          setMousePosition({ x: mouseX, y: mouseY });
        }
        animationFrame = null;
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isDragging]);

  // Enhanced drag and touch functionality
  useEffect(() => {
    const handleStart = (e) => {
      if (carouselRef.current?.contains(e.target)) {
        setIsDragging(true);
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        setDragStart({ x: clientX, y: clientY });
        setLastRotation(rotation);
        setIsAutoPlaying(false);
        e.preventDefault();
      }
    };

    const handleMove = (e) => {
      if (isDragging) {
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const deltaX = clientX - dragStart.x;
        const sensitivity = window.innerWidth <= 768 ? 0.8 : 0.5; // Higher sensitivity on mobile
        const newRotation = lastRotation + (deltaX * sensitivity);
        setRotation(newRotation);
        e.preventDefault();
      }
    };

    const handleEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        // Snap to nearest project (45 degrees per project for 8 projects)
        const snapAngle = Math.round((rotation || 0) / 45) * 45;
        const targetProject = Math.abs(Math.round((rotation || 0) / 45)) % projects.length;
        setRotation(snapAngle);
        setCurrentProject(targetProject);
      }
    };

    // Mouse events
    document.addEventListener('mousedown', handleStart);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);

    // Touch events for mobile
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
  }, [isDragging, dragStart, rotation, lastRotation, projects.length]);

  const nextProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = (currentProject + 1) % projects.length;
    setCurrentProject(newIndex);
    setRotation(prev => (prev || 0) - 45); // 360 / 8 projects = 45 degrees per project
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const newIndex = (currentProject - 1 + projects.length) % projects.length;
    setCurrentProject(newIndex);
    setRotation(prev => (prev || 0) + 45);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToProject = (index) => {
    if (index === currentProject || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentProject(index);
    const direction = index > currentProject ? -1 : 1;
    const steps = Math.abs(index - currentProject);
    setRotation(prev => prev + (direction * steps * 45));
    setIsAutoPlaying(false);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Auto-play functionality - slower on mobile for better performance
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = window.innerWidth <= 768 ? 6000 : 4000; // Slower on mobile
      autoPlayRef.current = setInterval(() => {
        nextProject();
      }, interval);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying]);

  return (
    <section ref={sectionRef} id="projects" className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden min-h-screen">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated geometric shapes */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full animate-pulse blur-xl"/>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full animate-pulse blur-xl" style={{animationDelay: '1s'}}/>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-pulse blur-xl" style={{animationDelay: '2s'}}/>
        
        {/* Floating particles - Reduced count on mobile */}
        {[...Array(window.innerWidth > 768 ? 15 : 5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${(Math.random() * 100).toFixed(1)}%`,
              top: `${(Math.random() * 100).toFixed(1)}%`,
              animationDelay: `${(Math.random() * 3).toFixed(2)}s`,
              animationDuration: `${(2 + Math.random() * 3).toFixed(2)}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center mb-6">
            <Box className="w-8 h-8 text-purple-600 mr-3 animate-spin"/>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Project Showcase
            </h2>
            <Box className="w-8 h-8 text-blue-600 ml-3 animate-spin" style={{animationDelay: '0.5s'}}/>
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-100 max-w-3xl mx-auto">
            Innovative solutions crafted with cutting-edge technologies and creative design
          </p>
        </div>

        {/* 3D Cube Carousel Container */}
        <div 
          ref={carouselRef}
          className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Main 3D Carousel - Optimized for mobile */}
          <div className="relative w-full h-[300px] md:h-[500px] mx-auto flex items-center justify-center perspective-1000 touch-pan-x">
            <div
              className={`relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 transition-transform duration-300 md:duration-700 ease-out ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
              style={{
                transformStyle: 'preserve-3d',
                transform: window.innerWidth > 768 ?
                  `rotateY(${rotation || 0}deg) rotateX(${(mousePosition.y || 0) * 0.3}deg) rotateZ(${(mousePosition.x || 0) * 0.1}deg)` :
                  `rotateY(${rotation || 0}deg)`,
                touchAction: 'pan-x'
              }}
            >
              {projects.map((project, index) => {
                const angle = (index * 45) * (Math.PI / 180); // 45 degrees between cards for 8 projects
                const radius = window.innerWidth > 768 ? 280 : window.innerWidth > 640 ? 180 : 160; // Reduced radius for smaller cards
                const x = isNaN(Math.sin(angle)) ? 0 : Math.sin(angle) * radius;
                const z = isNaN(Math.cos(angle)) ? 0 : Math.cos(angle) * radius;
                const isActive = index === currentProject;

                return (
                  <div
                    key={index}
                    className={`absolute w-32 h-40 sm:w-36 sm:h-44 md:w-44 md:h-56 transition-all duration-300 md:duration-700 cursor-pointer group ${isActive ? 'z-30' : 'z-10'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
                    style={{
                      transform: `translateX(${(x || 0).toFixed(2)}px) translateZ(${(z || 0).toFixed(2)}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => goToProject(index)}
                  >
                    {/* Project Card with proper face orientation */}
                    <div 
                      className={`w-full h-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-2 transition-all duration-500 ${
                        isActive ? 'border-purple-500 scale-110' : 'border-gray-200 dark:border-gray-700 scale-95'
                      } ${hoveredCard === index ? 'scale-105' : ''}`}
                      style={{
                        boxShadow: isActive
                          ? '0 25px 50px rgba(147, 51, 234, 0.3), 0 0 0 1px rgba(147, 51, 234, 0.1)'
                          : '0 15px 30px rgba(0,0,0,0.2)',
                        transform: `rotateY(${((angle * (180 / Math.PI)) || 0).toFixed(2)}deg)` // Always face forward
                      }}
                    >
                      {/* Project Image/Preview */}
                      <div className="relative h-40 overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`} />
                        
                        {/* Content overlay */}
                        <div className="absolute inset-0 flex items-center justify-center text-white p-2 sm:p-3 md:p-4">
                          <div className="text-center">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-1 sm:mb-2 md:mb-3 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                              <Eye size={16} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-xs sm:text-sm md:text-lg font-bold mb-0.5 sm:mb-1 line-clamp-2">{project.title}</h3>
                            <p className="text-xs sm:text-sm opacity-90 line-clamp-1">{project.category}</p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute top-1 sm:top-2 md:top-3 left-1 sm:left-2 md:left-3">
                          <span className={`px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${
                            project.status === 'Completed'
                              ? 'bg-green-500/80 text-white'
                              : 'bg-yellow-500/80 text-black'
                          }`}>
                            {project.status}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="absolute top-1 sm:top-2 md:top-3 right-1 sm:right-2 md:right-3 flex items-center space-x-0.5 sm:space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-1 sm:px-2 md:px-3 py-0.5 sm:py-1">
                          <Star size={10} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-xs font-semibold">{project.rating}</span>
                        </div>

                        {/* Year */}
                        <div className="absolute bottom-1 sm:bottom-2 md:bottom-3 left-1 sm:left-2 md:left-3 flex items-center space-x-0.5 sm:space-x-1 bg-black/30 backdrop-blur-sm rounded-full px-1 sm:px-2 md:px-3 py-0.5 sm:py-1">
                          <Calendar size={10} className="sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" />
                          <span className="text-white text-xs font-semibold">{project.year}</span>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                          {project.title}
                        </h3>
                        
                        <p className="text-sm text-gray-700 dark:text-gray-100 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Key Features */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <Sparkles className="w-4 h-4 mr-2 text-purple-500"/>
                            Key Features
                          </h4>
                          <ul className="space-y-1">
                            {project.features.slice(0, 2).map((feature, idx) => (
                              <li key={idx} className="text-xs text-gray-700 dark:text-gray-200 flex items-center">
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <Code className="w-4 h-4 mr-2 text-blue-500"/>
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                                +{project.technologies.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Glow effect for active card */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-50 blur-xl transform scale-110 pointer-events-none"/>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-8">
            <button
              onClick={prevProject}
              disabled={isTransitioning}
              className="w-14 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-purple-200 dark:border-purple-700 disabled:opacity-50"
            >
              <ChevronLeft size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 right-8">
            <button
              onClick={nextProject}
              disabled={isTransitioning}
              className="w-14 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-purple-200 dark:border-purple-700 disabled:opacity-50"
            >
              <ChevronRight size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
            </button>
          </div>

          {/* Auto-play Control */}
          <div className="absolute bottom-8 right-8">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group hover:scale-110 border border-purple-200 dark:border-purple-700"
            >
              {isAutoPlaying ? (
                <Pause size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
              ) : (
                <Play size={20} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600 transition-colors duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Project Indicators */}
        <div className="flex justify-center mt-12 space-x-3">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`relative transition-all duration-300 ${
                index === currentProject
                  ? 'w-12 h-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full'
                  : 'w-3 h-3 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400 rounded-full hover:scale-125'
              }`}
            >
              {index === currentProject && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse"/>
              )}
            </button>
          ))}
        </div>

        {/* Current Project Details Panel */}
        <div className={`mt-8 sm:mt-12 transition-all duration-700 px-4 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-start">
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white break-words">
                    {projects[currentProject].title}
                  </h3>
                  <span className="px-2 sm:px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs sm:text-sm font-medium w-fit">
                    {projects[currentProject].category}
                  </span>
                </div>
                
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-4 sm:mb-6 leading-relaxed break-words">
                  {projects[currentProject].description}
                </p>

                <div className="mb-4 sm:mb-6">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 flex items-center">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-500 flex-shrink-0"/>
                    <span className="break-words">All Features</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-1 sm:gap-2">
                    {projects[currentProject].features.map((feature, idx) => (
                      <div key={idx} className="flex items-start text-xs sm:text-sm text-gray-700 dark:text-gray-200 break-words">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></span>
                        <span className="break-words">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {projects[currentProject].technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs sm:text-sm font-medium break-words"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
                  onClick={() => window.open(projects[currentProject].liveUrl, '_blank')}
                >
                  <ExternalLink size={20} className="mr-2" />
                  View Live Project
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.open(projects[currentProject].githubUrl, '_blank')}
                >
                  <Github size={20} className="mr-2" />
                  View Source Code
                </Button>

                <div className="grid grid-cols-3 gap-2 md:gap-4 pt-3 md:pt-4">
                  <div className="text-center p-2 md:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg md:rounded-xl">
                    <div className="text-lg md:text-2xl font-bold text-purple-600">{projects[currentProject].rating}</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                  <div className="text-center p-2 md:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg md:rounded-xl">
                    <div className="text-lg md:text-2xl font-bold text-blue-600">{projects[currentProject].year}</div>
                    <div className="text-xs text-gray-500">Year</div>
                  </div>
                  <div className="text-center p-2 md:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg md:rounded-xl">
                    <div className="text-lg md:text-2xl font-bold text-green-600">{projects[currentProject].status === 'Completed' ? '✓' : '⚡'}</div>
                    <div className="text-xs text-gray-500">{projects[currentProject].status}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Custom CSS for 3D perspective */}
      <style jsx={true}>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Projects3D;
