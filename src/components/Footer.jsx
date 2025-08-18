import { useState } from 'react';
import { ChevronUp, Heart, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Muhammad Abdullah Uzair
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Software Engineering student passionate about creating innovative web solutions 
                and building amazing user experiences with modern technologies.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/mabdullahuzair"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abdullah-uzair-2a18b9278/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:abdullahuzair860@gmail.com"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: 'About', href: '#about' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Experience', href: '#experience' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Education', href: '#education' },
                  { name: 'Contact', href: '#contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => {
                        const element = document.querySelector(link.href);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="text-gray-600 dark:text-gray-300 hover:text-purple-400 transition-colors duration-300 text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Get In Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Mail size={16} className="mr-3 text-purple-400" />
                  <span>abdullahuzair860@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4 mr-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+92 303 467 3255</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-4 h-4 mr-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Lahore, Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
                <span>© {currentYear} Muhammad Abdullah Uzair. Made with</span>
                <Heart size={16} className="mx-2 text-red-500 animate-pulse" />
                <span>and lots of coffee ☕</span>
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                <span>Built with React.js & Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <ChevronUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;
