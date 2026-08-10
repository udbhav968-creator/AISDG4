import React, { useState } from 'react';
import { Camera, ThumbsUp, MapPin, AlertTriangle, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function CommunitySafetyAudit() {
  const [reports, setReports] = useState([
    { id: 'r1', title: 'Streetlight Outage on Janpath Rear Lane', votes: 14, location: 'Janpath Lane #2', time: '1 hour ago', category: 'Lighting' },
    { id: 'r2', title: 'Pink Police Booth Active & Guarded', votes: 28, location: 'Connaught Place Circle', time: '20 mins ago', category: 'Police' }
  ]);
  const [newTitle, setNewTitle] = useState('');

  const handleAddReport = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    setReports(prev => [
      { id: `r-${Date.now()}`, title: newTitle, votes: 1, location: 'Current GPS Location', time: 'Just now', category: 'Commuter Audit' },
      ...prev
    ]);
    setNewTitle('');
  };

  const handleVote = (id) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, votes: r.votes + 1 } : r));
  };

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Crowdsourced Community Safety Audits</h3>
            <p className="text-[11px] text-zinc-400">Live commuter lighting ratings & hazard verification</p>
          </div>
        </div>
      </div>

      {/* Add Report Form */}
      <form onSubmit={handleAddReport} className="flex gap-2">
        <input
          type="text"
          placeholder="Report lighting fault, unlit alley, or police presence..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-pink-500"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs rounded-xl flex items-center gap-1"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report</span>
        </button>
      </form>

      {/* Reports Feed */}
      <div className="space-y-2">
        {reports.map((r) => (
          <div key={r.id} className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-white block">{r.title}</span>
              <span className="text-[10px] text-zinc-400">{r.location} • {r.time}</span>
            </div>
            <button
              onClick={() => handleVote(r.id)}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-emerald-400 text-xs font-bold rounded-lg border border-zinc-700 flex items-center gap-1"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{r.votes}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
