import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MapView from './components/MapView';
import RoutePlanner from './components/RoutePlanner';
import TransitTracker from './components/TransitTracker';
import SafeHavenRadar from './components/SafeHavenRadar';
import AuthorityDashboard from './components/AuthorityDashboard';
import DiscreetSOSModal from './components/DiscreetSOSModal';
import SimulationBar from './components/SimulationBar';

import VoiceDistressListener from './components/VoiceDistressListener';
import StealthCalculator from './components/StealthCalculator';
import PinkCompanion from './components/PinkCompanion';
import OfflineMeshRelay from './components/OfflineMeshRelay';
import EvidenceVault from './components/EvidenceVault';
import CommunitySafetyAudit from './components/CommunitySafetyAudit';

import SurakshaCopilot from './components/SurakshaCopilot';
import WhatsAppBotBridge from './components/WhatsAppBotBridge';
import MunicipalAnalytics from './components/MunicipalAnalytics';
import BLESmartRing from './components/BLESmartRing';
import AudioSpectrumVisualizer from './components/AudioSpectrumVisualizer';
import VehicleTelemetryChart from './components/VehicleTelemetryChart';
import HiTech50Suite from './components/HiTech50Suite';
import LiveStatsHero from './components/LiveStatsHero';
import PageSwitcherHero from './components/PageSwitcherHero';
import AudioThreatSimulator from './components/AudioThreatSimulator';
import CrowdDensityHeatmapVisualizer from './components/CrowdDensityHeatmapVisualizer';

import { fetchTransitVehicles, fetchNightRoutes, fetchSafeHavens, triggerDiscreetSOS } from './services/api';
import { mockNightRoutes } from './data/mockRoutes';
import { mockTransitVehicles } from './data/mockTransitData';
import { mockSafeHavens, mockIncidents } from './data/mockSafeHavens';

export default function App() {
  const [activeTab, setActiveTab] = useState('transit'); // 'transit' (Page 1), 'routes' (Page 2), 'suite50' (Page 3), 'advanced' (Page 4), 'safehavens' (Page 5), 'authority' (Page 6)
  
  // Data States (Fetched via REST APIs)
  const [routes, setRoutes] = useState(mockNightRoutes);
  const [selectedRouteId, setSelectedRouteId] = useState('route-safest');
  const [vehicles, setVehicles] = useState(mockTransitVehicles);
  const [selectedVehicleId, setSelectedVehicleId] = useState('bus-512');
  const [safeHavens, setSafeHavens] = useState(mockSafeHavens);
  const [incidents, setIncidents] = useState(mockIncidents);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  
  // UI & Simulation States
  const [isSOSModalOpen, setIsSOSModalOpen] = useState(false);
  const [isStealthCalculatorOpen, setIsStealthCalculatorOpen] = useState(false);
  const [isBlackoutSimulated, setIsBlackoutSimulated] = useState(false);
  const [wearableConnected, setWearableConnected] = useState(true);
  const [mapCenter, setMapCenter] = useState([28.6105, 77.2185]);
  const [activeAlert, setActiveAlert] = useState(null);

  // Dynamic Background Texture Class based on activeTab
  const pageTextureClass = 
    activeTab === 'transit' ? 'bg-page-transit' :
    activeTab === 'routes' ? 'bg-page-routes' :
    activeTab === 'suite50' ? 'bg-page-suite50' :
    activeTab === 'advanced' ? 'bg-page-advanced' :
    activeTab === 'safehavens' ? 'bg-page-safehavens' : 'bg-page-authority';

  // REST API Initial Live Fetching
  useEffect(() => {
    async function loadLiveData() {
      setIsLoadingApi(true);
      try {
        const [vData, rData, shData] = await Promise.all([
          fetchTransitVehicles(),
          fetchNightRoutes(),
          fetchSafeHavens()
        ]);
        if (vData && vData.length > 0) setVehicles(vData);
        if (rData && rData.length > 0) setRoutes(rData);
        if (shData && shData.length > 0) setSafeHavens(shData);
      } catch (err) {
        console.warn('API Fallback active');
      } finally {
        setIsLoadingApi(false);
      }
    }
    loadLiveData();
  }, []);

  // Simulators
  const handleSimulateBusDeviation = (vehicleId = 'cab-shared-942') => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === vehicleId || v.id === 'cab-shared-942') {
          return {
            ...v,
            geofenceStatus: 'DEVIATED',
            currentLocation: [28.5910, 77.1960],
            speed: '12 km/h (Straying off-path)',
            stopSafetyRating: 'CRITICAL LOW (24/100)',
            nextStop: 'UNAUTHORIZED OFF-ROUTE ALLEY'
          };
        }
        return v;
      })
    );
    setSelectedVehicleId('cab-shared-942');
    setMapCenter([28.5910, 77.1960]);
    setIsSOSModalOpen(true);
  };

  const handleSimulateCabStop = (vehicleId = 'cab-shared-942') => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === vehicleId || v.id === 'cab-shared-942') {
          return {
            ...v,
            geofenceStatus: 'PROLONGED_STOP',
            currentLocation: [28.5910, 77.1960],
            speed: '0 km/h (Halted for 4m 30s)',
            stopSafetyRating: 'UNSAFE HALT (32/100)'
          };
        }
        return v;
      })
    );
    setSelectedVehicleId('cab-shared-942');
    setMapCenter([28.5910, 77.1960]);
    setIsSOSModalOpen(true);
  };

  const handleSimulateBlackout = () => {
    const nextBlackoutState = !isBlackoutSimulated;
    setIsBlackoutSimulated(nextBlackoutState);

    if (nextBlackoutState) {
      setRoutes((prev) =>
        prev.map((r) => {
          if (r.id === 'route-fastest') {
            return {
              ...r,
              safetyScore: 32,
              lightingLevel: '12% CRITICAL BLACKOUT',
              badge: 'DANGER: BLACKOUT DETECTED',
              explanation: '⚠️ CRITICAL: Unannounced transformer failure caused 100% lighting loss on shortcut alley. System automatically updated risk scores and rerouted trip via Main Arterial Corridor (+36% safer).'
            };
          }
          return r;
        })
      );
      setSelectedRouteId('route-safest');
      setActiveTab('routes');
    } else {
      setRoutes(mockNightRoutes);
    }
  };

  const handleTriggerWearableSOS = () => {
    setIsSOSModalOpen(true);
  };

  const handleAlertDispatched = async (newAlert) => {
    setActiveAlerts((prev) => [newAlert, ...prev]);
    setActiveAlert(newAlert);
    await triggerDiscreetSOS(newAlert);
  };

  const handleUpdateAlertStatus = (alertId, newStatus) => {
    setActiveAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, status: newStatus } : a))
    );
  };

  const handleNavigateToHaven = (coords) => {
    setMapCenter(coords);
    setActiveTab('transit');
  };

  return (
    <div className={`min-h-screen text-zinc-100 flex flex-col font-sans pb-48 relative transition-colors duration-500 ${pageTextureClass}`}>
      
      {/* Background Watermark Typography (Microsoft/Amazon AWS Enterprise Identity) */}
      <div className="absolute top-24 left-8 pointer-events-none select-none opacity-5 font-black text-6xl lg:text-8xl tracking-widest text-zinc-100 uppercase hidden md:block z-0">
        {activeTab === 'transit' && '01 // GIS TRANSIT SAFETY'}
        {activeTab === 'routes' && '02 // NIGHT ILLUMINATION'}
        {activeTab === 'suite50' && '03 // 50 AI MODELS MATRIX'}
        {activeTab === 'advanced' && '04 // ACOUSTIC SCREAM VAULT'}
        {activeTab === 'safehavens' && '05 // SAFE HAVENS RADAR'}
        {activeTab === 'authority' && '06 // POLICE 112 PCR DISPATCH'}
      </div>

      {/* Top Multi-Page Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTriggerSOS={handleTriggerWearableSOS}
        onToggleStealth={() => setIsStealthCalculatorOpen(true)}
        activeAlertCount={activeAlerts.length}
        wearableConnected={wearableConnected}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6 relative z-10">
        
        {/* 6-Page Switcher Hero Banner */}
        <PageSwitcherHero activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Top Real-Time Telemetry Hero Banner */}
        <LiveStatsHero />

        {/* PAGE 1 (FRONT PAGE ONLY): PS-B06 Transit Tracker with GIS Map Engine */}
        {activeTab === 'transit' && (
          <div className="animate-fadeIn space-y-6">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-300 text-xs font-mono flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold">📍 FRONT PAGE: PS-B06 REAL-TIME PUBLIC TRANSPORT SAFETY & GIS MAP ENGINE</span>
              <span className="text-[11px] bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/40">5G GPS MAP MOUNTED</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* GIS Interactive Leaflet Map Engine (7 Cols) */}
              <div className="lg:col-span-7">
                <MapView
                  routes={routes}
                  selectedRouteId={selectedRouteId}
                  vehicles={vehicles}
                  selectedVehicleId={selectedVehicleId}
                  safeHavens={safeHavens}
                  incidents={incidents}
                  mapCenter={mapCenter}
                  activeAlert={activeAlert}
                />
              </div>

              {/* Transit Controls & CCTV Stream (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                <TransitTracker
                  vehicles={vehicles}
                  selectedVehicleId={selectedVehicleId}
                  onSelectVehicle={(id) => {
                    setSelectedVehicleId(id);
                    const veh = vehicles.find((v) => v.id === id);
                    if (veh) setMapCenter(veh.currentLocation);
                  }}
                  onSimulateDeviation={handleSimulateBusDeviation}
                  onSimulateProlongedStop={handleSimulateCabStop}
                />
                <VehicleTelemetryChart 
                  selectedVehicle={vehicles.find((v) => v.id === selectedVehicleId)} 
                />
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2: PS-B07 Night Safe-Routes Engine (Full Width 12 Cols - Clean Standalone Page) */}
        {activeTab === 'routes' && (
          <div className="animate-fadeIn space-y-6">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs font-mono flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold">🛣️ PAGE 2: PS-B07 DYNAMIC NIGHT SAFE-ROUTES ENGINE & ILLUMINATION INDEX</span>
              <span className="text-[11px] bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">FULL-WIDTH CLEAN PAGE</span>
            </div>

            <div className="w-full">
              <RoutePlanner
                routes={routes}
                selectedRouteId={selectedRouteId}
                onSelectRoute={(id) => setSelectedRouteId(id)}
                onSimulateReroute={handleSimulateBlackout}
                isBlackoutSimulated={isBlackoutSimulated}
              />
            </div>
          </div>
        )}

        {/* PAGE 3: 🚀 50 Hi-Tech AI Models Suite (Full Width 12 Cols - Clean Standalone Page) */}
        {activeTab === 'suite50' && (
          <div className="animate-fadeIn space-y-6">
            <div className="p-3 bg-pink-500/10 border border-pink-500/30 rounded-xl text-pink-300 text-xs font-mono flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold">🚀 PAGE 3: 50 HI-TECH AI MODELS, CV ANALYTICS & MICROSERVICES SUITE</span>
              <span className="text-[11px] bg-pink-500/20 px-2 py-0.5 rounded border border-pink-500/40">50 MODELS ONLINE</span>
            </div>

            <div className="w-full">
              <HiTech50Suite />
            </div>
          </div>
        )}

        {/* PAGE 4: AI Voice & Acoustic Vault (Full Width Grid - Clean Standalone Page) */}
        {activeTab === 'advanced' && (
          <div className="animate-fadeIn space-y-6">
            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-300 text-xs font-mono flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold">🎙️ PAGE 4: AI VOICE DISTRESS, WEBAUDIO SCREAM SHIELD & EVIDENCE VAULT</span>
              <span className="text-[11px] bg-purple-500/20 px-2 py-0.5 rounded border border-purple-500/40">ACOUSTIC & SENSOR SUITE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <AudioThreatSimulator onTriggerSOS={handleTriggerWearableSOS} />
              <CrowdDensityHeatmapVisualizer />
              <AudioSpectrumVisualizer onAutoTriggerSOS={handleTriggerWearableSOS} />
              <SurakshaCopilot onNavigateToHaven={handleNavigateToHaven} onSelectVehicle={setSelectedVehicleId} />
              <WhatsAppBotBridge activeVehicle={vehicles.find((v) => v.id === selectedVehicleId)} />
              <BLESmartRing onTriggerSOS={handleTriggerWearableSOS} />
              <VoiceDistressListener onAutoTriggerSOS={handleTriggerWearableSOS} />
              <MunicipalAnalytics />
              <PinkCompanion />
              <OfflineMeshRelay />
              <EvidenceVault />
              <CommunitySafetyAudit />
            </div>
          </div>
        )}

        {/* PAGE 5: Safe Havens Radar (Full Width 12 Cols - Clean Standalone Page) */}
        {activeTab === 'safehavens' && (
          <div className="animate-fadeIn space-y-6">
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs font-mono flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold">📡 PAGE 5: 24/7 SAFE HAVENS RADAR, PINK POLICE BOOTHS & HOSPITALS</span>
              <span className="text-[11px] bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/40">48 HAVENS MAPPED</span>
            </div>

            <div className="w-full">
              <SafeHavenRadar
                safeHavens={safeHavens}
                onNavigateToHaven={handleNavigateToHaven}
              />
            </div>
          </div>
        )}

        {/* PAGE 6: Police 112 PCR Control Room (Full Width 12 Cols - Clean Standalone Page) */}
        {activeTab === 'authority' && (
          <div className="animate-fadeIn space-y-6">
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs font-mono flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold">🚨 PAGE 6: DELHI POLICE 112 CONTROL ROOM & PINK PATROL DISPATCH</span>
              <span className="text-[11px] bg-red-500/20 px-2 py-0.5 rounded border border-red-500/40">LIVE 112 QUEUE</span>
            </div>

            <div className="w-full">
              <AuthorityDashboard
                activeAlerts={activeAlerts}
                onUpdateAlertStatus={handleUpdateAlertStatus}
              />
            </div>
          </div>
        )}

      </main>

      {/* Inline Simulation Bar */}
      <SimulationBar
        onSimulateBusDeviation={() => handleSimulateBusDeviation('cab-shared-942')}
        onSimulateCabStop={() => handleSimulateCabStop('cab-shared-942')}
        onSimulateBlackout={handleSimulateBlackout}
        onTriggerWearableSOS={handleTriggerWearableSOS}
        isBlackoutActive={isBlackoutSimulated}
      />

      {/* Discreet Emergency SOS Confirmation Modal */}
      <DiscreetSOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
        onAlertDispatched={handleAlertDispatched}
        activeVehicle={vehicles.find((v) => v.id === selectedVehicleId)}
      />

      {/* Stealth Duress Calculator Cover */}
      <StealthCalculator
        isOpen={isStealthCalculatorOpen}
        onClose={() => setIsStealthCalculatorOpen(false)}
        onSecretSOSTrigger={handleTriggerWearableSOS}
      />
    </div>
  );
}
