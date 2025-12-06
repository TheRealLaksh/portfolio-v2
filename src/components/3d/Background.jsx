import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Reusable Star Layer Component for Parallax
const StarLayer = ({ count, size, speedFactor, color, opacity, transparent = true }) => {
  const mesh = useRef();
  
  // Generate random positions once
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 3000;
      const y = (Math.random() - 0.5) * 3000;
      const z = (Math.random() - 0.5) * 3000;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    // 1. Constant subtle rotation (The "Idle" animation)
    mesh.current.rotation.y -= delta * 0.02 * speedFactor;
    mesh.current.rotation.x -= delta * 0.01 * speedFactor;

    // 2. Scroll-Linked Parallax (The "Move on Scroll" animation)
    // We read window.scrollY directly for performance
    const scrollY = window.scrollY;
    
    // Rotate the entire galaxy based on scroll
    mesh.current.rotation.z = scrollY * 0.0005 * speedFactor; 
    
    // Move the layer up/down based on scroll (Parallax effect)
    // Foreground layers (higher speedFactor) move faster than background
    mesh.current.position.y = scrollY * 0.2 * speedFactor; 
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={size} 
        color={color} 
        transparent={transparent} 
        opacity={opacity} 
        sizeAttenuation={true} 
        depthWrite={false} 
      />
    </points>
  );
};

const SceneContent = ({ isMusicPlaying }) => {
  const { gl } = useThree();
  const groupRef = useRef();

  // Audio Reactive Pulse (Optional: if you passed isMusicPlaying prop)
  useFrame((state) => {
    if (groupRef.current && isMusicPlaying) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 8) * 0.05;
      groupRef.current.scale.setScalar(pulse);
    }
  });

  // Warp Speed Effect Listener
  useEffect(() => {
    const handleWarp = () => {
      gl.domElement.style.transition = 'filter 0.3s ease-out';
      gl.domElement.style.filter = 'blur(4px) brightness(1.5)';
      
      setTimeout(() => {
        gl.domElement.style.filter = 'blur(0px) brightness(1)';
      }, 800);
    };

    window.addEventListener('warp-speed', handleWarp);
    return () => window.removeEventListener('warp-speed', handleWarp);
  }, [gl.domElement]);

  return (
    <group ref={groupRef}>
      <fog attach="fog" args={['#000000', 50, 1200]} />
      
      {/* Layer 1: Distant Background Dust (Slowest & Smallest) */}
      <StarLayer count={5000} size={0.8} speedFactor={0.2} color="#6b7280" opacity={0.4} />

      {/* Layer 2: Mid-range Stars (Medium Speed) */}
      <StarLayer count={2000} size={1.5} speedFactor={0.6} color="#ffffff" opacity={0.6} />

      {/* Layer 3: Foreground "Fliers" (Fastest & Biggest - Creates Depth) */}
      <StarLayer count={300} size={3} speedFactor={1.5} color="#0ea5e9" opacity={0.8} />
    </group>
  );
};

const Background = ({ isMusicPlaying }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      backgroundColor: '#000000',
      pointerEvents: 'none' // Ensure clicks pass through
    }}>
      <Canvas
        camera={{ position: [0, 0, 100], fov: 75 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]} // Optimization for high-res screens
      >
        <SceneContent isMusicPlaying={isMusicPlaying} />
      </Canvas>
    </div>
  );
};

export default Background;