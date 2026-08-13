import React from 'react';
import { AlertCircle, ShieldAlert, Watch, Radio, Lightbulb, Compass, Clock } from 'lucide-react';

export default function SimulationBar({
  onSimulateBusDeviation,
  onSimulateCabStop,
  onSimulateBlackout,
  onTriggerWearableSOS,
  isBlackoutActive
}) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[94%] bg-zinc-950/95 backdrop-blur-2xl border border-zinc-800 rounded-2xl p-3 shadow-2xl flex items-center justify-between gap-3 overflow-x-auto text-xs">
      
      {/* Label */}
      <div className="flex items-center gap-2 px-2 shrink-0">
        <div className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
          <Radio className="w-4 h-4 animate-pulse text-pink-400" />
        </div>
        <div>
          <span className="font-extrabold text-white text-xs block hidden sm:block">Evaluator Control Bar</span>
          <span className="text-[10px] text-zinc-400 font-mono hidden md:block">PS-B06 & PS-B07 Live Anomaly Injector</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onSimulateBusDeviation}
          className="btn-vibrant-amber px-3.5 py-2 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap active:scale-95"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Sim Stray Cab</span>
        </button>

        <button
          onClick={onSimulateCabStop}
          className="px-3.5 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap active:scale-95 shadow-md shadow-amber-600/30 transition"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Prolonged Halt</span>
        </button>

        <button
          onClick={onSimulateBlackout}
          className={`px-3.5 py-2 font-extrabold rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition ${
            isBlackoutActive
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border border-red-500 shadow-lg shadow-red-600/40 animate-pulse'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/30'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{isBlackoutActive ? 'Blackout Active' : 'Night Blackout'}</span>
        </button>

        <button
          onClick={onTriggerWearableSOS}
          className="btn-vibrant-pink px-4 py-2 text-white font-extrabold rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap active:scale-95"
        >
          <Watch className="w-3.5 h-3.5" />
          <span>Smartwatch SOS</span>
        </button>
      </div>
    </div>
  );
}
