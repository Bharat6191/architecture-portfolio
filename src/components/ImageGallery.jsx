import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localData from '../data/websiteData.json';

gsap.registerPlugin(ScrollTrigger);

const ImageGallery = () => {
  const sectionRef = useRef();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    gsap.fromTo(".gallery-img", 
      { opacity: 0, scale: 0.95, y: 50 },
      {
        opacity: 1, 
        scale: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);
  const images = localData.imageGallery.images;

  const displayedImages = showAll ? images : images.slice(0, 6);

  return (
    <section ref={sectionRef} className="relative w-full py-16 md:py-24 px-4 sm:px-6 lg:px-24 bg-[#050505] border-t border-white/5 z-10">
      
      <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 border-b border-white/10 pb-8">
        <div>
          <h2 className="text-sm tracking-[0.4em] text-[#d4af37] uppercase font-bold mb-4">{localData.imageGallery.tagline}</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white uppercase tracking-tighter">
            {localData.imageGallery.titleLine1} <span className="font-bold">{localData.imageGallery.titleHighlight}</span>
          </h3>
        </div>
        <button 
          onClick={() => setShowAll(!showAll)}
          className="text-gray-400 font-bold mt-4 md:mt-0 tracking-[0.3em] text-xs uppercase cursor-pointer hover:text-[#d4af37] transition-colors border border-white/10 py-3 px-6 rounded-full hover:border-[#d4af37]/50 bg-white/5 backdrop-blur-sm"
        >
          {showAll ? localData.imageGallery.collapseText : localData.imageGallery.viewMoreText}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedImages.map((img, idx) => (
          <div key={idx} className="gallery-img relative overflow-hidden group h-[300px] md:h-[400px] cursor-crosshair border border-white/10">
            {/* Image using Unsplash URLs currently, this can be easily replaced with your own local assets */}
            <img 
              src={img.src} 
              alt={img.title} 
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 filter grayscale-[50%] group-hover:grayscale-0"
            />
            {/* Dark Overlay that reveals on hover */}
            <div className="absolute inset-0 bg-[#050505]/60 group-hover:bg-[#050505]/20 transition-colors duration-500"></div>
            
            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
              <h4 className="text-white text-xl font-light uppercase tracking-widest border-l-2 border-[#d4af37] pl-4">
                {img.title}
              </h4>
               <p className="text-[#d4af37] text-[10px] tracking-widest font-mono mt-2 ml-4">
                CAPTURED // HIGH-RES
              </p>
            </div>
            
            {/* Decorative architectural corners */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/30 group-hover:border-[#d4af37] transition-colors duration-500"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/30 group-hover:border-[#d4af37] transition-colors duration-500"></div>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default ImageGallery;
