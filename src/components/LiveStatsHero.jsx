import React from 'react';
import { Bus, ShieldCheck, Navigation, Radar, Cpu, Activity, Zap } from 'lucide-react';

export default function LiveStatsHero() {
  return (
    <div className="w-full mb-6 p-4 rounded-2xl glass-panel border border-zinc-800 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Metric 1 */}
        <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center gap-3">
          <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg shrink-0">
            <Bus className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 font-mono block">LIVE VEHICLES</span>
            <span className="text-sm font-black text-white font-mono">14 Active</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 font-mono block">STREETLAMPS</span>
            <span className="text-sm font-black text-emerald-400 font-mono">3,420 Nodes</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 font-mono block">EDGE LATENCY</span>
            <span className="text-sm font-black text-cyan-400 font-mono">12 ms</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
            <Radar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 font-mono block">SAFE HAVENS</span>
            <span className="text-sm font-black text-amber-400 font-mono">48 Mapped</span>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center gap-3">
          <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 font-mono block">AI MODELS</span>
            <span className="text-sm font-black text-purple-400 font-mono">50 Online</span>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex items-center gap-3">
          <div className="p-2 bg-red-500/10 text-red-400 rounded-lg shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 font-mono block">112 POLICE</span>
            <span className="text-sm font-black text-red-400 font-mono">12 Units</span>
          </div>
        </div>

      </div>
    </div>
  );
}
