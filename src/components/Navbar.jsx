import React from 'react';
import { 
  ShieldAlert, 
  Navigation, 
  Bus, 
  Radio, 
  MapPin, 
  Watch, 
  Activity,
  AlertTriangle,
  Siren,
  Sparkles,
  Eye,
  FileText,
  Mic
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onTriggerSOS, 
  onToggleStealth,
  activeAlertCount, 
  wearableConnected 
}) {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('transit')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-500 text-white shadow-lg shadow-pink-500/20">
            <ShieldAlert className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-zinc-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white font-outfit">SurakshaOne</h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/30 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> AI Safety
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">Public Transport & Dynamic Safe-Route System</p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden md:flex items-center p-1 bg-zinc-900/80 border border-zinc-800 rounded-xl">
          <button
            onClick={() => setActiveTab('transit')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'transit'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            <span>Transit Safety</span>
          </button>

          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'routes'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Night Routes</span>
          </button>

          <button
            onClick={() => setActiveTab('advanced')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'advanced'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Mic className="w-3.5 h-3.5 text-purple-400" />
            <span>AI Voice & Vault</span>
          </button>

          <button
            onClick={() => setActiveTab('safehavens')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'safehavens'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Safe Havens</span>
          </button>

          <button
            onClick={() => setActiveTab('authority')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all relative ${
              activeTab === 'authority'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Siren className="w-3.5 h-3.5 text-red-400" />
            <span>Control Room</span>
            {activeAlertCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-red-500 text-white rounded-full animate-bounce">
                {activeAlertCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Status Badges & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Stealth Calculator Cover Mode Button */}
          <button
            onClick={onToggleStealth}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold rounded-xl"
            title="Toggle Calculator Duress Cover Mode"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Stealth Cover</span>
          </button>

          {/* Discreet Emergency SOS Button */}
          <button
            onClick={onTriggerSOS}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white text-xs font-extrabold shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-105 active:scale-95 transition-all animate-pulse"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>DISCREET SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
