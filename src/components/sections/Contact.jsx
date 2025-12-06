import React, { useState } from 'react';
import { TextReveal } from '../ui/TextReveal';
import { Reveal } from '../ui/Reveal';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xrbyqrjb", {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => { setStatus(null); setIsSubmitting(false); }, 5000);
      } else {
        throw new Error('Failed');
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => { setStatus(null); setIsSubmitting(false); }, 3000);
    }
  };

  return (
    <section id="contact" className="my-16 sm:my-24 scroll-mt-20 relative z-10">
      <div className="w-full px-6 md:px-12 max-w-[1400px] mx-auto">

        <TextReveal className="flex justify-center mb-12">
           <h2 className="section-title text-3xl font-bold text-white text-center relative">
             Let's Build Something
           </h2>
        </TextReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Reveal delay={0.1}>
               <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold text-white mb-4">Get in Touch</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    I'm currently open to freelance projects and internship opportunities. Have an idea?
                    Let's discuss how we can craft it into reality.
                  </p>
                  <div className="space-y-4">
                     <div className="flex items-center gap-4 text-slate-300">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sky-400 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></div>
                        <div>
                           <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Email</div>
                           <a href="mailto:contact@lakshp.live" className="hover:text-sky-400 transition-colors">contact@lakshp.live</a>
                        </div>
                     </div>
                     <div className="flex items-center gap-4 text-slate-300">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-purple-400 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                        <div>
                           <div className="text-xs text-slate-500 uppercase tracking-wider font-bold">Location</div>
                           <span>Varanasi, India</span>
                        </div>
                     </div>
                  </div>
               </div>
            </Reveal>
            
            {/* Social Connect */}
            <Reveal delay={0.2}>
                <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row justify-between items-center gap-4">
                   <span className="text-slate-400 font-medium">Connect with me</span>
                   <div className="flex flex-wrap gap-4">
                      <a href="https://github.com/TheRealLaksh" target="_blank" aria-label="GitHub" rel="noreferrer" className="group relative flex items-center justify-start w-12 hover:w-32 h-12 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden transition-all duration-500 ease-out hover:border-slate-500 hover:bg-slate-700">
                         <div className="w-12 h-12 flex items-center justify-center shrink-0 z-10 text-slate-400 group-hover:text-white transition-colors duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg></div>
                         <span className="opacity-0 group-hover:opacity-100 text-white font-medium text-sm whitespace-nowrap transition-all duration-500 delay-100 absolute left-12">GitHub</span>
                      </a>
                      <a href="https://www.linkedin.com/in/laksh-pradhwani" target="_blank" aria-label="LinkedIn" rel="noreferrer" className="group relative flex items-center justify-start w-12 hover:w-36 h-12 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden transition-all duration-500 ease-out hover:border-blue-500/50 hover:bg-blue-900/20">
                         <div className="w-12 h-12 flex items-center justify-center shrink-0 z-10 text-slate-400 group-hover:text-blue-400 transition-colors duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></div>
                         <span className="opacity-0 group-hover:opacity-100 text-blue-400 font-medium text-sm whitespace-nowrap transition-all duration-500 delay-100 absolute left-12">LinkedIn</span>
                      </a>
                      <a href="https://www.instagram.com/_.lakshp/" target="_blank" aria-label="Instagram" rel="noreferrer" className="group relative flex items-center justify-start w-12 hover:w-36 h-12 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden transition-all duration-500 ease-out hover:border-pink-500/50 hover:bg-pink-900/20">
                         <div className="w-12 h-12 flex items-center justify-center shrink-0 z-10 text-slate-400 group-hover:text-pink-400 transition-colors duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></div>
                         <span className="opacity-0 group-hover:opacity-100 text-pink-400 font-medium text-sm whitespace-nowrap transition-all duration-500 delay-100 absolute left-12">Instagram</span>
                      </a>
                   </div>
                </div>
            </Reveal>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-3">
            <Reveal delay={0.3} className="h-full">
                <form onSubmit={handleSubmit} className="bg-slate-900/30 backdrop-blur-md border border-slate-800/50 p-8 rounded-2xl shadow-xl relative group overflow-hidden h-full">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl group-hover:bg-sky-500/20 transition-all duration-700"></div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 relative z-10">
                    <div className="space-y-2">
                    <label className="text-sm text-slate-400 font-medium ml-1">Name</label>
                    <input type="text" name="name" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600" placeholder="Your Name" required />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm text-slate-400 font-medium ml-1">Email</label>
                    <input type="email" name="email" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600" placeholder="your@email.com" required />
                    </div>
                </div>

                <div className="space-y-2 mb-6 relative z-10">
                    <label className="text-sm text-slate-400 font-medium ml-1">Subject</label>
                    <select name="subject" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all">
                    <option value="Project Proposal">Project Proposal</option>
                    <option value="Internship Offer">Internship Offer</option>
                    <option value="Freelance Work">Freelance Work</option>
                    <option value="Just saying hi">Just saying hi!</option>
                    </select>
                </div>

                <div className="space-y-2 mb-8 relative z-10">
                    <label className="text-sm text-slate-400 font-medium ml-1">Message</label>
                    <textarea name="message" rows="5" className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-600" placeholder="Tell me about your project..." required></textarea>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting || status === 'success'}
                    className="submit-button relative z-10 w-full bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-sky-900/20 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'success' ? (
                    <div className="flex items-center gap-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                        <span>Message Sent!</span>
                    </div>
                    ) : status === 'error' ? (
                    <span>Error. Try again.</span>
                    ) : isSubmitting ? (
                    <span>Sending...</span>
                    ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                        <span>Send Message</span>
                    </>
                    )}
                </button>
                </form>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;