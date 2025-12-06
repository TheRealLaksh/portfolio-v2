import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// --- CONFIGURATION ---
const COLORS = {
  home: new THREE.Color(0x0ea5e9),       // Sky Blue
  about: new THREE.Color(0xffffff),      // White
  experience: new THREE.Color(0xa855f7), // Purple
  skills: new THREE.Color(0x22c55e),     // Green
  projects: new THREE.Color(0xf43f5e),   // Rose
  contact: new THREE.Color(0xeab308)     // Gold
};

const SceneContent = () => {
  const { camera, gl, scene, viewport } = useThree();
  
  // Refs for meshes
  const starMeshRef = useRef();
  const connectMeshRef = useRef();
  // const linesMeshRef = useRef(); // Removed to prevent performance issues with invisible lines

  // State
  const [targetColor] = useState(new THREE.Color(COLORS.home));
  
  // Mouse state
  const mouse = useRef(new THREE.Vector2(9999, 9999));
  const warpSpeed = useRef(0);
  const baseSpeed = 0.0005;

  // --- 2. OBJECTS SETUP ---
  
  // A. Background Dust (Static)
  const starCount = 12000;
  const starPositions = useMemo(() => {
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 2500;
    }
    return positions;
  }, []);

  // B. Constellation Stars (Interactive)
  const connectCount = 200;
  const [connectPositions, originalPositions] = useMemo(() => {
    const positions = new Float32Array(connectCount * 3);
    const originals = new Float32Array(connectCount * 3);
    for (let i = 0; i < connectCount; i++) {
      const x = (Math.random() - 0.5) * 1500;
      const y = (Math.random() - 0.5) * 1500;
      const z = (Math.random() - 0.5) * 1500;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      originals[i * 3] = x;
      originals[i * 3 + 1] = y;
      originals[i * 3 + 2] = z;
    }
    return [positions, originals];
  }, []);

  // Event Listeners
  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      let current = 'home';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= (el.offsetTop - window.innerHeight / 3)) {
          current = id;
        }
      });
      if (COLORS[current]) targetColor.set(COLORS[current]);
    };

    const handleWarp = () => {
      warpSpeed.current = 20;
      gl.domElement.style.filter = 'blur(2px)';
      
      setTimeout(() => {
        setTimeout(() => {
          warpSpeed.current = 0;
          gl.domElement.style.filter = 'blur(0px)';
        }, 800);
      }, 300);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('warp-speed', handleWarp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('warp-speed', handleWarp);
    };
  }, [gl.domElement, targetColor]);

  // --- 4. ANIMATION LOOP ---
  useFrame(() => {
    if (!connectMeshRef.current || !starMeshRef.current) return;

    // 1. Color Transition
    connectMeshRef.current.material.color.lerp(targetColor, 0.05);

    // 2. Rotation & Warp
    const speed = baseSpeed + (warpSpeed.current * 0.01);

    if (warpSpeed.current > 0) {
      starMeshRef.current.rotation.z += 0.02;
      camera.position.z -= speed * 50;
      if (camera.position.z < -1000) camera.position.z = 100;
    } else {
      starMeshRef.current.rotation.y += speed;
      connectMeshRef.current.rotation.y += speed;
      
      camera.position.z += (100 - camera.position.z) * 0.05;
    }

    // 3. Mouse Repulsion Logic
    const positions = connectMeshRef.current.geometry.attributes.position.array;
    const tempVec = new THREE.Vector3();

    for (let i = 0; i < connectCount; i++) {
      const px = positions[i * 3];
      const py = positions[i * 3 + 1];
      const pz = positions[i * 3 + 2];

      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];

      tempVec.set(px, py, pz);
      tempVec.applyMatrix4(connectMeshRef.current.matrixWorld);
      tempVec.project(camera);

      const dx = tempVec.x - mouse.current.x;
      const dy = tempVec.y - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 0.2) {
        const force = (0.2 - dist) * 200;
        positions[i * 3] -= dx * force;
        positions[i * 3 + 1] -= dy * force;
      } else {
        positions[i * 3] += (ox - px) * 0.05;
        positions[i * 3 + 1] += (oy - py) * 0.05;
        positions[i * 3 + 2] += (oz - pz) * 0.05;
      }
    }

    connectMeshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <fog attach="fog" args={[0x000000, 0.0008]} />
      
      {/* A. Background Dust */}
      <points ref={starMeshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={starCount} array={starPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.8} color={0xffffff} transparent opacity={0.8} />
      </points>

      {/* B. Constellation Stars */}
      <points ref={connectMeshRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={connectCount} array={connectPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={2.5} color={0x0ea5e9} />
      </points>
    </>
  );
};

const Background = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      transition: 'filter 0.5s ease',
      backgroundColor: '#000000'
    }}>
      <Canvas
        camera={{ position: [0, 0, 100], fov: 75, near: 0.1, far: 2000 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
};

export default Background;