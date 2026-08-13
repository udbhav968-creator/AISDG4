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
import AudioThreatSimulator from './components/AudioThreatSimulator';
import CrowdDensityHeatmapVisualizer from './components/CrowdDensityHeatmapVisualizer';

import { fetchTransitVehicles, fetchNightRoutes, fetchSafeHavens, triggerDiscreetSOS } from './services/api';
import { mockNightRoutes } from './data/mockRoutes';
import { mockTransitVehicles } from './data/mockTransitData';
import { mockSafeHavens, mockIncidents } from './data/mockSafeHavens';

export default function App() {
  const [activeTab, setActiveTab] = useState('transit'); // 'transit', 'routes', 'suite50', 'advanced', 'safehavens', 'authority'
  
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

  // --- REST API Initial Live Fetching --- //
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

  // --- Handlers & Simulators --- //

  // PS-B06 Simulator 1: Route Deviation
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

  // PS-B06 Simulator 2: Prolonged Stop
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

  // PS-B07 Simulator: Dynamic Streetlight Outage & Auto-Reroute
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans pb-48">
      {/* Top Multi-Page Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTriggerSOS={handleTriggerWearableSOS}
        onToggleStealth={() => setIsStealthCalculatorOpen(true)}
        activeAlertCount={activeAlerts.length}
        wearableConnected={wearableConnected}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        
        {/* Top Real-Time Telemetry Hero Banner */}
        <LiveStatsHero />

        {/* Responsive Grid - Clean non-overlapping column flow */}
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

          {/* Dedicated Control Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {activeTab === 'transit' && (
              <div className="space-y-6">
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
            )}

            {activeTab === 'routes' && (
              <RoutePlanner
                routes={routes}
                selectedRouteId={selectedRouteId}
                onSelectRoute={(id) => {
                  setSelectedRouteId(id);
                  const rt = routes.find((r) => r.id === id);
                  if (rt && rt.path.length > 0) setMapCenter(rt.path[0]);
                }}
                onSimulateReroute={handleSimulateBlackout}
                isBlackoutSimulated={isBlackoutSimulated}
              />
            )}

            {activeTab === 'suite50' && (
              <HiTech50Suite />
            )}

            {activeTab === 'advanced' && (
              <div className="space-y-6">
                <AudioThreatSimulator 
                  onTriggerSOS={handleTriggerWearableSOS}
                />
                <CrowdDensityHeatmapVisualizer />
                <AudioSpectrumVisualizer 
                  onAutoTriggerSOS={handleTriggerWearableSOS}
                />
                <SurakshaCopilot 
                  onNavigateToHaven={handleNavigateToHaven}
                  onSelectVehicle={setSelectedVehicleId}
                />
                <WhatsAppBotBridge 
                  activeVehicle={vehicles.find((v) => v.id === selectedVehicleId)}
                />
                <BLESmartRing 
                  onTriggerSOS={handleTriggerWearableSOS}
                />
                <VoiceDistressListener onAutoTriggerSOS={handleTriggerWearableSOS} />
                <MunicipalAnalytics />
                <PinkCompanion />
                <OfflineMeshRelay />
                <EvidenceVault />
                <CommunitySafetyAudit />
              </div>
            )}

            {activeTab === 'safehavens' && (
              <SafeHavenRadar
                safeHavens={safeHavens}
                onNavigateToHaven={handleNavigateToHaven}
              />
            )}

            {activeTab === 'authority' && (
              <AuthorityDashboard
                activeAlerts={activeAlerts}
                onUpdateAlertStatus={handleUpdateAlertStatus}
              />
            )}
          </div>

        </div>

      </main>

      {/* Floating Evaluator Simulation Bar */}
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
