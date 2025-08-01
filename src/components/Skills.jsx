import { useState, useEffect, useRef } from 'react';
import { Code, Database, Globe, Smartphone, Server, Palette, Brain, Zap } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(false);
  const sectionRef = useRef(null);

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
          <div className="bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-medium backdrop-blur-md border border-white/20">
            {hoveredSkill.level}% Proficiency
          </div>
        </div>
      )}

      {/* Skill Details Modal */}
      {showDetails && hoveredSkill && (
        <div
          className="fixed pointer-events-none z-40 transition-all duration-300"
          style={{
            left: mousePosition.x + 50,
            top: mousePosition.y - 50,
            transform: 'translate(0, -50%)'
          }}
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-sm transform scale-95 hover:scale-100 transition-transform duration-300"
               style={{
                 boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)'
               }}>
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">{getSkillIcon(hoveredSkill.name)}</span>
              <h4 className="font-bold text-lg text-gray-900 dark:text-white">{hoveredSkill.name}</h4>
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
                <span className="font-semibold text-green-600">{hoveredSkill.level}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Technical Skills
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Expertise across the full development stack
          </p>
        </div>

        {/* Enhanced Tab Navigation with 3D effects */}
        <div className={`flex flex-wrap justify-center mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {Object.entries(skillCategories).map(([key, category]) => {
            const IconComponent = category.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center px-6 py-3 m-2 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-110 hover:translateY-2 ${
                  activeTab === key
                    ? `bg-gradient-to-r ${category.color} text-white shadow-2xl scale-105`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                style={{
                  boxShadow: activeTab === key ? '0 15px 30px rgba(0,0,0,0.2)' : '0 5px 15px rgba(0,0,0,0.1)',
                  transform: activeTab === key ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)'
                }}
              >
                <IconComponent size={20} className="mr-2" />
                {category.title}
              </button>
            );
          })}
        </div>

        {/* Enhanced 3D Skill Cards Grid */}
        <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories[activeTab].skills.map((skill, index) => (
              <div
                key={skill.name}
                className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:translateY-4 hover:rotate-1 cursor-pointer border border-gray-200 dark:border-gray-700"
                style={{
                  animationDelay: `${index * 100}ms`,
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
                onMouseEnter={(e) => handleSkillHover(skill, e)}
                onMouseLeave={handleSkillLeave}
              >
                {/* 3D Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Skill Icon with 3D effect */}
                <div className="relative z-10 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-2xl">
                    {getSkillIcon(skill.name)}
                  </div>
                </div>

                {/* Skill Name with 3D text effect */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transform group-hover:translateZ-10 transition-transform duration-300"
                    style={{
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                  {skill.name}
                </h3>

                {/* Enhanced Progress Bar with 3D effect */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Proficiency</span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                      className={`h-full bg-gradient-to-r ${skillCategories[activeTab].color} rounded-full transition-all duration-1000 ease-out transform origin-left shadow-lg`}
                      style={{
                        width: isVisible ? `${skill.level}%` : '0%',
                        animationDelay: `${index * 200}ms`,
                        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), 0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    />
                  </div>
                </div>

                {/* Experience Badge with 3D hover */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium transform group-hover:scale-105 transition-transform duration-300">
                    {skill.experience}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium transform group-hover:scale-105 transition-transform duration-300">
                    {skill.projects} projects
                  </span>
                </div>

                {/* 3D Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl transform scale-110" />
                
                {/* Interactive Corner Accent */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Floating 3D Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-purple-400 rounded-full opacity-10 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                transform: `translateZ(${Math.random() * 50}px) rotateX(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

