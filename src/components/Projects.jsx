import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localData from '../data/websiteData.json';

gsap.registerPlugin(ScrollTrigger);

const MiniatureBuilding = ({ active, scale = 1 }) => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (active && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={meshRef} scale={scale}>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color={active ? "#d4af37" : "#555555"} wireframe={!active} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[1.5, 1, 4]} />
        <meshStandardMaterial color={active ? "#ffffff" : "#ffffff"} wireframe={!active} />
      </mesh>
    </group>
  );
};

const WalkthroughModal = ({ project, onClose }) => {
  const modalRef = useRef();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, { 
      opacity: 0, 
      duration: 0.5, 
      ease: "power2.in", 
      onComplete: onClose 
    });
  };

  return (
    <div ref={modalRef} className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center backdrop-blur-3xl">
      <button 
        onClick={handleClose}
        className="absolute top-8 right-8 z-[210] text-white uppercase text-xs tracking-[0.3em] font-bold hover:text-[#d4af37] transition-colors flex items-center justify-center w-12 h-12 bg-white/5 rounded-full border border-white/10 hover:border-[#d4af37]/50"
      >
        <span className="mb-[2px]">X</span>
      </button>

      <div className="absolute top-8 left-8 z-[210] pointer-events-none lg:mix-blend-difference">
         <p className="text-[#d4af37] text-xs uppercase tracking-[0.3em] font-bold">{project.category}</p>
         <h2 className="text-3xl sm:text-4xl md:text-7xl font-light text-white uppercase mt-2 tracking-tighter">{project.title}</h2>
         <p className="text-gray-400 text-xs font-mono mt-4 border-l border-[#d4af37] pl-3">DRAG TO ORBIT • SCROLL TO ZOOM</p>
      </div>

      <div className="absolute inset-0 z-[205] cursor-move">
        <Canvas camera={{ position: [5, 5, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
          <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#d4af37" />
          
          <MiniatureBuilding active={true} scale={1.5} />
          
          <OrbitControls 
            enablePan={true} 
            enableZoom={true} 
            autoRotate={true} 
            autoRotateSpeed={0.5} 
            maxPolarAngle={Math.PI / 2 + 0.1}
          />
        </Canvas>
      </div>
      
      {/* Decorative Blueprint Overlay for Modal */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-[204]">
        <div className="w-full h-full bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>
    </div>
  );
};

const ProjectCard = ({ title, category, year, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef();
  
  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      className="relative group w-full h-[350px] md:h-[450px] border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden flex flex-col justify-end p-6 md:p-8 cursor-pointer transition-all duration-700 hover:border-[#d4af37]/50 mt-8"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 3D Miniature Model on Hover */}
      <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-1000 ease-out group-hover:opacity-100">
        <Canvas 
          frameloop={hovered ? "always" : "demand"} 
          dpr={[1, 1.5]} 
          gl={{ powerPreference: 'default', antialias: false }} 
          camera={{ position: [3, 3, 4], fov: 40 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <MiniatureBuilding active={hovered} />
        </Canvas>
      </div>

      {/* CAD Measurement Lines (Appear on Hover) */}
      <div className="absolute inset-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 flex flex-col justify-between">
        <div className="flex justify-between items-start text-[#d4af37] text-[10px] tracking-widest font-mono">
          <span className="flex items-center gap-2"><div className="w-1 h-1 bg-[#d4af37]"></div> X: 45.3M</span>
          <span className="flex items-center gap-2">Y: 12.8M <div className="w-1 h-1 bg-[#d4af37]"></div></span>
        </div>
        <div className="flex justify-between items-end text-[#d4af37] text-[10px] tracking-widest font-mono">
          <span className="flex items-center gap-2"><div className="w-[1px] h-10 bg-[#d4af37]/50"></div> Elev. +5.0</span>
          <span className="flex items-center gap-2">Scale 1:100 <div className="w-[1px] h-10 bg-[#d4af37]/50"></div></span>
        </div>
      </div>

      {/* Info Layer */}
      <div className="relative z-20 translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-out bg-gradient-to-t from-black/80 to-transparent p-4 -mx-8 -mb-8 pb-8">
        <p className="text-xs uppercase tracking-[0.3em] font-bold text-[#d4af37] mb-2">{category} &mdash; {year}</p>
        <h3 className="text-3xl md:text-4xl font-light text-white mb-3 group-hover:text-[#d4af37] transition-colors duration-500">{title}</h3>
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out delay-75 border-b border-[#d4af37] pb-1 text-white">
          Enter 3D Walkthrough
          <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full"></div>
        </span>
      </div>
      
      {/* Decorative architectural corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20 group-hover:border-[#d4af37] transition-colors duration-500"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20 group-hover:border-[#d4af37] transition-colors duration-500"></div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef();
  const [showAll, setShowAll] = useState(false);
  const [activeWalkthrough, setActiveWalkthrough] = useState(null);

  useEffect(() => {
    // Only animate on initial mount/scroll, avoid re-animating when toggle happens unless targeted
    gsap.fromTo(".project-card-anim", 
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  const projectList = localData.projects.items;

  const displayedProjects = showAll ? projectList : projectList.slice(0, 4);

  return (
    <>
      <section id="projects" ref={sectionRef} className="relative w-full min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-24 border-t border-white/5 z-10">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-8 border-b border-white/10 pb-8">
          <div>
            <h2 className="text-sm tracking-[0.3em] text-[#d4af37] uppercase font-bold mb-4">{localData.projects.tagline}</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-light">
              {localData.projects.titleLine1} <span className="font-bold">{localData.projects.titleHighlight}</span>
            </h3>
          </div>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-gray-400 font-bold mt-4 md:mt-0 tracking-[0.3em] text-xs uppercase cursor-pointer hover:text-[#d4af37] transition-colors border border-white/10 py-3 px-6 rounded-full hover:border-[#d4af37]/50 bg-white/5 backdrop-blur-sm"
          >
            {showAll ? localData.projects.collapseText : localData.projects.viewAllText}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 -mt-8">
          {displayedProjects.map((proj, idx) => (
            <div key={`${proj.title}-${idx}`} className="project-card-anim">
              <ProjectCard {...proj} onClick={() => setActiveWalkthrough(proj)} />
            </div>
          ))}
        </div>
      </section>

      {/* 3D Walkthrough Modal */}
      {activeWalkthrough && (
        <WalkthroughModal 
          project={activeWalkthrough} 
          onClose={() => setActiveWalkthrough(null)} 
        />
      )}
    </>
  );
};

export default Projects;
