import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Bus, Car, ShieldAlert, ShieldCheck, MapPin } from 'lucide-react';

// Leaflet Resize Relayout Helper
function MapResizer({ mapCenter }) {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    if (mapCenter) {
      map.setView(mapCenter, map.getZoom(), { animate: true });
    }
  }, [mapCenter, map]);
  return null;
}

// Custom Div Icon Creator for Map Markers with Glowing Status LED Lights
const createCustomMarkerIcon = (type, status = 'SAFE') => {
  const color = status === 'DEVIATED' || status === 'PROLONGED_STOP' || status === 'CRITICAL' ? '#ef4444' : '#10b981';
  const iconEmoji = type === 'bus' ? '🚌' : type === 'cab' ? '🚕' : type === 'metro' ? '🚇' : type === 'police' ? '👮‍♀️' : '🏥';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        position: relative;
        background: #18181b;
        border: 2px solid ${color};
        border-radius: 9999px;
        width: 38px;
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 0 15px ${color}80;
        cursor: pointer;
      ">
        <span>${iconEmoji}</span>
        <span style="
          position: absolute;
          top: -2px;
          right: -2px;
          width: 10px;
          height: 10px;
          background: ${color};
          border-radius: 9999px;
          box-shadow: 0 0 8px ${color};
        "></span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20]
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
  showHeatmap = true,
  activeAlert = null
}) {
  const selectedRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden glass-panel border border-zinc-800 shadow-2xl">
      
      {/* Map Header Status Overlay */}
      <div className="absolute top-3 left-3 z-[400] flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-800 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-extrabold text-white">Live 5G GPS Radar</span>
        </div>
        <span className="text-zinc-500">|</span>
        <span className="text-zinc-400 font-mono text-[11px]">Delhi NCR Corridor</span>
      </div>

      {/* Main Leaflet Map Engine */}
      <MapContainer
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', background: '#09090b' }}
      >
        <MapResizer mapCenter={mapCenter} />

        {/* CartoDB Dark Matter Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Render Night Safe Routes (Polyline Paths) */}
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
                opacity: isSelected ? 0.9 : 0.4,
                dashArray: isSelected ? null : '6, 8'
              }}
            >
              <Popup>
                <div className="p-1 space-y-1 text-xs">
                  <span className="font-bold text-white block">{rt.name}</span>
                  <span className="text-emerald-400 font-mono">Safety Score: {rt.safetyScore}/100</span>
                  <p className="text-[11px] text-zinc-400">{rt.lightingLevel}</p>
                </div>
              </Popup>
            </Polyline>
          );
        })}

        {/* Render Live Vehicle Markers (Bus, Cabs, Metro) with Spaced Coordinates */}
        {vehicles.map((v) => (
          <Marker
            key={v.id}
            position={v.currentLocation}
            icon={createCustomMarkerIcon(
              v.type.toLowerCase(),
              v.geofenceStatus || 'SAFE'
            )}
          >
            <Popup>
              <div className="p-1.5 space-y-1 text-xs max-w-[200px]">
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

        {/* Render 24/7 Safe Havens (Pink Booths, Hospitals) */}
        {safeHavens.map((sh) => (
          <Marker
            key={sh.id}
            position={sh.location}
            icon={createCustomMarkerIcon(sh.type === 'POLICE_BOOTH' ? 'police' : 'hospital', 'SAFE')}
          >
            <Popup>
              <div className="p-1 space-y-1 text-xs">
                <span className="font-bold text-emerald-400 block">{sh.name}</span>
                <span className="text-zinc-300 text-[11px]">{sh.type} • {sh.distance}</span>
                <p className="text-zinc-400 text-[10px]">{sh.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Render Active Emergency SOS Alert Marker & Pulsing Circle */}
        {activeAlert && (
          <>
            <Circle
              center={activeAlert.location}
              radius={250}
              pathOptions={{
                color: '#ef4444',
                fillColor: '#ef4444',
                fillOpacity: 0.25
              }}
            />
            <Marker
              position={activeAlert.location}
              icon={createCustomMarkerIcon('cab', 'CRITICAL')}
            >
              <Popup>
                <div className="p-1.5 space-y-1 text-xs">
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
    </div>
  );
}
