import React from 'react';
import { Bus, Navigation, Cpu, Sparkles, Radar, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function PageSwitcherHero({ activeTab, setActiveTab }) {
  const pages = [
    {
      id: 'transit',
      num: 'PAGE 1',
      title: 'GIS Map & Transit Tracker',
      sub: 'PS-B06 Live 5G GPS & Map Engine',
      icon: Bus,
      activeStyle: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-xl shadow-cyan-600/30 scale-[1.03]',
      inactiveStyle: 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-cyan-500/50 hover:bg-zinc-850'
    },
    {
      id: 'routes',
      num: 'PAGE 2',
      title: 'Night Safe-Routes Engine',
      sub: 'PS-B07 Illumination & Blackout Reroute',
      icon: Navigation,
      activeStyle: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-xl shadow-emerald-600/30 scale-[1.03]',
      inactiveStyle: 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-850'
    },
    {
      id: 'suite50',
      num: 'PAGE 3',
      title: '50 Hi-Tech AI Suite',
      sub: '50 Multi-Model Inference Suite',
      icon: Cpu,
      activeStyle: 'bg-gradient-to-r from-pink-600 to-rose-600 text-white border-pink-400 shadow-xl shadow-pink-600/30 scale-[1.03]',
      inactiveStyle: 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-pink-500/50 hover:bg-zinc-850'
    },
    {
      id: 'advanced',
      num: 'PAGE 4',
      title: 'AI Voice & Acoustic Vault',
      sub: 'Scream Shield & Evidence Vault',
      icon: Sparkles,
      activeStyle: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-xl shadow-purple-600/30 scale-[1.03]',
      inactiveStyle: 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-purple-500/50 hover:bg-zinc-850'
    },
    {
      id: 'safehavens',
      num: 'PAGE 5',
      title: '24/7 Safe Havens Radar',
      sub: 'Pink Booths & Hospitals Radar',
      icon: Radar,
      activeStyle: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-400 shadow-xl shadow-amber-600/30 scale-[1.03]',
      inactiveStyle: 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-850'
    },
    {
      id: 'authority',
      num: 'PAGE 6',
      title: 'Police 112 PCR Control Room',
      sub: 'Live 112 SOS Queue & Dispatch',
      icon: ShieldAlert,
      activeStyle: 'bg-gradient-to-r from-red-600 to-rose-700 text-white border-red-400 shadow-xl shadow-red-600/30 scale-[1.03]',
      inactiveStyle: 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:border-red-500/50 hover:bg-zinc-850'
    }
  ];

  return (
    <div className="w-full mb-6 p-4 rounded-2xl glass-panel border border-zinc-800 bg-zinc-950/80 space-y-3">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 px-1">
        <span className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
          6 Standalone Multi-Page Navigator (Click Any Page)
        </span>
        <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
          Map is ONLY mounted on Page 1
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {pages.map((p) => {
          const Icon = p.icon;
          const isActive = activeTab === p.id;

          return (
            <button
              key={p.id}
              onClick={() => {
                setActiveTab(p.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between min-h-[90px] cursor-pointer ${
                isActive ? p.activeStyle : p.inactiveStyle
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {p.num}
                </span>
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
              </div>

              <div>
                <span className="text-xs font-black block leading-snug">{p.title}</span>
                <span className={`text-[10px] block truncate font-mono mt-0.5 ${
                  isActive ? 'text-zinc-100' : 'text-zinc-400'
                }`}>
                  {p.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
