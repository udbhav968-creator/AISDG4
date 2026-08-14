import React from 'react';
import { AlertTriangle, Moon, ShieldAlert, Radio, Clock, Play } from 'lucide-react';

export default function SimulationBar({
  onSimulateBusDeviation,
  onSimulateCabStop,
  onSimulateBlackout,
  onTriggerWearableSOS,
  isBlackoutActive
}) {
  return (
    <div className="w-full my-6 p-4 rounded-2xl glass-panel border border-zinc-800 bg-zinc-950/90 shadow-2xl space-y-3">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 px-1">
        <div className="flex items-center gap-2">
          <span className="p-1.5 bg-pink-500/10 text-pink-400 rounded-lg">
            <Play className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-xs font-black text-white uppercase tracking-wider">
              Hackathon Evaluator Simulation Sandbox
            </h3>
            <p className="text-[11px] text-zinc-400 font-mono">
              Trigger real-time PS-B06 & PS-B07 emergency anomalies & live AI rerouting
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-[10px] font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 rounded-full hidden sm:inline">
          LIVE DEMO CONTROLS
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        
        {/* Simulator 1: Route Deviation */}
        <button
          onClick={onSimulateBusDeviation}
          className="p-3 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 hover:border-red-500 rounded-xl text-left transition space-y-1 group cursor-pointer"
        >
          <div className="flex items-center justify-between text-red-400">
            <AlertTriangle className="w-4 h-4 group-hover:scale-110 transition" />
            <span className="text-[9px] font-mono font-bold bg-red-500/20 px-1.5 py-0.5 rounded">PS-B06</span>
          </div>
          <span className="text-xs font-black text-white block">Route Deviation</span>
          <span className="text-[10px] text-zinc-400 block truncate">Stray cab off-route into alley</span>
        </button>

        {/* Simulator 2: Prolonged Halt */}
        <button
          onClick={onSimulateCabStop}
          className="p-3 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 hover:border-amber-500 rounded-xl text-left transition space-y-1 group cursor-pointer"
        >
          <div className="flex items-center justify-between text-amber-400">
            <Clock className="w-4 h-4 group-hover:scale-110 transition" />
            <span className="text-[9px] font-mono font-bold bg-amber-500/20 px-1.5 py-0.5 rounded">PS-B06</span>
          </div>
          <span className="text-xs font-black text-white block">Unsafe Prolonged Halt</span>
          <span className="text-[10px] text-zinc-400 block truncate">Cab stationary &gt;4.5 mins</span>
        </button>

        {/* Simulator 3: Streetlight Blackout */}
        <button
          onClick={onSimulateBlackout}
          className={`p-3 border rounded-xl text-left transition space-y-1 group cursor-pointer ${
            isBlackoutActive
              ? 'bg-purple-900/80 border-purple-400 text-white shadow-lg shadow-purple-500/30'
              : 'bg-purple-950/40 hover:bg-purple-900/60 border-purple-500/30 hover:border-purple-500'
          }`}
        >
          <div className="flex items-center justify-between text-purple-400">
            <Moon className="w-4 h-4 group-hover:scale-110 transition" />
            <span className="text-[9px] font-mono font-bold bg-purple-500/20 px-1.5 py-0.5 rounded">PS-B07</span>
          </div>
          <span className="text-xs font-black text-white block">
            {isBlackoutActive ? '⚡ Reset Streetlights' : '🌙 Trigger Blackout Reroute'}
          </span>
          <span className="text-[10px] text-zinc-400 block truncate">
            {isBlackoutActive ? 'Restore 100% lighting' : 'Simulate 0% lighting failure'}
          </span>
        </button>

        {/* Simulator 4: Discreet Smartwatch SOS */}
        <button
          onClick={onTriggerWearableSOS}
          className="p-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 border border-pink-400 rounded-xl text-left text-white shadow-lg shadow-pink-600/30 transition space-y-1 group cursor-pointer"
        >
          <div className="flex items-center justify-between text-white">
            <Radio className="w-4 h-4 group-hover:scale-110 transition animate-pulse" />
            <span className="text-[9px] font-mono font-bold bg-white/20 px-1.5 py-0.5 rounded">WEARABLE</span>
          </div>
          <span className="text-xs font-black block">Discreet SOS Trigger</span>
          <span className="text-[10px] text-pink-100 block truncate font-mono">Silent Double-Tap SOS</span>
        </button>

      </div>
    </div>
  );
}
