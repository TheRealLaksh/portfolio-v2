import React from 'react';
import profileImg from '../../assets/images/laksh.pradhwani.webp';
import { TextReveal } from '../ui/TextReveal'; 
import { Parallax } from '../ui/Parallax';    

const About = () => {
  return (
    <section id="about" className="my-16 sm:my-24 scroll-mt-20 relative z-10">
      <div className="w-full px-6 md:px-12 relative z-10">

        {/* Header with Reveal */}
        <TextReveal className="mb-16 text-center flex justify-center">
          <h2 className="section-title text-3xl font-bold text-white relative inline-block">
            About Me
          </h2>
        </TextReveal>

        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-12 max-w-[1600px] mx-auto">

          {/* Left: Image with Parallax */}
          {/* FIXED: Added 'lg:min-h-[500px]' so the absolute image has space to render */}
          <Parallax speed={-0.05} className="relative w-full lg:w-1/2 h-[400px] sm:h-[500px] lg:min-h-[500px] rounded-2xl overflow-hidden shadow-2xl group order-1">
            <img 
              src={profileImg} 
              alt="Laksh Pradhwani - Web Developer"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute bottom-5 left-5 z-10">
              <div className="flex items-center gap-3 bg-slate-900/50 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 shadow-lg">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium text-white">Available for projects</span>
              </div>
            </div>
          </Parallax>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 flex flex-col order-2">
            <div className="relative p-6 sm:p-10 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md shadow-xl h-full flex flex-col justify-center">

              <div className="text-slate-300 text-lg leading-relaxed space-y-6">
                <TextReveal>
                  <p>
                    I’m an aspiring <strong className="text-sky-400">AI/ML Engineer</strong> and high
                    school student who moved from a simple “Hello, World!” to building <strong className="text-white">full-stack applications</strong> and real, functional
                    products. My work with the <strong className="text-white">MERN stack</strong>,
                    combined with internships at Unified Mentor, MoreYeahs, and Hotel Kavana, has
                    taught me how to turn ideas into practical, scalable digital solutions.
                  </p>
                </TextReveal>
                
                <TextReveal>
                  <p>
                    My interest in <strong className="text-white">artificial intelligence</strong> has
                    grown through programs at IIT Madras, Plaksha University, and Outskill, where I
                    explored neural networks, data science pipelines, automation workflows, and the
                    impact of responsible AI. Along the way, I’ve earned recognition through <strong className="text-white">hackathons</strong>, robotics events, and national-level
                    competitions such as <strong className="text-white">VVM,</strong> strengthening both
                    my technical skills and problem-solving mindset.
                  </p>
                </TextReveal>

                <TextReveal>
                  <p>
                    Outside academics, I stay involved in open-source projects, experiment with new
                    technologies, and keep expanding my capabilities. I’m continuously building,
                    learning, and improving—focused on growing into a skilled engineer and open to
                    meaningful <strong className="text-white">internship opportunities</strong> that
                    push me further.
                  </p>
                </TextReveal>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 pt-8 border-t border-slate-700">
                <TextReveal>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Name</div>
                    <div className="font-semibold text-white text-lg">Laksh Pradhwani</div>
                  </div>
                </TextReveal>
                <TextReveal>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Email</div>
                    <a href="mailto:contact@lakshp.live" className="text-sky-400 font-semibold hover:text-sky-300 break-all">
                      contact@lakshp.live
                    </a>
                  </div>
                </TextReveal>
                <TextReveal>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Location</div>
                    <div className="font-semibold text-white text-lg">Varanasi, India</div>
                  </div>
                </TextReveal>
                <TextReveal>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">Availability</div>
                    <div className="font-semibold text-green-400 text-lg">Open to opportunities</div>
                  </div>
                </TextReveal>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;