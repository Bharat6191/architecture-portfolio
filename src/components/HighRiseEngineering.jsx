import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Cylinder, OrbitControls } from '@react-three/drei';
import localData from '../data/websiteData.json';

const HighRiseStructure = ({ active }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[2, -4, 0]}>
      
      {/* Deep Foundation */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[4, 1, 4]} />
        <meshStandardMaterial color="#222" roughness={0.9} />
      </mesh>
      
      {/* Central Core (Concrete/Elevator Shaft) */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[1.5, 8, 1.5]} />
        <meshStandardMaterial color={active ? "#333" : "#222"} roughness={0.5} />
      </mesh>

      {/* Exoskeleton Framing */}
      {[...Array(6)].map((_, i) => (
        <group key={`floor-${i}`} position={[0, i * 1.5 + 1, 0]}>
          <Box args={[3.5, 0.1, 3.5]}>
            <meshStandardMaterial color={active ? "#555" : "#333"} wireframe={!active} transparent opacity={0.6} />
          </Box>
          {/* Support Columns */}
          <Cylinder args={[0.05, 0.05, 1.5]} position={[-1.6, -0.75, -1.6]}>
            <meshStandardMaterial color="#d4af37" emissive={active ? "#d4af37" : "#000"} emissiveIntensity={0.5} />
          </Cylinder>
          <Cylinder args={[0.05, 0.05, 1.5]} position={[1.6, -0.75, -1.6]}>
            <meshStandardMaterial color="#d4af37" emissive={active ? "#d4af37" : "#000"} emissiveIntensity={0.5} />
          </Cylinder>
          <Cylinder args={[0.05, 0.05, 1.5]} position={[-1.6, -0.75, 1.6]}>
            <meshStandardMaterial color="#d4af37" emissive={active ? "#d4af37" : "#000"} emissiveIntensity={0.5} />
          </Cylinder>
          <Cylinder args={[0.05, 0.05, 1.5]} position={[1.6, -0.75, 1.6]}>
            <meshStandardMaterial color="#d4af37" emissive={active ? "#d4af37" : "#000"} emissiveIntensity={0.5} />
          </Cylinder>
        </group>
      ))}

      {/* Top Beam */}
      <Box args={[3.5, 0.2, 3.5]} position={[0, 9.5, 0]}>
        <meshStandardMaterial color="#d4af37" />
      </Box>

    </group>
  );
};

const HighRiseEngineering = () => {
  const [active, setActive] = useState(false);

  return (
    <section className="relative w-full h-[80vh] md:h-screen min-h-[600px] border-t border-white/5 overflow-hidden z-10 flex flex-col md:flex-row items-center px-4 sm:px-6 lg:px-24">
      
      {/* 3D Geometry */}
      <div 
        className="absolute inset-0 z-0 cursor-crosshair"
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <Canvas 
          dpr={[1, 1.5]} 
          gl={{ powerPreference: 'default', alpha: true, antialias: false }} 
          camera={{ position: [0, 4, 12], fov: 45 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-5, 5, -5]} intensity={0.8} color="#d4af37" />
          
          <HighRiseStructure active={active} />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate={active} autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 w-full md:w-1/2 flex flex-col items-start text-left pointer-events-none mb-16 md:mb-0 mt-16 md:mt-0">
        <h2 className="text-sm tracking-[0.4em] text-[#d4af37] uppercase font-bold mb-4">{localData.highRise.tagline}</h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-light leading-tight text-white mb-6 uppercase">
          {localData.highRise.titleLine1} <br/> <span className="font-bold">{localData.highRise.titleHighlight}</span>
        </h3>
        <p className="text-gray-300 max-w-lg font-light tracking-wide text-sm md:text-base mb-4">
          {localData.highRise.description}
        </p>
        <p className="text-gray-400 max-w-lg font-light tracking-widest text-xs uppercase">
          Hover to inspect structural reinforcements and core load distribution.
        </p>
      </div>

    </section>
  );
};

export default HighRiseEngineering;
