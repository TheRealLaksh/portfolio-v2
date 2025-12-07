import React from 'react';
import Tilt from 'react-parallax-tilt';
import { TextReveal } from '../ui/TextReveal';
import { Reveal } from '../ui/Reveal';
import { Parallax } from '../ui/Parallax';
import { skillsData } from '../../data/skillsData'; 
import { triggerHaptic } from '../../utils/triggerHaptic';

const Skills = () => {
  // FIX: Map skill names to the static CSS classes defined in index.css
  const getGlowClass = (skillName) => {
    const map = {
      "Python": "glow-python",
      "Django": "glow-django",
      "JavaScript": "glow-js",
      "HTML5": "glow-html",
      "CSS3": "glow-css",
      "Firebase": "glow-firebase",
      "Kali Linux": "glow-kali",
      "Cybersecurity": "glow-security",
      "Gen AI": "glow-ai",
      "Databases": "glow-db",
      "Git": "glow-git",
      "GitHub": "glow-github"
    };
    return map[skillName] || "group-hover:border-white/50 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]";
  };

  return (
    <section id="skills" className="my-20 md:my-32 relative z-10 overflow-hidden w-full">
      
      {/* Background Number - Aligned Left-4 */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <Parallax speed={-0.2} className="absolute top-[5%] left-4 text-slate-800/50 text-6xl font-bold font-mono opacity-20">04</Parallax>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">

        <div className="text-center mb-12 md:mb-24">
          <TextReveal className="flex justify-center">
             <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500 inline-block mb-4 md:mb-6 tracking-tight">
                Technical Arsenal
             </h2>
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-xl font-light">
                My weapons of choice for building futuristic digital products.
            </p>
          </Reveal>
        </div>

        {/* Grid: 2 cols on mobile, 3 on tablet, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-10">
          
          {skillsData.map((skill, index) => (
             <Reveal key={index} delay={index * 0.05}>
                {/* Enabled Gyroscope for mobile tilt effect */}
                <Tilt 
                    tiltMaxAngleX={15} 
                    tiltMaxAngleY={15} 
                    scale={1.02} 
                    transitionSpeed={1000} 
                    gyroscope={true} 
                    className="h-full"
                >
                    <div 
                        onClick={triggerHaptic}
                        className="skill-card-glass group rounded-2xl md:rounded-3xl p-4 md:p-8 flex flex-col items-center justify-center gap-3 md:gap-6 relative overflow-hidden h-full aspect-[4/3] border border-white/5 bg-slate-900/60 backdrop-blur-md hover:bg-slate-800/80 transition-all duration-300 active:scale-95"
                    >
                        {/* FIX: Applied static class from helper instead of dynamic template literal */}
                        <div className={`absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-300 ${getGlowClass(skill.name)}`}></div>
                        
                        <div className="text-4xl md:text-6xl relative z-10 transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }}>
                            <skill.icon />
                        </div>
                        
                        <h3 className="font-bold text-slate-300 relative z-10 group-hover:text-white transition-colors text-sm md:text-2xl tracking-wide">
                            {skill.name}
                        </h3>
                    </div>
                </Tilt>
             </Reveal>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Skills;