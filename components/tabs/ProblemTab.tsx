import React, { useState, useEffect } from 'react';
import { ServerIcon, UserIcon } from '../Icons';
import { WorldMap } from '../layout/WorldMap';

const ProblemTab = () => {
  const [status, setStatus] = useState<'IDLE' | 'TRAVELING' | 'DONE'>('IDLE');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: number;
    if (status === 'TRAVELING') {
      interval = window.setInterval(() => {
        setTimer(prev => prev + 10);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [status]);

  const startRequest = () => {
    if (status === 'TRAVELING') return;
    setStatus('TRAVELING');
    setTimer(0);
    
    // Simulate long travel time
    setTimeout(() => {
      setStatus('DONE');
    }, 4000);
  };

  return (
    <div className="relative w-full h-full flex flex-col p-6 overflow-hidden">
      <div className="z-10 mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">The Problem: Distance = Latency</h2>
        <p className="text-slate-300 max-w-2xl">
          Light speed is finite. When a user in Australia requests data from a server in New York, the signal has to travel thousands of miles through fiber optic cables, routers, and switches.
        </p>
      </div>

      <div className="relative flex-grow bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
        <WorldMap />
        
        {/* Visual Stage */}
        <div className="relative w-full h-full">
          
          {/* Origin Server - NY (Approx coords) */}
          <div className="absolute top-[30%] left-[25%] flex flex-col items-center z-20">
            <ServerIcon className="w-12 h-12 text-blue-500" filled />
            <span className="text-xs font-bold text-blue-400 mt-1 bg-slate-900/80 px-2 py-0.5 rounded">Origin (NY)</span>
          </div>

          {/* User - Australia (Approx coords) */}
          <div className="absolute top-[75%] left-[80%] flex flex-col items-center z-20">
            <UserIcon className="w-10 h-10 text-white" />
            <span className="text-xs font-bold text-white mt-1 bg-slate-900/80 px-2 py-0.5 rounded">User (AUS)</span>
          </div>

          {/* Data Packet */}
          <div 
            className={`absolute top-[33%] left-[27%] w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] z-30 transition-all ease-linear ${status === 'IDLE' ? 'opacity-0' : 'opacity-100'}`}
            style={{
              transitionDuration: status === 'TRAVELING' ? '4000ms' : '0ms',
              transform: status === 'TRAVELING' || status === 'DONE' 
                ? 'translate(calc(53vw), calc(42vh))' // Rough vector to AUS
                : 'translate(0, 0)'
            }}
          />

          {/* Path Line (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line 
              x1="27%" y1="35%" 
              x2="82%" y2="77%" 
              stroke="#475569" 
              strokeWidth="2" 
              strokeDasharray="5,5" 
            />
          </svg>

          {/* Result Overlay */}
          {status === 'DONE' && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-300">
               <div className="bg-slate-900 p-6 rounded-xl border border-red-500 shadow-2xl text-center">
                  <h3 className="text-3xl font-bold text-red-500 mb-2">High Latency!</h3>
                  <p className="text-4xl font-mono text-white mb-4">{timer}ms</p>
                  <p className="text-slate-400">That's nearly half a second delay just for the network trip.</p>
                  <button 
                    onClick={() => setStatus('IDLE')}
                    className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white text-sm"
                  >
                    Reset
                  </button>
               </div>
            </div>
          )}

          {/* Timer Display (Active) */}
          {status === 'TRAVELING' && (
            <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-600 p-3 rounded-lg font-mono text-xl text-cyan-400 z-40">
              Latency: {timer}ms
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={startRequest}
          disabled={status !== 'IDLE'}
          className={`px-8 py-3 rounded-full font-bold text-lg shadow-lg transition-transform active:scale-95 ${
            status === 'IDLE' 
            ? 'bg-blue-600 hover:bg-blue-500 text-white' 
            : 'bg-slate-700 text-slate-400 cursor-not-allowed'
          }`}
        >
          {status === 'IDLE' ? 'Request File from Origin' : 'Requesting...'}
        </button>
      </div>
    </div>
  );
};

export default ProblemTab;