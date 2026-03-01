import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';
import localData from '../data/websiteData.json';

const Navbar = ({ isReady }) => {
  const navRef = useRef();
  const menuRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();
  const { global: globalData, navbar: navData } = localData;

  useEffect(() => {
    if (isReady && navRef.current) {
      gsap.fromTo(navRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
      );
    }
  }, [isReady]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(menuRef.current, 
        { top: '-100vh', opacity: 0 }, 
        { top: 0, opacity: 1, duration: 1, ease: "power4.inOut" }
      );
    } else {
      document.body.style.overflow = 'auto';
      gsap.to(menuRef.current, { top: '-100vh', opacity: 0, duration: 1, ease: "power4.inOut" });
    }
    return () => { document.body.style.overflow = 'auto'; }
  }, [menuOpen]);

  const handleScroll = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false); // Ensure menu closes when navigating
    if (lenis) {
      lenis.scrollTo(id, { offset: 0, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      const el = document.querySelector(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHome = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(0, { offset: 0, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav ref={navRef} className="opacity-0 fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 lg:px-24 py-6 md:py-8 pointer-events-auto bg-gradient-to-b from-[#050505]/80 to-transparent backdrop-blur-[2px]">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleHome}>
          <div className="w-6 h-6 flex items-center justify-center border-2 border-[#d4af37] transition-all duration-700 ease-in-out group-hover:rotate-90">
            <div className="w-2 h-2 bg-[#d4af37] transition-transform duration-700 group-hover:scale-50"></div>
          </div>
          <h2 className="text-xl md:text-2xl font-light text-white tracking-widest uppercase">
            {globalData.companyNamePrefix}<span className="font-bold text-[#d4af37]">{globalData.companyNameSuffix}</span>
          </h2>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 border-r border-white/20 pr-8">
            {navData.links.map((link, idx) => (
              <a key={idx} href={link.href} onClick={handleScroll(link.href)} className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-300 hover:text-[#d4af37] transition-colors relative group">
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#d4af37] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          
          {/* Minimal Architectural Hamburger Menu */}
          <button className="flex flex-col gap-1.5 items-end group py-2 relative z-[60]" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={`h-[1px] bg-white transition-all duration-500 origin-right ${menuOpen ? 'w-8 rotate-45 translate-y-2 bg-[#d4af37]' : 'w-8 group-hover:bg-[#d4af37]'}`}></div>
            <div className={`h-[1px] bg-white transition-all duration-500 origin-right ${menuOpen ? 'w-8 -rotate-45 -translate-y-[1px] bg-[#d4af37]' : 'w-5 group-hover:w-8 group-hover:bg-[#d4af37]'}`}></div>
          </button>
        </div>
        
      </nav>

      {/* Full Screen Architectural Menu Modal */}
      <div 
        ref={menuRef} 
        className="fixed left-0 w-full h-screen bg-[#050505]/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center pointer-events-auto border-b border-[#d4af37]/20 opacity-0"
        style={{ top: '-100vh' }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(212,175,55,1)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,1)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
        </div>

        <div className="flex flex-col gap-12 text-center relative z-10 w-full max-w-lg">
          {navData.menuLinks.map((link, idx) => (
            <React.Fragment key={idx}>
              <a href={link.href} onClick={handleScroll(link.href)} className="group flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#d4af37] font-bold mb-2">{link.number} // {link.subtitle}</span>
                <span className="text-4xl sm:text-5xl md:text-7xl font-light text-white uppercase tracking-tighter group-hover:text-[#d4af37] transition-colors duration-500">{link.title}</span>
              </a>
              {idx < navData.menuLinks.length - 1 && (
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
