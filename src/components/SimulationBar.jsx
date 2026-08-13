import React from 'react';
import { Bus, Clock, Zap, ShieldAlert, Sparkles } from 'lucide-react';

export default function SimulationBar({
  onSimulateBusDeviation,
  onSimulateCabStop,
  onSimulateBlackout,
  onTriggerWearableSOS,
  isBlackoutActive
}) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-4xl w-[92%] p-3 sm:p-4 rounded-2xl glass-panel border border-zinc-800 shadow-2xl bg-zinc-950/90 backdrop-blur-2xl flex items-center justify-between flex-wrap gap-2 text-zinc-100">
      
      {/* Label */}
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-tr from-pink-600 to-purple-600 rounded-xl text-white shrink-0">
          <Sparkles className="w-4 h-4 animate-spin" />
        </div>
        <div className="hidden sm:block">
          <span className="text-xs font-black text-white tracking-wide block">Hackathon Evaluator Bar</span>
          <span className="text-[10px] text-zinc-400">1-Click Scenario Simulators</span>
        </div>
      </div>

      {/* Simulator Quick Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap flex-1 justify-end">
        <button
          onClick={onSimulateBusDeviation}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-[11px] rounded-xl flex items-center gap-1.5 active:scale-95 transition shadow-md shadow-amber-600/20"
        >
          <Bus className="w-3.5 h-3.5 shrink-0" />
          <span>Sim Stray Cab</span>
        </button>

        <button
          onClick={onSimulateCabStop}
          className="px-3 py-1.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-[11px] rounded-xl flex items-center gap-1.5 active:scale-95 transition shadow-md shadow-orange-600/20"
        >
          <Clock className="w-3.5 h-3.5 shrink-0" />
          <span>Prolonged Stop</span>
        </button>

        <button
          onClick={onSimulateBlackout}
          className={`px-3 py-1.5 font-extrabold text-[11px] rounded-xl flex items-center gap-1.5 active:scale-95 transition shadow-md ${
            isBlackoutActive
              ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>{isBlackoutActive ? 'Restore Lights' : 'Sim Blackout'}</span>
        </button>

        <button
          onClick={onTriggerWearableSOS}
          className="btn-vibrant-pink px-3.5 py-1.5 text-white font-extrabold text-[11px] rounded-xl flex items-center gap-1.5 shadow-lg shadow-pink-600/30"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-white shrink-0" />
          <span>Smartwatch SOS</span>
        </button>
      </div>

    </div>
  );
}
