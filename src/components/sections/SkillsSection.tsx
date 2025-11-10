"use client";

import * as THREE from 'three';
import { motion, useSpring } from "framer-motion"; // <-- Import useSpring
import { SectionHeading } from "@/components/custom-ui/SectionHeading";
import AnimatedBlobBackground from "@/components/custom-ui/AnimatedBlobBackground";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaShieldAlt,
  FaSearch,
  FaPython,
} from "react-icons/fa";
import {
  SiJavascript,
  SiKalilinux,
} from "react-icons/si";
import { IoSparkles } from "react-icons/io5"; // Icon for Vibe Coding
import { useState, MouseEvent } from "react"; // <-- Import useState and MouseEvent

const skillCategories = [
  {
    title: "Web & Development",
    skills: [
      { name: "HTML5", icon: <FaHtml5 className="h-8 w-8 text-[#E34F26]" /> },
      { name: "CSS3", icon: <FaCss3Alt className="h-8 w-8 text-[#1572B6]" /> },
      { name: "JavaScript (ES6+)", icon: <SiJavascript className="h-8 w-8 text-[#F7DF1E]" /> },
      { name: "Python", icon: <FaPython className="h-8 w-8 text-[#3776AB]" /> },
      { name: "Git & GitHub", icon: <FaGitAlt className="h-8 w-8 text-[#F05032]" /> },
    ]
  },
  {
    title: "Cybersecurity & Concepts",
    skills: [
      { name: "Kali Linux", icon: <SiKalilinux className="h-8 w-8 text-[#557C94]" /> },
      { name: "Penetration Testing", icon: <FaShieldAlt className="h-8 w-8 text-[#DC2626]" /> },
      { name: "Digital Forensics", icon: <FaSearch className="h-8 w-8 text-[#60A5FA]" /> },
      { name: "Vibe Coding", icon: <IoSparkles className="h-8 w-8 text-[#F472B6]" /> },
    ]
  },
];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};


const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({ // <-- Added index for staggered delay
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1, // Stagger the cards
      duration: 0.5
    }
  }),
};

// --- NEW SkillCard Component ---
// We create a separate component to manage the mouse state for each card individually.
const SkillCard = ({ category, index }: { category: (typeof skillCategories)[0], index: number }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      variants={itemVariants}
      custom={index} // Pass index for staggered animation
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      onMouseMove={handleMouseMove}
      style={{
        // Pass mouse coordinates as CSS custom properties
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
      } as React.CSSProperties}
      className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-teal-400/50 hover:bg-slate-900"
    >
      {/* --- This is the new mouse-following glow effect --- */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(56, 189, 248, 0.15), transparent 80%)',
        }}
      />
      
      {/* Content is set to z-20 to appear above the glow */}
      <div className="relative z-20">
        <h3 className="mb-6 text-xl font-bold text-slate-100 text-center">
          {category.title}
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
          {
            category.skills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center justify-center gap-2 text-center">
                
                {/* --- Added animation to the icon's wrapper --- */}
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-800/70 transition-colors duration-300 group-hover:bg-slate-700/80"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  {skill.icon}
                </motion.div>
                
                <p className="text-sm font-medium text-slate-300">
                  {skill.name}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </motion.div>
  );
};


export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 sm:py-32 relative bg-gray-950 overflow-hidden">
      <AnimatedBlobBackground />

      <div className="container relative z-10 mx-auto px-4">
        <SectionHeading title="My Skills" subtitle="Technologies & Expertise" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2" // Set to 2 columns
        >
          {/* --- Updated to use the new SkillCard component --- */}
          {
            skillCategories.map((category, index) => (
              <SkillCard key={category.title} category={category} index={index} />
            ))
          }
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={ 50 } count={ 2500 } factor={ 4 } fade speed={ 2 } />
          <EffectComposer>
            <Bloom
              luminanceThreshold={ 0.2 }
              intensity={ 0.8 }
              mipmapBlur={ true }
            />
            <ChromaticAberration
              offset={new THREE.Vector2(0.001, 0.001)}
            />
            <Noise
              premultiply
              blendFunction={ BlendFunction.ADD }
              opacity={ 0.05 }
            />
            <Vignette
              eskil={ false }
              offset={ 0.1 }
              darkness={ 0.9 }
            />
          </EffectComposer>
        </Canvas>
      </div>
    </section>
  );
}