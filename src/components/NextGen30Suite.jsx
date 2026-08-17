import React, { useState } from 'react';
import { 
  Zap, Navigation, ShieldCheck, Cpu, Radio, Video, Lock, Heart, 
  Activity, Eye, Sun, FileText, Globe, Server, CheckCircle2, AlertTriangle
} from 'lucide-react';

const NEXT_GEN_INNOVATIONS = [
  // 1. Autonomous Aerial Response & Robotics
  { id: 1, title: 'Autonomous Drone Spotlight & Escort', category: 'Aerial & Robotics', icon: Navigation, desc: 'Dispatches 10,000-lumen aerial safety drones to hover over emergency SOS coordinates within 60s.', status: 'ONLINE', tech: 'MAVLink, PX4 Autopilot' },
  { id: 2, title: 'FLIR Thermal Infrared Video Streaming', category: 'Aerial & Robotics', icon: Video, desc: 'Streams real-time thermal IR camera feeds to detect individuals hidden in unlit alleys.', status: 'ONLINE', tech: 'WebRTC, OpenCV, FLIR' },
  { id: 3, title: 'Autonomous Ground Patrol Rover Dispatch', category: 'Aerial & Robotics', icon: Cpu, desc: 'Commands wheeled robotic security rovers to navigate to high-risk transit stops.', status: 'ONLINE', tech: 'ROS2, LiDAR' },
  { id: 4, title: 'Smart Safe Haven Robotic Door Locks', category: 'Aerial & Robotics', icon: Lock, desc: 'Unlocks high-security doors at 24/7 Pink Police Booths when an active SOS commuter approaches within 10m.', status: 'ONLINE', tech: 'ESP32, BLE Proximity' },
  { id: 5, title: 'Low-Altitude Airspace Geo-Fencing', category: 'Aerial & Robotics', icon: Radio, desc: 'Dynamically reserves 3D aerial corridors for emergency drones, preventing urban collisions.', status: 'ONLINE', tech: 'CesiumJS, GeoJSON 3D' },

  // 2. Biometric Edge Computing & Wearable Neural Sensors
  { id: 6, title: 'Galvanic Skin Response (GSR) Stress Trigger', category: 'Biometrics & Neural', icon: Activity, desc: 'Monitors skin conductance via smart rings to detect sudden physiological shock or fear.', status: 'ONLINE', tech: 'Nordic nRF52840, BLE 5.3' },
  { id: 7, title: 'PPG Heart Rate Tachycardia Classifier', category: 'Biometrics & Neural', icon: Heart, desc: 'Detects sudden adrenaline spikes (>150 BPM) paired with sudden physical immobility.', status: 'ONLINE', tech: 'TensorFlow Lite Edge Micro' },
  { id: 8, title: 'Secret Wrist Gesture Recognition', category: 'Biometrics & Neural', icon: Zap, desc: 'Detects covert 3-tap wrist rotational gestures to trigger silent emergency dispatch.', status: 'ONLINE', tech: 'TinyML, Accelerometer 6-Axis' },
  { id: 9, title: 'EEG Brainwave Panic Threshold Monitor', category: 'Biometrics & Neural', icon: Eye, desc: 'Integrates with neuro-wearable headbands to trigger help upon acute neurological panic patterns.', status: 'ONLINE', tech: 'MindWave SDK, Python MNE' },
  { id: 10, title: 'Tactile Haptic Navigation Feedback', category: 'Biometrics & Neural', icon: ShieldCheck, desc: 'Guides solo commuters through safe routes using subtle wristband vibrations without screen checking.', status: 'ONLINE', tech: 'CoreHaptics, WebVibration API' },

  // 3. Municipal Infrastructure & Smart City Digital Twin
  { id: 11, title: 'Adaptive Streetlight Illumination Booster', category: 'Smart City Twin', icon: Sun, desc: 'Commands municipal LED lamps to boost from 20% to 100% brightness when commuters walk unlit routes.', status: 'ONLINE', tech: 'MQTT, Smart Grid API' },
  { id: 12, title: 'CCTV Edge Privacy Video Anonymization', category: 'Smart City Twin', icon: Eye, desc: 'Automatically blurs non-threat commuter faces in live public feeds while preserving crime bounding boxes.', status: 'ONLINE', tech: 'DeepStream, YOLOv8-Face' },
  { id: 13, title: '3D Digital Twin City Heatmap', category: 'Smart City Twin', icon: Globe, desc: 'Renders a real-time 3D spatial mesh of urban transit corridors showing lighting & police proximity.', status: 'ONLINE', tech: 'Three.js, WebGL 2.0' },
  { id: 14, title: 'EV Charging Sanctuary Network', category: 'Smart City Twin', icon: Server, desc: 'Integrates 24/7 lit electric vehicle charging hubs into the Safe Haven network across NCR.', status: 'ONLINE', tech: 'OCPP 2.0.1, REST API' },
  { id: 15, title: 'Emergency Signal Priority Corridor (Green Wave)', category: 'Smart City Twin', icon: Radio, desc: 'Flips traffic signals to green for active Pink Police Patrol units responding to 112 calls.', status: 'ONLINE', tech: 'NTCIP 1202, SUMO Traffic' },

  // 4. Legal, Evidence & Blockchain Integrity
  { id: 16, title: 'Zero-Knowledge Proof (ZKP) Identity Shield', category: 'Legal & Blockchain', icon: Lock, desc: 'Verifies user identity to law enforcement without exposing sensitive personal details publicly.', status: 'ONLINE', tech: 'Circom, SnarkJS, ZK-SNARKs' },
  { id: 17, title: 'IPFS Immutable Chain-of-Custody Vault', category: 'Legal & Blockchain', icon: FileText, desc: 'Decentralizes audio, video, and GPS evidence storage across IPFS nodes to guarantee court tamper-proofing.', status: 'ONLINE', tech: 'IPFS, Web3.Storage, SHA-256' },
  { id: 18, title: 'AI Legal Counsel & Auto-FIR Generator', category: 'Legal & Blockchain', icon: FileText, desc: 'Drafts structured legal Zero-FIR incident reports formatted for state police dispatch within seconds.', status: 'ONLINE', tech: 'LangChain, Llama-3-70B' },
  { id: 19, title: 'Automated Emergency Micro-Insurance', category: 'Legal & Blockchain', icon: ShieldCheck, desc: 'Triggers instant micro-insurance claims & medical transport coverage upon verified 112 dispatch.', status: 'ONLINE', tech: 'Smart Contracts, Solidity' },
  { id: 20, title: 'Blackbox Audio Telemetry Crypt-Logger', category: 'Legal & Blockchain', icon: Lock, desc: 'Continuously logs encrypted 30s audio buffers on local storage, overwriting securely unless SOS triggers.', status: 'ONLINE', tech: 'Web Crypto API, AES-GCM-256' },

  // 5. Global Enterprise & Offline Mesh Resilience
  { id: 21, title: 'Satellite Direct-to-Cell SOS Emergency Bridge', category: 'Global Mesh & Cloud', icon: Globe, desc: 'Relays emergency coordinates via Starlink/AST SpaceMobile satellite links when cell towers fail.', status: 'ONLINE', tech: 'Satellite NTN 3GPP Rel-17' },
  { id: 22, title: 'Peer-to-Peer Wi-Fi Direct SOS Mesh', category: 'Global Mesh & Cloud', icon: Radio, desc: 'Establishes ad-hoc Wi-Fi Direct mesh networks between nearby smartphones to relay SOS over 1km.', status: 'ONLINE', tech: 'Wi-Fi Direct, NSD' },
  { id: 23, title: 'WebAssembly Spatial Graph Engine', category: 'Global Mesh & Cloud', icon: Cpu, desc: 'Executes custom A* graph pathfinding in WebAssembly inside browser for zero-latency offline routes.', status: 'ONLINE', tech: 'C++ Wasm, Emscripten' },
  { id: 24, title: 'Federated Learning On-Device Privacy Training', category: 'Global Mesh & Cloud', icon: Server, desc: 'Trains threat models on user devices without sending private sensor logs or audio to central servers.', status: 'ONLINE', tech: 'PySyft, Federated Averaging' },
  { id: 25, title: 'Automated Multi-Cloud Failover & Chaos Mesh', category: 'Global Mesh & Cloud', icon: Server, desc: 'Simulates cloud region outages and network throttling to guarantee 99.999% uptime.', status: 'ONLINE', tech: 'Chaos Mesh, Kubernetes HPA' }
];

export default function NextGen30Suite() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeSimulation, setActiveSimulation] = useState(null);
  const [droneLog, setDroneLog] = useState(null);

  const categories = ['ALL', 'Aerial & Robotics', 'Biometrics & Neural', 'Smart City Twin', 'Legal & Blockchain', 'Global Mesh & Cloud'];

  const filteredInnovations = selectedCategory === 'ALL'
    ? NEXT_GEN_INNOVATIONS
    : NEXT_GEN_INNOVATIONS.filter(item => item.category === selectedCategory);

  const handleSimulateDrone = () => {
    setActiveSimulation('DRONE');
    setDroneLog('🚁 Drone Patrol Unit #04 Dispatched | Altitude: 45m | Target: [28.6105, 77.2185] | Spotlight: 10,000 Lumens ACTIVE');
  };

  const handleSimulateZKP = () => {
    setActiveSimulation('ZKP');
    setDroneLog('🔐 Zero-Knowledge Proof Generated: Hash 0x9f8a...3b21 | Identity: VERIFIED | Personal Data: PRIVACY PROTECTED');
  };

  const handleSimulateSatellite = () => {
    setActiveSimulation('SATELLITE');
    setDroneLog('📡 Starlink Satellite LEO Relay Connected | Packet Transmitted via 3GPP Rel-17 | Delay: 14ms');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 bg-zinc-950/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-lg border border-cyan-500/40">
                PHASE 3 ROADMAP
              </span>
              <span className="text-xs text-zinc-400 font-mono">25 Ultra-Pro Commercial Innovations</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SurakshaOne 3.0 Enterprise Architecture
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1">
              Autonomous drone escort, biometric neural sensors, ZKP identity verification, and Satellite LEO emergency relays for global commercial deployment.
            </p>
          </div>

          {/* Quick Simulation Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleSimulateDrone}
              className="px-3 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Simulate Drone Patrol</span>
            </button>
            <button
              onClick={handleSimulateZKP}
              className="px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Verify ZKP Identity</span>
            </button>
            <button
              onClick={handleSimulateSatellite}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Test Satellite Relay</span>
            </button>
          </div>
        </div>

        {/* Live Simulation Log Display */}
        {droneLog && (
          <div className="mt-4 p-3 bg-zinc-900/90 border border-cyan-500/40 rounded-xl text-xs font-mono text-cyan-300 flex items-center justify-between animate-fadeIn">
            <span>{droneLog}</span>
            <button onClick={() => setDroneLog(null)} className="text-zinc-500 hover:text-white text-[10px] underline">
              Dismiss
            </button>
          </div>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 25 Innovations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInnovations.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className="glass-panel p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded-lg group-hover:bg-cyan-500/20 group-hover:text-cyan-300 transition">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold rounded border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-0.5">
                    {item.category}
                  </div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition">
                    #{item.id}. {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 font-mono">Stack:</span>
                <span className="text-zinc-300 font-mono font-semibold">{item.tech}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
