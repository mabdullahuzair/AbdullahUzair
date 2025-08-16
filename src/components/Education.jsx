import { useState, useEffect, useRef } from 'react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Star } from 'lucide-react';

const Education = () => {
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

  const education = [
    {
      id: 1,
      degree: 'Software Engineering',
      institution: 'University of Central Punjab',
      duration: '2022 - 2026',
      status: 'Degree In Progress',
      cgpa: '3.6',
      location: 'Lahore, Pakistan',
      description: 'Pursuing Bachelor\'s degree in Software Engineering with focus on modern development practices and technologies.',
      highlights: [
        'Strong academic performance with 3.6 CGPA',
        'Specialized in full-stack web development',
        'Active participation in coding projects',
        'Focus on problem-solving and software design'
      ],
      color: 'from-blue-500 to-cyan-500',
      icon: GraduationCap
    },
    {
      id: 2,
      degree: 'FSc Pre Engineering',
      institution: 'Govt. College of Science Lahore',
      duration: '2019 - 2021',
      status: 'Completed',
      cgpa: 'N/A',
      location: 'Lahore, Pakistan',
      description: 'Completed intermediate education in Pre-Engineering, building strong foundation in mathematics and sciences.',
      highlights: [
        'Strong foundation in mathematics and physics',
        'Developed analytical thinking skills',
        'Prepared for engineering studies',
        'Excellent academic record'
      ],
      color: 'from-green-500 to-emerald-500',
      icon: BookOpen
    }
  ];

  return (
    <section id="education" ref={sectionRef} className="py-20 relative overflow-hidden">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Education
          </h2>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Academic journey and continuous learning
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {education.map((edu, index) => {
            const IconComponent = edu.icon;
            return (
              <div
                key={edu.id}
                className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{transitionDelay: `${300 + index * 200}ms`}}
                onMouseEnter={() => setHoveredCard(edu.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Compact Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:translateY-2 border border-gray-200 dark:border-gray-700 relative overflow-hidden h-full">
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${edu.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 bg-gradient-to-br ${edu.color} rounded-xl flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                        <IconComponent size={20} />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                          {edu.degree}
                        </h3>
                        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                          {edu.institution}
                        </p>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <span className={`px-2 py-1 bg-gradient-to-r ${edu.color} text-white text-xs font-semibold rounded-full transform group-hover:scale-110 transition-transform duration-300`}>
                      {edu.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar size={14} className="mr-2" />
                      <span className="text-sm">{edu.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin size={14} className="mr-2" />
                      <span className="text-sm">{edu.location}</span>
                    </div>
                    {edu.cgpa !== 'N/A' && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Star size={14} className="mr-2" />
                        <span className="text-sm">CGPA: <span className="font-semibold text-purple-600 dark:text-purple-400">{edu.cgpa}</span></span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {edu.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                      <Award size={14} className="mr-2 text-yellow-500" />
                      Highlights
                    </h4>
                    <div className="space-y-1">
                      {edu.highlights.slice(0, 3).map((highlight, hlIndex) => (
                        <div
                          key={hlIndex}
                          className="flex items-start text-xs text-gray-600 dark:text-gray-400 transform transition-all duration-300 hover:translate-x-1"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                          <span className="leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${edu.color} transform origin-left transition-transform duration-500 ${hoveredCard === edu.id ? 'scale-x-100' : 'scale-x-0'}`} />
                  
                  {/* Corner Accent */}
                  <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300" />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300" style={{ animationDelay: '100ms' }} />
              </div>
            );
          })}
        </div>

        {/* Academic Summary */}
        <div className={`mt-12 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl p-6 text-white max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-3">Academic Excellence</h3>
              <p className="text-purple-100 mb-4 text-sm">
                Committed to continuous learning and academic achievement in the field of Software Engineering
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold mb-1">3.6</div>
                  <div className="text-purple-100 text-sm">Current CGPA</div>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold mb-1">2026</div>
                  <div className="text-purple-100 text-sm">Expected Graduation</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
