import { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink, Users, Code, Zap, Target } from 'lucide-react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

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

  const experiences = [
    {
      id: 1,
      company: 'Levelup Solutions',
      position: 'Web Designer - Intern',
      duration: 'April 2024 - July 2024',
      location: 'Lahore, Pakistan',
      type: 'Internship',
      description: 'Gained hands-on experience in web design and development, working on multiple client projects.',
      achievements: [
        'Designed and developed ObecheInterior.com, a visually appealing landing page for an interior design company',
        'Contributed to UI/UX enhancements and page optimization for the company website LevelUpSol.com.pk',
        'Worked on the CricketX.net website, focusing on layout design and responsiveness',
        'Assisted in building and maintaining XRevStudio.com with cross-browser and mobile compatibility in mind'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'PHP', 'Responsive Design'],
      color: 'from-blue-500 to-cyan-500',
      icon: Code
    },
    {
      id: 2,
      company: 'Web20Ranker',
      position: 'SEO Specialist',
      duration: 'July 2024 - April 2025',
      location: 'Remote',
      type: 'Contract',
      description: 'Specialized in SEO optimization and Web 2.0 strategies to improve website rankings and visibility.',
      achievements: [
        'Created custom SEO tasks for Web 2.0 platforms',
        'Built custom signals to improve website ranking',
        'Helped boost visibility using Web 2.0 backlinks',
        'Implemented advanced SEO strategies for multiple client websites'
      ],
      technologies: ['SEO', 'Web 2.0', 'Analytics', 'Backlink Building', 'Content Optimization'],
      color: 'from-green-500 to-emerald-500',
      icon: Target
    }
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Professional Experience
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Building expertise through hands-on experience and real-world projects
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            return (
              <div
                key={exp.id}
                className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{transitionDelay: `${300 + index * 200}ms`}}
                onMouseEnter={() => setHoveredCard(exp.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Main Card */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:translateY-4 border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`} />
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center">
                      <div className={`w-14 h-14 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                        <IconComponent size={24} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                          {exp.position}
                        </h3>
                        <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    
                    {/* Type Badge */}
                    <span className={`px-3 py-1 bg-gradient-to-r ${exp.color} text-white text-xs font-semibold rounded-full transform group-hover:scale-110 transition-transform duration-300`}>
                      {exp.type}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm font-medium">{exp.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={16} className="mr-2" />
                      <span className="text-sm font-medium">{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Zap size={16} className="mr-2 text-yellow-500" />
                      Key Achievements
                    </h4>
                    <div className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div
                          key={achIndex}
                          className="flex items-start text-sm text-gray-600 dark:text-gray-400 transform transition-all duration-300 hover:translate-x-2"
                        >
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="leading-relaxed">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Code size={16} className="mr-2 text-blue-500" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full transform hover:scale-110 transition-transform duration-200 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.color} transform origin-left transition-transform duration-500 ${hoveredCard === exp.id ? 'scale-x-100' : 'scale-x-0'}`} />
                  
                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" style={{ animationDelay: '100ms' }} />
              </div>
            );
          })}
        </div>

        {/* Timeline Connector for larger screens */}
        <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-px h-32 bg-gradient-to-b from-purple-500 to-blue-500 opacity-30" />
        
        {/* Summary Stats */}
        <div className={`mt-16 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-3xl p-8 text-white">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold mb-2">2</div>
                <div className="text-purple-100">Companies</div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold mb-2">1+</div>
                <div className="text-purple-100">Years Experience</div>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold mb-2">5+</div>
                <div className="text-purple-100">Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
