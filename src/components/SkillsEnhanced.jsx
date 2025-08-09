import { useState, useEffect, useRef } from 'react';
import { Code, Database, Globe, Smartphone, Server, Palette, Brain, Zap, Sparkles, Orbit } from 'lucide-react';

const SkillsEnhanced = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(false);
  const [skillOrbs, setSkillOrbs] = useState([]);
  const [particleSystem, setParticleSystem] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          generateSkillOrbs();
          initParticleSystem();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate floating skill orbs
  const generateSkillOrbs = () => {
    const orbs = [];
    const skillNames = ['HTML', 'CSS', 'JS', 'React', 'Node', 'MongoDB', 'Python', 'PHP', 'Git', 'API'];
    
    for (let i = 0; i < 10; i++) {
      orbs.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        skill: skillNames[i],
        size: 30 + Math.random() * 20,
        speed: 0.5 + Math.random() * 1,
        direction: Math.random() * 360,
        opacity: 0.6 + Math.random() * 0.4,
        color: [
          'from-purple-400 to-pink-400',
          'from-blue-400 to-cyan-400',
          'from-green-400 to-emerald-400',
          'from-yellow-400 to-orange-400',
          'from-red-400 to-pink-400'
        ][Math.floor(Math.random() * 5)]
      });
    }
    setSkillOrbs(orbs);
  };

  // Initialize particle system
  const initParticleSystem = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        speed: 0.1 + Math.random() * 0.5,
        direction: Math.random() * 360,
        opacity: 0.3 + Math.random() * 0.7,
        color: ['purple', 'blue', 'cyan', 'pink', 'indigo'][Math.floor(Math.random() * 5)]
      });
    }
    setParticleSystem(particles);
  };

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (hoveredSkill) {
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      document.body.style.cursor = "auto";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    };
  }, [hoveredSkill]);

  const skillCategories = {
    frontend: {
      title: 'Frontend Development',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'HTML5', level: 95, experience: '1 year', projects: 5, description: 'Semantic HTML and modern web standards with accessibility features' },
        { name: 'CSS3', level: 92, experience: '1 year', projects: 5, description: 'Advanced CSS with animations, flexbox, grid, and responsive design' },
        { name: 'Bootstrap', level: 88, experience: '1 year', projects: 5, description: 'Responsive framework for rapid UI development' },
        { name: 'Tailwind CSS', level: 90, experience: '1 year', projects: 5, description: 'Utility-first CSS framework for modern web design' },
        { name: 'JavaScript', level: 85, experience: '1 year', projects: 5, description: 'ES6+, DOM manipulation, and modern JavaScript patterns' },
        { name: 'Responsive Web Design', level: 93, experience: '1 year', projects: 5, description: 'Mobile-first design approach with cross-device compatibility' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'PHP', level: 80, experience: '1 year', projects: 5, description: 'Server-side scripting and web application development' },
        { name: 'Node.js', level: 75, experience: '1 year', projects: 5, description: 'JavaScript runtime for server-side development' },
        { name: 'Express.js', level: 75, experience: '1 year', projects: 5, description: 'Web application framework for Node.js' },
        { name: 'MongoDB', level: 70, experience: '1 year', projects: 5, description: 'NoSQL database for modern web applications' },
        { name: 'MySQL', level: 78, experience: '1 year', projects: 5, description: 'Relational database management and optimization' },
        { name: 'RESTful APIs', level: 72, experience: '1 year', projects: 5, description: 'API design and development for web services' }
      ]
    },
    programming: {
      title: 'Programming Languages',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'C', level: 85, experience: '1 year', projects: 5, description: 'System programming and algorithm implementation' },
        { name: 'C++', level: 82, experience: '1 year', projects: 5, description: 'Object-oriented programming and data structures' },
        { name: 'JavaScript', level: 85, experience: '1 year', projects: 5, description: 'Full-stack JavaScript development' },
        { name: 'Python', level: 75, experience: '1 year', projects: 5, description: 'Machine learning and web development with Python' },
        { name: 'Machine Learning', level: 65, experience: '1 year', projects: 5, description: 'Basic ML algorithms and data analysis with Python' },
        { name: 'MERN Stack', level: 70, experience: '1 year', projects: 5, description: 'MongoDB, Express.js, React.js, Node.js development' }
      ]
    },
    tools: {
      title: 'Tools & Technologies',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Git & GitHub', level: 88, experience: '1 year', projects: 5, description: 'Version control and collaborative development' },
        { name: 'VS Code', level: 95, experience: '1 year', projects: 5, description: 'Primary development environment and extensions' },
        { name: 'Postman', level: 80, experience: '1 year', projects: 5, description: 'API testing and development tools' },
        { name: 'SEO & Optimization', level: 75, experience: '1 year', projects: 5, description: 'Search engine optimization and web performance' },
        { name: 'Agile Methodology', level: 70, experience: '1 year', projects: 5, description: 'Project management and team collaboration' },
        { name: 'Debugging & Testing', level: 82, experience: '1 year', projects: 5, description: 'Code debugging and quality assurance practices' }
      ]
    }
  };

  const handleSkillHover = (skill, event) => {
    setHoveredSkill(skill);
    setShowDetails(true);
  };

  const handleSkillLeave = () => {
    setHoveredSkill(null);
    setShowDetails(false);
  };

  const getSkillIcon = (skillName) => {
    const iconMap = {
      'HTML5': '🌐',
      'CSS3': '🎨',
      'Bootstrap': '🅱️',
      'Tailwind CSS': '💨',
      'JavaScript': '🟨',
      'Responsive Web Design': '📱',
      'PHP': '🐘',
      'Node.js': '🟢',
      'Express.js': '⚡',
      'MongoDB': '🍃',
      'MySQL': '🐬',
      'RESTful APIs': '🔗',
      'C': '⚙️',
      'C++': '🔧',
      'Python': '🐍',
      'Machine Learning': '🤖',
      'MERN Stack': '📚',
      'Git & GitHub': '🔧',
      'VS Code': '💻',
      'Postman': '📮',
      'SEO & Optimization': '🔍',
      'Agile Methodology': '🏃',
      'Debugging & Testing': '🐛'
    };
    return iconMap[skillName] || '💻';
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Floating Skill Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {skillOrbs.map((orb) => (
          <div
            key={orb.id}
            className={`absolute bg-gradient-to-r ${orb.color} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg animate-pulse`}
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              opacity: orb.opacity,
              animation: `float-${orb.id} ${3 + orb.speed}s infinite ease-in-out`,
              transform: `rotate(${orb.direction}deg)`
            }}
          >
            {orb.skill}
          </div>
        ))}
      </div>

      {/* Dynamic Particle System */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particleSystem.map((particle) => (
          <div
            key={particle.id}
            className={`absolute w-1 h-1 bg-${particle.color}-400 rounded-full animate-pulse`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              animation: `drift-${particle.id} ${5 + particle.speed}s infinite linear`,
              transform: `scale(${particle.size})`
            }}
          />
        ))}
      </div>

      {/* Innovative Background Patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
            <radialGradient id="skillGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
          <rect width="100" height="100" fill="url(#grid)"/>
          <circle cx="25" cy="25" r="15" fill="url(#skillGlow)" className="animate-pulse"/>
          <circle cx="75" cy="75" r="20" fill="url(#skillGlow)" className="animate-pulse" style={{animationDelay: '1s'}}/>
        </svg>
      </div>

      {/* Custom Cursor */}
      {hoveredSkill && (
        <div
          className="fixed pointer-events-none z-50 transition-all duration-200"
          style={{
            left: mousePosition.x + 20,
            top: mousePosition.y - 10,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-md border border-white/20 shadow-2xl">
            <div className="flex items-center space-x-2">
              <Sparkles size={16} className="text-purple-400"/>
              <span>{hoveredSkill.level}% Mastery</span>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Skill Details Modal */}
      {showDetails && hoveredSkill && (
        <div
          className="fixed pointer-events-none z-40 transition-all duration-300"
          style={{
            left: mousePosition.x + 50,
            top: mousePosition.y - 50,
            transform: 'translate(0, -50%)'
          }}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-sm transform scale-95 hover:scale-100 transition-transform duration-300 backdrop-blur-md"
               style={{
                 boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)'
               }}>
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">{getSkillIcon(hoveredSkill.name)}</span>
              <h4 className="font-bold text-lg text-gray-900 dark:text-white">{hoveredSkill.name}</h4>
              <Orbit size={16} className="ml-2 text-purple-500 animate-spin"/>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{hoveredSkill.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Experience:</span>
                <span className="font-semibold text-purple-600">1 year</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Projects:</span>
                <span className="font-semibold text-blue-600">5 projects</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Proficiency:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-green-600">{hoveredSkill.level}%</span>
                  <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-1000"
                      style={{width: `${hoveredSkill.level}%`}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Expertise across the full development stack with innovative solutions
          </p>
        </div>

        {/* Enhanced Tab Navigation with 3D effects and hover animations */}
        <div className={`flex flex-wrap justify-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {Object.entries(skillCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center px-6 py-3 m-2 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 group relative overflow-hidden ${
                  activeTab === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-2xl scale-105`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                style={{
                  boxShadow: activeTab === key ? '0 15px 30px rgba(0,0,0,0.2)' : '0 5px 15px rgba(0,0,0,0.1)',
                  transform: activeTab === key ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)'
                }}
              >
                {/* Animated background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl`}/>
                
                {/* Sparkle effect on hover */}
                <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"/>
                
                <IconComponent size={20} className="mr-2 relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                <span className="relative z-10">{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Enhanced 3D Skill Cards Grid with more innovative effects */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories[activeTab].skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 hover:rotate-1 cursor-pointer border border-gray-200 dark:border-gray-700 overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
                onMouseEnter={(e) => handleSkillHover(skill, e)}
                onMouseLeave={handleSkillLeave}
              >
                {/* Dynamic gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating particles on hover */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${20 + i * 10}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Enhanced skill icon with multiple effects */}
                <div className="relative z-10 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-2xl relative overflow-hidden">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"/>
                    <span className="relative z-10">{getSkillIcon(skill.name)}</span>
                  </div>
                </div>

                {/* Enhanced skill name with text effects */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transform transition-transform duration-300 relative"
                    style={{
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                  <span className="relative z-10">{skill.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {skill.name}
                  </div>
                </h3>

                {/* Enhanced progress bar with pulse effect */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                      <Brain size={14} className="mr-1"/>
                      Proficiency
                    </span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner relative">
                    {/* Animated background stripes */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"/>
                    
                    <div
                      className={`h-full bg-gradient-to-r ${skillCategories[activeTab].color} rounded-full transition-all duration-1000 ease-out transform origin-left shadow-lg relative overflow-hidden`}
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        animationDelay: `${index * 200}ms`,
                        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    >
                      {/* Progress shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"/>
                    </div>
                  </div>
                </div>

                {/* Enhanced badges with hover effects */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium transform group-hover:scale-105 transition-all duration-300 flex items-center">
                    <Zap size={10} className="mr-1"/>
                    {skill.experience}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium transform group-hover:scale-105 transition-all duration-300 flex items-center">
                    <Sparkles size={10} className="mr-1"/>
                    {skill.projects} projects
                  </span>
                </div>

                {/* Enhanced glow effects */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl transform scale-110" />
                
                {/* Interactive corner elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full opacity-30 group-hover:opacity-80 group-hover:scale-125 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced floating elements with more variety */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-pulse ${
                i % 5 === 0 ? 'w-6 h-6 bg-purple-400' :
                i % 5 === 1 ? 'w-4 h-4 bg-blue-400' :
                i % 5 === 2 ? 'w-3 h-3 bg-cyan-400' :
                i % 5 === 3 ? 'w-5 h-5 bg-pink-400' :
                'w-2 h-2 bg-indigo-400'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.3,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for floating animations */}
      <style jsx={true}>{`
        @keyframes float-0 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(180deg); } }
        @keyframes float-1 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(90deg); } }
        @keyframes float-2 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-25px) rotate(270deg); } }
        @keyframes float-3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-18px) rotate(45deg); } }
        @keyframes float-4 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-22px) rotate(135deg); } }
        @keyframes float-5 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-16px) rotate(225deg); } }
        @keyframes float-6 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-24px) rotate(315deg); } }
        @keyframes float-7 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-19px) rotate(60deg); } }
        @keyframes float-8 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-21px) rotate(120deg); } }
        @keyframes float-9 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-17px) rotate(240deg); } }
        
        @keyframes drift-0 { 0% { transform: translateX(-10px); } 100% { transform: translateX(calc(100vw + 10px)); } }
        @keyframes drift-1 { 0% { transform: translateX(-10px) translateY(5px); } 100% { transform: translateX(calc(100vw + 10px)) translateY(-5px); } }
        @keyframes drift-2 { 0% { transform: translateX(-10px) translateY(-5px); } 100% { transform: translateX(calc(100vw + 10px)) translateY(5px); } }
        @keyframes drift-3 { 0% { transform: translateX(-10px) translateY(10px); } 100% { transform: translateX(calc(100vw + 10px)) translateY(-10px); } }
        @keyframes drift-4 { 0% { transform: translateX(-10px) translateY(-10px); } 100% { transform: translateX(calc(100vw + 10px)) translateY(10px); } }
        @keyframes drift-5 { 0% { transform: translateX(-10px) translateY(15px); } 100% { transform: translateX(calc(100vw + 10px)) translateY(-15px); } }
      `}</style>
    </section>
  );
};

export default SkillsEnhanced;
