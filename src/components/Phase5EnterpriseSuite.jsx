import React, { useState } from 'react';
import { 
  ShieldAlert, Lock, Radio, Cpu, Eye, Video, Globe, Zap, 
  Layers, CheckCircle2, Server, Heart, Sun, Activity, Navigation, Smartphone
} from 'lucide-react';

const PHASE5_ENTERPRISE_INNOVATIONS = [
  // 1. Quantum-Resistant Cryptography & Zero-Trust
  { id: 1, name: 'Post-Quantum Lattice Encryption (CRYSTALS-Kyber)', category: 'Quantum & Zero-Trust', icon: Lock, status: 'ONLINE', tech: 'LibOQS, Kyber-512, OpenSSL', desc: 'Encrypts all commuter SOS telemetry using quantum-resistant lattice cryptography to future-proof against quantum attacks.' },
  { id: 2, name: 'Zero-Trust Continuous Biometric Authentication', category: 'Quantum & Zero-Trust', icon: ShieldAlert, status: 'ONLINE', tech: 'FIDO2, WebAuthn, Gait Biometrics', desc: 'Continuously verifies commuter identity via background gait and behavioral biometrics without repeated logins.' },
  { id: 3, name: 'Homomorphic Encrypted Feature Evaluation', category: 'Quantum & Zero-Trust', icon: Cpu, status: 'ONLINE', tech: 'SEAL, Paillier Crypto', desc: 'Calculates route safety scores directly on encrypted feature vectors without decrypting sensitive telemetry.' },
  { id: 4, name: 'Hardware Security Module (HSM) Key Isolation', category: 'Quantum & Zero-Trust', icon: Server, status: 'ONLINE', tech: 'AWS CloudHSM, FIPS 140-2 Level 3', desc: 'Stores master emergency encryption keys inside hardware security modules for maximum key protection.' },
  { id: 5, name: 'Quantum-Stamped Audit Verification', category: 'Quantum & Zero-Trust', icon: CheckCircle2, status: 'ONLINE', tech: 'QRNG, Atomic Clock Protocol', desc: 'Timestamps emergency dispatches with atomic clock precision and quantum random numbers for legal validation.' },

  // 2. Smart Wearable & Spatial AR Infrastructure
  { id: 6, name: 'Augmented Reality (AR) Safe-Route Overlay', category: 'AR & Spatial Wearables', icon: Eye, status: 'ONLINE', tech: 'ARKit, ARCore, WebXR', desc: 'Projects illuminated green safe pathways and 3D Pink Police Booth markers directly onto smart glasses or phone camera.' },
  { id: 7, name: 'Apple Watch / WearOS ECG Panic Wave Monitor', category: 'AR & Spatial Wearables', icon: Heart, status: 'ONLINE', tech: 'HealthKit, WearOS Sensors', desc: 'Monitors 1-lead electrocardiogram (ECG) ST-segment shifts and pulse wave velocity for acute panic detection.' },
  { id: 8, name: 'Smart Clothing Conductive Fiber Drag Detector', category: 'AR & Spatial Wearables', icon: Zap, status: 'ONLINE', tech: 'Smart Textiles, BLE MCU', desc: 'Embedded conductive fibers in outerwear detect sudden force/tugging movements to trigger silent emergency alerts.' },
  { id: 9, name: 'Sub-Meter UWB Spatial Beacon Anchoring', category: 'AR & Spatial Wearables', icon: Navigation, status: 'ONLINE', tech: 'Decawave DWM1000, UWB', desc: 'Locates commuters inside complex multi-level underground shopping malls and parking garages with 10cm accuracy.' },
  { id: 10, name: 'Spatial Audio 3D Directional Alerting', category: 'AR & Spatial Wearables', icon: Radio, status: 'ONLINE', tech: 'WebAudio 3D Spatializer', desc: 'Plays 3D directional acoustic cues through commuter earbuds to guide them toward nearest safe havens in dark alleys.' },

  // 3. Municipal Smart City & Autonomous Vehicle Mesh
  { id: 11, name: 'Autonomous Robotaxi Fleet Hijack Override', category: 'Municipal Smart City', icon: Cpu, status: 'ONLINE', tech: 'V2X, ISO 26262, CAN-Bus', desc: 'Remotely overrides and safely halts compromised commercial ride-hailing vehicles during verified distress alerts.' },
  { id: 12, name: 'Smart City Drone Nest Automated Swarms', category: 'Municipal Smart City', icon: Navigation, status: 'ONLINE', tech: 'Skydio Dock API, MAVLink Swarm', desc: 'Deploys self-charging roof-top drone stations that launch automated drone swarms to flood emergency zones with light.' },
  { id: 13, name: 'Smart Bus Shelter Emergency Isolation Pods', category: 'Municipal Smart City', icon: ShieldAlert, status: 'ONLINE', tech: 'Modbus PLC, Magnetic Locks', desc: 'Activates bulletproof glass shutters and magnetic locks at smart bus stops to isolate commuters from external threats.' },
  { id: 14, name: 'Directional Siren Acoustic Amplifiers', category: 'Municipal Smart City', icon: Radio, status: 'ONLINE', tech: 'Phased Array Directional Audio', desc: 'Emits targeted 120 dB directional warning tones from municipal streetlight nodes to deter threats near active SOS locations.' },
  { id: 15, name: 'Municipal EV Charging Safe Haven Power Mesh', category: 'Municipal Smart City', icon: Sun, status: 'ONLINE', tech: 'OCPP 2.0.1, V2G Bi-Directional', desc: 'Utilizes vehicle-to-grid (V2G) EV chargers to maintain emergency lighting and communications during municipal power blackouts.' },

  // 4. Next-Gen Multimodal AI & Neural Copilot
  { id: 16, name: 'Vision-Language Multimodal Hazard Describer (VLM)', category: 'Multimodal Neural AI', icon: Video, status: 'ONLINE', tech: 'LLaVA-NeXT, WebGPU Inference', desc: 'Analyzes live camera streams in real-time to generate text descriptions of surrounding threats for 112 police dispatchers.' },
  { id: 17, name: 'Offline 1B Parameter On-Device Neural Safety LLM', category: 'Multimodal Neural AI', icon: Cpu, status: 'ONLINE', tech: 'WebLLM, MLC-LLM, WebGPU', desc: 'Runs a compressed 1-billion parameter safety AI model locally on mobile NPU chips for offline conversational guidance.' },
  { id: 18, name: 'Real-Time Multilingual Emergency Speech Translator', category: 'Multimodal Neural AI', icon: Activity, status: 'ONLINE', tech: 'Whisper Large V3, SeamlessM4T', desc: 'Translates regional emergency voice distress calls into official state police languages instantaneously.' },
  { id: 19, name: 'Spatial Graph Neural Network (GNN) Crime Predictor', category: 'Multimodal Neural AI', icon: Layers, status: 'ONLINE', tech: 'PyTorch Geometric, DGL', desc: 'Models city road networks as mathematical graphs to forecast spatial crime propagation 2 hours in advance.' },
  { id: 20, name: 'Reinforcement Learning (RL) Safe Pathfinder Agent', category: 'Multimodal Neural AI', icon: Navigation, status: 'ONLINE', tech: 'Ray RLlib, Q-Learning Agent', desc: 'Learns optimal night routing policies by balancing lighting, police proximity, road width, and live incident updates.' },

  // 5. Global Enterprise Disaster & Mass Transit Defense
  { id: 21, name: 'Mass Transit Stampede & Panic Density Alert', category: 'Global Mass Defense', icon: ShieldAlert, status: 'ONLINE', tech: 'OpenCV Motion Flow, Thermal Sensors', desc: 'Monitors crowd pressure at metro station stairwells to detect stampede risks and auto-divert commuter pedestrian traffic.' },
  { id: 22, name: 'Geo-Targeted Common Alerting Protocol (CAP) Broadcast', category: 'Global Mass Defense', icon: Smartphone, status: 'ONLINE', tech: 'OASIS CAP 1.2, Cell Broadcast API', desc: 'Sends targeted emergency cell broadcast notifications to all smartphones within a 500-meter radius during active threats.' },
  { id: 23, name: 'Cross-Border International Interpol & Diplomatic SOS', category: 'Global Mass Defense', icon: Globe, status: 'ONLINE', tech: 'Interpol API, Consular Gateway', desc: 'Automatically alerts diplomatic embassies and international law enforcement for foreign tourists traveling late at night.' },
  { id: 24, name: 'High-Altitude Stratospheric Balloon Mesh (HAPS)', category: 'Global Mass Defense', icon: Radio, status: 'ONLINE', tech: 'HAPS Telemetry, 5G NTN Satellite', desc: 'Maintains emergency communications coverage over entire metropolitan areas during total cellular infrastructure collapse.' },
  { id: 25, name: 'Autonomous Disaster & Riot Pathfinder', category: 'Global Mass Defense', icon: Navigation, status: 'ONLINE', tech: 'GTFS Realtime, Dynamic Dijkstra', desc: 'Reroutes public transit buses and commuters around active civil unrest or natural disaster zones in real time.' }
];

export default function Phase5EnterpriseSuite() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeLog, setActiveLog] = useState(null);

  const categories = ['ALL', 'Quantum & Zero-Trust', 'AR & Spatial Wearables', 'Municipal Smart City', 'Multimodal Neural AI', 'Global Mass Defense'];

  const filteredInnovations = selectedCategory === 'ALL'
    ? PHASE5_ENTERPRISE_INNOVATIONS
    : PHASE5_ENTERPRISE_INNOVATIONS.filter(item => item.category === selectedCategory);

  const handleSimulateKyber = () => {
    setActiveLog('🔑 Post-Quantum Kyber-512 Lattice Key Encrypted: Ciphertext [0x7a9f...3e21] | Security Level: QUANTUM-RESISTANT');
  };

  const handleSimulateAR = () => {
    setActiveLog('🕶️ AR Safe-Route Overlay Active: 3D Projection Mesh Rendered on WebXR | Target: Pink Police Booth #04');
  };

  const handleSimulateCAP = () => {
    setActiveLog('📱 OASIS CAP 1.2 Cell Broadcast Triggered: 1,420 Smartphones within 500m Radius Notified via Emergency Beacon');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 bg-zinc-950/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-lg border border-purple-500/40">
                PHASE 5 MASTER PLAN
              </span>
              <span className="text-xs text-zinc-400 font-mono">25 Quantum & Multimodal Innovations</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SurakshaOne 5.0 Global Enterprise Infrastructure
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1">
              Quantum-resistant Kyber lattice encryption, AR safe-route overlay, Multimodal VLM hazard description, and OASIS CAP cell broadcast relays.
            </p>
          </div>

          {/* Quick Simulation Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleSimulateKyber}
              className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Test Kyber-512 Encrypt</span>
            </button>
            <button
              onClick={handleSimulateAR}
              className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Launch AR Overlay</span>
            </button>
            <button
              onClick={handleSimulateCAP}
              className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>CAP Cell Broadcast</span>
            </button>
          </div>
        </div>

        {/* Live Simulation Console Log */}
        {activeLog && (
          <div className="mt-4 p-3 bg-zinc-900/90 border border-purple-500/40 rounded-xl text-xs font-mono text-purple-300 flex items-center justify-between animate-fadeIn">
            <span>{activeLog}</span>
            <button onClick={() => setActiveLog(null)} className="text-zinc-500 hover:text-white text-[10px] underline">
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
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-lg shadow-purple-500/10'
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
              className="glass-panel p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:border-purple-500/40 transition-all group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg group-hover:bg-purple-500/20 group-hover:text-purple-300 transition">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold rounded border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-purple-400 uppercase tracking-wider mb-0.5">
                    {item.category}
                  </div>
                  <h3 className="text-xs font-black text-white group-hover:text-purple-300 transition leading-snug">
                    #{item.id}. {item.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500 font-mono">Stack:</span>
                <span className="text-zinc-300 font-mono font-semibold truncate max-w-[170px]">{item.tech}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
