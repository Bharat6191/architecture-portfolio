import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, TorusKnot } from '@react-three/drei';
import localData from '../data/websiteData.json';

const HologramGroup = ({ active }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      // bob up and down
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Hologram Box */}
      <Box args={[1.5, 1.5, 1.5]} position={[0, -0.5, 0]}>
        <meshBasicMaterial 
          color={active ? "#00ffcc" : "#d4af37"} 
          wireframe 
          transparent 
          opacity={0.3 + (Math.sin(performance.now() * 0.005) * 0.1)} 
        />
      </Box>
      <TorusKnot args={[0.5, 0.1, 100, 16]} position={[0, 0.5, 0]}>
        <meshBasicMaterial 
          color={active ? "#00ffcc" : "#d4af37"} 
          wireframe 
          transparent 
          opacity={0.6} 
        />
      </TorusKnot>
    </group>
  );
};

const FutureProjects = () => {
  const [active, setActive] = useState(false);

  return (
    <section 
      className="relative w-full h-[80vh] min-h-[600px] bg-[#020202] border-t border-white/5 overflow-hidden z-10 flex flex-col md:flex-row items-center px-4 sm:px-6 lg:px-24"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#00ffcc] blur-[150px] opacity-10 -translate-y-1/2 z-0 mix-blend-screen transition-opacity duration-1000"></div>

      {/* Typography */}
      <div className="w-full md:w-1/2 relative z-10 mt-16 md:mt-0">
        <h2 className="text-sm tracking-[0.4em] text-[#00ffcc] uppercase font-bold mb-4">{localData.futureProjects.tagline}</h2>
        <h3 className="text-4xl sm:text-5xl md:text-7xl font-light text-white mb-6 uppercase leading-tight">
          {localData.futureProjects.titleLine1} <span className="font-bold">{localData.futureProjects.titleHighlight}</span>
        </h3>
        <p className="text-gray-400 font-light max-w-sm tracking-widest text-sm uppercase">
          {localData.futureProjects.description}
        </p>
        <button className="mt-8 border border-[#00ffcc]/30 py-3 px-8 text-[#00ffcc] uppercase text-xs tracking-[0.3em] font-bold hover:bg-[#00ffcc] hover:text-black transition-colors duration-500">
          Decrypt Files
        </button>
      </div>

      {/* 3D Hologram Area */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full relative z-10 mt-12 md:mt-0">
        <Canvas camera={{ position: [0, 2, 6], fov: 40 }}>
          <HologramGroup active={active} />
        </Canvas>
        
        {/* Hologram projector base light */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-8 rounded-[100%] border border-[#00ffcc]/30 shadow-[0_0_30px_rgba(0,255,204,0.3)] pointer-events-none"></div>
      </div>

    </section>
  );
};

export default FutureProjects;
