import React from 'react';
import { AlertCircle, ShieldAlert, Zap, Watch, Radio } from 'lucide-react';

export default function SimulationBar({
  onSimulateBusDeviation,
  onSimulateCabStop,
  onSimulateBlackout,
  onTriggerWearableSOS,
  isBlackoutActive
}) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[92%] bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-2.5 shadow-2xl flex items-center justify-between gap-2 overflow-x-auto text-xs">
      
      <div className="flex items-center gap-2 px-2 shrink-0">
        <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-400">
          <Radio className="w-4 h-4 animate-pulse" />
        </div>
        <span className="font-extrabold text-white hidden sm:inline">Evaluator Testing Bar:</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onSimulateBusDeviation}
          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-bold rounded-xl border border-zinc-700 whitespace-nowrap transition"
        >
          🚨 Sim Cab Straying
        </button>

        <button
          onClick={onSimulateCabStop}
          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-amber-300 font-bold rounded-xl border border-zinc-700 whitespace-nowrap transition"
        >
          ⏱️ Sim Prolonged Halt
        </button>

        <button
          onClick={onSimulateBlackout}
          className={`px-3 py-1.5 font-bold rounded-xl border whitespace-nowrap transition ${
            isBlackoutActive
              ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/30'
              : 'bg-zinc-800 hover:bg-zinc-700 text-purple-300 border-zinc-700'
          }`}
        >
          💡 Night Blackout
        </button>

        <button
          onClick={onTriggerWearableSOS}
          className="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white font-extrabold rounded-xl shadow-lg shadow-pink-600/30 whitespace-nowrap transition flex items-center gap-1.5"
        >
          <Watch className="w-3.5 h-3.5" />
          <span>Smartwatch SOS</span>
        </button>
      </div>
    </div>
  );
}
