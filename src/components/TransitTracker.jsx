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
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-xl border border-cyan-500/30">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-wide">
              PS-B06 Real-Time Public Transport Safety
            </h2>
            <p className="text-xs text-zinc-400">Live 5G GPS Telemetry, CCTV Streams & Anomaly Detection</p>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-extrabold rounded-full border border-cyan-500/30 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          5G TELEMETRY
        </span>
      </div>

      {/* Vehicle Selection Cards */}
      <div className="space-y-3">
        {vehicles.map((v) => {
          const isSelected = v.id === selectedVehicleId;

          return (
            <div
              key={v.id}
              onClick={() => onSelectVehicle(v.id)}
              className={`p-4 rounded-xl cursor-pointer hover-blister transition-all ${
                isSelected
                  ? 'bg-zinc-900/90 border-2 border-cyan-500 shadow-lg shadow-cyan-500/15'
                  : 'bg-zinc-900/60 border border-zinc-800 hover:bg-zinc-900'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white">{v.name}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                      v.geofenceStatus === 'DEVIATED' || v.geofenceStatus === 'PROLONGED_STOP'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {v.geofenceStatus || 'ON-ROUTE'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{v.route}</p>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-cyan-400 font-mono">{v.stopSafetyRating}</span>
                  <span className="text-[10px] text-zinc-400 block font-semibold">STOP RATING</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-2 border-t border-zinc-800/80 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>{v.femaleCommuters} Female Commuters</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>CCTV Stream Active</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulator Action Buttons for Current Vehicle */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={() => onSimulateDeviation(selectedVehicle?.id)}
          className="btn-vibrant-amber p-2.5 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95"
        >
          <Compass className="w-4 h-4" />
          <span>Sim Stray Cab</span>
        </button>

        <button
          onClick={() => onSimulateProlongedStop(selectedVehicle?.id)}
          className="p-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow active:scale-95 transition"
        >
          <Clock className="w-4 h-4" />
          <span>Sim Prolonged Stop</span>
        </button>
      </div>

      {/* Live CCTV & Telemetry Feed Card */}
      {selectedVehicle && (
        <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-white">
            <span className="flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
              <span>CCTV LIVE PREVIEW: {selectedVehicle.name}</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">LIVE 1080P STREAM</span>
          </div>

          <div className="relative h-28 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-10 p-2 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300">
                <span>CAM-02 (Aisle & Rear Emergency Exit)</span>
                <span className="text-pink-400 font-bold">● REC 00:42:10</span>
              </div>
              <p className="text-[11px] text-zinc-200 font-mono">Next Stop: {selectedVehicle.nextStop}</p>
            </div>
            
            {/* Visual Stream Simulation Canvas Grid */}
            <div className="w-full h-full opacity-30 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>
        </div>
      )}
    </div>
  );
}
