import React, { useState } from 'react';
import { ServerIcon, UserIcon, DatabaseIcon } from '../Icons';

const MechanicsTab = () => {
  const [cacheStatus, setCacheStatus] = useState<'MISS' | 'HIT' | 'IDLE'>('IDLE');
  const [packetStep, setPacketStep] = useState(0); // 0: Idle, 1: U->E, 2: E->O, 3: O->E, 4: E->U
  const [isCached, setIsCached] = useState(false);
  const [timer, setTimer] = useState(0);

  const runMissSimulation = () => {
    if (packetStep !== 0) return;
    setCacheStatus('MISS');
    setIsCached(false);
    setTimer(0);

    // Step 1: User to Edge
    setPacketStep(1);
    setTimeout(() => {
        // Step 2: Edge to Origin
        setPacketStep(2);
        setTimeout(() => {
            // Step 3: Origin to Edge
            setPacketStep(3);
            setTimeout(() => {
                setIsCached(true); // Cache fills
                // Step 4: Edge to User
                setPacketStep(4);
                setTimeout(() => {
                    setPacketStep(0);
                    setTimer(250);
                }, 1000);
            }, 1500);
        }, 1500);
    }, 1000);
  };

  const runHitSimulation = () => {
    if (packetStep !== 0) return;
    if (!isCached) {
        alert("Populate the cache with a 'Miss' request first!");
        return;
    }
    setCacheStatus('HIT');
    setTimer(0);

    // Step 1: User to Edge
    setPacketStep(1);
    setTimeout(() => {
        // Step 4: Edge to User (Skip Origin)
        setPacketStep(4);
        setTimeout(() => {
            setPacketStep(0);
            setTimer(20);
        }, 500);
    }, 500);
  };

  return (
    <div className="w-full h-full flex flex-col p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">How It Works: Cache Hit vs. Miss</h2>
        <p className="text-slate-300">
          The first request is slow because it fetches from the Origin (Miss). The Edge then saves a copy. Subsequent requests are served instantly from the Edge (Hit).
        </p>
      </div>

      <div className="flex-grow bg-slate-800 rounded-xl border border-slate-700 p-8 flex flex-col items-center justify-center relative shadow-inner">
        
        {/* Connection Lines */}
        <div className="absolute top-1/2 left-[15%] right-[15%] h-1 bg-slate-700 -translate-y-1/2 z-0"></div>

        <div className="flex justify-between w-full max-w-4xl z-10 relative">
            {/* User */}
            <div className="flex flex-col items-center">
                <UserIcon className="w-16 h-16 text-white mb-2" />
                <span className="text-sm font-bold text-slate-300">User</span>
            </div>

            {/* Edge Server */}
            <div className="flex flex-col items-center relative">
                <div className={`transition-all duration-300 ${packetStep === 1 || packetStep === 4 ? 'scale-110' : 'scale-100'}`}>
                   <ServerIcon 
                        className={`w-20 h-20 transition-colors duration-500 ${isCached ? 'text-emerald-500' : 'text-slate-500'}`} 
                        filled={isCached} 
                        color={isCached ? '#10b981' : 'currentColor'}
                    />
                </div>
                <span className="text-sm font-bold text-slate-300 mt-2">Edge Server</span>
                
                {/* Status Badge */}
                {packetStep > 0 && packetStep < 5 && (
                    <div className={`absolute -top-12 px-3 py-1 rounded-full font-bold animate-bounce ${
                        cacheStatus === 'MISS' ? 'bg-red-500/20 text-red-500 border border-red-500' : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500'
                    }`}>
                        {cacheStatus === 'MISS' && !isCached ? 'MISS' : 'HIT'}
                    </div>
                )}
            </div>

            {/* Origin Server */}
            <div className="flex flex-col items-center">
                <div className={`transition-all duration-300 ${packetStep === 2 || packetStep === 3 ? 'scale-110' : 'scale-100'}`}>
                    <DatabaseIcon className="w-16 h-16 text-blue-500 mb-2" />
                </div>
                <span className="text-sm font-bold text-slate-300">Origin Server</span>
            </div>
        </div>

        {/* Moving Packets */}
        {packetStep === 1 && ( // U -> E
            <div className="absolute top-1/2 left-[10%] w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.8)] -translate-y-1/2 animate-[slideRight_1s_linear_forwards]" style={{ animationDuration: cacheStatus === 'HIT' ? '0.5s' : '1s' }}></div>
        )}
        {packetStep === 2 && ( // E -> O
            <div className="absolute top-1/2 left-[50%] w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] -translate-y-1/2 animate-[slideRightHalf_1.5s_linear_forwards]"></div>
        )}
        {packetStep === 3 && ( // O -> E
             <div className="absolute top-1/2 left-[50%] w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] -translate-y-1/2 animate-[slideLeftHalf_1.5s_linear_forwards]"></div>
        )}
         {packetStep === 4 && ( // E -> U
             <div className="absolute top-1/2 left-[50%] w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)] -translate-y-1/2 animate-[slideLeftFull_1s_linear_forwards]" style={{ animationDuration: cacheStatus === 'HIT' ? '0.5s' : '1s' }}></div>
        )}

        {/* Timer Result */}
        {packetStep === 0 && timer > 0 && (
             <div className="absolute bottom-10 px-6 py-3 bg-slate-900 border border-slate-600 rounded-lg animate-in fade-in zoom-in">
                <span className="text-slate-400 mr-2">Total Time:</span>
                <span className={`text-2xl font-mono font-bold ${timer < 100 ? 'text-emerald-400' : 'text-orange-400'}`}>
                    {timer}ms
                </span>
                <span className="block text-xs text-center text-slate-500 mt-1">
                    {timer < 100 ? '(Served from Cache)' : '(Fetched from Origin)'}
                </span>
             </div>
        )}

      </div>

      <div className="mt-6 flex justify-center gap-6">
        <button
          onClick={runMissSimulation}
          disabled={packetStep !== 0}
          className={`px-6 py-3 rounded-lg font-bold transition-all ${packetStep !== 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'} bg-slate-700 hover:bg-slate-600 text-white border border-slate-600`}
        >
          1. First Request (Miss)
        </button>
        <button
          onClick={runHitSimulation}
          disabled={packetStep !== 0 || !isCached}
          className={`px-6 py-3 rounded-lg font-bold transition-all ${packetStep !== 0 || !isCached ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'} bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]`}
        >
          2. Second Request (Hit)
        </button>
      </div>
      
      <style>{`
        @keyframes slideRight { from { left: 10%; } to { left: 50%; } }
        @keyframes slideRightHalf { from { left: 50%; } to { left: 90%; } }
        @keyframes slideLeftHalf { from { left: 90%; } to { left: 50%; } }
        @keyframes slideLeftFull { from { left: 50%; } to { left: 10%; } }
      `}</style>
    </div>
  );
};

export default MechanicsTab;