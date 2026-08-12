import React from 'react';
import { ShieldAlert, PhoneCall, CheckCircle2, Clock, MapPin, Radio, AlertTriangle } from 'lucide-react';

export default function AuthorityDashboard({ activeAlerts = [], onUpdateAlertStatus }) {
  const defaultAlerts = activeAlerts.length > 0 ? activeAlerts : [
    {
      id: 'SOS-9421',
      trigger: 'Smartwatch Wearable Panic Trigger',
      user: 'Ananya Verma (+91 98765-43210)',
      vehicle: 'Shared Cab #DL-3C-AZ-4921',
      location: [28.5910, 77.1960],
      addressName: 'Rear Railway Gate, Unlit Alley Segment #03',
      time: '21:42:10 (3 mins ago)',
      transcript: 'Cab DL-942 diverted off-route into unlit alley. Driver ignored route request.',
      status: 'POLICE_DISPATCHED',
      unitAssigned: 'Pink Patrol Mobile Unit #12 (ETA 4 mins)'
    }
  ];

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-500/10 text-red-400 rounded-xl">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-wide">
              Police & Authority 112 PCR Control Room
            </h2>
            <p className="text-xs text-zinc-400">Live Queue of Emergency SOS Alerts & Pink Patrol Dispatches</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 bg-red-500/20 text-red-300 font-extrabold text-xs rounded-full flex items-center gap-1 border border-red-500/30">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
            112 DISPATCH LINK
          </span>
        </div>
      </div>

      {/* Alert Feed List */}
      <div className="space-y-3">
        {defaultAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover-blister space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-red-600 text-white font-mono font-bold text-[10px] rounded">
                    {alert.id}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">{alert.time}</span>
                </div>
                <h3 className="font-extrabold text-sm text-white mt-1">{alert.user}</h3>
                <p className="text-xs text-zinc-300 font-mono">{alert.vehicle}</p>
                <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-pink-400 shrink-0" />
                  <span>{alert.addressName}</span>
                </p>
              </div>

              <span className={`px-2.5 py-1 font-extrabold text-[10px] rounded-full ${
                alert.status === 'RESOLVED'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {alert.status === 'RESOLVED' ? 'RESOLVED' : 'POLICE DISPATCHED'}
              </span>
            </div>

            {/* Ambient Speech Transcript */}
            {alert.transcript && (
              <div className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs">
                <span className="text-[10px] text-pink-400 font-bold block">AMBIENT SPEECH TRANSCRIPT:</span>
                <p className="text-zinc-300 italic font-mono text-[11px]">"{alert.transcript}"</p>
              </div>
            )}

            {/* Assigned Unit & Action Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-xs">
              <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                <Radio className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                <span>{alert.unitAssigned}</span>
              </div>

              {alert.status !== 'RESOLVED' && onUpdateAlertStatus && (
                <button
                  onClick={() => onUpdateAlertStatus(alert.id, 'RESOLVED')}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg shadow transition flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Resolved</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
