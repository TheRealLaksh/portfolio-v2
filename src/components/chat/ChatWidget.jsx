import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  FiMessageSquare, FiX, FiSend, FiCopy, FiExternalLink, 
  FiBriefcase, FiMaximize2, FiMinimize2 
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import resumeFile from '../../assets/resume/laksh.pradhwani.resume.pdf'; 

// API Configuration
const API_URL = 'https://aiapi.ishan.vip/api/chat';
const API_KEY = 'oqLZh!P`U61f,m4iV?l556.N&O`A%%h';

// --- COMPONENTS ---

// 1. Liquid Wave Typing Indicator
const TypingWave = () => (
  <div className="flex gap-1 items-center h-4 px-2">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="w-1 bg-sky-400 rounded-full"
        animate={{
          height: ["4px", "12px", "4px"],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.15
        }}
      />
    ))}
  </div>
);

// 2. Holographic Action Chip
const ActionChip = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all active:scale-95 text-[11px] text-slate-300 hover:text-sky-300 hover:shadow-[0_0_10px_rgba(14,165,233,0.15)]"
  >
    <Icon size={12} className="opacity-70 group-hover:opacity-100" />
    <span>{label}</span>
  </button>
);

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // --- BOOT SEQUENCE STATE ---
  const [hasBooted, setHasBooted] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootLines, setBootLines] = useState([]);

  // --- CHAT STATE ---
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('auroraChatMessages');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  });

  const [userId, setUserId] = useState(() => {
    try {
      return localStorage.getItem('auroraUserId') || '';
    } catch {
      return '';
    }
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Ref for auto-scroll
  const messagesEndRef = useRef(null);

  // --- EFFECTS ---
  useEffect(() => {
    if (!userId) {
      const newUserId = 'user-' + Date.now();
      setUserId(newUserId);
      localStorage.setItem('auroraUserId', newUserId);
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('auroraChatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, isLoading, isOpen, isExpanded]);

  // --- BOOT SEQUENCE LOGIC ---
  useEffect(() => {
    if (isOpen && !hasBooted) {
      setIsBooting(true);
      setBootLines([]); 

      const logs = [
        "> INITIALIZING NEURAL UPLINK...",
        "> CONNECTING TO LAKSH_CORE...",
        "> SECURITY HANDSHAKE::VERIFIED",
        "> ESTABLISHING SECURE CHANNEL..."
      ];

      let lineIndex = 0;
      const interval = setInterval(() => {
        if (lineIndex < logs.length) {
          setBootLines((prev) => [...prev, logs[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsBooting(false);
            setHasBooted(true);
          }, 800);
        }
      }, 350); 

      return () => clearInterval(interval);
    }
  }, [isOpen, hasBooted]);

  // --- ACTIONS ---
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@lakshp.live');
    setChatMessages(prev => [...prev, { sender: 'Aurora', content: '📧 Email copied to clipboard!', type: 'text' }]);
  };

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    window.open(resumeFile, '_blank');
  };

  // --- HANDLERS ---
  const sendMessage = async () => {
    const message = input.trim();
    if (!message || isLoading) return;

    setInput('');
    setChatMessages((prev) => [
      ...prev,
      { sender: 'You', content: message, type: 'text' },
    ]);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ message, userId }),
      });

      if (!response.ok) throw new Error('Failed');

      const data = await response.json();
      const aiReply = typeof data?.reply === 'string' ? data.reply : String(data?.reply ?? '');

      setChatMessages((prev) => [
        ...prev, 
        { sender: 'Aurora', content: aiReply, type: 'mdx' }
      ]);
    } catch (error) {
      setChatMessages((prev) => [
        ...prev, 
        { sender: 'Aurora', content: 'Error. Please try again.', type: 'text' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = async () => {
    setChatMessages([]);
    localStorage.removeItem('auroraChatMessages');
    try {
      await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ userId }),
      });
    } catch (e) { /* ignore */ }
  };

  const handleInnerWheel = (e) => {
    const el = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    el.scrollTop += e.deltaY;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* CHAT WINDOW */}
      <AnimatePresence>
      {isOpen && (
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            // Dynamic Size based on isExpanded
            className={`mb-4 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-500 ease-in-out
              ${isExpanded 
                ? 'w-[90vw] md:w-[600px] h-[70vh] md:h-[700px]' 
                : 'w-[360px] max-w-[90vw] h-[500px]'
              }`}
            style={{ 
                background: 'rgba(5, 5, 5, 0.85)', 
                backdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
            }}
        >
          
          {/* Subtle Noise Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

          {isBooting ? (
            // --- BOOT SEQUENCE ---
            // FIXED: h-full to fill container
            <div className="flex-1 flex flex-col justify-center items-start h-full font-mono text-[11px] leading-6 p-6 text-sky-400 tracking-wide select-none z-10">
              {bootLines.map((line, index) => (
                <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                >
                  <span className="text-sky-600">➜</span> {line}
                </motion.div>
              ))}
              <div className="w-2 h-4 bg-sky-400/80 mt-1 animate-pulse" />
            </div>
          ) : (
            // --- MAIN INTERFACE ---
            // FIXED: h-full to fill container
            <div className="relative z-10 flex flex-col h-full">
              
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-white/5 backdrop-blur-md">
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                    </span>
                    AI Laksh
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium tracking-wide ml-4">
                    Online and Ready • v2.0.4
                  </p>
                </div>
                
                <div className="flex gap-2">
                  {/* Resize Button */}
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                    title={isExpanded ? "Minimize" : "Expand"}
                  >
                    {isExpanded ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
                  </button>

                  <button onClick={clearChat} className="text-[10px] font-medium text-slate-400 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/5 transition-all">
                    Reset
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar scroll-smooth" onWheel={handleInnerWheel}>
                
                {/* Empty State with Quick Chips - FIX: Removed Logo */}
                {chatMessages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <p className="text-sm text-slate-200 font-medium mb-1">System Ready</p>
                    <p className="text-xs text-slate-500 mb-6 max-w-[200px]">
                        I can explain Laksh's tech stack, experience, or just chat about AI.
                    </p>
                    
                    {/* 4. Quick Action Chips */}
                    <div className="flex flex-wrap justify-center gap-2 max-w-[250px]">
                        <ActionChip icon={FiBriefcase} label="View Projects" onClick={handleViewProjects} />
                        <ActionChip icon={FiCopy} label="Copy Email" onClick={handleCopyEmail} />
                        <ActionChip icon={FiExternalLink} label="Resume" onClick={handleDownloadResume} />
                    </div>
                  </div>
                )}
                
                {/* 3. "Snap" Scroll Physics Messages */}
                <AnimatePresence initial={false}>
                    {chatMessages.map((message, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm backdrop-blur-sm 
                        ${message.sender === 'You' 
                            ? 'bg-gradient-to-br from-sky-600 to-indigo-600 text-white rounded-br-sm shadow-sky-900/20' 
                            : 'bg-slate-800/60 text-slate-200 border border-white/5 rounded-bl-sm'
                        }`}>
                        {message.type === 'mdx' ? (
                            <div className="prose prose-invert prose-p:my-1 text-[13px] prose-a:text-sky-400 prose-code:bg-black/30 prose-code:rounded prose-code:px-1">
                                <ReactMarkdown>{String(message.content)}</ReactMarkdown>
                            </div>
                        ) : (
                            message.content
                        )}
                        </div>
                    </motion.div>
                    ))}
                </AnimatePresence>

                {/* Loading Indicator */}
                {isLoading && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                    >
                        <div className="bg-slate-800/60 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
                            <TypingWave />
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 pt-2 bg-gradient-to-t from-black/80 to-transparent">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full opacity-0 group-focus-within:opacity-20 transition duration-500 blur-md"></div>
                  <input
                    type="text"
                    className="relative w-full rounded-full border border-white/10 bg-black/60 pl-5 pr-12 py-3.5 text-[13px] text-white outline-none focus:border-sky-500/30 transition-all placeholder:text-slate-600 shadow-inner"
                    placeholder="Ask AI anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button 
                    onClick={sendMessage} 
                    disabled={isLoading || !input.trim()} 
                    className="absolute right-2 top-2 p-2 bg-sky-600 hover:bg-sky-500 rounded-full text-white transition-all disabled:opacity-0 disabled:scale-75 shadow-lg shadow-sky-500/20 active:scale-90"
                  >
                    <FiSend size={14} />
                  </button>
                </div>
              </div>

            </div>
          )}
        </motion.div>
      )}
      </AnimatePresence>

      {/* --- SIDEBAR STYLE BUTTON --- */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group relative flex items-center justify-end w-14 hover:w-36 h-14 rounded-full overflow-hidden transition-all duration-500 ease-out bg-transparent border border-transparent hover:bg-slate-900 hover:border-slate-700 hover:shadow-2xl hover:shadow-sky-500/20 active:scale-95"
        aria-label="Toggle Chat"
      >
        <div className="absolute inset-0 w-full h-full bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="opacity-0 group-hover:opacity-100 text-sky-400 font-medium text-sm whitespace-nowrap transition-all duration-500 delay-100 absolute right-14 pr-2">
          AI Assistant
        </span>
        <div className="w-14 h-14 flex items-center justify-center shrink-0 z-10 text-slate-400 group-hover:text-sky-400 transition-colors duration-300">
          {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
        </div>
      </button>

    </div>
  );
}

export default ChatWidget;