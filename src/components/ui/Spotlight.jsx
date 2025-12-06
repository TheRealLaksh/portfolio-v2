import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const Spotlight = () => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none z-0 mix-blend-screen"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, rgba(0,0,0,0) 70%)' // Sky blue glow
      }}
    />
  );
};

export default Spotlight;