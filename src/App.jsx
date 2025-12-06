import React, { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Resume from './components/sections/Resume';
import Contact from './components/sections/Contact'; // Import Contact
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    // Initialize Animate On Scroll
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30,
    });
  }, []);

  return (
    <Layout>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Resume />
      <Contact /> {/* Added Contact Section */}
      
      <div className="h-[100px]" /> {/* Spacer before Footer */}
    </Layout>
  );
}

export default App;