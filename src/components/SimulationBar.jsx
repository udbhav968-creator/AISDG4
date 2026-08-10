import React from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  Watch, 
  Siren,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export default function SimulationBar({ 
  onSimulateBusDeviation, 
  onSimulateCabStop, 
  onSimulateBlackout, 
  onTriggerWearableSOS, 
  isBlackoutActive 
}) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl p-3 rounded-2xl glass-panel-glow border border-pink-500/40 shadow-2xl shadow-pink-500/20 text-white flex flex-wrap items-center justify-between gap-3">
      
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400">
          <Sparkles className="w-4 h-4 animate-spin" />
        </div>
        <div className="hidden sm:block">
          <span className="text-xs font-black font-outfit text-pink-300 block">HACKATHON EVALUATOR CONTROL BAR</span>
          <span className="text-[10px] text-zinc-400">1-Tap Live Scenario Simulators</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Action 1: Bus Route Deviation */}
        <button
          onClick={onSimulateBusDeviation}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/30 hover:bg-red-600/50 text-red-300 border border-red-500/50 text-xs font-bold transition-all"
          title="Simulate PS-B06 Bus Route Deviation"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Route Deviation</span>
        </button>

        {/* Action 2: Halted Cab Check-in */}
        <button
          onClick={onSimulateCabStop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 text-amber-300 border border-amber-500/50 text-xs font-bold transition-all"
          title="Simulate PS-B06 Prolonged Halt Check-In"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Prolonged Halt</span>
        </button>

        {/* Action 3: Streetlight Blackout Reroute */}
        <button
          onClick={onSimulateBlackout}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            isBlackoutActive
              ? 'bg-amber-500 text-zinc-950 border-amber-400 font-extrabold animate-pulse'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border-zinc-700'
          }`}
          title="Simulate PS-B07 Night Streetlight Blackout & Reroute"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isBlackoutActive ? 'Reset Lighting' : 'Night Blackout'}</span>
        </button>

        {/* Action 4: Wearable Smartwatch SOS */}
        <button
          onClick={onTriggerWearableSOS}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-black shadow-lg shadow-pink-600/30 transition-all"
          title="Simulate Smartwatch Wearable SOS Signal"
        >
          <Watch className="w-3.5 h-3.5" />
          <span>Smartwatch SOS</span>
        </button>
      </div>

    </div>
  );
}
