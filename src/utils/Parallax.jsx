import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Speed: negative = slower than scroll (background feel)
// Speed: positive = faster than scroll (foreground feel)
export const Parallax = ({ children, speed = -20, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};