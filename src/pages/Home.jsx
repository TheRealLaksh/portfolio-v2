import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '@studio-freight/react-lenis';

// Import all sections EXCEPT Booking
import Hero from '../components/sections/01-Hero';
import About from '../components/sections/02-About';
import Experience from '../components/sections/03-Experience';
import Skills from '../components/sections/04-Skills';
import Projects from '../components/sections/05-Projects';
import Resume from '../components/sections/06-Resume';
import Services from '../components/sections/07-Services';
import Contact from '../components/sections/08-Contact';

const Home = () => {
  const location = useLocation();
  const lenis = useLenis();

  // Handle scrolling to sections if redirected from /booking (e.g., clicking "Contact" while on the booking page)
  useEffect(() => {
    if (location.hash && lenis) {
      const targetId = location.hash;
      // Small timeout to ensure DOM is ready
      setTimeout(() => {
        lenis.scrollTo(targetId, { offset: -30 });
      }, 100);
    }
  }, [location, lenis]);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Resume />
      <Services />
      {/* Booking section removed from here */}
      <Contact />
      <div className="h-[100px]" />
    </>
  );
};

export default Home;