import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Instances, Instance, SpotLight, Grid } from '@react-three/drei';
import * as THREE from 'three';

const DustParticles = () => {
  const pointsRef = useRef();
  
  // Creates an array of 2000 random localized positions
  const particles = useMemo(() => {
    const count = 500;
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 40;
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
};

const SkylineBox = ({ position, scale }) => {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
};

const CitySkyline = () => {
  const buildings = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      arr.push({
        position: [(Math.random() - 0.5) * 100, (Math.random() * 5), -30 - (Math.random() * 20)],
        scale: [1 + Math.random() * 3, 5 + Math.random() * 20, 1 + Math.random() * 3]
      });
    }
    return arr;
  }, []);

  return (
    <group position={[0, -10, 0]}>
      {buildings.map((b, i) => (
        <SkylineBox key={i} position={b.position} scale={b.scale} />
      ))}
    </group>
  );
};

const CursorLight = () => {
  const lightRef = useRef();
  
  useFrame((state) => {
    // Spotlight follows cursor slightly
    const x = (state.pointer.x * state.viewport.width) / 2;
    const y = (state.pointer.y * state.viewport.height) / 2;
    if (lightRef.current) {
      // Lerp for smooth following
      lightRef.current.position.x += (x * 2 - lightRef.current.position.x) * 0.05;
      lightRef.current.position.y += (y * 2 + 5 - lightRef.current.position.y) * 0.05;
    }
  });

  return (
    <spotLight 
      ref={lightRef}
      position={[0, 10, 5]} 
      angle={0.5} 
      penumbra={1} 
      intensity={8} 
      color="#d4af37" 
      distance={50}
    />
  );
};

const BackgroundEnvironment = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <Canvas 
        dpr={[1, 1.5]} 
        gl={{ powerPreference: 'high-performance', antialias: false }} 
        camera={{ position: [0, 2, 10], fov: 60 }}
      >
        {/* Soft fog depth effect */}
        <fog attach="fog" args={['#050505', 10, 30]} />
        
        <ambientLight intensity={0.2} color="#ffffff" />
        
        <CursorLight />

        {/* Fake Light Beams (Standard) */}
        <spotLight
          position={[10, 20, -10]}
          angle={0.4}
          penumbra={1}
          intensity={5}
          color="#ffffff"
          distance={80}
        />
        <spotLight
          position={[-10, 20, -10]}
          angle={0.4}
          penumbra={1}
          intensity={5}
          color="#d4af37"
          distance={80}
        />

        <DustParticles />
        <CitySkyline />
        
        {/* Floating Blueprint Grid moving in perspective */}
        <Grid 
          position={[0, -5, -10]} 
          args={[100, 100]} 
          cellSize={1} 
          cellThickness={0.5} 
          cellColor="#d4af37" 
          sectionSize={5} 
          sectionThickness={1} 
          sectionColor="#ffffff"
          fadeDistance={20} 
          fadeStrength={0.5}
          infiniteGrid
        />

        {/* Postprocessing effects removed globally for maximum performance and 60 FPS scrolling */}
        
      </Canvas>
    </div>
  );
};

export default BackgroundEnvironment;
