import React, { useState } from 'react';
import { ServerIcon, UserIcon, GlobeIcon } from '../Icons';
import { WorldMap } from '../layout/WorldMap';

const SolutionTab = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="relative w-full h-full flex flex-col p-6">
      <div className="z-10 mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">The Solution: The Edge Network</h2>
          <p className="text-slate-300 max-w-2xl">
            A CDN places "Edge Servers" geographically closer to users. While the Origin remains the source of truth, Edge servers cache content nearby to reduce travel time.
          </p>
        </div>
      </div>

      <div className="relative flex-grow bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl transition-all duration-700">
        <WorldMap />
        
        {/* Origin Server - NY */}
        <div className="absolute top-[30%] left-[25%] flex flex-col items-center z-20">
          <ServerIcon className="w-12 h-12 text-blue-500" filled />
          <span className="text-xs font-bold text-blue-400 mt-1 bg-slate-900/80 px-2 py-0.5 rounded">Origin (NY)</span>
        </div>

        {/* User - Australia */}
        <div className="absolute top-[75%] left-[80%] flex flex-col items-center z-20">
          <UserIcon className="w-10 h-10 text-white" />
          <span className="text-xs font-bold text-white mt-1 bg-slate-900/80 px-2 py-0.5 rounded">User (AUS)</span>
        </div>

        {/* Edge Servers (Hidden until enabled) */}
        <div className={`transition-opacity duration-1000 ${enabled ? 'opacity-100' : 'opacity-0'}`}>
            {/* London */}
            <div className="absolute top-[28%] left-[48%] flex flex-col items-center z-20 animate-in zoom-in duration-500 delay-100">
                <ServerIcon className="w-8 h-8 text-emerald-500" filled color="#10b981" />
                <span className="text-[10px] font-bold text-emerald-400 mt-1 bg-slate-900/80 px-1 rounded">London</span>
            </div>
            {/* Tokyo */}
            <div className="absolute top-[35%] left-[85%] flex flex-col items-center z-20 animate-in zoom-in duration-500 delay-200">
                <ServerIcon className="w-8 h-8 text-emerald-500" filled color="#10b981" />
                <span className="text-[10px] font-bold text-emerald-400 mt-1 bg-slate-900/80 px-1 rounded">Tokyo</span>
            </div>
             {/* Singapore */}
             <div className="absolute top-[55%] left-[75%] flex flex-col items-center z-20 animate-in zoom-in duration-500 delay-300">
                <ServerIcon className="w-8 h-8 text-emerald-500" filled color="#10b981" />
                <span className="text-[10px] font-bold text-emerald-400 mt-1 bg-slate-900/80 px-1 rounded">Singapore</span>
            </div>
            {/* Frankfurt */}
            <div className="absolute top-[30%] left-[52%] flex flex-col items-center z-20 animate-in zoom-in duration-500 delay-400">
                <ServerIcon className="w-8 h-8 text-emerald-500" filled color="#10b981" />
            </div>
            {/* Sydney (The important one) */}
            <div className="absolute top-[80%] left-[85%] flex flex-col items-center z-20 animate-in zoom-in duration-500 delay-500">
                <ServerIcon className="w-10 h-10 text-emerald-500" filled color="#10b981" />
                <span className="text-xs font-bold text-emerald-400 mt-1 bg-slate-900/80 px-1 rounded">Sydney POP</span>
            </div>

            {/* Connection Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <line 
                    x1="82%" y1="78%" 
                    x2="87%" y2="82%" 
                    stroke="#10b981" 
                    strokeWidth="3" 
                    className="animate-pulse"
                />
            </svg>
            
            <div className="absolute top-[72%] left-[88%] bg-emerald-900/80 text-emerald-300 text-xs px-2 py-1 rounded border border-emerald-500 animate-in slide-in-from-bottom-2 fade-in duration-700 delay-700">
                Low Latency Path
            </div>
        </div>

      </div>

      <div className="mt-6 flex justify-center items-center gap-4">
        <span className={`text-sm font-bold ${!enabled ? 'text-white' : 'text-slate-500'}`}>Direct Origin</span>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
            enabled ? 'bg-emerald-600' : 'bg-slate-600'
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
              enabled ? 'translate-x-9' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm font-bold ${enabled ? 'text-emerald-400' : 'text-slate-500'}`}>Enable CDN</span>
      </div>
    </div>
  );
};

export default SolutionTab;