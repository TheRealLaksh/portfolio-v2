import React, { useEffect } from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
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
      {/* Spacer to allow scrolling for Navbar testing */}
      <div className="h-[1000px] w-full bg-gradient-to-b from-transparent to-black" />
    </Layout>
  );
}

export default App;