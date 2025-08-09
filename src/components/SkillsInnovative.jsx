import { useState, useEffect, useRef } from 'react';
import { Code, Server, Brain, Zap, Sparkles, Cpu, Monitor } from 'lucide-react';

const SkillsInnovative = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeOrb, setActiveOrb] = useState(0);
  const [skillNodes, setSkillNodes] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          generateSkillNodes();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate dynamic skill nodes
  const generateSkillNodes = () => {
    const nodes = [];
    const skillData = [
      { name: 'React', level: 85, color: '#61DAFB', category: 'frontend' },
      { name: 'JavaScript', level: 90, color: '#F7DF1E', category: 'programming' },
      { name: 'Node.js', level: 80, color: '#339933', category: 'backend' },
      { name: 'Python', level: 75, color: '#3776AB', category: 'programming' },
      { name: 'MongoDB', level: 78, color: '#47A248', category: 'database' },
      { name: 'CSS3', level: 92, color: '#1572B6', category: 'frontend' },
      { name: 'TypeScript', level: 82, color: '#3178C6', category: 'programming' },
      { name: 'Next.js', level: 88, color: '#000000', category: 'frontend' },
    ];

    skillData.forEach((skill, index) => {
      const angle = (index / skillData.length) * 2 * Math.PI;
      const radius = 150 + Math.floor(Math.random() * 100);
      nodes.push({
        ...skill,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        size: 60 + skill.level * 0.5,
        id: index
      });
    });
    setSkillNodes(nodes);
  };

  // Remove auto-rotation - now click-based only

  // Optimized mouse tracking with throttling
  useEffect(() => {
    let animationFrame;
    const handleMouseMove = (e) => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          setMousePosition({
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 2
          });
        }
        animationFrame = null;
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  const skillCategories = [
    {
      title: 'Frontend Magic',
      icon: Monitor,
      color: 'from-blue-400 to-cyan-400',
      description: 'Crafting beautiful user interfaces with modern frameworks',
      skills: [
        { name: 'React.js', level: 88, icon: '⚛️', description: 'Building dynamic UIs with hooks and modern patterns' },
        { name: 'HTML5', level: 98, icon: '🌐', description: 'Semantic markup and web standards mastery' },
        { name: 'CSS3', level: 95, icon: '🎨', description: 'Advanced styling with animations and responsive design' },
        { name: 'Bootstrap', level: 90, icon: '🅱️', description: 'Rapid prototyping with responsive framework' },
        { name: 'Tailwind CSS', level: 92, icon: '💨', description: 'Utility-first CSS framework for modern design' },
        { name: 'JavaScript', level: 90, icon: '🟨', description: 'ES6+ modern JavaScript with DOM manipulation' },
        { name: 'Responsive Design', level: 95, icon: '📱', description: 'Mobile-first approach with cross-device compatibility' }
      ]
    },
    {
      title: 'Backend Power',
      icon: Server,
      color: 'from-green-400 to-emerald-400',
      description: 'Building robust server architectures and APIs',
      skills: [
        { name: 'Node.js', level: 85, icon: '🟢', description: 'Server-side JavaScript runtime and development' },
        { name: 'Express.js', level: 82, icon: '🚀', description: 'Fast web framework for Node.js applications' },
        { name: 'PHP', level: 80, icon: '🐘', description: 'Server-side scripting and web development' },
        { name: 'RESTful APIs', level: 88, icon: '🔗', description: 'API design and development best practices' },
        { name: 'MongoDB', level: 78, icon: '🍃', description: 'NoSQL database management and optimization' },
        { name: 'MySQL', level: 85, icon: '🐬', description: 'Relational database design and queries' }
      ]
    },
    {
      title: 'Programming & AI',
      icon: Code,
      color: 'from-purple-400 to-pink-400',
      description: 'Core programming languages and emerging technologies',
      skills: [
        { name: 'JavaScript', level: 90, icon: '🟨', description: 'Full-stack JavaScript development expertise' },
        { name: 'Python', level: 82, icon: '🐍', description: 'Machine learning and backend development' },
        { name: 'C++', level: 85, icon: '⚙️', description: 'System programming and algorithm implementation' },
        { name: 'C', level: 88, icon: '🔧', description: 'Low-level programming and performance optimization' },
        { name: 'Machine Learning', level: 75, icon: '🤖', description: 'ML algorithms and data analysis with Python' },
        { name: 'Vibe Coding', level: 95, icon: '✨', description: 'Intuitive problem-solving with creative flow' }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: Cpu,
      color: 'from-orange-400 to-red-400',
      description: 'Development workflow and optimization tools',
      skills: [
        { name: 'Git & GitHub', level: 95, icon: '🔧', description: 'Version control and collaborative development' },
        { name: 'VS Code', level: 98, icon: '💻', description: 'Primary development environment mastery' },
        { name: 'Postman', level: 85, icon: '📮', description: 'API testing and development workflows' },
        { name: 'SEO & Optimization', level: 88, icon: '🔍', description: 'Search engine optimization and performance' },
        { name: 'Agile Methodology', level: 80, icon: '🏃', description: 'Project management and team collaboration' },
        { name: 'Debugging & Testing', level: 90, icon: '🐛', description: 'Code quality assurance and problem solving' }
      ]
    }
  ];

  const handleSkillHover = (skill) => {
    setHoveredSkill(skill);
  };

  const handleSkillLeave = () => {
    setHoveredSkill(null);
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-slate-900 relative overflow-hidden min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Neural Network Background */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000">
          <defs>
            <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.8)"/>
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.3)"/>
            </radialGradient>
          </defs>
          {skillNodes.filter(node => node && typeof node.x === 'number').map((node, i) => (
            <g key={i}>
              <circle
                cx={Math.round(500 + (node.x || 0) + (mousePosition.x || 0) * 20)}
                cy={Math.round(500 + (node.y || 0) + (mousePosition.y || 0) * 20)}
                r={Math.max(1, (node.size || 60) / 10)}
                fill="url(#nodeGradient)"
                className="animate-pulse"
                style={{animationDelay: `${i * 0.2}s`}}
              />
              {skillNodes.filter(n => n && typeof n.x === 'number').map((otherNode, j) => {
                if (i < j && Math.hypot(node.x - otherNode.x, node.y - otherNode.y) < 200) {
                  return (
                    <line
                      key={`${i}-${j}`}
                      x1={Math.round(500 + (node.x || 0) + (mousePosition.x || 0) * 20)}
                      y1={Math.round(500 + (node.y || 0) + (mousePosition.y || 0) * 20)}
                      x2={Math.round(500 + (otherNode.x || 0) + (mousePosition.x || 0) * 20)}
                      y2={Math.round(500 + (otherNode.y || 0) + (mousePosition.y || 0) * 20)}
                      stroke="rgba(147, 51, 234, 0.2)"
                      strokeWidth={1}
                      className="animate-pulse"
                    />
                  );
                }
                return null;
              })}
            </g>
          ))}
        </svg>

        {/* Floating Code Elements */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-purple-400/20 font-mono text-sm animate-float"
            style={{
              left: `${Math.floor(Math.random() * 100)}%`,
              top: `${Math.floor(Math.random() * 100)}%`,
              animationDelay: `${(Math.random() * 5).toFixed(1)}s`,
              animationDuration: `${(3 + Math.random() * 4).toFixed(1)}s`
            }}
          >
            {['</>', '{...}', '()', '[]', '==>', '<-', '&&', '||'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Innovative Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-7xl font-black mb-6 relative">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Skills
              </span>
              <span className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
              </span>
            </h2>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-100 max-w-3xl mx-auto mt-8">
            A dynamic ecosystem of technologies and expertise, constantly evolving and interconnected
          </p>
        </div>

        {/* 3D Skill Orbs System */}
        <div className={`relative mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative h-96 flex items-center justify-center">
            {/* Central Hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <Brain className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Orbiting Skill Categories */}
            {skillCategories.map((category, index) => {
              const angle = (index / skillCategories.length) * 2 * Math.PI;
              const radius = 150;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const IconComponent = category.icon;
              const isActive = index === activeOrb;

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-500 cursor-pointer ${
                    isActive ? 'scale-125 z-20' : 'scale-100 hover:scale-110 z-10'
                  }`}
                  style={{
                    transform: `translate(${x + (mousePosition.x || 0) * 10}px, ${y + (mousePosition.y || 0) * 10}px)`,
                  }}
                  onClick={() => setActiveOrb(index)}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center shadow-lg border-4 ${
                    isActive ? 'border-white shadow-2xl' : 'border-transparent'
                  } transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                      isActive 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                    } transition-all duration-300`}>
                      {category.title}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {skillCategories.map((_, index) => {
                const angle = (index / skillCategories.length) * 2 * Math.PI;
                const radius = 150;
                const x = Math.cos(angle) * radius + 192; // Center offset
                const y = Math.sin(angle) * radius + 192; // Center offset

                return (
                  <line
                    key={index}
                    x1="192"
                    y1="192"
                    x2={x}
                    y2={y}
                    stroke={index === activeOrb ? "rgba(147, 51, 234, 0.6)" : "rgba(147, 51, 234, 0.2)"}
                    strokeWidth={index === activeOrb ? 3 : 1}
                    strokeDasharray="5,5"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>
          </div>
        </div>

        {/* Active Category Skills Display */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="text-center mb-8">
              <h3 className={`text-3xl font-bold bg-gradient-to-r ${skillCategories[activeOrb].color} bg-clip-text text-transparent mb-2`}>
                {skillCategories[activeOrb].title}
              </h3>
              <p className="text-gray-700 dark:text-gray-100 mb-4">
                {skillCategories[activeOrb].description}
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                💡 Click on the orbital categories above to explore different skill sets • Hover over skills for details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories[activeOrb].skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer border border-gray-200 dark:border-gray-700"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                  onMouseEnter={() => handleSkillHover(skill)}
                  onMouseLeave={handleSkillLeave}
                >
                  {/* Enhanced Hover Tooltip */}
                  {hoveredSkill?.name === skill.name && (
                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 dark:bg-gray-700 text-white px-4 py-3 rounded-xl shadow-2xl text-sm max-w-xs pointer-events-none animate-in fade-in duration-200">
                      <div className="font-semibold mb-1 text-purple-200">{skill.name}</div>
                      <div className="text-gray-100">{skill.description}</div>
                      <div className="text-xs text-gray-300 mt-2">Proficiency: {skill.level}%</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                    </div>
                  )}

                  {/* Skill Icon */}
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center text-2xl font-bold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 mr-4">
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{skill.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{skill.level}% Proficiency</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skillCategories[activeOrb].color} rounded-full transition-all duration-1000 ease-out relative`}
                        style={{
                          width: isVisible ? `${skill.level}%` : '0%',
                          animationDelay: `${index * 200}ms`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skillCategories[activeOrb].color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl transform scale-110`} />
                  
                  {/* Corner Accent */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill Stats Overview */}
        <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Years Experience', value: '1+', icon: '🗓️' },
              { label: 'Projects Completed', value: '5+', icon: '🚀' },
              { label: 'Technologies', value: '20+', icon: '⚡' },
              { label: 'Lines of Code', value: '50K+', icon: '💻' }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-700 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx={true}>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default SkillsInnovative;
