import React from 'react';

export const WorldMap = () => {
  return (
    <div className="absolute inset-0 opacity-10 pointer-events-none">
       {/* Simplified World Outline using SVG */}
      <svg viewBox="0 0 800 400" className="w-full h-full text-slate-400 fill-current">
        {/* North America */}
        <path d="M 50,60 Q 80,30 150,50 T 200,80 L 220,150 L 150,180 L 100,120 Z" />
        {/* South America */}
        <path d="M 180,200 L 250,200 L 270,300 L 220,380 L 170,280 Z" />
        {/* Europe */}
        <path d="M 330,50 L 400,40 L 420,80 L 380,100 L 320,90 Z" />
        {/* Africa */}
        <path d="M 320,120 L 420,120 L 450,200 L 400,300 L 320,220 Z" />
        {/* Asia */}
        <path d="M 430,50 L 600,40 L 700,80 L 650,200 L 550,220 L 450,100 Z" />
        {/* Australia */}
        <path d="M 600,280 L 700,280 L 720,350 L 620,360 Z" />
      </svg>
    </div>
  );
};