import React, { useState } from 'react';
import { ServerIcon, UserIcon, FileIcon, DatabaseIcon, LockIcon, ZapIcon } from '../Icons';

const TypesTab = () => {
  const [hoveredPath, setHoveredPath] = useState<'A' | 'B' | null>(null);

  return (
    <div className="w-full h-full flex flex-col p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Static vs. Dynamic Content</h2>
        <p className="text-slate-300">
          Not everything is cached. Static assets (images, CSS) live at the edge. Dynamic requests (API calls) must go to the Origin, but CDNs still optimize this route.
        </p>
      </div>

      <div className="flex-grow bg-slate-800 rounded-xl border border-slate-700 p-8 relative flex items-center justify-between">
        
        {/* Hover Areas / Invisible Triggers */}
        {/* We use buttons overlaid on the SVG paths for interaction */}
        
        {/* Path A Zone (Top) */}
        <div 
            onMouseEnter={() => setHoveredPath('A')}
            onMouseLeave={() => setHoveredPath(null)}
            className={`absolute top-[20%] left-[20%] right-[30%] height-[30%] p-4 rounded-xl border-2 cursor-pointer transition-colors z-20 flex items-start justify-center pt-2 ${
                hoveredPath === 'A' ? 'bg-slate-700/50 border-cyan-400' : 'border-transparent bg-transparent'
            }`}
            style={{ height: '30%' }}
        >
            <div className="bg-slate-900 px-3 py-1 rounded text-cyan-400 text-sm font-bold border border-cyan-900/50 shadow-lg pointer-events-none">
                Hover: Static Path (images, css)
            </div>
        </div>

        {/* Path B Zone (Bottom) */}
        <div 
             onMouseEnter={() => setHoveredPath('B')}
             onMouseLeave={() => setHoveredPath(null)}
             className={`absolute bottom-[20%] left-[20%] right-[10%] height-[30%] p-4 rounded-xl border-2 cursor-pointer transition-colors z-20 flex items-end justify-center pb-2 ${
                hoveredPath === 'B' ? 'bg-slate-700/50 border-purple-400' : 'border-transparent bg-transparent'
            }`}
            style={{ height: '30%' }}
        >
            <div className="bg-slate-900 px-3 py-1 rounded text-purple-400 text-sm font-bold border border-purple-900/50 shadow-lg pointer-events-none">
                Hover: Dynamic Path (API, User Data)
            </div>
        </div>


        {/* Visuals */}
        <div className="z-10 flex flex-col items-center">
            <UserIcon className="w-12 h-12 text-white" />
            <span className="font-bold text-slate-400 mt-2">User</span>
        </div>

        {/* The Fork SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
             {/* Path A: Static */}
             <path 
                d="M 120 200 C 200 200, 200 100, 350 100 L 500 100" 
                fill="none" 
                stroke={hoveredPath === 'A' ? '#22d3ee' : '#475569'} 
                strokeWidth={hoveredPath === 'A' ? 4 : 2}
                className="transition-all duration-300"
                strokeDasharray={hoveredPath === 'A' ? '5,5' : '0'}
             />
             
             {/* Path B: Dynamic */}
             <path 
                d="M 120 200 C 200 200, 200 300, 350 300 L 700 300" 
                fill="none" 
                stroke={hoveredPath === 'B' ? '#a855f7' : '#475569'} 
                strokeWidth={hoveredPath === 'B' ? 4 : 2}
                className="transition-all duration-300"
             />
             {/* Connection from Edge to Origin for Dynamic */}
             {/* Wait, the graphic handles this below */}
        </svg>

        {/* Edge Server */}
        <div className="absolute left-[45%] top-[8%] flex flex-col items-center z-10">
            <ServerIcon className={`w-14 h-14 ${hoveredPath === 'A' ? 'text-cyan-400' : 'text-slate-500'}`} filled={hoveredPath === 'A'} color={hoveredPath === 'A' ? '#22d3ee' : 'currentColor'} />
            <span className="text-xs font-bold text-slate-400 bg-slate-900 p-1">Edge Cache</span>
            {hoveredPath === 'A' && (
                <div className="absolute -top-4 right-0 bg-emerald-500 text-white p-1 rounded-full shadow-lg animate-bounce">
                    <LockIcon className="w-4 h-4" />
                </div>
            )}
        </div>

        {/* Intermediate Hop for Dynamic */}
        <div className="absolute left-[45%] bottom-[18%] flex flex-col items-center z-10">
             <div className="bg-slate-700 p-3 rounded-lg border border-slate-600">
                <span className="text-xs text-slate-300 font-mono">Edge Router</span>
             </div>
             {hoveredPath === 'B' && (
                 <div className="absolute -bottom-8 flex items-center gap-1 text-purple-400 text-xs font-bold animate-pulse whitespace-nowrap">
                     <ZapIcon className="w-4 h-4" /> Optimized Route
                 </div>
             )}
        </div>

        {/* Origin Server */}
        <div className="z-10 flex flex-col items-center ml-auto">
             <DatabaseIcon className={`w-16 h-16 ${hoveredPath === 'B' ? 'text-purple-500' : 'text-slate-600'}`} />
             <span className="font-bold text-slate-400 mt-2">Origin</span>
        </div>

        {/* Moving Icons based on Hover */}
        {hoveredPath === 'A' && (
            <div className="absolute left-[15%] top-[22%] animate-[moveStatic_1s_linear_infinite]">
                <FileIcon className="w-6 h-6 text-cyan-400 bg-slate-900 rounded-full" />
            </div>
        )}
        {hoveredPath === 'B' && (
            <div className="absolute left-[15%] bottom-[22%] animate-[moveDynamic_1.5s_linear_infinite]">
                 <div className="w-4 h-4 bg-purple-500 rounded text-[8px] flex items-center justify-center text-white font-bold">API</div>
            </div>
        )}

      </div>
      
      <style>{`
        @keyframes moveStatic {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: 1; }
            50% { transform: translate(250px, -100px); opacity: 1; }
            90% { transform: translate(350px, -100px); opacity: 0; }
            100% { transform: translate(350px, -100px); opacity: 0; }
        }
        @keyframes moveDynamic {
            0% { transform: translate(0, 0); opacity: 0; }
            10% { opacity: 1; }
            40% { transform: translate(250px, 100px); }
            100% { transform: translate(650px, 100px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default TypesTab;