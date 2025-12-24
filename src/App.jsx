import React, { useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from './pages/Home';
import Booking from './components/sections/Booking';

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 30,
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh(); 
  }, [location]);

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
          {/* Main Home Page */}
          <Route path="/" element={<Home />} />

          {/* Booking Page */}
          <Route path="/booking" element={<Booking />} />
          
          {/* Handle plural 'bookings' - Redirects to /booking */}
          <Route path="/bookings" element={<Navigate to="/booking" replace />} />
          
          {/* Catch-all - Redirects random URLs back to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </Layout>
    </ReactLenis>
  );
}

export default App;