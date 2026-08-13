import React, { useState } from 'react';
import { Radar, Shield, Hospital, Building2, MapPin, Navigation, Phone, CheckCircle2 } from 'lucide-react';

export default function SafeHavenRadar({ safeHavens = [], onNavigateToHaven }) {
  const [filter, setFilter] = useState('ALL');

  const filteredHavens = safeHavens.filter((sh) => {
    if (filter === 'POLICE') return sh.type === 'POLICE_BOOTH';
    if (filter === 'HOSPITAL') return sh.type === 'HOSPITAL';
    if (filter === 'SANCTUARY') return sh.type === 'COMMERCIAL_SANCTUARY';
    return true;
  });

  return (
    <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-zinc-800 space-y-4 w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 gap-2 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-amber-400 rounded-xl border border-amber-500/30 shrink-0">
            <Radar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-wide leading-tight">
              24/7 Safe Haven Radar
            </h2>
            <p className="text-xs text-zinc-400">Pink Police Booths, Hospitals & Commercial Sanctuaries</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-[11px]">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              filter === 'ALL' ? 'bg-amber-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('POLICE')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              filter === 'POLICE' ? 'bg-pink-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Pink Booths
          </button>
          <button
            onClick={() => setFilter('HOSPITAL')}
            className={`px-2.5 py-1 rounded-lg font-bold transition ${
              filter === 'HOSPITAL' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Hospitals
          </button>
        </div>
      </div>

      {/* Safe Haven Cards List - Single Column Stack */}
      <div className="flex flex-col space-y-3 w-full">
        {filteredHavens.map((sh) => {
          const isPolice = sh.type === 'POLICE_BOOTH';
          const isHospital = sh.type === 'HOSPITAL';

          return (
            <div
              key={sh.id}
              className="w-full p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover-blister space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-white">{sh.name}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md uppercase tracking-wider ${
                      isPolice
                        ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                        : isHospital
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {sh.type.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{sh.address}</span>
                  </p>
                </div>

                <span className="text-xs font-black text-amber-400 font-mono shrink-0">
                  {sh.distance}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs gap-2 flex-wrap">
                <span className="text-zinc-400 font-mono flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{sh.contact}</span>
                </span>

                <button
                  onClick={() => onNavigateToHaven(sh.location)}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center gap-1.5 active:scale-95 shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Dash Route</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
