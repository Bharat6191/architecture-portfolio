import React from 'react';

const BlueprintOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {/* Decorative Blueprint Lines */}
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="-10%" x2="10%" y2="110%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="90%" y1="-10%" x2="90%" y2="110%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="-10%" y1="10%" x2="110%" y2="10%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="-10%" y1="90%" x2="110%" y2="90%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Geometric Accents */}
        <circle cx="10%" cy="10%" r="40" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1.5" />
        <circle cx="90%" cy="90%" r="60" fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="1" />
        <circle cx="90%" cy="90%" r="20" fill="none" stroke="rgba(212,175,55,0.15)" strokeWidth="1" />
        <line x1="10%" y1="10%" x2="15%" y2="15%" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
      </svg>
      {/* Dynamic Grid Overlay is handled by body background in index.css */}
    </div>
  );
};

export default BlueprintOverlay;
