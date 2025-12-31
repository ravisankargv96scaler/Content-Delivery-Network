import React, { useState, useEffect, useMemo } from 'react';
import { ServerIcon } from '../Icons';
import { TrafficScenario } from '../../types';

interface Dot {
  id: number;
  delay: number;
  speed: number;
  angle: number; // Starting angle
}

const BenefitsTab = () => {
  const [scenario, setScenario] = useState<TrafficScenario>(TrafficScenario.NoCDN);
  const [active, setActive] = useState(false);

  // Generate 60 static dots configuration
  const dots: Dot[] = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      delay: Math.random() * 2, // Random start delay
      speed: 1 + Math.random(), // Random speed
      angle: (i / 60) * 360, // Distribute around circle
    }));
  }, []);

  useEffect(() => {
    setActive(false);
    const t = setTimeout(() => setActive(true), 100);
    return () => clearTimeout(t);
  }, [scenario]);

  return (
    <div className="w-full h-full flex flex-col p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Benefits: Load Reduction</h2>
          <p className="text-slate-300">
            Simulate a viral traffic spike. Without a CDN, the Origin crashes. With a CDN, traffic is distributed.
          </p>
        </div>
        <div className="bg-slate-800 p-1 rounded-lg border border-slate-700 flex">
            <button 
                onClick={() => setScenario(TrafficScenario.NoCDN)}
                className={`px-4 py-2 rounded text-sm font-bold transition-colors ${scenario === TrafficScenario.NoCDN ? 'bg-red-500/20 text-red-500' : 'text-slate-400 hover:text-white'}`}
            >
                Without CDN
            </button>
            <button 
                onClick={() => setScenario(TrafficScenario.WithCDN)}
                className={`px-4 py-2 rounded text-sm font-bold transition-colors ${scenario === TrafficScenario.WithCDN ? 'bg-emerald-500/20 text-emerald-500' : 'text-slate-400 hover:text-white'}`}
            >
                With CDN
            </button>
        </div>
      </div>

      <div className="flex-grow bg-slate-900 rounded-xl border border-slate-700 relative overflow-hidden shadow-inner">
        
        {/* Origin Server (Center) */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-300 flex flex-col items-center ${
            active && scenario === TrafficScenario.NoCDN ? 'animate-shake' : ''
        }`}>
             <div className="relative">
                <ServerIcon 
                    className={`w-16 h-16 transition-colors duration-500 ${
                        active && scenario === TrafficScenario.NoCDN ? 'text-red-500' : 'text-blue-500'
                    }`} 
                    filled 
                    color={active && scenario === TrafficScenario.NoCDN ? '#ef4444' : '#3b82f6'}
                />
                {active && scenario === TrafficScenario.NoCDN && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                        503 ERROR
                    </div>
                )}
             </div>
             <span className="text-xs text-slate-400 mt-2 font-bold">ORIGIN</span>
        </div>

        {/* Edge Servers (Only visible in CDN mode) */}
        {scenario === TrafficScenario.WithCDN && (
             <>
                {[0, 72, 144, 216, 288].map((deg, i) => (
                    <div 
                        key={i}
                        className="absolute w-12 h-12 flex flex-col items-center z-20 transition-opacity duration-500"
                        style={{
                            top: `calc(50% + ${Math.sin(deg * Math.PI / 180) * 35}%)`,
                            left: `calc(50% + ${Math.cos(deg * Math.PI / 180) * 35}%)`,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <ServerIcon className="w-8 h-8 text-emerald-500" filled color="#10b981" />
                        <span className="text-[10px] text-emerald-400 font-bold">EDGE</span>
                    </div>
                ))}
             </>
        )}

        {/* Traffic Dots */}
        {dots.map((dot) => {
            // Logic for position
            // Start: Circle perimeter (radius 45%)
            const startX = 50 + Math.cos(dot.angle * Math.PI / 180) * 48;
            const startY = 50 + Math.sin(dot.angle * Math.PI / 180) * 48;

            // Target: 
            // If No CDN -> Center (50, 50)
            // If CDN -> Nearest Edge Server (calculated simply by snapping angle to nearest 72deg increment)
            let targetX = 50;
            let targetY = 50;

            if (scenario === TrafficScenario.WithCDN) {
                // Find nearest edge angle
                const nearestEdgeAngle = Math.round(dot.angle / 72) * 72;
                targetX = 50 + Math.cos(nearestEdgeAngle * Math.PI / 180) * 35;
                targetY = 50 + Math.sin(nearestEdgeAngle * Math.PI / 180) * 35;
                
                // Allow a few to leak to origin for realism
                if (dot.id % 20 === 0) {
                    targetX = 50;
                    targetY = 50;
                }
            }

            return (
                <div
                    key={dot.id}
                    className={`absolute w-1.5 h-1.5 rounded-full transition-all ease-in shadow-sm ${
                        scenario === TrafficScenario.NoCDN ? 'bg-red-400' : 'bg-emerald-300'
                    }`}
                    style={{
                        left: `${active ? targetX : startX}%`,
                        top: `${active ? targetY : startY}%`,
                        opacity: active ? 1 : 0,
                        transitionDuration: `${1500 + dot.speed * 500}ms`,
                        transitionDelay: `${dot.delay * 500}ms`
                    }}
                />
            );
        })}
      </div>
      
      {/* Legend / Stats */}
      <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-sm">Origin Load</span>
              <div className="w-full bg-slate-700 h-2 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${scenario === TrafficScenario.NoCDN && active ? 'bg-red-500 w-[98%]' : 'bg-blue-500 w-[5%]'}`}
                  />
              </div>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-sm">User Experience</span>
              <div className="mt-1 font-bold">
                  {active ? (scenario === TrafficScenario.NoCDN ? <span className="text-red-400">Timeouts & Errors</span> : <span className="text-emerald-400">Fast & Stable</span>) : <span className="text-slate-500">Waiting...</span>}
              </div>
          </div>
      </div>
    </div>
  );
};

export default BenefitsTab;