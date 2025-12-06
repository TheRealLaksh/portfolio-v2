import React, { useEffect, useState } from 'react';
import { FiHome, FiUser, FiBriefcase, FiCpu, FiCode, FiFileText, FiMail } from 'react-icons/fi';
import useScrollSpy from '../../hooks/useScrollSpy';
import { cn } from '../../utils/cn';
import { triggerWarp } from '../../utils/triggerWarp';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Define the IDs to track
  const navIds = ['home', 'about', 'experience', 'skills', 'projects', 'resume', 'contact'];
  const activeSection = useScrollSpy(navIds);

  // Handle scroll appearance (optional, adds extra blur on scroll)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    triggerWarp(); // Trigger the 3D Warp Effect
    
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Slight delay to allow warp to start visually
    }
  };

  // Helper for the link classes to keep JSX clean
  const getLinkClass = (id) => cn(
    "relative flex items-center rounded-full md:rounded-xl px-3 py-2.5 md:px-2 md:py-2 text-sm font-medium transition-all duration-300 shrink-0 group hover:bg-white/5",
    activeSection === id 
      ? "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]" 
      : "text-slate-400 hover:text-slate-200"
  );

  const getTextClass = (id) => cn(
    "overflow-hidden transition-all duration-300 ease-in-out",
    activeSection === id 
      ? "w-auto opacity-100 ml-2" 
      : "w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 group-hover:ml-2"
  );

  return (
    <nav className="fixed bottom-6 md:bottom-auto md:top-6 left-1/2 -translate-x-1/2 z-50 
      flex flex-nowrap items-center gap-1 
      rounded-full md:rounded-2xl 
      border border-white/10 bg-black/20 backdrop-blur-xl 
      p-2 shadow-2xl shadow-black/50 
      transition-all duration-300 
      max-w-[95vw] overflow-x-auto no-scrollbar"
    >
      
      {/* --- Home --- */}
      <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className={getLinkClass('home')}>
        <FiHome className="w-5 h-5" />
        <span className={getTextClass('home')}>Home</span>
      </a>

      {/* Divider */}
      <div className="mx-1 h-6 w-[1px] bg-white/10 shrink-0"></div>

      {/* --- Main Info Group --- */}
      <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={getLinkClass('about')}>
        <FiUser className="w-5 h-5" />
        <span className={getTextClass('about')}>About</span>
      </a>

      <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className={getLinkClass('experience')}>
        <FiBriefcase className="w-5 h-5" />
        <span className={getTextClass('experience')}>Work</span>
      </a>

      <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className={getLinkClass('skills')}>
        <FiCpu className="w-5 h-5" />
        <span className={getTextClass('skills')}>Skills</span>
      </a>

      <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className={getLinkClass('projects')}>
        <FiCode className="w-5 h-5" />
        <span className={getTextClass('projects')}>Projects</span>
      </a>

      {/* Divider */}
      <div className="mx-1 h-6 w-[1px] bg-white/10 shrink-0"></div>

      {/* --- Action Group --- */}
      <a href="#resume" onClick={(e) => scrollToSection(e, 'resume')} className={getLinkClass('resume')}>
        <FiFileText className="w-5 h-5" />
        <span className={getTextClass('resume')}>Resume</span>
      </a>

      <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className={getLinkClass('contact')}>
        <FiMail className="w-5 h-5" />
        <span className={getTextClass('contact')}>Contact</span>
      </a>

    </nav>
  );
};

export default Navbar;