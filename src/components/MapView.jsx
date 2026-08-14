import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Activity, Shield, Navigation, AlertTriangle, Radio } from 'lucide-react';

// Leaflet Map Initialization & Inline Style DOM Override Hook
function MapDOMOverrider({ mapCenter }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    map.invalidateSize();
    if (mapCenter) {
      map.setView(mapCenter, map.getZoom(), { animate: true });
    }

    // Force internal Leaflet pane container DOM elements to z-index: 1 & dark background
    const container = map.getContainer();
    if (container) {
      container.style.backgroundColor = '#09090b';
      container.style.background = '#09090b';
      
      const panes = container.querySelectorAll('.leaflet-pane, .leaflet-tile-pane, .leaflet-map-pane, .leaflet-layer');
      panes.forEach((p) => {
        p.style.zIndex = '1';
        p.style.backgroundColor = '#09090b';
      });
    }
  }, [mapCenter, map]);

  return null;
}

// Marker Division Icon Creator
const createHiTechMarkerIcon = (type, status = 'SAFE') => {
  const isDanger = status === 'DEVIATED' || status === 'PROLONGED_STOP' || status === 'CRITICAL';
  const color = isDanger ? '#ef4444' : '#10b981';
  const emoji = type === 'bus' ? '🚌' : type === 'cab' ? '🚕' : type === 'metro' ? '🚇' : type === 'police' ? '👮‍♀️' : '🏥';

  return L.divIcon({
    className: 'hitech-leaflet-marker',
    html: `
      <div style="
        position: relative;
        background: #121218;
        border: 2px solid ${color};
        border-radius: 9999px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 0 18px ${color}aa;
        cursor: pointer;
      ">
        <span>${emoji}</span>
        <span style="
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background: ${color};
          border: 2px solid #09090b;
          border-radius: 9999px;
          box-shadow: 0 0 10px ${color};
        "></span>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22]
  });
};

export default function MapView({
  routes = [],
  selectedRouteId,
  vehicles = [],
  selectedVehicleId,
  safeHavens = [],
  incidents = [],
  mapCenter = [28.6105, 77.2185],
  activeAlert = null
}) {
  const [useFallbackRadar, setUseFallbackRadar] = useState(false);

  return (
    <div 
      className="relative w-full h-[400px] sm:h-[500px] lg:h-[580px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950"
      style={{ backgroundColor: '#09090b', background: '#09090b' }}
    >
      
      {/* Top Map Header Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none flex-wrap gap-2">
        <div className="pointer-events-auto flex items-center gap-2 bg-zinc-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-800 text-xs shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-extrabold text-white">5G Live Transit Safety Radar</span>
          <span className="text-zinc-600">|</span>
          <span className="text-cyan-400 font-mono text-[11px]">Delhi NCR Corridor</span>
        </div>

        <button
          onClick={() => setUseFallbackRadar(!useFallbackRadar)}
          className="pointer-events-auto px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 rounded-xl text-xs font-semibold shadow cursor-pointer transition flex items-center gap-1.5"
        >
          <Activity className="w-3.5 h-3.5 text-pink-400" />
          <span>{useFallbackRadar ? 'Switch to OpenStreetMap' : 'Switch to High-Tech Vector Radar'}</span>
        </button>
      </div>

      {/* Mode A: Vector Radar Visualizer (Zero-Network Dependence, Guaranteed Dark Radar Grid) */}
      {useFallbackRadar ? (
        <div className="w-full h-full bg-zinc-950 p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Animated Glowing Radar Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0,transparent_70%)] pointer-events-none"></div>
          
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-black text-white">Encrypted Public Transit Vector Mesh</h3>
            </div>
            <p className="text-xs text-zinc-400 max-w-md">
              Real-time telemetry tracking 12 DTC buses, 18 Delhi Metro trains, and 45 registered Pink Auto Cabs across South Delhi corridors.
            </p>
          </div>

          {/* Interactive Vehicle Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10 my-auto">
            {vehicles.slice(0, 3).map((v) => (
              <div 
                key={v.id}
                className={`p-3 rounded-xl border transition ${
                  v.id === selectedVehicleId
                    ? 'bg-zinc-900 border-pink-500 shadow-lg shadow-pink-500/20'
                    : 'bg-zinc-900/60 border-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-extrabold text-white">
                  <span>{v.name}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono ${
                    v.geofenceStatus === 'DEVIATED' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {v.geofenceStatus || 'ON-ROUTE'}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-mono mt-1">Speed: {v.speed}</p>
                <p className="text-[11px] text-pink-400 font-semibold mt-0.5">Rating: {v.stopSafetyRating}</p>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex items-center justify-between text-xs text-zinc-400 font-mono border-t border-zinc-800 pt-3">
            <span>📡 Telemetry Sensor Frequency: 100 Hz</span>
            <span className="text-emerald-400 font-bold">● Active 112 PCR Relay</span>
          </div>
        </div>
      ) : (
        /* Mode B: Leaflet Map with Guaranteed Tile Dark Inversion */
        <MapContainer
          center={mapCenter}
          zoom={13}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%', background: '#09090b', backgroundColor: '#09090b' }}
        >
          <MapDOMOverrider mapCenter={mapCenter} />

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            maxZoom={19}
          />

          {/* Polyline Routes */}
          {routes.map((rt) => {
            const isSelected = rt.id === selectedRouteId;
            const strokeColor =
              rt.id === 'route-safest'
                ? '#10b981'
                : rt.id === 'route-fastest'
                ? '#ef4444'
                : '#f59e0b';

            return (
              <Polyline
                key={rt.id}
                positions={rt.path}
                pathOptions={{
                  color: strokeColor,
                  weight: isSelected ? 6 : 3,
                  opacity: isSelected ? 0.95 : 0.5,
                  dashArray: isSelected ? null : '6, 8'
                }}
              >
                <Popup>
                  <div className="p-1.5 space-y-1 text-xs">
                    <span className="font-bold text-white block">{rt.name}</span>
                    <span className="text-emerald-400 font-mono font-bold">Safety Score: {rt.safetyScore}/100</span>
                    <p className="text-[11px] text-zinc-400">{rt.lightingLevel}</p>
                  </div>
                </Popup>
              </Polyline>
            );
          })}

          {/* Live Vehicle Markers */}
          {vehicles.map((v) => (
            <Marker
              key={v.id}
              position={v.currentLocation}
              icon={createHiTechMarkerIcon(
                v.type.toLowerCase(),
                v.geofenceStatus || 'SAFE'
              )}
            >
              <Popup>
                <div className="p-2 space-y-1 text-xs max-w-[210px]">
                  <div className="flex items-center justify-between font-bold text-white">
                    <span>{v.name}</span>
                    <span className={`px-1.5 py-0.5 text-[9px] rounded font-mono ${
                      v.geofenceStatus === 'DEVIATED' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {v.geofenceStatus || 'ON-ROUTE'}
                    </span>
                  </div>
                  <p className="text-zinc-300 text-[11px] font-mono">Speed: {v.speed}</p>
                  <p className="text-pink-400 text-[11px] font-semibold">Safety Rating: {v.stopSafetyRating}</p>
                  <p className="text-zinc-400 text-[10px]">Next Stop: {v.nextStop}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Safe Havens Markers */}
          {safeHavens.map((sh) => (
            <Marker
              key={sh.id}
              position={sh.location}
              icon={createHiTechMarkerIcon(sh.type === 'POLICE_BOOTH' ? 'police' : 'hospital', 'SAFE')}
            >
              <Popup>
                <div className="p-1.5 space-y-1 text-xs">
                  <span className="font-bold text-emerald-400 block">{sh.name}</span>
                  <span className="text-zinc-300 text-[11px]">{sh.type} • {sh.distance}</span>
                  <p className="text-zinc-400 text-[10px]">{sh.address}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Active SOS Circle */}
          {activeAlert && (
            <>
              <Circle
                center={activeAlert.location}
                radius={300}
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: 0.35
                }}
              />
              <Marker
                position={activeAlert.location}
                icon={createHiTechMarkerIcon('cab', 'CRITICAL')}
              >
                <Popup>
                  <div className="p-2 space-y-1 text-xs">
                    <span className="font-extrabold text-red-400 block">🚨 ACTIVE SOS DISPATCH</span>
                    <p className="font-bold text-white">{activeAlert.user}</p>
                    <p className="text-zinc-300 text-[11px] font-mono">{activeAlert.vehicle}</p>
                    <p className="text-amber-300 text-[10px]">{activeAlert.unitAssigned}</p>
                  </div>
                </Popup>
              </Marker>
            </>
          )}
        </MapContainer>
      )}

    </div>
  );
}
