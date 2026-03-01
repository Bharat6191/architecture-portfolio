import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Ring, Torus, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import localData from '../data/websiteData.json';

const VastuMandala = ({ active }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      if (active) {
        groupRef.current.rotation.x += delta * 0.05;
        groupRef.current.rotation.z += delta * 0.05;
      } else {
        // smoothly return to flat orientation
        groupRef.current.rotation.x += (0 - groupRef.current.rotation.x) * 0.05;
        groupRef.current.rotation.z += (0 - groupRef.current.rotation.z) * 0.05;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      
      {/* Central Cosmic Cube representing the built space */}
      <Box args={[2, 2, 2]}>
        <meshStandardMaterial color={active ? "#d4af37" : "#222"} wireframe={!active} roughness={0.2} metalness={0.8} transparent opacity={0.8} />
      </Box>

      {/* Outer rings representing natural forces/cardinal directions */}
      <Torus args={[3, 0.02, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </Torus>
      
      <Torus args={[4, 0.02, 16, 100]} rotation={[0, 0, 0]}>
         <meshBasicMaterial color="#d4af37" transparent opacity={active ? 0.6 : 0.2} />
      </Torus>

      <Torus args={[4.5, 0.01, 16, 100]} rotation={[Math.PI / 4, 0, 0]}>
         <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </Torus>
      
      {/* Cardinal Direction Nodes */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 3, 0, Math.sin(angle) * 3]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
      ))}

      {/* Intersecting grid representing the Vastu Purusha Mandala */}
      <gridHelper args={[6, 9, 0xffffff, 0xffffff]} position={[0, -1, 0]} material-opacity={0.1} material-transparent />
      
    </group>
  );
};

const VastuShastra = () => {
  const [active, setActive] = useState(false);

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] border-t border-white/5 overflow-hidden z-10 flex flex-col md:flex-row items-center px-4 sm:px-6 lg:px-24 bg-[#080808]">
      
      {/* Typography */}
      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start text-left pointer-events-none mt-24 md:mt-0 order-2 md:order-1">
        <h2 className="text-sm tracking-[0.4em] text-[#d4af37] uppercase font-bold mb-4">{localData.vastu.tagline}</h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-light leading-tight text-white mb-6 uppercase">
          {localData.vastu.titleLine1} <br />
          <span className="font-bold">{localData.vastu.titleHighlight}</span>
        </h3>
        <p className="text-gray-300 max-w-lg font-light tracking-wide text-sm md:text-base mb-4">
          {localData.vastu.description}
        </p>
        <p className="text-gray-400 max-w-lg font-light tracking-widest text-xs uppercase border-l-2 border-[#d4af37] pl-4 mt-4">
          {localData.vastu.features}
        </p>
      </div>

      {/* 3D Geometry */}
      <div 
        className="absolute md:relative inset-0 md:w-1/2 md:h-full z-0 cursor-crosshair order-1 md:order-2 opacity-30 md:opacity-100"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <Canvas 
          dpr={[1, 1.5]} 
          gl={{ powerPreference: 'high-performance' }} 
          camera={{ position: [0, 5, 10], fov: 45 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#d4af37" />
          
          <VastuMandala active={active} />
        </Canvas>
      </div>

    </section>
  );
};

export default VastuShastra;
