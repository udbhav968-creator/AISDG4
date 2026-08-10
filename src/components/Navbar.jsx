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
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onTriggerSOS, 
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
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'transit'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Bus className="w-4 h-4" />
            <span>Transit Safety (PS-B06)</span>
          </button>

          <button
            onClick={() => setActiveTab('routes')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'routes'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>Night Safe-Routes (PS-B07)</span>
          </button>

          <button
            onClick={() => setActiveTab('safehavens')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'safehavens'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Safe Havens Radar</span>
          </button>

          <button
            onClick={() => setActiveTab('authority')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all relative ${
              activeTab === 'authority'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
          >
            <Siren className="w-4 h-4 text-purple-400" />
            <span>Control Dashboard</span>
            {activeAlertCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-red-500 text-white rounded-full animate-bounce">
                {activeAlertCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Status Badges & Emergency Trigger */}
        <div className="flex items-center gap-3">
          {/* Wearable Connection Status Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs">
            <Watch className={`w-3.5 h-3.5 ${wearableConnected ? 'text-emerald-400 animate-pulse' : 'text-zinc-500'}`} />
            <span className="text-zinc-300">
              {wearableConnected ? 'Smartwatch Active' : 'Wearable Offline'}
            </span>
          </div>

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

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex items-center justify-between mt-3 pt-2 border-t border-zinc-800/60 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('transit')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'transit' ? 'bg-pink-600 text-white' : 'text-zinc-400 bg-zinc-900'
          }`}
        >
          <Bus className="w-3.5 h-3.5" /> Transit Safety
        </button>
        <button
          onClick={() => setActiveTab('routes')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'routes' ? 'bg-pink-600 text-white' : 'text-zinc-400 bg-zinc-900'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" /> Night Routes
        </button>
        <button
          onClick={() => setActiveTab('safehavens')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'safehavens' ? 'bg-pink-600 text-white' : 'text-zinc-400 bg-zinc-900'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" /> Safe Radar
        </button>
        <button
          onClick={() => setActiveTab('authority')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap ${
            activeTab === 'authority' ? 'bg-purple-600 text-white' : 'text-zinc-400 bg-zinc-900'
          }`}
        >
          <Siren className="w-3.5 h-3.5" /> Control Room
        </button>
      </div>
    </header>
  );
}
