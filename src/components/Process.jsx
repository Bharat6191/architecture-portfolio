import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localData from '../data/websiteData.json';

gsap.registerPlugin(ScrollTrigger);

const ProcessStep = ({ stepNumber, title, description, isLast }) => {
  const stepRef = useRef();

  useEffect(() => {
    gsap.fromTo(stepRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stepRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <div ref={stepRef} className={`relative flex gap-6 sm:gap-8 md:gap-16 items-start ${!isLast ? 'pb-16 md:pb-24' : ''}`}>
      {/* Drafting Node */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-[#0a0a0a] border border-[#d4af37] flex items-center justify-center shrink-0">
          <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full"></div>
        </div>
        {/* The line connecting nodes is handled by the parent container */}
      </div>

      {/* Content */}
      <div className="flex-1 mt-[-6px]">
        <span className="text-xl md:text-2xl font-black text-white/10 uppercase tracking-[0.3em] block mb-2">Step 0{stepNumber}</span>
        <h4 className="text-xl sm:text-2xl md:text-3xl font-light text-white mb-4 uppercase inline-block border-b border-[#d4af37]/30 pb-2">{title}</h4>
        <p className="text-gray-400 font-light leading-relaxed max-w-lg">{description}</p>
      </div>
    </div>
  );
};

const Process = () => {
  const lineRef = useRef();
  const sectionRef = useRef();

  useEffect(() => {
    gsap.fromTo(lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );
  }, []);

  const steps = localData.process.steps;

  return (
    <section ref={sectionRef} className="relative w-full py-16 md:py-32 px-4 sm:px-6 lg:px-24 bg-[#0f0f0f] border-t border-white/5 z-10 overflow-hidden">
      
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 sm:gap-16 md:gap-32">
        
        {/* Left Typography */}
        <div className="w-full md:w-1/3">
          <h2 className="text-sm tracking-[0.3em] text-[#d4af37] uppercase font-bold mb-4">{localData.process.tagline}</h2>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-light mb-8">
            {localData.process.titleLine1} <br/> <span className="font-bold">{localData.process.titleHighlight}</span>
          </h3>
          <p className="text-gray-400 font-light leading-relaxed">
            {localData.process.description || "From the first penciled draft to the final poured concrete, our process is an algorithmic approach to spatial harmony."}
          </p>
        </div>

        {/* Right Timeline */}
        <div className="w-full md:w-2/3 relative pt-8">
          
          {/* Animated Vertical Drafting Line */}
          <div className="absolute left-[7px] top-9 bottom-0 w-[1px] bg-white/10 z-0"></div>
          <div ref={lineRef} className="absolute left-[7px] top-9 w-[1px] bg-[#d4af37] z-0 origin-top"></div>

          <div className="relative z-10">
            {steps.map((step, idx) => (
               <ProcessStep key={idx} stepNumber={idx + 1} {...step} isLast={idx === steps.length - 1} />
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};

export default Process;
