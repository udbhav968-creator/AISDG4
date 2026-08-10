import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Navigation, 
  Clock, 
  Search, 
  Building2, 
  PlusCircle, 
  UserCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function SafeHavenRadar({ safeHavens = [], onNavigateToHaven }) {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHavens = safeHavens.filter((sh) => {
    const matchesFilter = filter === 'all' || sh.category === filter;
    const matchesSearch = sh.name.toLowerCase().includes(searchQuery.toLowerCase()) || sh.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-pink-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white font-outfit">Nearest Safe-Location Radar</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/40 rounded-full">
              24/7 SANCTUARY NET
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Verified Pink Police Booths, 24/7 open pharmacies, hospitals, and police patrol points within immediate walking distance.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search safe spots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-pink-500"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
            filter === 'all' ? 'bg-pink-600 text-white border-pink-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
          }`}
        >
          All Safe Sanctuaries
        </button>

        <button
          onClick={() => setFilter('police')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
            filter === 'police' ? 'bg-purple-600 text-white border-purple-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
          }`}
        >
          🚔 Pink Booths & Police
        </button>

        <button
          onClick={() => setFilter('medical')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
            filter === 'medical' ? 'bg-blue-600 text-white border-blue-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
          }`}
        >
          🏥 24/7 Hospitals
        </button>

        <button
          onClick={() => setFilter('safe_zone')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
            filter === 'safe_zone' ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
          }`}
        >
          🏪 Open Stores & Cafes
        </button>
      </div>

      {/* Grid of Safe Sanctuary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHavens.map((sh) => (
          <div
            key={sh.id}
            className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 text-[10px] font-extrabold rounded-full border ${
                  sh.category === 'police' ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' :
                  sh.category === 'medical' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                  'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {sh.type}
                </span>

                <span className="text-xs font-extrabold text-pink-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {sh.distance}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-2">{sh.name}</h3>
              <p className="text-xs text-zinc-400 mt-0.5">{sh.address}</p>

              {/* Feature Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {sh.features.map((feat, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-[10px] text-zinc-300">
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Action Footer */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
              <a
                href={`tel:${sh.contact.split('/')[0].trim()}`}
                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Helpline</span>
              </a>

              <button
                onClick={() => onNavigateToHaven(sh.coordinates)}
                className="flex items-center gap-1.5 px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-xl shadow-md shadow-pink-600/20"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Guide Me Here</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
