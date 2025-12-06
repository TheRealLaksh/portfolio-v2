import React, { useRef } from 'react';
import { experienceData } from '../../data/timelineData';
import { TextReveal } from '../ui/TextReveal';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Parallax } from '../ui/Parallax';

const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" ref={containerRef} className="py-32 relative overflow-hidden">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-32">
          <TextReveal className="flex justify-center">
             <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
               Mission History
             </h2>
          </TextReveal>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative w-full max-w-6xl mx-auto">
          
          {/* Central Timeline Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 md:-translate-x-1/2 rounded-full z-0">
            <motion.div 
              className="w-full bg-gradient-to-b from-sky-500 via-purple-500 to-teal-500 origin-top h-full shadow-[0_0_15px_rgba(14,165,233,0.5)]"
              style={{ scaleY }}
            ></motion.div>
          </div>

          {experienceData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const themeColor = item.theme || 'sky'; 

            return (
              <TimelineItem 
                key={item.id} 
                item={item} 
                isLeft={isLeft} 
                themeColor={themeColor} 
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Sub-Component for Individual Cards ---
const TimelineItem = ({ item, isLeft, themeColor }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative mb-24 flex flex-col md:flex-row items-center justify-between w-full ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      
      {/* 1. Empty Spacer for Layout Balance */}
      <div className="hidden md:block md:w-5/12" />

      {/* 2. Center Node (The Dot) */}
      <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 z-20 flex items-center justify-center">
         <div className={`w-3 h-3 rounded-full bg-[#050505] border-2 border-${themeColor}-500 shadow-[0_0_10px_currentColor] text-${themeColor}-500`}></div>
      </div>

      {/* 3. The Content Card */}
      <div className="w-full md:w-5/12 pl-12 md:pl-0 relative group perspective-1000">
         
         {/* LASER BEAM CONNECTION */}
         <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ margin: "-20%" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`absolute top-8 h-[2px] bg-${themeColor}-500/50 shadow-[0_0_10px_currentColor] z-0 hidden md:block
              ${isLeft ? 'right-0 origin-right w-[40px] -mr-[40px]' : 'left-0 origin-left w-[40px] -ml-[40px]'}`}
         />

         {/* PARALLAX BACKGROUND DATE */}
         <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none select-none z-0 
            ${isLeft ? '-right-20 md:-right-32 text-right' : '-left-20 md:-left-32 text-left'} hidden md:block`}>
            <Parallax speed={0.1}>
              <span className="text-8xl font-black text-white/5 font-mono tracking-tighter whitespace-nowrap">
                {item.bgDate}
              </span>
            </Parallax>
         </div>

         {/* MAIN CARD - FOCUS MODE */}
         <motion.div
            initial={{ filter: "brightness(0.5) blur(2px)", scale: 0.95 }}
            whileInView={{ filter: "brightness(1) blur(0px)", scale: 1 }}
            viewport={{ margin: "-20% 0px -20% 0px" }} // Focuses when in center
            transition={{ duration: 0.4 }}
            className={`relative bg-zinc-900/80 backdrop-blur-xl border border-white/5 p-8 rounded-2xl overflow-hidden
              hover:border-${themeColor}-500/50 hover:shadow-[0_0_30px_-10px_rgba(var(--${themeColor}-500),0.3)] transition-all duration-300 group-hover:-translate-y-1`}
         >
            {/* Holographic Scanline Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none"></div>

            {/* Header: Date & Role */}
            <div className="flex flex-col gap-1 mb-4 relative z-10">
               <div className={`inline-flex items-center gap-2 text-xs font-mono text-${themeColor}-400 mb-2`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                  {item.date}
               </div>
               <h3 className="text-2xl font-bold text-white">{item.title}</h3>
               <div className="flex items-center gap-2 text-slate-400 font-medium">
                  {/* COMPANY LOGO PROJECTION */}
                  <div className="relative w-6 h-6 rounded overflow-hidden border border-white/10 group-hover:border-${themeColor}-500/50 transition-colors">
                     <img src={item.logo} alt={item.company} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                     {/* Glitch Overlay */}
                     <div className="absolute inset-0 bg-${themeColor}-500 mix-blend-color opacity-0 group-hover:opacity-20"></div>
                  </div>
                  <span>{item.company}</span>
               </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10">
               {item.description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 relative z-10">
               {item.skills.map((skill, i) => (
                  <span key={i} className={`px-3 py-1 text-[10px] font-mono rounded border border-${themeColor}-500/20 bg-${themeColor}-500/5 text-${themeColor}-300`}>
                     {skill}
                  </span>
               ))}
            </div>

            {/* Decorative Corners */}
            <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l border-${themeColor}-500/30 rounded-tl-lg`}></div>
            <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r border-${themeColor}-500/30 rounded-br-lg`}></div>

         </motion.div>
      </div>

    </motion.div>
  );
};

export default Experience;