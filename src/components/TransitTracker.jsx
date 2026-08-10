import React from 'react';
import { 
  Bus, 
  Car, 
  Train, 
  ShieldAlert, 
  Radio, 
  Video, 
  Users, 
  AlertOctagon, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Sparkles,
  AlertTriangle,
  Play,
  Maximize2
} from 'lucide-react';

export default function TransitTracker({ 
  vehicles = [], 
  selectedVehicleId, 
  onSelectVehicle, 
  onSimulateDeviation, 
  onSimulateProlongedStop 
}) {
  const currentVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-pink-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white font-outfit">Real-Time Public Transport Safety System</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-pink-500/20 text-pink-400 border border-pink-500/40 rounded-full">
              PS-B06 ENGINE
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Continuous vehicle route monitoring, anomaly detection, crowd density tracking, and discreet SOS activation.
          </p>
        </div>

        {/* Anomaly Simulation Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSimulateDeviation(currentVehicle.id)}
            className="flex items-center gap-1.5 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 rounded-xl text-xs font-bold transition-all"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Simulate Route Deviation</span>
          </button>

          <button
            onClick={() => onSimulateProlongedStop(currentVehicle.id)}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-all"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Simulate Prolonged Stop</span>
          </button>
        </div>
      </div>

      {/* Vehicle Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((v) => {
          const isSelected = v.id === selectedVehicleId;
          const isDeviated = v.geofenceStatus === 'DEVIATED' || v.geofenceStatus === 'PROLONGED_STOP';

          return (
            <div
              key={v.id}
              onClick={() => onSelectVehicle(v.id)}
              className={`p-4 rounded-xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-zinc-900/90 border-pink-500/60 ring-1 ring-pink-500/40 shadow-lg'
                  : 'bg-zinc-900/40 border-zinc-800/80 hover:bg-zinc-900/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-pink-500/10 text-pink-400">
                    {v.type === 'Bus' ? <Bus className="w-5 h-5" /> : v.type === 'Metro' ? <Train className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-white">{v.name}</h3>
                    <p className="text-[11px] text-zinc-400">{v.regNumber}</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                  isDeviated ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                }`}>
                  {v.geofenceStatus}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
                <span>Speed: <strong>{v.speed}</strong></span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-400" />
                  <span>{v.femalePassengersCount} Women Onboard</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Vehicle Status Details & Telemetry */}
      {currentVehicle && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Telemetry Details Panel */}
          <div className="lg:col-span-2 space-y-4 p-5 rounded-2xl glass-panel border border-zinc-800">
            
            {/* Header Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-pink-400 uppercase tracking-widest">LIVE COMMUTE TELEMETRY</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{currentVehicle.name}</h3>
                <p className="text-xs text-zinc-400 mt-0.5">{currentVehicle.routeName}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>5G Telemetry Active</span>
                </span>
              </div>
            </div>

            {/* Anomaly Status Alert Banner if Deviated */}
            {(currentVehicle.geofenceStatus === 'DEVIATED' || currentVehicle.geofenceStatus === 'PROLONGED_STOP') && (
              <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/40 flex items-start gap-3">
                <AlertOctagon className="w-6 h-6 text-red-400 shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <div className="font-extrabold text-red-300 text-sm">
                    {currentVehicle.geofenceStatus === 'DEVIATED' ? 'UNAUTHORIZED ROUTE DEVIATION DETECTED' : 'UNEXPECTED HALT IN UNLIT ALLEY'}
                  </div>
                  <p className="text-xs text-zinc-200 mt-1">
                    Vehicle stymied off-route by 420 meters from geofenced corridor. Automated silent check-in prompt sent to passengers. Emergency control room standing by.
                  </p>
                </div>
              </div>
            )}

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                <span className="text-[10px] font-bold text-zinc-400 block">DRIVER VERIFICATION</span>
                <span className="text-xs font-bold text-emerald-400 mt-1 block truncate">{currentVehicle.driverName}</span>
              </div>

              <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                <span className="text-[10px] font-bold text-zinc-400 block">CROWD LEVEL</span>
                <span className="text-xs font-bold text-amber-400 mt-1 block">{currentVehicle.crowdLevel}</span>
              </div>

              <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                <span className="text-[10px] font-bold text-zinc-400 block">STOP RISK INDEX</span>
                <span className="text-xs font-bold text-emerald-400 mt-1 block">{currentVehicle.stopSafetyRating}</span>
              </div>

              <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl">
                <span className="text-[10px] font-bold text-zinc-400 block">NEXT STOP ETA</span>
                <span className="text-xs font-bold text-white mt-1 block truncate">{currentVehicle.nextStop}</span>
              </div>
            </div>

            {/* Route Stop Safety Breakdown */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Route Safety Ratings by Transit Stop</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {currentVehicle.stops.map((st, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      <span className="font-semibold text-zinc-200">{st.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <span>Crowd: <strong className="text-zinc-200">{st.crowd}</strong></span>
                      <span>Lighting: <strong className="text-zinc-200">{st.lighting}</strong></span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-extrabold">
                        {st.safeRank}/100
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* CCTV Feed Preview & Wearable Bridge Panel */}
          <div className="space-y-4">
            
            {/* Live CCTV Video Preview */}
            <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Video className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>Live Vehicle CCTV Sync</span>
                </div>
                <span className="px-2 py-0.5 bg-red-600/20 text-red-400 text-[10px] font-extrabold rounded">
                  REC • 1080P
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-video border border-zinc-800 group">
                <img 
                  src={currentVehicle.cctvFeedUrl} 
                  alt="Vehicle CCTV Stream" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[10px] text-zinc-300 font-mono">
                    CAM #02 • AI GENDER DENSITY DETECTED (14 FEMALE COMMUTERS)
                  </span>
                </div>
              </div>
            </div>

            {/* Smartwatch Wearable Bridge Status */}
            <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Smartwatch Wearable Sensor</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs text-zinc-400">
                Paired with Bluetooth Low Energy (BLE) Wearable. Rapid triple-press or fall-detection will trigger immediate silent SOS.
              </p>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
