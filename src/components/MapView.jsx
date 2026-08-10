import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  Bus, 
  Car, 
  Train, 
  ShieldAlert, 
  MapPin, 
  AlertTriangle, 
  Sun, 
  Moon, 
  ShieldCheck,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

// Custom Map Helper to Auto Center
function MapRecenter({ center, zoom = 14 }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

// Leaflet Custom Icon Factories
const createCustomIcon = (color = '#ec4899', symbol = '📍') => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 34px;
        height: 34px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        box-shadow: 0 0 15px ${color};
        border: 2px solid #09090b;
        font-size: 16px;
      ">
        ${symbol}
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -17]
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
  const defaultCenter = mapCenter || [28.6105, 77.2185];

  return (
    <div className="relative w-full h-[650px] lg:h-[750px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-950">
      {/* Map Overlay Stats Bar */}
      <div className="absolute top-4 left-4 z-[500] flex flex-wrap items-center gap-2 bg-zinc-950/85 backdrop-blur-md p-2.5 rounded-xl border border-zinc-800 text-xs">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Live GPS Grid</span>
        </div>
        
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-pink-500/10 text-pink-400 border border-pink-500/30 rounded-lg">
          <Moon className="w-3.5 h-3.5" />
          <span>Night Safety Radar</span>
        </div>

        {activeAlert && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/40 rounded-lg font-bold animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>CRITICAL ALERT IN PROGRESS</span>
          </div>
        )}
      </div>

      {/* Map Container */}
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full dark-tiles"
      >
        <MapRecenter center={defaultCenter} zoom={13} />

        {/* CartoDB Dark Matter Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* 1. Night Routes Polylines (PS-B07) */}
        {routes.map((route) => {
          const isSelected = route.id === selectedRouteId;
          return (
            <React.Fragment key={route.id}>
              <Polyline
                positions={route.path}
                pathOptions={{
                  color: route.color,
                  weight: isSelected ? 7 : 4,
                  opacity: isSelected ? 0.95 : 0.4,
                  dashArray: route.type === 'fastest' ? '6, 8' : null
                }}
              >
                <Popup>
                  <div className="p-1 max-w-xs text-zinc-900">
                    <h4 className="font-bold text-sm">{route.name}</h4>
                    <p className="text-xs text-zinc-600 mt-1">{route.explanation}</p>
                    <div className="mt-2 flex items-center justify-between text-xs font-semibold">
                      <span>Safety Score: <strong style={{ color: route.color }}>{route.safetyScore}/100</strong></span>
                      <span>{route.duration} ({route.distance})</span>
                    </div>
                  </div>
                </Popup>
              </Polyline>

              {/* Safety Buffer Circle for Selected Route */}
              {isSelected && showHeatmap && (
                <Circle
                  center={route.path[Math.floor(route.path.length / 2)]}
                  radius={800}
                  pathOptions={{
                    color: route.color,
                    fillColor: route.color,
                    fillOpacity: 0.08,
                    weight: 1
                  }}
                />
              )}
            </React.Fragment>
          );
        })}

        {/* 2. Public Transport Vehicles (PS-B06) */}
        {vehicles.map((v) => {
          const isDeviated = v.geofenceStatus === 'DEVIATED' || v.geofenceStatus === 'PROLONGED_STOP';
          const markerColor = isDeviated ? '#ef4444' : '#10b981';
          const iconSymbol = v.type === 'Bus' ? '🚌' : v.type === 'Metro' ? '🚇' : '🚖';

          return (
            <Marker
              key={v.id}
              position={v.currentLocation}
              icon={createCustomIcon(markerColor, iconSymbol)}
            >
              <Popup>
                <div className="p-1 min-w-[200px] text-zinc-900">
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span>{v.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] text-white font-extrabold ${isDeviated ? 'bg-red-600 animate-pulse' : 'bg-emerald-600'}`}>
                      {v.geofenceStatus}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-1">Driver: {v.driverName}</p>
                  <div className="mt-2 text-xs border-t pt-1 space-y-0.5">
                    <div>Speed: <strong>{v.speed}</strong></div>
                    <div>Crowd: <strong style={{ color: v.crowdColor }}>{v.crowdLevel}</strong></div>
                    <div>Next Stop: <strong>{v.nextStop}</strong></div>
                    <div>Stop Safety: <strong>{v.stopSafetyRating}</strong></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* 3. Safe Havens Markers */}
        {safeHavens.map((sh) => (
          <Marker
            key={sh.id}
            position={sh.coordinates}
            icon={createCustomIcon(
              sh.category === 'police' ? '#a855f7' : sh.category === 'medical' ? '#3b82f6' : '#10b981',
              sh.category === 'police' ? '🚔' : sh.category === 'medical' ? '🏥' : '🏪'
            )}
          >
            <Popup>
              <div className="p-1 max-w-xs text-zinc-900">
                <div className="flex items-center gap-1 text-purple-700 font-bold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{sh.type}</span>
                </div>
                <h4 className="font-extrabold text-sm text-zinc-900 mt-0.5">{sh.name}</h4>
                <p className="text-xs text-zinc-600">{sh.address}</p>
                <div className="mt-2 flex items-center justify-between text-xs border-t pt-1">
                  <span className="text-emerald-700 font-semibold">Dist: {sh.distance}</span>
                  <span className="text-blue-700 font-bold">24/7 Open</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 4. Incident Risk Markers */}
        {incidents.map((inc) => (
          <Marker
            key={inc.id}
            position={inc.coordinates}
            icon={createCustomIcon('#f97316', '⚠️')}
          >
            <Popup>
              <div className="p-1 max-w-xs text-zinc-900">
                <div className="flex items-center gap-1 text-amber-700 font-bold text-xs">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{inc.severity} RISK INCIDENT</span>
                </div>
                <h4 className="font-bold text-sm text-zinc-900 mt-0.5">{inc.title}</h4>
                <p className="text-xs text-zinc-600 mt-1">{inc.description}</p>
                <span className="mt-2 inline-block text-[10px] text-zinc-500">{inc.timeAgo} • Verified</span>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Active Emergency SOS Pulsing Highlight */}
        {activeAlert && activeAlert.location && (
          <Circle
            center={activeAlert.location}
            radius={600}
            pathOptions={{
              color: '#ef4444',
              fillColor: '#ef4444',
              fillOpacity: 0.3,
              weight: 3
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
