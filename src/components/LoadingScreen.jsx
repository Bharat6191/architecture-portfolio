import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LoadingScreen = ({ onFinish }) => {
  const containerRef = useRef();
  const lineHRef = useRef([]);
  const lineVRef = useRef([]);
  const titleRef = useRef();
  const subtitleRef = useRef();
  
  useEffect(() => {
    // Cinematic timeline
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.inOut",
          onComplete: onFinish
        });
      }
    });

    // Draw horizontal lines
    tl.fromTo(lineHRef.current, 
      { scaleX: 0 },
      { scaleX: 1, duration: 0.5, stagger: 0.05, ease: "power3.inOut" },
      0
    );

    // Draw vertical lines
    tl.fromTo(lineVRef.current, 
      { scaleY: 0 },
      { scaleY: 1, duration: 0.5, stagger: 0.05, ease: "power3.inOut" },
      0.2
    );

    // Fade in text gracefully
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      0.6
    );

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      0.9
    );

    // Hold screen
    tl.to({}, { duration: 0.5 });

  }, [onFinish]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden">
      
      {/* Blueprint Drawing Effects */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
        <div className="w-[80vw] h-[80vh] relative max-w-4xl max-h-4xl">
          {/* Horizontal tracking lines */}
          {[20, 40, 60, 80].map((top, idx) => (
             <div 
               key={`h-${idx}`} 
               ref={el => lineHRef.current[idx] = el}
               style={{ top: `${top}%` }} 
               className="absolute left-0 right-0 h-[1px] bg-white transform origin-left"
             ></div>
          ))}
          {/* Vertical tracking lines */}
          {[20, 40, 60, 80].map((left, idx) => (
             <div 
               key={`v-${idx}`} 
               ref={el => lineVRef.current[idx] = el}
               style={{ left: `${left}%` }} 
               className="absolute top-0 bottom-0 w-[1px] bg-[#d4af37] transform origin-top"
             ></div>
          ))}
          {/* Center Box Build */}
          <div ref={el => lineHRef.current[4] = el} className="absolute left-[30%] right-[30%] top-[30%] h-[1px] bg-white transform origin-center"></div>
          <div ref={el => lineVRef.current[4] = el} className="absolute top-[30%] bottom-[30%] left-[30%] w-[1px] bg-white transform origin-bottom"></div>
          <div ref={el => lineVRef.current[5] = el} className="absolute top-[30%] bottom-[30%] right-[30%] w-[1px] bg-white transform origin-top"></div>
          <div ref={el => lineHRef.current[5] = el} className="absolute left-[30%] right-[30%] bottom-[30%] h-[1px] bg-white transform origin-center"></div>
        </div>
      </div>

      {/* Typography */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 ref={titleRef} className="text-4xl md:text-6xl font-light text-white uppercase tracking-widest mb-4">
          Crafting Space
        </h1>
        <p ref={subtitleRef} className="text-[#d4af37] text-xs uppercase font-bold">
          Initializing Geometry...
        </p>
      </div>

    </div>
  );
};

export default LoadingScreen;
