import React, { useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import the new pages
import Home from './pages/Home';
import Booking from './components/sections/Booking';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Re-initialize AOS on route change to animate elements on the new page
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30,
    });
    AOS.refresh();
  }, [location.pathname]); // Run whenever the path changes

  const lenisOptions = {
    lerp: 0.07,
    duration: 1.2,
    smoothTouch: false,
    touchMultiplier: 2,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </Layout>
    </ReactLenis>
  );
}

export default App;