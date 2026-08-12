import React, { useState } from 'react';
import { Shield, Bus, Navigation, Radar, Radio, ShieldAlert, Calculator, UserCheck, Activity, Cpu } from 'lucide-react';
import AuthModal from './AuthModal';

export default function Navbar({
  activeTab,
  setActiveTab,
  onTriggerSOS,
  onToggleStealth,
  activeAlertCount,
  wearableConnected
}) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Ananya Verma', email: 'ananya@example.com' });

  return (
    <>
      {/* Top Ultra-Pro Status Bar */}
      <div className="bg-zinc-950 border-b border-zinc-850 px-4 py-1 text-[11px] font-mono text-zinc-400 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            SYSTEM ONLINE
          </span>
          <span>|</span>
          <span className="text-zinc-300">⚡ 12ms Edge Latency</span>
          <span>|</span>
          <span className="text-pink-400 font-bold">5G WebRTC Mesh Active</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-purple-400 font-bold">Google Gemini 1.5 & Claude 3.5 AI Engaged</span>
          <span>|</span>
          <span className="text-zinc-400">99.98% Uptime</span>
        </div>
      </div>

      {/* Main Glass Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-gradient-to-tr from-pink-600 to-rose-500 rounded-xl shadow-lg shadow-pink-600/30">
              <Shield className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg text-white tracking-wide">
                  Suraksha<span className="text-pink-500">One</span>
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-full">
                  ULTRA PRO AI
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                Real-Time Public Transport Safety & Dynamic Safe-Route System (PS-B06 & PS-B07)
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800 text-xs">
            <button
              onClick={() => setActiveTab('transit')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'transit' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Bus className="w-3.5 h-3.5" />
              <span>PS-B06 Transit Tracker</span>
            </button>

            <button
              onClick={() => setActiveTab('routes')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'routes' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>PS-B07 Night Safe-Routes</span>
            </button>

            <button
              onClick={() => setActiveTab('advanced')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'advanced' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>AI Voice & Vault</span>
            </button>

            <button
              onClick={() => setActiveTab('safehavens')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'safehavens' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Radar className="w-3.5 h-3.5" />
              <span>Safe Havens</span>
            </button>

            <button
              onClick={() => setActiveTab('authority')}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition relative ${
                activeTab === 'authority' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Police 112 PCR</span>
              {activeAlertCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-red-500 text-white font-extrabold text-[9px] rounded-full">
                  {activeAlertCount}
                </span>
              )}
            </button>
          </nav>

          {/* Action Buttons: Auth, Stealth Duress, Wearable Status, Emergency SOS */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-200 flex items-center gap-1.5"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{user ? user.name : 'Sign In'}</span>
            </button>

            <button
              onClick={onToggleStealth}
              className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-zinc-300 hover:text-white transition"
              title="Stealth Duress Calculator Mode"
            >
              <Calculator className="w-4 h-4" />
            </button>

            <button
              onClick={onTriggerSOS}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2 transition animate-pulse"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>DISCREET SOS</span>
            </button>
          </div>

        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />
    </>
  );
}
