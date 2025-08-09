import { useState, useEffect, useRef } from 'react';
import { Terminal, Minimize2, Maximize2, X, User, Bot } from 'lucide-react';

const TerminalBot = ({ isOpen: propIsOpen, setIsOpen: propSetIsOpen }) => {
  const [isOpen, setIsOpen] = useState(propIsOpen || false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to AbdullahBot Terminal v1.0.0' },
    { type: 'system', content: 'Type "help" to see available commands' },
    { type: 'prompt', content: 'abdullah@portfolio:~$ ' }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Sync with prop changes
  useEffect(() => {
    if (propIsOpen !== undefined) {
      setIsOpen(propIsOpen);
    }
  }, [propIsOpen]);

  // Bot knowledge base about Abdullah
  const abdullahInfo = {
    name: 'Muhammad Abdullah Uzair',
    title: 'Software Engineering Student & Full-Stack Developer',
    education: 'Software Engineering at University of Central Punjab (CGPA: 3.6)',
    experience: [
      'Web Designer Intern at LevelUp Solutions (April 2024 - July 2024)',
      'SEO Specialist at Web20Ranker (July 2024 - April 2025)'
    ],
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'PHP', 'Python', 'C++', 'MongoDB', 'MySQL'],
    projects: ['LevelUpSol.com.pk', 'XRevStudio.com', 'ObecheInterior.com', 'CricketX', 'MacroMate'],
    contact: {
      email: 'abdullahuzair860@gmail.com',
      phone: '+92 303 467 3255',
      location: 'Lahore, Pakistan',
      github: 'github.com/mabdullahuzair'
    }
  };

  // Command processor
  const processCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    const args = command.split(' ');
    const baseCommand = args[0];

    // Add to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Add user input to terminal
    const newHistory = [
      ...history,
      { type: 'input', content: `abdullah@portfolio:~$ ${cmd}` }
    ];

    let response = '';

    switch (baseCommand) {
      case 'help':
        response = `Available commands:
  help          - Show this help message
  about         - Learn about Abdullah
  skills        - View technical skills
  projects      - List projects
  experience    - Work experience
  education     - Educational background
  contact       - Contact information
  whoami        - Current user info
  clear         - Clear terminal
  date          - Show current date
  pwd           - Print working directory
  ls            - List directory contents
  cat           - Display file contents
  echo          - Display text
  hello/hi/hey  - Greet the bot
  joke          - Tell a programming joke
  quote         - Inspirational quote
  exit          - Close terminal`;
        break;

      case 'about':
        response = `${abdullahInfo.name}
${abdullahInfo.title}

A passionate software engineering student with expertise in full-stack development.
Currently pursuing Bachelor's degree with a strong academic record (CGPA: 3.6).
Experienced in modern web technologies and committed to creating innovative solutions.`;
        break;

      case 'skills':
        response = `Technical Skills:
Frontend: ${abdullahInfo.skills.slice(0, 6).join(', ')}
Backend: ${abdullahInfo.skills.slice(6, 10).join(', ')}
Languages: JavaScript, Python, C++, PHP
Databases: MongoDB, MySQL
Tools: Git, VS Code, Postman`;
        break;

      case 'projects':
        response = `Recent Projects:
${abdullahInfo.projects.map((project, index) => `${index + 1}. ${project}`).join('\n')}

Total: 5+ completed projects
Use 'cat project_name' for details about specific projects.`;
        break;

      case 'experience':
        response = `Work Experience:
${abdullahInfo.experience.map((exp, index) => `${index + 1}. ${exp}`).join('\n')}

Total Experience: 1+ years in web development and SEO optimization.`;
        break;

      case 'education':
        response = `Education:
• ${abdullahInfo.education}
• FSc Pre Engineering - Govt. College of Science Lahore (2019-2021)

Expected Graduation: 2026`;
        break;

      case 'contact':
        response = `Contact Information:
Email: ${abdullahInfo.contact.email}
Phone: ${abdullahInfo.contact.phone}
Location: ${abdullahInfo.contact.location}
GitHub: ${abdullahInfo.contact.github}`;
        break;

      case 'whoami':
        response = 'abdullah';
        break;

      case 'pwd':
        response = '/home/abdullah/portfolio';
        break;

      case 'ls':
        response = 'about.txt  projects/  skills.txt  contact.txt  resume.pdf';
        break;

      case 'date':
        response = new Date().toString();
        break;

      case 'clear':
        setHistory([
          { type: 'system', content: 'Terminal cleared' },
          { type: 'prompt', content: 'abdullah@portfolio:~$ ' }
        ]);
        return;

      case 'cat':
        if (args[1]) {
          const filename = args[1].toLowerCase();
          if (filename.includes('about')) {
            response = `Name: ${abdullahInfo.name}\nTitle: ${abdullahInfo.title}\nLocation: ${abdullahInfo.contact.location}`;
          } else if (filename.includes('skills')) {
            response = `Skills: ${abdullahInfo.skills.join(', ')}`;
          } else if (filename.includes('contact')) {
            response = `Email: ${abdullahInfo.contact.email}\nPhone: ${abdullahInfo.contact.phone}`;
          } else {
            response = `cat: ${args[1]}: No such file or directory`;
          }
        } else {
          response = 'cat: missing file operand';
        }
        break;

      case 'echo':
        response = args.slice(1).join(' ');
        break;

      case 'hello':
      case 'hi':
      case 'hey':
        const greetings = [
          'Hello! I\'m AbdullahBot, your personal assistant!',
          'Hi there! Ready to learn about Abdullah?',
          'Hey! Welcome to Abdullah\'s interactive terminal!',
          'Greetings! How can I help you today?'
        ];
        response = greetings[Math.floor(Math.random() * greetings.length)];
        break;

      case 'joke':
        const jokes = [
          'Why do programmers prefer dark mode? Because light attracts bugs!',
          'How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
          'Why don\'t programmers like nature? It has too many bugs!',
          '99 little bugs in the code, 99 little bugs. Take one down, patch it around, 117 little bugs in the code!'
        ];
        response = jokes[Math.floor(Math.random() * jokes.length)];
        break;

      case 'quote':
        const quotes = [
          '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
          '"First, solve the problem. Then, write the code." - John Johnson',
          '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
          '"The best error message is the one that never shows up." - Thomas Fuchs'
        ];
        response = quotes[Math.floor(Math.random() * quotes.length)];
        break;

      case 'exit':
        if (propSetIsOpen) {
          propSetIsOpen(false);
        } else {
          setIsOpen(false);
        }
        return;

      case '':
        // Empty command, just show new prompt
        break;

      default:
        response = `bash: ${baseCommand}: command not found
Type 'help' to see available commands.`;
    }

    // Add response and new prompt
    const updatedHistory = [
      ...newHistory,
      ...(response ? [{ type: 'output', content: response }] : []),
      { type: 'prompt', content: 'abdullah@portfolio:~$ ' }
    ];

    setHistory(updatedHistory);
  };

  // Handle input submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input);
      setInput('');
      // Ensure cursor focus after command execution
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  // Auto-scroll to bottom and maintain focus
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
    // Maintain focus on input after history updates
    if (isOpen && !isMinimized && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 50);
    }
  }, [history, isOpen, isMinimized]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-20 z-50">
      </div>
    );
  }

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isMinimized
        ? 'bottom-4 right-20 w-72 h-12 sm:bottom-6 sm:right-20 sm:w-80'
        : propIsOpen
          ? 'inset-0 flex items-center justify-center p-4'
          : 'bottom-4 right-4 left-4 top-20 sm:bottom-6 sm:right-20 sm:left-auto sm:top-auto sm:w-full sm:max-w-2xl sm:h-96 md:w-[600px] md:h-[500px]'
    }`}>
      {propIsOpen && !isMinimized && (
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => propSetIsOpen && propSetIsOpen(false)}
        />
      )}
      <div className={`bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden h-full flex flex-col terminal-responsive gpu-accelerated ${
        propIsOpen && !isMinimized ? 'relative z-10 w-full max-w-4xl max-h-[80vh]' : ''
      }`}>
        {/* Terminal Header */}
        <div className="bg-gray-800 px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex space-x-1 sm:space-x-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 text-gray-300">
              <Bot size={14} className="sm:w-4 sm:h-4" />
              <span className="font-mono text-xs sm:text-sm">AbdullahBot Terminal</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-gray-400 hover:text-white transition-colors duration-200 p-1"
            >
              {isMinimized ? <Maximize2 size={14} className="sm:w-4 sm:h-4" /> : <Minimize2 size={14} className="sm:w-4 sm:h-4" />}
            </button>
            <button
              onClick={() => {
                if (propSetIsOpen) {
                  propSetIsOpen(false);
                } else {
                  setIsOpen(false);
                }
              }}
              className="text-gray-400 hover:text-red-400 transition-colors duration-200 p-1"
            >
              <X size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        {!isMinimized && (
          <>
            <div 
              ref={terminalRef}
              className="flex-1 p-3 sm:p-4 overflow-y-auto bg-gray-900 font-mono text-xs sm:text-sm terminal-mobile"
            >
              {history.map((entry, index) => (
                <div key={index} className="mb-1">
                  {entry.type === 'system' && (
                    <div className="text-green-400">{entry.content}</div>
                  )}
                  {entry.type === 'input' && (
                    <div className="text-white break-all">{entry.content}</div>
                  )}
                  {entry.type === 'output' && (
                    <div className="text-gray-300 whitespace-pre-line break-words">{entry.content}</div>
                  )}
                  {entry.type === 'prompt' && index === history.length - 1 && (
                    <form onSubmit={handleSubmit} className="flex items-center">
                      <span className="text-green-400 mr-1 sm:mr-2 flex-shrink-0">{entry.content}</span>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent text-white outline-none font-mono text-xs sm:text-sm min-w-0"
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </form>
                  )}
                  {entry.type === 'prompt' && index !== history.length - 1 && (
                    <div className="text-green-400">{entry.content}</div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TerminalBot;
