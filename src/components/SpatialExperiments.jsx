import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import localData from '../data/websiteData.json';

const AssemblingBuilding = ({ active }) => {
  const groupRef = useRef();
  
  // Refs for assembling parts
  const foundation = useRef();
  const core = useRef();
  const slabs = useRef([]);
  const pillars = useRef([]);
  const walls = useRef([]);
  const roof = useRef();

  useFrame((state, delta) => {
    // Gentle rotation of the entire structure
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
    
    // Lerp factor based on hover
    const t = active ? 1 : 0;
    const speed = 0.05;

    // Foundation (Drops down)
    if (foundation.current) {
      foundation.current.position.y += ((0 - t * 1) - foundation.current.position.y) * speed;
    }

    // Slabs (Float Up)
    slabs.current.forEach((slab, i) => {
      // Normal Y spacing vs dismantled Y spacing
      const targetY = (i * 1.5 + 0.5) + (t * (i * 1.5 + 1.5));
      slab.position.y += (targetY - slab.position.y) * speed;
    });

    // Pillars (Move outward from corners)
    const pDismantleDist = 2; // outward spread
    pillars.current.forEach((pillar, i) => {
      const dx = (i % 2 === 0 ? -1 : 1);
      const dz = (i < 2 ? -1 : 1);
      
      const targetX = (dx * 1.4) + (t * dx * pDismantleDist);
      const targetZ = (dz * 1.4) + (t * dz * pDismantleDist);
      const targetY = 1.5 + (t * 0.5);
      
      pillar.position.x += (targetX - pillar.position.x) * speed;
      pillar.position.z += (targetZ - pillar.position.z) * speed;
      pillar.position.y += (targetY - pillar.position.y) * speed;
    });

    // Walls (Move further outward)
    const wDismantleDist = 3.5;
    walls.current.forEach((wall, i) => {
      let targetX = wall.position.x;
      let targetZ = wall.position.z;
      
      if (i === 0) targetX = (-1.5) - (t * wDismantleDist); // Left
      if (i === 1) targetX = (1.5) + (t * wDismantleDist);  // Right
      if (i === 2) targetZ = (1.5) + (t * wDismantleDist);  // Front
      if (i === 3) targetZ = (-1.5) - (t * wDismantleDist); // Back
      
      const targetY = 1.5 + (t * 1.5);

      wall.position.x += (targetX - wall.position.x) * speed;
      wall.position.z += (targetZ - wall.position.z) * speed;
      wall.position.y += (targetY - wall.position.y) * speed;
      
      // Add slight tilting rotation to walls when dismantled
      const targetRotX = (i === 2 || i === 3) ? (t * ((i===2)?1:-1) * 0.2) : 0;
      const targetRotZ = (i === 0 || i === 1) ? (t * ((i===0)?1:-1) * 0.2) : 0;
      
      wall.rotation.x += (targetRotX - wall.rotation.x) * speed;
      wall.rotation.z += (targetRotZ - wall.rotation.z) * speed;
    });

    // Roof (Way up)
    if (roof.current) {
      roof.current.position.y += ((3.5) + (t * 4.5) - roof.current.position.y) * speed;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      
      {/* Foundation */}
      <mesh ref={foundation} position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.4, 4]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>

      {/* Central Core */}
      <mesh ref={core} position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 3, 16]} />
        <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.2} wireframe />
      </mesh>

      {/* Floor Slabs */}
      {[0, 1].map((_, i) => (
        <mesh key={`slab-${i}`} ref={el => slabs.current[i] = el} position={[0, i * 1.5 + 0.5, 0]}>
          <boxGeometry args={[3.8, 0.2, 3.8]} />
          <meshStandardMaterial color={active ? "#555" : "#333"} roughness={0.1} transparent opacity={0.9} />
        </mesh>
      ))}

      {/* Pillars */}
      {[0, 1, 2, 3].map((_, i) => {
        const dx = (i % 2 === 0 ? -1 : 1);
        const dz = (i < 2 ? -1 : 1);
        return (
          <mesh key={`pillar-${i}`} ref={el => pillars.current[i] = el} position={[dx * 1.4, 1.5, dz * 1.4]}>
            <boxGeometry args={[0.15, 3, 0.15]} />
            <meshStandardMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
          </mesh>
        )
      })}

      {/* Walls/Facade panels */}
      <group>
        <mesh ref={el => walls.current[0] = el} position={[-1.5, 1.5, 0]}>
          <boxGeometry args={[0.05, 2.8, 2.8]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0.1} />
        </mesh>
        <mesh ref={el => walls.current[1] = el} position={[1.5, 1.5, 0]}>
          <boxGeometry args={[0.05, 2.8, 2.8]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0.1} />
        </mesh>
        <mesh ref={el => walls.current[2] = el} position={[0, 1.5, 1.5]}>
          <boxGeometry args={[2.8, 2.8, 0.05]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0.1} />
        </mesh>
        <mesh ref={el => walls.current[3] = el} position={[0, 1.5, -1.5]}>
          <boxGeometry args={[2.8, 2.8, 0.05]} />
          <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={1} transparent roughness={0.1} />
        </mesh>
      </group>

      {/* Roof */}
      <mesh ref={roof} position={[0, 3.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[2.7, 1.5, 4]} />
        <meshStandardMaterial color="#111" roughness={0.5} wireframe={!active} />
      </mesh>
    </group>
  );
};

const SpatialExperiments = () => {
  const [active, setActive] = useState(false);

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] bg-[#050505] border-t border-white/5 overflow-hidden z-10 flex items-center justify-center">
      
      <div 
        className="absolute inset-0 z-0 cursor-crosshair"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <Canvas 
          dpr={[1, 1.5]} 
          gl={{ powerPreference: 'high-performance' }} 
          camera={{ position: [0, 2, 12], fov: 45 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#d4af37" />
          
          <AssemblingBuilding active={active} />
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      </div>

      <div className="absolute bottom-16 md:bottom-20 z-10 w-full px-4 sm:px-6 flex flex-col items-center pointer-events-none mix-blend-difference">
        <h2 className="text-sm tracking-[0.4em] text-[#d4af37] uppercase font-bold mb-4">{localData.spatialExperiments.tagline}</h2>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white uppercase text-center max-w-2xl">
          {localData.spatialExperiments.titleLine1} <span className="font-bold">{localData.spatialExperiments.titleHighlight}</span>
        </h3>
        <p className="text-gray-300 text-sm md:text-base mt-4 text-center max-w-md font-light tracking-wide">
          {localData.spatialExperiments.description}
        </p>
      </div>
      
    </section>
  );
};

export default SpatialExperiments;
