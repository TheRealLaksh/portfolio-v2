import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollSpy } from '../../hooks/useScrollSpy'; // Assuming you have this or use the logic below

// --- Configuration ---
const SECTION_COLORS = {
  home: new THREE.Color('#0ea5e9'),       // Sky Blue
  about: new THREE.Color('#ffffff'),      // White
  experience: new THREE.Color('#a855f7'), // Purple
  skills: new THREE.Color('#22c55e'),     // Green
  projects: new THREE.Color('#f43f5e'),   // Rose
  contact: new THREE.Color('#eab308'),    // Gold
  default: new THREE.Color('#0ea5e9')
};

// --- 1. Static Background Dust (The 12,000 stars) ---
const StaticStars = ({ warpActive }) => {
  const mesh = useRef();
  const count = 12000;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 3000;
      const y = (Math.random() - 0.5) * 3000;
      const z = (Math.random() - 0.5) * 3000;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    // Warp Speed Logic
    if (warpActive) {
      mesh.current.rotation.z += delta * 2; // Spin fast during warp
      // Simulate stars streaking by scaling Z? 
      // Simplified: Just rotate fast for "tunnel" effect
    } else {
      mesh.current.rotation.y -= delta * 0.05; // Gentle rotation
      mesh.current.rotation.x -= delta * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.7} color="#ffffff" transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
};

// --- 2. Interactive Constellation (The Physics System) ---
const Constellation = ({ warpActive }) => {
  const mesh = useRef();
  const linesMesh = useRef();
  const { mouse, camera, viewport } = useThree();
  
  // Physics Parameters
  const count = 200; // Number of interactive stars
  const connectionDistance = 250; // Distance to draw lines
  const mouseRepulsionRadius = 300; // How far mouse pushes stars
  
  // Initialize Particles
  const [positions, originalPositions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const vel = [];
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 1500;
      const y = (Math.random() - 0.5) * 1500;
      const z = (Math.random() - 0.5) * 1500; // Depth
      
      pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
      orig[i*3] = x; orig[i*3+1] = y; orig[i*3+2] = z;
      vel.push({ x: 0, y: 0, z: 0 });
    }
    return [pos, orig, vel];
  }, []);

  // Track Scroll for Color
  const [targetColor, setTargetColor] = useState(SECTION_COLORS.home);
  
  // Listen to scroll to update target color
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      let current = 'home';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= (el.offsetTop - window.innerHeight / 2)) {
          current = id;
        }
      });
      setTargetColor(SECTION_COLORS[current] || SECTION_COLORS.default);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current || !linesMesh.current) return;

    // 1. Color Lerping (Smooth transition)
    mesh.current.material.color.lerp(targetColor, 0.05);
    linesMesh.current.material.color.lerp(targetColor, 0.05);

    // 2. Physics & Mouse Interaction
    const positionsArray = mesh.current.geometry.attributes.position.array;
    
    // Convert normalized mouse (-1 to 1) to World Coordinates relative to camera look
    // This is an approximation for performance
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    // Line positions array (dynamic)
    const linePositions = [];

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Current Position
      let px = positionsArray[ix];
      let py = positionsArray[iy];
      let pz = positionsArray[iz];

      // Original Position (Home)
      const ox = originalPositions[ix];
      const oy = originalPositions[iy];
      const oz = originalPositions[iz];

      // --- Repulsion Logic ---
      // We project the star's world position to screen space to check mouse distance reliably
      // But for speed in JS, we'll do a simple world-space check assuming camera z=100
      
      // Simple distance check (ignoring Z depth for mouse interaction feel)
      // Note: In a real 3D scene, mouse raycasting is heavier. 
      // We use a "cylinder" of influence around the mouse cursor in 3D space.
      
      const dx = px - (mouse.x * 1000); // Scale mouse to world roughly
      const dy = py - (mouse.y * 1000);
      const dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < mouseRepulsionRadius) {
        const force = (mouseRepulsionRadius - dist) / mouseRepulsionRadius;
        const angle = Math.atan2(dy, dx);
        
        // Push away
        px += Math.cos(angle) * force * 500 * delta;
        py += Math.sin(angle) * force * 500 * delta;
      } else {
        // Spring back to original
        px += (ox - px) * 2 * delta;
        py += (oy - py) * 2 * delta;
        pz += (oz - pz) * 2 * delta;
      }

      // Update Arrays
      positionsArray[ix] = px;
      positionsArray[iy] = py;
      positionsArray[iz] = pz;

      // --- Line Connections (The Extra Feature) ---
      // Connect to neighbors if close
      // Optimization: Only check a subset or accept O(N^2) for N=200 (40k checks is fine)
      for (let j = i + 1; j < count; j++) {
        const jx = j * 3;
        const jy = j * 3 + 1;
        const jz = j * 3 + 2;

        const p2x = positionsArray[jx];
        const p2y = positionsArray[jy];
        const p2z = positionsArray[jz];

        const ldx = px - p2x;
        const ldy = py - p2y;
        const ldz = pz - p2z;
        const lDist = Math.sqrt(ldx*ldx + ldy*ldy + ldz*ldz);

        if (lDist < connectionDistance) {
          linePositions.push(px, py, pz);
          linePositions.push(p2x, p2y, p2z);
        }
      }
    }

    // Update Geometry
    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Update Lines Geometry
    linesMesh.current.geometry.setFromPoints(
        // Convert flat array to Vector3s? No, use buffer attribute directly for speed
        // Actually R3F setFromPoints expects Vectors. Let's use BufferAttribute directly.
        []
    );
    // Manual Buffer Update for Lines
    const lineGeo = linesMesh.current.geometry;
    const linePosAttr = new THREE.Float32BufferAttribute(linePositions, 3);
    lineGeo.setAttribute('position', linePosAttr);

    // Rotation (Global System Spin)
    if (warpActive) {
       mesh.current.rotation.z -= delta * 1;
       linesMesh.current.rotation.z -= delta * 1;
    } else {
       mesh.current.rotation.y += delta * 0.02;
       linesMesh.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={2.5} color={SECTION_COLORS.home} sizeAttenuation transparent opacity={0.9} />
      </points>

      <lineSegments ref={linesMesh}>
        <bufferGeometry />
        <lineBasicMaterial color={SECTION_COLORS.home} transparent opacity={0.15} />
      </lineSegments>
    </>
  );
};

// --- 3. Main Composition ---
const Background = () => {
  const [warp, setWarp] = useState(false);

  // Listen for custom "warp" event from anywhere in the app
  useEffect(() => {
    const handleWarp = () => {
      setWarp(true);
      setTimeout(() => setWarp(false), 1000); // Warp lasts 1 second
    };

    window.addEventListener('warp-speed', handleWarp);
    return () => window.removeEventListener('warp-speed', handleWarp);
  }, []);

  return (
    <div className={`fixed inset-0 z-0 bg-[#050505] transition-all duration-700 ${warp ? 'blur-sm scale-105' : ''}`}>
      <Canvas
        camera={{ position: [0, 0, 100], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <fog attach="fog" args={['#000000', 50, 800]} />
        <StaticStars warpActive={warp} />
        <Constellation warpActive={warp} />
      </Canvas>
    </div>
  );
};

export default Background;