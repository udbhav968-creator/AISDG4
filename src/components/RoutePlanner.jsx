import React from 'react';
import { Navigation, ShieldCheck, Zap, AlertTriangle, Moon, CheckCircle2, RefreshCw } from 'lucide-react';

export default function RoutePlanner({
  routes = [],
  selectedRouteId,
  onSelectRoute,
  onSimulateReroute,
  isBlackoutSimulated
}) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-zinc-800 space-y-4 w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 text-emerald-400 rounded-xl border border-emerald-500/30 shrink-0">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-wide leading-tight">
              PS-B07 Night Safe-Routes Engine
            </h2>
            <p className="text-xs text-zinc-400">Streetlight Illumination Index & 24/7 Police Safe Havens</p>
          </div>
        </div>

        <button
          onClick={onSimulateReroute}
          className={`px-3 py-1.5 font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition active:scale-95 shrink-0 ${
            isBlackoutSimulated
              ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse shadow-lg shadow-red-600/30'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{isBlackoutSimulated ? 'Restore Streetlights' : 'Sim Blackout Reroute'}</span>
        </button>
      </div>

      {/* Route Selector Cards List - Single Column Vertical Stack */}
      <div className="flex flex-col space-y-3 w-full">
        {routes.map((r) => {
          const isSelected = r.id === selectedRouteId;
          const isSafest = r.type === 'SAFEST';
          const isBlackoutDanger = r.lightingLevel?.includes('BLACKOUT');

          return (
            <div
              key={r.id}
              onClick={() => onSelectRoute(r.id)}
              className={`w-full p-4 rounded-xl cursor-pointer hover-blister transition-all space-y-3 ${
                isSelected
                  ? isBlackoutDanger
                    ? 'bg-red-950/40 border-2 border-red-500 shadow-xl shadow-red-500/20'
                    : 'bg-zinc-900 border-2 border-emerald-500 shadow-xl shadow-emerald-500/15'
                  : 'bg-zinc-900/70 border border-zinc-800 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-white">{r.name}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md uppercase tracking-wider ${
                      isBlackoutDanger
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                        : isSafest
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {r.badge || r.type}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">{r.via}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-lg font-black font-mono block ${
                    r.safetyScore > 80 ? 'text-emerald-400' : r.safetyScore > 50 ? 'text-amber-400' : 'text-red-400'
                  }`}>
                    {r.safetyScore}/100
                  </span>
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase">SAFETY INDEX</span>
                </div>
              </div>

              {/* Route Details */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Illumination: {r.lightingLevel}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Police: {r.policeCoverage}</span>
                </div>
              </div>

              {r.explanation && (
                <p className="text-xs text-zinc-300 bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800 leading-relaxed font-sans">
                  {r.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
