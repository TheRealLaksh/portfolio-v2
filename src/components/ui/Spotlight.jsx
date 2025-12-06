import React, { useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

const Spotlight = () => {
  const springX = useSpring(0, { stiffness: 100, damping: 20 });
  const springY = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full pointer-events-none z-0 mix-blend-screen"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, rgba(0,0,0,0) 70%)' // Sky blue tint
      }}
    />
  );
};

export default Spotlight;