import React, { useEffect, useRef } from 'react';
import { experienceData } from '../../data/timelineData';
import { TextReveal } from '../ui/TextReveal';
import { Reveal } from '../ui/Reveal';

const Experience = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (lineRef.current) {
        const rect = lineRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        let percent = (windowHeight - rect.top) / (windowHeight + rect.height);
        percent = Math.min(Math.max(percent, 0), 1);
        lineRef.current.style.transform = `scaleY(${percent * 1.5})`; 
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6">
        
        {/* Header with Text Reveal */}
        <div className="text-center mb-24">
          <TextReveal className="flex justify-center">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Work Experience</h2>
          </TextReveal>
          <Reveal delay={0.2}>
            <div className="h-1 w-20 bg-gradient-to-r from-sky-500 to-purple-500 mx-auto rounded-full"></div>
          </Reveal>
        </div>

        <div className="relative w-full max-w-5xl mx-auto timeline-container">
          
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 md:-translate-x-1/2 ml-5 md:ml-0 overflow-hidden">
            <div 
              ref={lineRef}
              className="w-full bg-gradient-to-b from-sky-500 via-purple-500 to-teal-500 origin-top scale-y-0 transition-transform duration-100 ease-out h-full"
              id="timeline-line-fill"
            ></div>
          </div>

          {experienceData.map((item, index) => {
            const isLeft = index % 2 === 0;
            const themeColor = item.theme || 'sky'; 

            return (
              <div key={item.id} className="timeline-item relative mb-16 flex flex-col md:flex-row items-center justify-between w-full group">
                
                {!isLeft && <div className="md:w-5/12 order-1 hidden md:block"></div>}

                <div className={`md:w-5/12 w-full pl-14 md:pl-0 ${isLeft ? 'md:pr-10 order-2 md:order-1' : 'md:pl-10 order-2 md:order-3'}`}>
                  
                  {/* Animated Card Fly-In */}
                  <Reveal delay={index * 0.1}>
                    <div 
                        className={`bg-zinc-900/60 backdrop-blur-xl p-6 rounded-2xl border border-white/5 transition-all duration-300 hover:bg-zinc-900/90 hover:-translate-y-1 group-hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)]
                        hover:border-${themeColor}-500/30 group-hover:shadow-${themeColor}-500/10`}
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                        <span className={`text-${themeColor}-400 text-xs font-mono border border-${themeColor}-500/20 bg-${themeColor}-500/10 px-3 py-1 rounded-full`}>
                            {item.date}
                        </span>
                        <span className="hidden sm:block h-px flex-grow bg-white/5 mx-4"></span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                        <div className="text-slate-400 text-sm font-medium mb-4 flex items-center gap-2">
                        <svg className={`w-4 h-4 text-${themeColor}-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {item.company}
                        </div>

                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, i) => (
                            <span key={i} className="text-[11px] text-slate-300 bg-slate-800/50 border border-white/5 px-2.5 py-1 rounded-md hover:text-white transition-colors">
                            {skill}
                            </span>
                        ))}
                        </div>
                    </div>
                  </Reveal>
                </div>

                {/* Center Dot (Static) */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-10 h-10 flex items-center justify-center ml-0 order-1 z-10 bg-[#050505]">
                  <div className={`w-4 h-4 bg-${themeColor}-500 rounded-full ring-4 ring-${themeColor}-500/20 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_15px_currentColor] text-${themeColor}-500`}></div>
                </div>

                {isLeft && <div className="md:w-5/12 order-3 hidden md:block"></div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;