import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- STAR LAYER COMPONENT ---
const StarLayer = ({ count, size, color, opacity, transparent = true }) => {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 3000;
      const y = (Math.random() - 0.5) * 3000;
      // Spread stars along Z axis deeply
      const z = (Math.random() - 0.5) * 3000; 
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

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

// --- MAIN SCENE CONTENT ---
const SceneContent = () => {
  const { camera } = useThree();
  
  // Create refs for continuous motion
  const targetZ = useRef(100);

  useFrame((state, delta) => {
    // 1. Get Scroll Position
    const scrollY = window.scrollY;
    
    // 2. Calculate Target Z Position (Move forward as we scroll)
    // 100 is start pos, we subtract scroll to move forward
    const newZ = 100 - (scrollY * 0.1); 
    
    // 3. Smooth Camera Movement (Lerp)
    targetZ.current = THREE.MathUtils.lerp(targetZ.current, newZ, 0.1);
    camera.position.z = targetZ.current;

    // 4. Subtle rotation for "floating" feel
    camera.rotation.z = scrollY * 0.0002;
  });

  return (
    <group>
      <fog attach="fog" args={['#050505', 10, 800]} />
      
      {/* Background Dust */}
      <StarLayer count={6000} size={0.5} color="#475569" opacity={0.3} />
      
      {/* Mid-range Stars */}
      <StarLayer count={2000} size={1.2} color="#ffffff" opacity={0.6} />
      
      {/* Bright Beacons */}
      <StarLayer count={500} size={2.5} color="#38bdf8" opacity={0.9} />
    </group>
  );
};

// --- EXPORTED COMPONENT ---
const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#050505] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 100], fov: 75 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default Background;