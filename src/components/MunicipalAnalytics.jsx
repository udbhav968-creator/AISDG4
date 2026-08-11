import React from 'react';
import { Building2, BarChart2, AlertTriangle, Lightbulb, MapPin, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function MunicipalAnalytics() {
  const chartData = [
    { zone: 'Janpath Circle', lighting: 94, incidents: 0, booths: 4 },
    { zone: 'Patel Chowk', lighting: 88, incidents: 1, booths: 2 },
    { zone: 'AIIMS Flyover', lighting: 92, incidents: 0, booths: 3 },
    { zone: 'Industrial Rear', lighting: 28, incidents: 4, booths: 0 },
    { zone: 'South Ext Part 2', lighting: 82, incidents: 1, booths: 2 },
    { zone: 'Hauz Khas Safe', lighting: 96, incidents: 0, booths: 5 }
  ];

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-purple-500/10 text-purple-400">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Municipal City Safety Analytics</h3>
            <p className="text-[10px] text-zinc-400">Urban planning & streetlight blackout cluster analysis</p>
          </div>
        </div>

        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-extrabold rounded-full">
          ADMIN VIEW
        </span>
      </div>

      {/* Lighting Quality Chart */}
      <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-300 font-semibold">
          <span>Streetlight Grid Quality by Zone (%)</span>
          <span className="text-[10px] text-amber-400 font-mono">1 BLACKOUT CLUSTER FLAGGED</span>
        </div>

        <div className="h-40 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="zone" tick={{ fill: '#a1a1aa', fontSize: 10 }} />
              <YAxis tick={{ fill: '#a1a1aa', fontSize: 10 }} domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.75rem', fontSize: '12px' }}
                itemStyle={{ color: '#ec4899' }}
              />
              <Bar dataKey="lighting" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.lighting < 50 ? '#ef4444' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Urban Recommendations Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 bg-zinc-950 border border-zinc-850 rounded-xl">
          <span className="text-[10px] text-red-400 font-bold block">PRIORITY REPAIR</span>
          <span className="font-bold text-white mt-0.5 block">Industrial Rear Alley</span>
          <span className="text-[10px] text-zinc-400 block mt-0.5">Lighting: 28% • 4 Incidents</span>
        </div>

        <div className="p-2.5 bg-zinc-950 border border-zinc-850 rounded-xl">
          <span className="text-[10px] text-emerald-400 font-bold block">RECOMMENDED PINK BOOTH</span>
          <span className="font-bold text-white mt-0.5 block">Patel Chowk Junction</span>
          <span className="text-[10px] text-zinc-400 block mt-0.5">Crowd: Medium • 2 Booths</span>
        </div>
      </div>
    </div>
  );
}
