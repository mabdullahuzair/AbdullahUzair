import { useState, useEffect, useRef } from 'react';
import { Code, Lightbulb, TrendingUp, CheckCircle, Award, ChevronRight, Monitor, Target, Trophy, Users, BookOpen, Cpu } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('story');
  const [currentFact, setCurrentFact] = useState(0);
  const [countingStats, setCountingStats] = useState({
    projects: 0,
    technologies: 0,
    coffees: 0,
    linesOfCode: 0
  });
  const sectionRef = useRef(null);

  const achievements = [
    { icon: Code, text: "Written over 10,000 lines of production code", color: "text-green-600" },
    { icon: CheckCircle, text: "Delivered 5+ successful projects and features", color: "text-blue-600" },
    { icon: Award, text: "Maintaining 3.6 CGPA in Software Engineering", color: "text-purple-600" },
    { icon: TrendingUp, text: "Specialized in full-stack web development", color: "text-indigo-600" },
    { icon: Monitor, text: "Focus on clean code and efficient solutions", color: "text-cyan-600" }
  ];

  const personalityTraits = [
    { icon: Lightbulb, title: "Problem Solver", description: "I love breaking down complex challenges into manageable solutions" },
    { icon: Users, title: "Team Player", description: "Collaboration brings out the best in every project" },
    { icon: BookOpen, title: "Continuous Learner", description: "Always exploring new technologies and best practices" },
    { icon: Target, title: "Detail Oriented", description: "Perfection is in the details, from pixel-perfect UIs to clean code" }
  ];

  const timeline = [
    {
      year: "2022",
      title: "Started My Journey",
      description: "Began Software Engineering at University of Central Punjab",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500"
    },
    {
      year: "2023",
      title: "First Real Project",
      description: "Built my first full-stack application with HTML, CSS, and JavaScript",
      icon: Code,
      color: "from-green-500 to-emerald-500"
    },
    {
      year: "2024",
      title: "Professional Experience",
      description: "Internship at Levelup Solutions - worked on real client projects",
      icon: Trophy,
      color: "from-purple-500 to-pink-500"
    },
    {
      year: "2025",
      title: "Current Focus",
      description: "Building AI-powered applications and expanding full-stack expertise",
      icon: Cpu,
      color: "from-orange-500 to-red-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCountingAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Rotate achievements
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % achievements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const startCountingAnimation = () => {
    const targets = { projects: 5, technologies: 20, coffees: 500, linesOfCode: 10000 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    Object.keys(targets).forEach(key => {
      let current = 0;
      const increment = targets[key] / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(timer);
        }
        setCountingStats(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepTime);
    });
  };

  const tabContent = {
    story: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Story</h3>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Hey there! I'm a passionate Software Engineering student at the University of Central Punjab, 
            currently maintaining a solid 3.6 CGPA while diving deep into the world of web development.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            My journey began with curiosity about how websites work, and it's evolved into a genuine passion 
            for creating digital experiences that matter. I love the moment when code comes to life and 
            transforms into something beautiful and functional.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
            or enjoying a good cup of coffee while planning my next big project. I believe in the power of 
            clean code, collaborative development, and never stopping to learn.
          </p>
        </div>
      </div>
    ),
    personality: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What Makes Me Tick</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {personalityTraits.map((trait, index) => {
            const IconComponent = trait.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{trait.title}</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-400">{trait.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    ),
    journey: (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Journey</h3>
        <div className="space-y-6">
          {timeline.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex items-start space-x-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-bold">
                      {item.year}
                    </span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white">{item.title}</h4>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          {/* Rotating Achievements */}
          <div className={`h-16 flex items-center justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={index}
                  className={`absolute flex items-center space-x-3 transition-all duration-1000 ${
                    index === currentFact ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <IconComponent className={achievement.color} size={24} />
                  <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                    {achievement.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-purple-600 mb-2">{countingStats.projects}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-blue-600 mb-2">{countingStats.technologies}+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-amber-600 mb-2">{countingStats.coffees}+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Cups of Coffee</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-green-600 mb-2">{Math.floor(countingStats.linesOfCode / 1000)}K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lines of Code</div>
          </div>
        </div>

        {/* Interactive Tabs */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg">
              {['story', 'personality', 'journey'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 min-h-[400px]">
            <div className="transition-all duration-500">
              {tabContent[activeTab]}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
