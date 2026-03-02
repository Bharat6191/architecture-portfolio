import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, PresentationControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import localData from '../data/websiteData.json';

const ExplodedHouse = ({ hovered }) => {
  const groupRef = useRef();
  
  // Refs for exploded layers
  const roofRef = useRef();
  const wallLRef = useRef();
  const wallRRef = useRef();
  const floor2Ref = useRef();

  useFrame((state, delta) => {
    // Rotating gently
    groupRef.current.rotation.y += delta * 0.1;

    // Exploded View Logic
    const tr = hovered ? 1 : 0;
    
    // Roof rises up
    roofRef.current.position.y += ((2 + tr * 2.5) - roofRef.current.position.y) * 0.05;
    
    // Walls slide out
    wallLRef.current.position.x += ((-1.5 - tr * 1.5) - wallLRef.current.position.x) * 0.05;
    wallRRef.current.position.x += ((1.5 + tr * 1.5) - wallRRef.current.position.x) * 0.05;
    
    // Second floor separates
    floor2Ref.current.position.y += ((1 + tr * 1) - floor2Ref.current.position.y) * 0.05;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      
      {/* Ground Floor Plan Highlight */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial color={hovered ? "#d4af37" : "#333"} wireframe opacity={0.3} transparent />
      </mesh>

      {/* Ground Floor Core */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 1, 3]} />
        <meshPhysicalMaterial color={hovered ? "#d4af37" : "#111"} metalness={0.9} roughness={0.1} emissive={hovered ? "#d4af37" : "#000"} emissiveIntensity={0.2} wireframe={!hovered} />
      </mesh>

      {/* Wall Left */}
      <mesh ref={wallLRef} position={[-1.5, 0.5, 0]}>
        <boxGeometry args={[0.2, 2, 3]} />
        <meshStandardMaterial color="#fff" transparent opacity={0.8} wireframe />
      </mesh>

      {/* Wall Right */}
      <mesh ref={wallRRef} position={[1.5, 0.5, 0]}>
        <boxGeometry args={[0.2, 2, 3]} />
        <meshStandardMaterial color="#fff" transparent opacity={0.8} wireframe />
      </mesh>

      {/* Second Floor Slab */}
      <group ref={floor2Ref} position={[0, 1, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.2, 0.2, 3.2]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
        
        {/* Second Floor Core glow */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[2.5, 1, 2.5]} />
          <meshBasicMaterial color={hovered ? "#fff" : "#222"} transparent opacity={hovered ? 0.3 : 0.8} />
        </mesh>
      </group>

      {/* Roof */}
      <group ref={roofRef} position={[0, 2, 0]}>
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[3.2, 1.5, 4]} />
          <meshStandardMaterial color="#333" wireframe={hovered} />
        </mesh>
      </group>

    </group>
  );
};

const Hero = ({ isReady }) => {
  const [hovered, setHovered] = useState(false);
  const titleRef = useRef();
  const canvasContainerRef = useRef();
  
  useEffect(() => {
    if (isReady && titleRef.current && canvasContainerRef.current) {
      const tl = gsap.timeline();
      
      // Smoothly fade in the sweeping 3D architecture
      tl.fromTo(canvasContainerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 2.5, ease: "power3.out" },
        0.1 // slight delay after loading screen starts fading
      );

      // Stagger the typography to follow the architectural entrance
      tl.fromTo(titleRef.current.children, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 2, ease: "power4.out", stagger: 0.15 },
        0.4 // Overlap with Canvas fade-in
      );
    }
  }, [isReady]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden z-10 px-6 lg:px-24 perspective-1000">
      
      {/* Interactive 3D Canvas */}
      <div 
        ref={canvasContainerRef}
        className="opacity-0 absolute inset-0 z-0 cursor-crosshair transform-style-3d group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Canvas 
          dpr={[1, 1.5]} 
          gl={{ powerPreference: 'high-performance' }}
        >
          <PerspectiveCamera makeDefault position={[0, 4, 10]} fov={-45} />
          <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={40} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
          <Environment preset="city" />

          <PresentationControls
            global
            config={{ mass: 3, tension: 400 }}
            snap={{ mass: 4, tension: 300 }}
            rotation={[0, 0.5, 0]}
            polar={[-Math.PI / 6, Math.PI / 4]}
            azimuth={[-Math.PI / 3, Math.PI / 3]}
          >
            <ExplodedHouse hovered={hovered} />
          </PresentationControls>
        </Canvas>
      </div>

      {/* Typography Overlay */}
      <div ref={titleRef} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-start gap-2 md:gap-4 pointer-events-none lg:mix-blend-difference mt-20 md:mt-0">
        <h1 className="opacity-0 text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-black uppercase tracking-tighter leading-[0.9] text-white">
          {localData.hero.titleLine1}
        </h1>
        <h1 className="opacity-0 text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-black uppercase tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-[#d4af37]">
          {localData.hero.titleLine2}
        </h1>
        <h1 className="opacity-0 text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-black uppercase tracking-tighter leading-[0.9] text-white">
          {localData.hero.titleLine3}
        </h1>
        <p 
          className="opacity-0 text-sm sm:text-base md:text-2xl font-light tracking-[0.2em] md:tracking-[0.3em] text-[#d4af37] mt-4 md:mt-8 uppercase block max-w-lg"
          dangerouslySetInnerHTML={{ __html: localData.hero.subtitle }}
        />
      </div>

    </section>
  );
};

export default Hero;
