import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import { triggerWarp } from '../../utils/triggerWarp';
import { TextReveal } from '../ui/TextReveal';
import { Parallax } from '../ui/Parallax';

const Hero = () => {
    const typedEl = useRef(null);

    useEffect(() => {
        const typed = new Typed(typedEl.current, {
            strings: ["a Web Developer", "an Aspiring AI/ML Engineer", "a Passionate Learner"],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
        });

        return () => typed.destroy();
    }, []);

    const handleNavClick = (e, id) => {
        e.preventDefault();
        triggerWarp();
        const element = document.getElementById(id);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <section id="home" className="min-h-screen flex flex-col justify-center relative z-10 px-4 sm:px-0 overflow-hidden">
            <div className="w-full max-w-5xl mx-auto text-center">

                {/* 1. Hello Line (Text Reveal) */}
                <TextReveal className="mb-6 flex justify-center">
                    <h2 className="text-3xl sm:text-5xl font-bold text-slate-400">
                        Hello, I'm
                    </h2>
                </TextReveal>

                {/* 2. Name (Parallax) */}
                <Parallax speed={-0.15} className="mb-6">
                    <h1 className="text-6xl sm:text-8xl font-extrabold text-white tracking-tight">
                        Laksh Pradhwani.
                    </h1>
                </Parallax>

                {/* 3. Typed Text (Simple Fade) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-[60px] sm:h-[80px] mb-8"
                >
                    <h2 className="text-3xl sm:text-5xl font-bold text-slate-400">
                        <span ref={typedEl} id="typed-text" className="text-slate-300"></span>
                    </h2>
                </motion.div>

                {/* 4. Description (Text Reveal) */}
                <TextReveal className="mb-12 flex justify-center">
                    <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
                        A passionate Web Developer based in Varanasi - Uttar Pradesh, dedicated to turning innovative
                        ideas into beautiful, high-performance digital solutions.
                    </p>
                </TextReveal>

                {/* 5. Action Buttons (Staggered Up) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-wrap justify-center gap-6 mb-12"
                >
                    {/* View Projects */}
                    <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')} className="group relative w-56 cursor-pointer overflow-hidden rounded-full border border-slate-700 bg-slate-900/50 p-3 text-center font-semibold shadow-lg transition-all duration-300 hover:border-sky-500/50 hover:shadow-sky-500/20">
                        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-slate-300">View Projects</span>
                        <div className="absolute left-5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-sky-600 transition-all duration-500 group-hover:-top-24 group-hover:-left-16 group-hover:h-72 group-hover:w-72 group-hover:translate-y-0"></div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 text-white">
                            <span>View Projects</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </div>
                    </a>

                    {/* Contact Me */}
                    <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="group relative w-56 cursor-pointer overflow-hidden rounded-full border border-slate-700 bg-slate-900/50 p-3 text-center font-semibold shadow-lg transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/20">
                        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-slate-300">Contact Me</span>
                        <div className="absolute left-5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-purple-600 transition-all duration-500 group-hover:-top-24 group-hover:-left-16 group-hover:h-72 group-hover:w-72 group-hover:translate-y-0"></div>
                        <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 text-white">
                            <span>Contact Me</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </div>
                    </a>
                </motion.div>

                {/* 6. Social Links (Staggered Up) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                    className="flex flex-wrap justify-center items-center gap-4 mt-8"
                >
                    <a href="https://github.com/TheRealLaksh" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-start w-12 hover:w-32 h-12 bg-slate-800/50 border border-slate-700 rounded-full overflow-hidden transition-all duration-500 ease-out hover:border-green-500/50 shadow-lg hover:shadow-green-900/20">
                        <div className="absolute inset-0 w-full h-full bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="w-12 h-12 flex items-center justify-center shrink-0 z-10 group-hover:text-green-400 text-slate-400 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2.1c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.5 1.1 3.1.8.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.1-3.3-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3.4 1.2a11.5 11.5 0 0 1 6.2 0c2.5-1.5 3.4-1.2 3.4-1.2.6 1.6.2 2.8.1 3.1.7.9 1.1 2 1.1 3.3 0 4.6-2.8 5.6-5.5 5.9.4.3.8 1 .8 2v3c0 .4.2.7.8.6 4.6-1.5 7.9-5.9 7.9-10.9C23.5 5.65 18.35.5 12 .5z" /></svg>
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 text-green-400 font-medium text-sm whitespace-nowrap transition-all duration-500 delay-100 absolute left-12">GitHub</span>
                    </a>
                    {/* ... (Other social links remain the same structure) ... */}
                    <a href="https://www.linkedin.com/in/laksh-pradhwani" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-start w-12 hover:w-36 h-12 bg-slate-800/50 border border-slate-700 rounded-full overflow-hidden transition-all duration-500 ease-out hover:border-blue-500/50 shadow-lg hover:shadow-blue-900/20">
                        <div className="absolute inset-0 w-full h-full bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="w-12 h-12 flex items-center justify-center shrink-0 z-10 group-hover:text-blue-400 text-slate-400 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 text-blue-400 font-medium text-sm whitespace-nowrap transition-all duration-500 delay-100 absolute left-12">LinkedIn</span>
                    </a>
                    <a href="https://www.instagram.com/_.lakshp/" target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-start w-12 hover:w-36 h-12 bg-slate-800/50 border border-slate-700 rounded-full overflow-hidden transition-all duration-500 ease-out hover:border-pink-500/50 shadow-lg hover:shadow-pink-900/20">
                        <div className="absolute inset-0 w-full h-full bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="w-12 h-12 flex items-center justify-center shrink-0 z-10 group-hover:text-pink-400 text-slate-400 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 text-pink-400 font-medium text-sm whitespace-nowrap transition-all duration-500 delay-100 absolute left-12">Instagram</span>
                    </a>
                    <a href="mailto:contact@lakshp.live" className="group relative flex items-center justify-start w-12 hover:w-32 h-12 bg-slate-800/50 border border-slate-700 rounded-full overflow-hidden transition-all duration-500 ease-out hover:border-rose-500/50 shadow-lg hover:shadow-rose-900/20">
                        <div className="absolute inset-0 w-full h-full bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="w-12 h-12 flex items-center justify-center shrink-0 z-10 group-hover:text-rose-400 text-slate-400 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </div>
                        <span className="opacity-0 group-hover:opacity-100 text-rose-400 font-medium text-sm whitespace-nowrap transition-all duration-500 delay-100 absolute left-12">Email</span>
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;