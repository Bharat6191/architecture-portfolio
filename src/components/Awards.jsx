import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localData from '../data/websiteData.json';

gsap.registerPlugin(ScrollTrigger);

const AwardItem = ({ year, title, body }) => {
  const lineRef = useRef();

  useEffect(() => {
    gsap.fromTo(lineRef.current,
      { width: "0%" },
      { 
        width: "100%", 
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <div className="w-full flex flex-col group hover:bg-[#d4af37]/5 transition-colors duration-500 py-8 px-6 cursor-crosshair">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-6 relative gap-2 md:gap-0">
        <span className="text-xl md:text-3xl font-black text-[#d4af37] tracking-widest">{year}</span>
        
        {/* Metallic typography */}
        <h4 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-100 via-gray-400 to-gray-800 drop-shadow-md group-hover:from-[#d4af37] group-hover:to-yellow-800 transition-all duration-700">
          {title}
        </h4>
        
        <p className="text-gray-400 font-light mt-4 md:mt-0 text-sm tracking-widest uppercase md:w-1/4 md:text-right">
          {body}
        </p>
      </div>

      <div className="w-full h-[1px] bg-white/10 relative">
        <div ref={lineRef} className="absolute inset-0 bg-[#d4af37]"></div>
      </div>
    </div>
  );
};

const Awards = () => {
  return (
    <section className="w-full py-16 md:py-32 px-4 sm:px-6 lg:px-24 bg-[#050505] z-10 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <h2 className="text-sm tracking-[0.4em] text-[#d4af37] uppercase font-bold mb-4">{localData.awards.tagline}</h2>
        <h3 className="text-3xl sm:text-4xl md:text-6xl font-light text-white mb-12 md:mb-16 uppercase text-center">
          {localData.awards.titleLine1} <span className="font-bold">{localData.awards.titleHighlight}</span>
        </h3>

        <div className="w-full">
          {localData.awards.items.map((award, idx) => (
            <AwardItem key={idx} year={award.year} title={award.title} body={award.category} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Awards;
