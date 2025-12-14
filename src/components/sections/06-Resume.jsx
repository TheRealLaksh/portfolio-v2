import React from 'react';
import { TextReveal } from '../ui/TextReveal';
import { Reveal } from '../ui/Reveal';
import { Parallax } from '../ui/Parallax';
import { triggerHaptic } from '../../utils/triggerHaptic';

const Resume = () => {
  return (
    <section
      id="resume"
      className="my-16 sm:my-32 scroll-mt-20 relative z-10 overflow-hidden w-full"
    >
      {/* Background Number */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Parallax
          speed={-0.2}
          className="absolute top-[5%] left-4 text-slate-800/50 text-6xl font-bold font-mono opacity-20"
        >
          06
        </Parallax>
      </div>

      <div className="w-full px-6 md:px-12 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <TextReveal className="flex justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Resume
            </h2>
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A concise overview of my professional journey.
            </p>
          </Reveal>
        </div>

        {/* Centered Resume Button */}
        <Reveal delay={0.4}>
          <div className="flex justify-center relative z-20">
            <a
              href="https://profiley.lakshp.live/laksh"
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerHaptic}
              className="group relative w-56 cursor-pointer overflow-hidden rounded-full border border-slate-700 bg-slate-900/50 p-3 text-center font-semibold shadow-lg transition-all duration-300 hover:border-purple-500/50 hover:shadow-purple-500/20 active:scale-95"
            >
              <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-slate-300">
                Resume
              </span>

              <div className="absolute left-5 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-purple-600 transition-all duration-500 group-hover:-top-24 group-hover:-left-16 group-hover:h-72 group-hover:w-72 group-hover:translate-y-0"></div>

              <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 text-white">
                <span>Resume</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Resume;
