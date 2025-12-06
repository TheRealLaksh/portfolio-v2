import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Random progress increment logic
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Add random amount between 1 and 4
        const increment = Math.floor(Math.random() * 4) + 1;
        const next = prev + increment;
        
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Trigger completion callback when progress hits 100
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        onComplete();
      }, 700); // 700ms delay before unmounting
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    >
      {/* SVG Text Container */}
      <div className="relative mb-12 w-full max-w-3xl px-4">
        <svg viewBox="0 0 400 100" className="w-full h-auto">
          {/* Defs for gradients/masks */}
          <defs>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#facc15" /> {/* Yellow */}
              <stop offset="25%" stopColor="#ef4444" /> {/* Red */}
              <stop offset="50%" stopColor="#22c55e" /> {/* Green */}
              <stop offset="75%" stopColor="#06b6d4" /> {/* Cyan */}
              <stop offset="100%" stopColor="#a855f7" /> {/* Purple */}
            </linearGradient>
            
            <mask id="spotlightMask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" opacity="0.1" />
              {/* The moving spotlight circle */}
              <motion.circle 
                r="40" 
                fill="white"
                initial={{ cx: 0, cy: 50 }}
                animate={{ cx: 400 }}
                transition={{ 
                  duration: 2.5, 
                  ease: "linear", 
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
              />
            </mask>
          </defs>

          {/* Layer 1: Base Gray Text */}
          <text 
            x="50%" y="50%" 
            dy=".35em" 
            textAnchor="middle" 
            className="text-7xl font-bold fill-transparent stroke-gray-500/30"
            strokeWidth="0.5"
          >
            LAKSH
          </text>

          {/* Layer 2: Animated Gradient Reveal */}
          <text 
            x="50%" y="50%" 
            dy=".35em" 
            textAnchor="middle" 
            className="text-7xl font-bold fill-transparent stroke-[url(#textGradient)]"
            strokeWidth="0.5"
            mask="url(#spotlightMask)"
          >
            LAKSH
          </text>
        </svg>
      </div>

      {/* Progress Bar Container */}
      <div className="w-64 h-1 bg-slate-900 border border-slate-800 rounded-full overflow-hidden relative shadow-[0_0_10px_rgba(14,165,233,0.2)]">
        {/* Fill */}
        <div 
          className="h-full bg-sky-500 transition-all duration-75 ease-out shadow-[0_0_10px_#0ea5e9]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage Text */}
      <div className="mt-4 font-mono text-xs text-slate-500">
        INITIALIZING SYSTEM <span className="text-sky-400">[{progress}%]</span>
      </div>
    </motion.div>
  );
};

export default Preloader;