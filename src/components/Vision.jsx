import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localData from '../data/websiteData.json';

gsap.registerPlugin(ScrollTrigger);

const Vision = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    // 3D parallax scroll effect on the typography
    gsap.fromTo(textRef.current,
      { y: 100, opacity: 0, rotateX: 45, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // Arch lines revealing playfully
    gsap.fromTo(linesRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 2,
        stagger: 0.1,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center border-t border-white/5 overflow-hidden z-10 px-6">
      
      {/* Drafting lines background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div ref={el => linesRef.current[0] = el} className="absolute top-[20%] left-0 right-0 h-[1px] bg-white origin-left"></div>
        <div ref={el => linesRef.current[1] = el} className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-[#d4af37] origin-right"></div>
        <div ref={el => linesRef.current[2] = el} className="absolute top-[40%] left-[10%] right-[10%] h-[1px] bg-white/40 origin-center"></div>
      </div>

      <div className="w-full max-w-5xl mx-auto text-center perspective-[1000px]">
        <h2 className="text-sm tracking-[0.4em] text-[#d4af37] uppercase font-bold mb-8 md:mb-12">{localData.vision.tagline}</h2>
        <div ref={textRef} className="transform-style-3d text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light uppercase leading-[1.2] text-white/90">
          <p className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-500">
            {localData.vision.title}
          </p>
          {localData.vision.subtitle && (
            <span className="block text-[#d4af37] text-lg md:text-2xl mt-8 font-light tracking-[0.3em]"> 
              {localData.vision.subtitle}
            </span>
          )}
        </div>
      </div>

    </section>
  );
};

export default Vision;
