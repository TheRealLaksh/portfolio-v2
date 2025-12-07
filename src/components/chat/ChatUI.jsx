import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { FiMessageSquare, FiMail, FiExternalLink, FiCopy } from 'react-icons/fi';
import { triggerHaptic } from '../../utils/triggerHaptic';

// --- LOADING WAVE ---
export const TypingWave = () => (
  <div className="flex gap-1 items-center h-4 px-2">
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        className="w-1 bg-sky-400 rounded-full"
        animate={{ height: ["4px", "12px", "4px"], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

// --- ACTION CHIP BUTTON ---
export const ActionChip = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all active:scale-95 text-xs font-medium text-slate-300 hover:text-sky-300"
  >
    <Icon size={14} className="opacity-70 group-hover:opacity-100" />
    <span>{label}</span>
  </button>
);

// --- MESSAGE BUBBLE ---
export const ChatBubble = ({ msg }) => {
  if (msg.type === 'contact') return <ContactCard />;

  const isUser = msg.sender === 'You';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed shadow-sm ${
        isUser 
          ? 'bg-gradient-to-br from-sky-600 to-blue-600 text-white rounded-br-sm shadow-sky-900/20' 
          : 'bg-slate-800/80 text-slate-200 border border-white/5 rounded-bl-sm'
      }`}>
        {msg.type === 'mdx' ? (
          <div className="prose prose-invert prose-p:my-1 text-[13px] prose-a:text-sky-300 prose-code:bg-black/30 prose-code:rounded prose-code:px-1">
            <ReactMarkdown>{String(msg.content)}</ReactMarkdown>
          </div>
        ) : msg.content}
      </div>
    </div>
  );
};

// --- CONTACT CARD ---
const ContactCard = () => {
  const handleCopy = () => {
    navigator.clipboard.writeText('contact@lakshp.live');
    triggerHaptic();
  };

  return (
    <div className="w-[260px] bg-slate-900/80 backdrop-blur-xl border border-sky-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/10 mb-2">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-4 pb-6 relative">
        <div className="absolute top-0 right-0 p-3 opacity-30"><FiMessageSquare size={40} /></div>
        <h4 className="text-white font-bold text-lg">Let's Connect</h4>
        <p className="text-sky-100 text-xs opacity-90">I'm open for work!</p>
      </div>
      <div className="p-4 -mt-4 relative z-10 space-y-3">
        <button onClick={handleCopy} className="w-full group flex items-center justify-between bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl p-3 transition-all active:scale-95">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400"><FiMail size={14} /></div>
            <div className="text-left"><div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email</div><div className="text-xs text-white">contact@lakshp.live</div></div>
          </div>
          <FiCopy className="text-slate-500 group-hover:text-white" />
        </button>
        <a href="https://linkedin.com/in/laksh-pradhwani" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl p-3 transition-all active:scale-95">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><FiExternalLink size={14} /></div>
          <span className="text-sm text-white font-medium">LinkedIn Profile</span>
        </a>
      </div>
    </div>
  );
};