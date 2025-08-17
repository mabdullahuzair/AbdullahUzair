import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, ChevronRight, ArrowRight, TrendingUp, Check, Users, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const sectionRef = useRef(null);

  const inspirationalQuotes = [
    { text: "Every great project starts with a simple conversation", icon: MessageSquare },
    { text: "Let's turn your vision into digital reality", icon: TrendingUp },
    { text: "Collaboration creates extraordinary outcomes", icon: Users },
    { text: "Your ideas + My skills = Amazing results", icon: ArrowRight }
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

  // Rotating quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
    
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email Me',
      value: 'abdullahuzair860@gmail.com',
      href: 'mailto:abdullahuzair860@gmail.com',
      color: 'from-red-500 to-pink-500',
      description: 'Drop me a line anytime'
    },
    {
      icon: Phone,
      label: 'Call Me',
      value: '+92 303 467 3255',
      href: 'tel:+923034673255',
      color: 'from-green-500 to-emerald-500',
      description: "Let's have a chat"
    },
    {
      icon: MapPin,
      label: 'Visit Me',
      value: 'Lahore, Pakistan',
      href: '#',
      color: 'from-blue-500 to-cyan-500',
      description: 'Based in the heart of Punjab'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Dynamic Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Let's Create Magic Together
            </span>
          </h2>
          
          {/* Rotating Inspirational Quotes */}
          <div className={`h-16 flex items-center justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {inspirationalQuotes.map((quote, index) => {
              const IconComponent = quote.icon;
              return (
                <div
                  key={index}
                  className={`absolute flex items-center space-x-3 transition-all duration-1000 ${
                    index === currentQuote ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                >
                  <IconComponent className="text-purple-600" size={24} />
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium italic">
                    "{quote.text}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 transition-all duration-500">
            <div className="flex items-center space-x-2">
              <Check className="text-white" size={20} />
              <span>Message sent successfully! I'll get back to you soon.</span>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information with Creative Cards */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className="group block bg-white dark:bg-gray-800 rounded-3xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden"
                      style={{
                        animationDelay: `${index * 200}ms`
                      }}
                    >
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center text-white transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg flex-shrink-0`}>
                          <IconComponent size={20} className="sm:w-6 sm:h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors duration-300 truncate">
                            {info.label}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-1 break-words">
                            {info.description}
                          </p>
                          <p className="text-gray-800 dark:text-gray-200 font-medium text-xs sm:text-sm break-all">
                            {info.value}
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 dark:text-purple-400">→</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Professional Networking */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 rounded-3xl" />
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <Users className="mr-3 text-blue-200" size={24} />
                    <h3 className="text-xl font-bold">Let's Connect</h3>
                  </div>
                  <p className="text-purple-100 leading-relaxed mb-4">
                    I'm always interested in discussing new technologies, project collaborations, and professional opportunities.
                    Based in Lahore and available for meetings.
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-sm text-purple-200">
                      <TrendingUp className="mr-2" size={16} />
                      Professional Growth
                    </span>
                    <span className="flex items-center text-sm text-purple-200">
                      <ArrowRight className="mr-2" size={16} />
                      Collaboration Ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700 relative overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600" />
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='10'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px'
                }} />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                      <MessageSquare className="mr-3 text-blue-500" size={28} />
                      Send Me a Message
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      I typically respond within 24 hours
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${focusedField === 'name' ? 'opacity-20' : ''}`} />
                    <div className="relative">
                      <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-purple-500' : 'text-gray-400'}`} size={20} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Your awesome name"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transform origin-left transition-transform duration-300 ${focusedField === 'name' ? 'scale-x-100' : 'scale-x-0'}`} />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-20' : ''}`} />
                    <div className="relative">
                      <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'}`} size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="your@email.com"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform origin-left transition-transform duration-300 ${focusedField === 'email' ? 'scale-x-100' : 'scale-x-0'}`} />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${focusedField === 'subject' ? 'opacity-20' : ''}`} />
                    <div className="relative">
                      <Sparkles className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'subject' ? 'text-green-500' : 'text-gray-400'}`} size={20} />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="What's this about?"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transform origin-left transition-transform duration-300 ${focusedField === 'subject' ? 'scale-x-100' : 'scale-x-0'}`} />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="group relative">
                    <div className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${focusedField === 'message' ? 'opacity-20' : ''}`} />
                    <div className="relative">
                      <MessageSquare className={`absolute left-4 top-6 transition-colors duration-300 ${focusedField === 'message' ? 'text-pink-500' : 'text-gray-400'}`} size={20} />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell me about your amazing idea..."
                        rows={5}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                        required
                      />
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transform origin-left transition-transform duration-300 ${focusedField === 'message' ? 'scale-x-100' : 'scale-x-0'}`} />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                          <span>Sending your message...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} className="mr-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </Button>
                </form>

                {/* Message Counter */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Character count: {formData.message.length} |
                    <span className="text-blue-600 ml-1">
                      {formData.message.length > 100 ? 'Detailed message' : 'More details recommended'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;
