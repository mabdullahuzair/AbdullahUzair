import { useState, useEffect, useRef } from 'react';
import { User, GraduationCap, Code, Award, Target, Heart, Lightbulb, Rocket } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const stats = [
    {
      icon: GraduationCap,
      value: '3.6',
      label: 'CGPA',
      description: 'Current Academic Performance',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      value: '5+',
      label: 'Projects',
      description: 'Completed Projects',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      value: '1+',
      label: 'Years',
      description: 'Development Experience',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const highlights = [
    {
      icon: Target,
      title: 'Problem Solver',
      description: 'Passionate about solving complex problems through innovative software solutions',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Heart,
      title: 'Full-Stack Enthusiast',
      description: 'Experienced in both frontend and backend technologies with MERN stack knowledge',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Lightbulb,
      title: 'Continuous Learner',
      description: 'Always exploring new technologies and staying updated with industry trends',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Rocket,
      title: 'Innovation Driven',
      description: 'Focused on creating modern, efficient, and user-friendly web applications',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              transform: `translate(${(mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 1024) / 2) * 0.01}px, ${(mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 768) / 2) * 0.01}px)`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            About Me
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Passionate Software Engineering student with a drive for innovation and excellence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Card */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold transform hover:rotate-12 transition-transform duration-300">
                  <User size={32} />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Muhammad Abdullah Uzair</h3>
                  <p className="text-purple-600 dark:text-purple-400 font-semibold">Software Engineering Student</p>
                </div>
              </div>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="leading-relaxed">
                  I'm a Software Engineering student at the University of Central Punjab with a passion for problem-solving and full-stack web development.
                </p>
                <p className="leading-relaxed">
                  I've worked with front-end tools like HTML, CSS, Bootstrap, and Tailwind CSS, and back-end technologies like PHP, Node and Express. I have basic knowledge of the MERN stack, MongoDB, Python, C++, and Machine Learning.
                </p>
                <p className="leading-relaxed">
                  My goal is to contribute to innovative projects that make a positive impact on users' lives through modern web technologies.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Stats */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="grid gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:translateY-2 cursor-pointer border border-gray-200 dark:border-gray-700"
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                    style={{
                      animationDelay: `${index * 200}ms`
                    }}
                  >
                    <div className="flex items-center">
                      <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                        <IconComponent size={24} />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                          <span className="ml-2 text-lg font-semibold text-purple-600 dark:text-purple-400">{stat.label}</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.description}</p>
                      </div>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className={`mt-4 overflow-hidden transition-all duration-300 ${activeCard === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className={`h-2 bg-gradient-to-r ${stat.color} rounded-full transform origin-left transition-transform duration-1000 ${activeCard === index ? 'scale-x-100' : 'scale-x-0'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:translateY-4 cursor-pointer border border-gray-200 dark:border-gray-600"
                  style={{
                    animationDelay: `${800 + index * 100}ms`
                  }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${highlight.color} rounded-xl flex items-center justify-center text-white mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                    <IconComponent size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {highlight.description}
                  </p>
                  
                  {/* Interactive Border */}
                  <div className={`mt-4 h-1 bg-gradient-to-r ${highlight.color} rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-0`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Action Elements */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 opacity-20 dark:opacity-10">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-20 dark:opacity-10">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default About;

