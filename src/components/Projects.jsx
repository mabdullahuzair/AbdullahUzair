import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Eye, Star, Calendar, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
      }, 5000);
    } else {
      clearInterval(autoPlayRef.current);
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying]);

  const projects = [
    {
      title: 'MacroMate',
      description: 'AI-powered health and fitness web application designed as my Final Year Project. Features intelligent meal recommendations and comprehensive nutrition tracking.',
      image: '/api/placeholder/600/400',
      technologies: ['React.js', 'Node.js', 'MongoDB', 'AI/ML', 'Express.js'],
      features: [
        'AI-powered meal recommendations',
        'Real-time nutrition tracking',
        'Progress visualization',
        'Personalized fitness plans',
        'Social sharing capabilities'
      ],
      liveUrl: '#',
      githubUrl: '#',
      status: 'In Development',
      rating: 4.8,
      year: '2024',
      gradient: 'from-purple-500 via-pink-500 to-red-500'
    },
    {
      title: 'XRevStudio.com',
      description: 'Portfolio website for a creative studio with focus on cross-browser compatibility and mobile responsiveness.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'PHP'],
      features: [
        'Responsive design',
        'Cross-browser compatibility',
        'Interactive portfolio gallery',
        'Contact form integration',
        'SEO optimized'
      ],
      liveUrl: 'https://xrevstudio.com',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.6,
      year: '2024',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500'
    },
    {
      title: 'ObecheInterior.com',
      description: 'Visually appealing landing page for an interior design company with modern design aesthetics and smooth animations.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      features: [
        'Modern design aesthetics',
        'Smooth animations',
        'Gallery showcase',
        'Service descriptions',
        'Contact integration'
      ],
      liveUrl: 'https://obecheinterior.com',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.7,
      year: '2024',
      gradient: 'from-green-500 via-emerald-500 to-teal-500'
    },
    {
      title: 'LevelUpSol.com.pk',
      description: 'Company website for a software agency with UI/UX enhancements and page optimization for better performance.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Bootstrap'],
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
      gradient: 'from-orange-500 via-red-500 to-pink-500'
    },
    {
      title: 'CricketX.net',
      description: 'Cricket website with focus on layout design and responsiveness, providing cricket-related content and features.',
      image: '/api/placeholder/600/400',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'],
      features: [
        'Responsive layout design',
        'Cricket content management',
        'Interactive features',
        'Mobile optimization',
        'Fast loading'
      ],
      liveUrl: 'https://cricketx.net',
      githubUrl: '#',
      status: 'Completed',
      rating: 4.4,
      year: '2024',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500'
    }
  ];

  const nextProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProject((prev) => (prev + 1) % projects.length);
      setIsTransitioning(false);
    }, 150);
    setIsAutoPlaying(false);
  };

  const prevProject = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
      setIsTransitioning(false);
    }, 150);
    setIsAutoPlaying(false);
  };

  const goToProject = (index) => {
    if (index === currentProject || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentProject(index);
      setIsTransitioning(false);
    }, 150);
    setIsAutoPlaying(false);
  };

  return (
    <section ref={sectionRef} id="projects" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Innovative solutions crafted with modern technologies
          </p>
        </div>

        {/* Compact Carousel Container */}
        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 max-w-4xl mx-auto">
            
            {/* Carousel Content */}
            <div className="relative h-[400px] sm:h-[450px] md:h-[500px]">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                    index === currentProject 
                      ? 'opacity-100 translate-x-0' 
                      : index < currentProject 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Project Image/Preview */}
                    <div className="md:w-1/2 h-48 md:h-full relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <div className="w-16 h-16 mx-auto mb-3 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <Eye size={32} />
                          </div>
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          <p className="text-sm opacity-90">Interactive Preview</p>
                        </div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          project.status === 'Completed' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-yellow-500 text-black'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <Star size={12} className="text-yellow-400 fill-current" />
                        <span className="text-white text-xs font-semibold">{project.rating}</span>
                      </div>

                      {/* Year */}
                      <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                        <Calendar size={12} className="text-white" />
                        <span className="text-white text-xs font-semibold">{project.year}</span>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="md:w-1/2 p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        {/* Key Features */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <span className="w-3 h-3 bg-purple-500 rounded mr-2"></span>
                            Key Features
                          </h4>
                          <ul className="space-y-1">
                            {project.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 flex items-center">
                                <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <span className="w-3 h-3 bg-blue-500 rounded mr-2"></span>
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm py-2"
                          onClick={() => window.open(project.liveUrl, '_blank')}
                        >
                          <ExternalLink size={14} className="mr-1" />
                          Live Demo
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white text-sm py-2"
                          onClick={() => window.open(project.githubUrl, '_blank')}
                        >
                          <Github size={14} className="mr-1" />
                          View Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevProject}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 z-10"
            >
              <ChevronLeft size={16} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600" />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 z-10"
            >
              <ChevronRight size={16} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600" />
            </button>

            {/* Auto-play Control */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 z-10"
            >
              {isAutoPlaying ? (
                <Pause size={14} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600" />
              ) : (
                <Play size={14} className="text-gray-700 dark:text-gray-300 group-hover:text-purple-600" />
              )}
            </button>
          </div>

          {/* Project Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentProject
                    ? 'bg-purple-600 w-6'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-purple-400'
                }`}
              />
            ))}
          </div>

          {/* Auto-playing indicator */}
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

