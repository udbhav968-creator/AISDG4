import React, { useState } from 'react';
import { 
  Navigation, 
  ShieldCheck, 
  Clock, 
  Zap, 
  AlertTriangle, 
  Eye, 
  Sun, 
  Store, 
  Building2, 
  CheckCircle2, 
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Check
} from 'lucide-react';
import { getSafetyGrade } from '../utils/safetyCalculator';

export default function RoutePlanner({ 
  routes = [], 
  selectedRouteId, 
  onSelectRoute, 
  onSimulateReroute,
  isBlackoutSimulated 
}) {
  const selectedRoute = routes.find(r => r.id === selectedRouteId) || routes[0];
  const [origin, setOrigin] = useState('Connaught Place Central Hub');
  const [destination, setDestination] = useState('Hauz Khas Safe Zone Terminal');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-pink-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white font-outfit">Dynamic Night Safe-Route Planner</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full">
              PS-B07 ENGINE
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time risk scoring prioritizing street lighting, crowd presence, police help points, and active 24/7 stores.
          </p>
        </div>

        {/* Dynamic Blackout Reroute Action Button */}
        <button
          onClick={onSimulateReroute}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg ${
            isBlackoutSimulated
              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30 animate-pulse'
              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isBlackoutSimulated ? 'animate-spin' : ''}`} />
          <span>{isBlackoutSimulated ? 'Reset Normal Conditions' : 'Simulate Night Blackout Event'}</span>
        </button>
      </div>

      {/* Origin & Destination Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Origin Pickup Point</label>
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <input 
              type="text" 
              value={origin} 
              onChange={(e) => setOrigin(e.target.value)}
              className="bg-transparent w-full text-zinc-100 font-medium focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Destination Target</label>
          <div className="flex items-center gap-2 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
            <input 
              type="text" 
              value={destination} 
              onChange={(e) => setDestination(e.target.value)}
              className="bg-transparent w-full text-zinc-100 font-medium focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Reroute Alert Notification (When Blackout is Simulated) */}
      {isBlackoutSimulated && (
        <div className="p-4 rounded-xl glass-alert flex items-start gap-3 border border-red-500/50 animate-bounce">
          <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-extrabold text-red-300 text-sm flex items-center gap-2">
              <span>DYNAMIC AUTO-REROUTE TRIGGERED</span>
              <span className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px]">BLACKOUT EVENT</span>
            </div>
            <p className="text-zinc-200 mt-1">
              Unannounced street light outage detected on <strong>Shortcut Route</strong> near Industrial Park (Lighting dropped to 12%). System automatically updated risk scores and rerouted trip via <strong>Main Arterial Corridor (+36% safer)</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Route Cards Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {routes.map((r) => {
          const isSelected = r.id === selectedRouteId;
          const grade = getSafetyGrade(r.safetyScore);

          return (
            <div
              key={r.id}
              onClick={() => onSelectRoute(r.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all border relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-zinc-900/90 border-pink-500/60 shadow-xl shadow-pink-500/10 ring-1 ring-pink-500/30'
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/60'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border ${grade.badgeClass}`}>
                  {r.badge}
                </span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {/* Title & Stats */}
              <div>
                <h3 className="font-bold text-sm text-white">{r.name}</h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-zinc-300">
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" /> {r.duration}
                  </span>
                  <span>•</span>
                  <span>{r.distance}</span>
                </div>
              </div>

              {/* Safety Score Meter */}
              <div className="mt-4 pt-3 border-t border-zinc-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-zinc-400 font-medium">Safety Score</span>
                  <span className="font-extrabold text-sm" style={{ color: r.color }}>
                    {r.safetyScore}/100
                  </span>
                </div>
                <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${r.safetyScore}%`, backgroundColor: r.color }}
                  />
                </div>
              </div>

              {/* Indicators Summary */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>{r.lightingLevel.split(' ')[0]} Lighting</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-purple-400" />
                  <span>{r.policePoints} Police Booths</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Route Detailed Risk Breakdown Panel */}
      {selectedRoute && (
        <div className="p-5 rounded-2xl glass-panel border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <div>
              <span className="text-[11px] font-bold text-pink-400 uppercase tracking-widest">TRANSPARENT RISK EXPLANATION</span>
              <h3 className="text-lg font-bold text-white mt-0.5">{selectedRoute.name}</h3>
            </div>
            <div className="text-right">
              <div className="text-xs text-zinc-400">Night Safety Index</div>
              <div className="text-2xl font-black font-outfit" style={{ color: selectedRoute.color }}>
                {selectedRoute.safetyScore} <span className="text-xs font-normal text-zinc-500">/ 100</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/60">
            💡 <strong>AI Explanation:</strong> {selectedRoute.explanation}
          </p>

          {/* Detailed Factor Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {selectedRoute.riskFactors.map((rf, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-xs text-zinc-400 font-medium">{rf.factor}</div>
                <div className="text-base font-bold text-white mt-1">{rf.status}</div>
                <div className="mt-2 w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                    style={{ width: `${rf.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
