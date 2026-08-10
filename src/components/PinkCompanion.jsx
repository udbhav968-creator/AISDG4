import React, { useState } from 'react';
import { Users, ShieldCheck, MapPin, CheckCircle2, UserPlus, Sparkles } from 'lucide-react';

export default function PinkCompanion() {
  const [buddies, setBuddies] = useState([
    { id: 'b1', name: 'Dr. Ritu Verma', route: 'CP → AIIMS → Hauz Khas', distance: '120 m away', status: 'Travelling Bus #512', verified: true },
    { id: 'b2', name: 'Neha Kapoor', route: 'Patel Chowk → Green Park', distance: '300 m away', status: 'Walking main avenue', verified: true },
    { id: 'b3', name: 'Simran Gill', route: 'Rajiv Chowk Metro Line', distance: '450 m away', status: 'Metro Coach #3', verified: true }
  ]);
  const [joinedSquad, setJoinedSquad] = useState(false);

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Pink Companion "Safe Buddy" Network</h3>
            <p className="text-[11px] text-zinc-400">Verified female co-travelers on matching night corridors</p>
          </div>
        </div>

        <button
          onClick={() => setJoinedSquad(!joinedSquad)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            joinedSquad
              ? 'bg-purple-600 text-white border-purple-500 shadow-md'
              : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
          }`}
        >
          {joinedSquad ? 'Squad Connected' : 'Join Travel Squad'}
        </button>
      </div>

      {joinedSquad && (
        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
            Active Escort Squad: 3 Co-Travelers Synchronized
          </span>
          <span className="text-[10px] text-purple-300 bg-purple-900/60 px-2 py-0.5 rounded">GEOFENCE SYNC</span>
        </div>
      )}

      <div className="space-y-2">
        {buddies.map((b) => (
          <div key={b.id} className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white">{b.name}</span>
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[9px] font-extrabold rounded">
                  VERIFIED ID
                </span>
              </div>
              <p className="text-zinc-400 mt-0.5">{b.route}</p>
              <span className="text-[10px] text-pink-400 font-semibold">{b.status} • {b.distance}</span>
            </div>

            <button className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-lg border border-zinc-700 flex items-center gap-1">
              <UserPlus className="w-3.5 h-3.5 text-purple-400" />
              <span>Match</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
