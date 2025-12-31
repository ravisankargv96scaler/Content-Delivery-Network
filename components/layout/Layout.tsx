import React, { ReactNode } from 'react';
import { TabConfig, TabId } from '../../types';
import { NetworkIcon } from '../Icons';

interface LayoutProps {
  children: ReactNode;
  activeTab: TabId;
  onTabChange: (id: TabId) => void;
  tabs: TabConfig[];
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, tabs }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col flex-shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="p-2 bg-blue-600 rounded-lg">
             <NetworkIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="font-bold text-xl text-white tracking-tight">CDN Explorer</h1>
        </div>

        <div className="flex-grow overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span className={activeTab === tab.id ? 'text-blue-400' : 'text-slate-500'}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
            Interactive Educational Demo
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow h-screen overflow-hidden flex flex-col relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
         {/* Background Grid Pattern */}
         <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
            style={{ 
                backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }}
         />
         
         <div className="relative z-10 w-full h-full">
            {children}
         </div>
      </main>
    </div>
  );
};

export default Layout;