import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export const Reveal = ({ children, width = "fit-content", direction = "up", delay = 0, className = "" }) => {
  const ref = useRef(null);
  // Trigger animation when 20% of the element is visible
  const isInView = useInView(ref, { once: true, amount: 0.2 }); 
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  // Animation Variants (The "Fly" Logic)
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 75 : direction === "down" ? -75 : 0,
      x: direction === "left" ? 75 : direction === "right" ? -75 : 0,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: delay,
        type: "spring",
        damping: 25,
        stiffness: 80,
      }
    },
  };

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        animate={mainControls}
      >
        {children}
      </motion.div>
    </div>
  );
};