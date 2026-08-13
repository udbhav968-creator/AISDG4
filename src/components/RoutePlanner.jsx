import React from 'react';
import { Navigation, ShieldCheck, Zap, AlertTriangle, Lightbulb, MapPin, CheckCircle2 } from 'lucide-react';

export default function RoutePlanner({
  routes = [],
  selectedRouteId,
  onSelectRoute,
  onSimulateReroute,
  isBlackoutSimulated
}) {
  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-wide">
              PS-B07 Night Safe-Route Planner
            </h2>
            <p className="text-xs text-zinc-400">Dynamic Risk Score Algorithm & Blackout Auto-Reroute Engine</p>
          </div>
        </div>

        <button
          onClick={onSimulateReroute}
          className={`px-3 py-1.5 font-extrabold text-xs rounded-xl border transition-all flex items-center gap-1.5 active:scale-95 ${
            isBlackoutSimulated
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500 shadow-lg shadow-red-600/30 animate-pulse'
              : 'btn-vibrant-amber text-white border-amber-500/50'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{isBlackoutSimulated ? 'Blackout Active' : 'Simulate Blackout'}</span>
        </button>
      </div>

      {/* Route Comparison Cards */}
      <div className="space-y-3">
        {routes.map((rt) => {
          const isSelected = rt.id === selectedRouteId;

          return (
            <div
              key={rt.id}
              onClick={() => onSelectRoute(rt.id)}
              className={`p-4 rounded-xl cursor-pointer hover-blister transition-all ${
                isSelected
                  ? 'bg-zinc-900/90 border-2 border-emerald-500 shadow-lg shadow-emerald-500/15'
                  : 'bg-zinc-900/60 border border-zinc-800 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">{rt.name}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                      rt.safetyScore > 75
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : rt.safetyScore > 50
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}>
                      {rt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">Est. Time: {rt.time} • Distance: {rt.distance}</p>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-emerald-400 font-mono">{rt.safetyScore}/100</span>
                  <span className="text-[10px] text-zinc-400 block font-semibold">SAFETY INDEX</span>
                </div>
              </div>

              {/* Lighting & Police Indicators */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-zinc-800/80 text-xs">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-mono text-[11px]">{rt.lightingLevel}</span>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-mono text-[11px]">{rt.policePresence}</span>
                </div>
              </div>

              {/* AI Risk Explanation */}
              {rt.explanation && (
                <div className="mt-2.5 p-2.5 bg-zinc-950 border border-zinc-800/80 rounded-lg text-xs text-zinc-300 font-mono leading-relaxed">
                  {rt.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
