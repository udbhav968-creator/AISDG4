import React, { useState } from 'react';
import { Shield, Bus, Navigation, Radar, ShieldAlert, Calculator, UserCheck, Menu, X, Activity, Cpu, Sparkles } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: 'Ananya Verma', email: 'ananya@example.com' });

  const tabs = [
    { id: 'transit', num: '1', label: 'Page 1: Map & Transit', icon: Bus, color: 'text-cyan-400', activeClass: 'bg-cyan-600 text-white shadow-cyan-600/30' },
    { id: 'routes', num: '2', label: 'Page 2: Safe-Routes', icon: Navigation, color: 'text-emerald-400', activeClass: 'bg-emerald-600 text-white shadow-emerald-600/30' },
    { id: 'suite50', num: '3', label: 'Page 3: 50 AI Models', icon: Cpu, color: 'text-pink-400', activeClass: 'bg-pink-600 text-white shadow-pink-600/30' },
    { id: 'advanced', num: '4', label: 'Page 4: AI Voice & Vault', icon: Sparkles, color: 'text-purple-400', activeClass: 'bg-purple-600 text-white shadow-purple-600/30' },
    { id: 'safehavens', num: '5', label: 'Page 5: Safe Havens', icon: Radar, color: 'text-amber-400', activeClass: 'bg-amber-600 text-white shadow-amber-600/30' },
    { id: 'authority', num: '6', label: 'Page 6: Police 112', icon: ShieldAlert, color: 'text-red-400', activeClass: 'bg-red-600 text-white shadow-red-600/30', badge: activeAlertCount }
  ];

  return (
    <>
      {/* Top Multi-Color System Ticker */}
      <div className="bg-zinc-950 border-b border-zinc-850 px-4 py-1.5 text-[11px] font-mono text-zinc-400 flex items-center justify-between overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            6 STANDALONE PAGES ONLINE
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-cyan-300 flex items-center gap-1">
            <Activity className="w-3 h-3 text-cyan-400" />
            Front Page GIS Map Mounted
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-pink-400 font-bold">Zero-Overlapping CSS Grid</span>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="text-purple-300 flex items-center gap-1 font-semibold">
            <Cpu className="w-3 h-3 text-purple-400" />
            Google Gemini 1.5 & Claude 3.5 Active
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-amber-300 font-bold">99.98% Uptime</span>
        </div>
      </div>

      {/* Main Multi-Page Header Navbar */}
      <header className="sticky top-0 z-40 glass-nav">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-2">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative p-2 bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-pink-600/30">
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
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 text-pink-300 border border-pink-500/30 rounded-full">
                  ULTRA PRO AI
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden xl:block">
                Real-Time Public Transport Safety & Dynamic Safe-Route System
              </p>
            </div>
          </div>

          {/* Navigation Tabs - Always Visible & Clickable */}
          <nav className="flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-800 text-xs overflow-x-auto max-w-full scrollbar-none">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setActiveTab(t.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? `${t.activeClass} shadow-lg scale-[1.02]`
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/80'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full font-mono text-[10px] font-bold flex items-center justify-center ${
                    isActive ? 'bg-white/20 text-white' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {t.num}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : t.color}`} />
                  <span>{t.label}</span>
                  {t.badge > 0 && (
                    <span className="px-1.5 py-0.2 bg-red-500 text-white font-extrabold text-[9px] rounded-full animate-bounce">
                      {t.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Auth, Stealth Duress, SOS */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-emerald-500/50 rounded-xl text-xs font-semibold text-zinc-200 flex items-center gap-1.5 transition cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">{user ? user.name : 'Sign In'}</span>
            </button>

            <button
              onClick={onToggleStealth}
              className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/50 rounded-xl text-zinc-300 hover:text-white transition cursor-pointer"
              title="Stealth Duress Calculator Mode"
            >
              <Calculator className="w-4 h-4 text-purple-400" />
            </button>

            <button
              onClick={onTriggerSOS}
              className="btn-vibrant-pink px-4 py-2 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 shadow-lg shadow-pink-600/30 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 text-white" />
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
