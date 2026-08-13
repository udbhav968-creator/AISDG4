import React from 'react';
import { Bus, Car, ShieldCheck, AlertTriangle, Video, Users, Navigation, Compass, Clock } from 'lucide-react';

export default function TransitTracker({
  vehicles = [],
  selectedVehicleId,
  onSelectVehicle,
  onSimulateDeviation,
  onSimulateProlongedStop
}) {
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  return (
    <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-zinc-800 space-y-4 w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-xl border border-cyan-500/30 shrink-0">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-wide leading-tight">
              PS-B06 Transit Tracker
            </h2>
            <p className="text-xs text-zinc-400">Live 5G GPS Telemetry & CCTV Security</p>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-[11px] font-extrabold rounded-full border border-cyan-500/30 flex items-center gap-1.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          5G LIVE
        </span>
      </div>

      {/* Vehicle Selection Cards - Strictly Single Column Stack */}
      <div className="flex flex-col space-y-3 w-full">
        {vehicles.map((v) => {
          const isSelected = v.id === selectedVehicleId;
          const isDanger = v.geofenceStatus === 'DEVIATED' || v.geofenceStatus === 'PROLONGED_STOP';

          return (
            <div
              key={v.id}
              onClick={() => onSelectVehicle(v.id)}
              className={`w-full p-4 rounded-xl cursor-pointer hover-blister transition-all ${
                isSelected
                  ? 'bg-zinc-900 border-2 border-cyan-500 shadow-xl shadow-cyan-500/15'
                  : 'bg-zinc-900/70 border border-zinc-800 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-white">{v.name}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md uppercase tracking-wider ${
                      isDanger
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {v.geofenceStatus || 'ON-ROUTE'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">{v.route}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-cyan-400 font-mono block">{v.stopSafetyRating}</span>
                  <span className="text-[10px] text-zinc-400 font-semibold uppercase">STOP RATING</span>
                </div>
              </div>

              {/* Commuter & Telemetry Indicators */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-zinc-800/80 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>{v.femaleCommuters} Women Onboard</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Speed: {v.speed}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulator Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 w-full">
        <button
          onClick={() => onSimulateDeviation(selectedVehicle?.id)}
          className="w-full py-2.5 px-3 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition shadow-lg shadow-amber-600/20"
        >
          <Compass className="w-4 h-4 shrink-0" />
          <span>Sim Stray Cab</span>
        </button>

        <button
          onClick={() => onSimulateProlongedStop(selectedVehicle?.id)}
          className="w-full py-2.5 px-3 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition shadow-lg shadow-orange-600/20"
        >
          <Clock className="w-4 h-4 shrink-0" />
          <span>Prolonged Halt</span>
        </button>
      </div>

      {/* Live CCTV Preview */}
      {selectedVehicle && (
        <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2.5 text-xs w-full">
          <div className="flex items-center justify-between font-bold text-white">
            <span className="flex items-center gap-1.5 truncate">
              <Video className="w-4 h-4 text-pink-400 animate-pulse shrink-0" />
              <span className="truncate">CCTV STREAM: {selectedVehicle.name}</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono shrink-0">LIVE 1080P</span>
          </div>

          <div className="relative h-32 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 p-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300">
                <span>CAM-02 (Aisle & Rear Exit)</span>
                <span className="text-pink-400 font-bold">● REC 00:42:10</span>
              </div>
              <p className="text-[11px] text-zinc-200 font-mono">Next Stop: {selectedVehicle.nextStop}</p>
            </div>
            
            <div className="w-full h-full opacity-35 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>
        </div>
      )}
    </div>
  );
}
