import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localData from '../data/websiteData.json';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef();
  
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    tl.fromTo(".about-text", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
    );

    tl.fromTo(".founder-img",
      { opacity: 0, scale: 0.9, filter: "grayscale(100%) blur(10px)" },
      { opacity: 1, scale: 1, filter: "grayscale(50%) blur(0px)", duration: 1.5, ease: "power2.out" },
      "-=0.8"
    );

    tl.fromTo(".founder-border",
      { scaleY: 0 },
      { scaleY: 1, duration: 1, ease: "power2.inOut" },
      "-=1.2"
    );
  }, []);

  return (
    <section id="studio" ref={sectionRef} className="relative w-full py-16 md:py-32 px-4 sm:px-6 lg:px-24 bg-[#0a0a0a] border-t border-white/5 z-10 overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Images & Founders */}
        <div className="w-full lg:w-5/12 relative flex justify-center lg:justify-end">
          
          <div className="relative w-full max-w-[400px] aspect-[4/5] group">
            <div className="absolute -inset-4 border border-[#d4af37]/30 transform translate-x-4 translate-y-4 founder-border origin-bottom z-0"></div>
            
            <div className="relative z-10 w-full h-full overflow-hidden bg-[#050505]">
              <img 
                src={localData.aboutUs.founderImg} 
                alt={localData.aboutUs.founderRole} 
                className="w-full h-full object-cover founder-img transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6">
                <p className="text-[#d4af37] text-xs font-bold uppercase tracking-[0.3em] mb-1">{localData.aboutUs.founderRole}</p>
                <h4 className="text-2xl font-light text-white uppercase tracking-wider">{localData.aboutUs.founderName}</h4>
              </div>
            </div>
            
            {/* Signature / Draft mark */}
            <div className="absolute -right-12 bottom-12 rotate-[-90deg] origin-bottom-right hidden md:block">
              <p className="text-white/20 font-mono text-sm tracking-[0.5em] whitespace-nowrap">{localData.aboutUs.founderMark}</p>
            </div>
          </div>
          
        </div>

        {/* Right Side: Copy & Ethos */}
        <div className="w-full lg:w-7/12 flex flex-col items-start text-left">
          <h2 className="about-text text-sm tracking-[0.4em] text-[#d4af37] uppercase font-bold mb-6">{localData.aboutUs.tagline}</h2>
          <h3 className="about-text text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light leading-tight text-white mb-6 md:mb-8 uppercase tracking-tighter">
            {localData.aboutUs.titleLine1} <br /> <span className="font-bold">{localData.aboutUs.titleHighlight}</span>
          </h3>
          
          <div className="about-text space-y-6 text-gray-400 font-light text-lg tracking-wide max-w-xl">
            {localData.aboutUs.descriptionParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="mt-8 md:mt-12 w-full grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 border-t border-white/10 pt-8">
            {localData.aboutUs.stats.map((stat, idx) => (
              <div key={idx} className={`about-text ${idx === 2 ? 'hidden md:block' : ''}`}>
                <span className="block text-3xl sm:text-4xl font-light text-white mb-2">{stat.value}{stat.suffix && <span className="text-[#d4af37]">{stat.suffix}</span>}</span>
                <span className="text-[10px] tracking-[0.2em] text-[#d4af37] uppercase font-bold">{stat.label}</span>
              </div>
            ))}
          </div>

        </div>
        
      </div>
    </section>
  );
};

export default AboutUs;
