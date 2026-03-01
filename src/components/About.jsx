import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localData from '../data/websiteData.json';

gsap.registerPlugin(ScrollTrigger);

const MorphingHouse = ({ isInView }) => {
  const meshRef = useRef();
  
  // Materials
  const solidMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0,
  });

  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xd4af37,
    wireframe: true,
    transparent: true,
    opacity: 0.8,
  });

  useEffect(() => {
    if (isInView) {
      gsap.to(solidMaterial, {
        opacity: 1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsap.to(wireframeMaterial, {
        opacity: 0.1,
        duration: 2,
        ease: "power2.inOut"
      });
      gsap.to(meshRef.current.rotation, {
        y: Math.PI / 2,
        duration: 3,
        ease: "power3.out"
      });
    } else {
      gsap.to(solidMaterial, {
        opacity: 0,
        duration: 1
      });
      gsap.to(wireframeMaterial, {
        opacity: 0.8,
        duration: 1
      });
      gsap.to(meshRef.current.rotation, {
        y: 0,
        duration: 1
      });
    }
  }, [isInView]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[4, 3, 4]} />
        <primitive object={solidMaterial} attach="material" />
      </mesh>
      <mesh scale={[1.01, 1.01, 1.01]}>
        <boxGeometry args={[4, 3, 4]} />
        <primitive object={wireframeMaterial} attach="material" />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[3.5, 2, 4]} />
        <primitive object={solidMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 2.5, 0]} scale={[1.01, 1.01, 1.01]}>
        <coneGeometry args={[3.5, 2, 4]} />
        <primitive object={wireframeMaterial} attach="material" />
      </mesh>
    </group>
  );
};

const About = () => {
  const sectionRef = useRef();
  const [isInView, setIsInView] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      onEnter: () => setIsInView(true),
      onLeaveBack: () => setIsInView(false),
    });

    gsap.fromTo(
      textRef.current.children,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.2,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex flex-col md:flex-row items-center py-16 md:py-24 px-4 sm:px-6 lg:px-24 z-10 border-t border-white/5 bg-[#0f0f0f]">
      {/* Scroll reveals floor plan layers conceptually via text and structure */}
      
      {/* Left side: Typography */}
      <div ref={textRef} className="w-full md:w-1/2 flex flex-col gap-6 z-10">
        <h2 className="text-sm tracking-[0.3em] text-[#d4af37] uppercase font-bold">{localData.about.tagline}</h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-light leading-tight">
          {localData.about.titleLine1} <br/> {localData.about.titleLine2} <span className="font-bold text-white">{localData.about.titleHighlight}</span>
        </h3>
        <p className="text-gray-400 text-base md:text-xl font-light leading-relaxed max-w-md">
          {localData.about.description}
        </p>
        <div className="mt-6 md:mt-8 flex flex-wrap gap-6 md:gap-8 border-t border-white/10 pt-6 md:pt-8">
          {localData.about.stats.map((stat, idx) => (
            <div key={idx}>
              <span className="block text-3xl font-bold text-white">{stat.value}</span>
              <span className="text-xs tracking-widest text-[#d4af37] uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Morphing 3D Canvas */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-[80vh] relative z-0 mt-8 md:mt-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10 pointer-events-none w-1/4"></div>
        <Canvas>
          <PerspectiveCamera makeDefault position={[5, 4, 8]} fov={40} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[-5, 5, 5]} intensity={1} color={0xffffff} />
          <PresentationControls
            global
            config={{ mass: 1, tension: 200 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <MorphingHouse isInView={isInView} />
          </PresentationControls>
        </Canvas>
      </div>
    </section>
  );
};

export default About;
