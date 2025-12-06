import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const StarLayer = ({ count, size, speedFactor, color, opacity, transparent = true }) => {
  const mesh = useRef();
  
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
    
    // Continuous subtle rotation
    mesh.current.rotation.y -= delta * 0.02 * speedFactor;
    mesh.current.rotation.x -= delta * 0.01 * speedFactor;

    // Scroll-linked rotation (Parallax)
    // We read window.scrollY directly for performance in R3F loop
    const scrollY = window.scrollY;
    mesh.current.rotation.z = scrollY * 0.0005 * speedFactor; 
    mesh.current.position.y = scrollY * 0.5 * speedFactor; // Parallax move up/down
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

const SceneContent = () => {
  const { gl } = useThree();
  const warpSpeed = useRef(0);

  useEffect(() => {
    const handleWarp = () => {
      warpSpeed.current = 20;
      gl.domElement.style.transition = 'filter 0.3s ease-out';
      gl.domElement.style.filter = 'blur(4px) brightness(1.5)';
      
      setTimeout(() => {
        setTimeout(() => {
          warpSpeed.current = 0;
          gl.domElement.style.filter = 'blur(0px) brightness(1)';
        }, 800);
      }, 300);
    };

    window.addEventListener('warp-speed', handleWarp);
    return () => window.removeEventListener('warp-speed', handleWarp);
  }, [gl.domElement]);

  return (
    <>
      <fog attach="fog" args={['#000000', 50, 1200]} />
      
      {/* Layer 1: Distant Background Dust (Slowest) */}
      <StarLayer count={8000} size={0.8} speedFactor={0.2} color="#6b7280" opacity={0.4} />

      {/* Layer 2: Mid-range Stars (Medium Speed) */}
      <StarLayer count={3000} size={1.5} speedFactor={0.5} color="#ffffff" opacity={0.6} />

      {/* Layer 3: Foreground "Fliers" (Fastest - Creates Depth) */}
      <StarLayer count={500} size={3} speedFactor={1.2} color="#0ea5e9" opacity={0.8} />
    </>
  );
};

const Background = () => {
  return (
    <div className="fixed inset-0 z-0 bg-black pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 100], fov: 75 }}
        gl={{ antialias: false, alpha: false }} // Performance optimization
        dpr={[1, 1.5]} // Cap pixel ratio for speed
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default Background;