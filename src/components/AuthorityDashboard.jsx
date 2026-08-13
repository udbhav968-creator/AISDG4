import React from 'react';
import { ShieldAlert, PhoneCall, CheckCircle2, Clock, MapPin, Radio, AlertTriangle, UserCheck, Video } from 'lucide-react';

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
      unitAssigned: 'Pink Patrol Mobile Unit #12 (ETA 3 mins 20s)'
    }
  ];

  return (
    <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-zinc-800 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/30 shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white tracking-wide leading-tight">
              Police 112 Control Room
            </h2>
            <p className="text-xs text-zinc-400">Live SOS Queue & Pink Patrol Dispatch</p>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-red-500/20 text-red-300 font-extrabold text-xs rounded-full border border-red-500/30 flex items-center gap-1 shrink-0">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
          112 DISPATCH
        </span>
      </div>

      {/* Alert Feed List - Clean Vertical Stack to Prevent Overlapping */}
      <div className="space-y-4">
        {defaultAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 hover-blister space-y-3.5"
          >
            {/* Row 1: Alert ID, Time & Status Pill */}
            <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-zinc-800/80">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-red-600 text-white font-mono font-extrabold text-xs rounded-md shadow">
                  {alert.id}
                </span>
                <span className="text-xs text-zinc-400 font-mono">{alert.time}</span>
              </div>

              <span className={`px-2.5 py-1 font-extrabold text-[11px] rounded-full uppercase tracking-wider ${
                alert.status === 'RESOLVED'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
              }`}>
                {alert.status === 'RESOLVED' ? 'RESOLVED' : 'POLICE DISPATCHED'}
              </span>
            </div>

            {/* Row 2: Commuter & Vehicle Details */}
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-white">{alert.user}</h3>
              <p className="text-xs text-pink-400 font-mono font-semibold">{alert.vehicle}</p>
              <p className="text-xs text-zinc-300 flex items-center gap-1 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>{alert.addressName}</span>
              </p>
            </div>

            {/* Row 3: Ambient Speech Transcript */}
            {alert.transcript && (
              <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                <span className="text-[10px] text-pink-400 font-bold tracking-wider block uppercase">
                  🎙️ AMBIENT SPEECH TRANSCRIPT:
                </span>
                <p className="text-zinc-200 italic font-mono text-xs leading-relaxed">
                  "{alert.transcript}"
                </p>
              </div>
            )}

            {/* Row 4: Patrol Assignment & Actions */}
            <div className="pt-2 border-t border-zinc-800 space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                <div className="flex items-center gap-2 text-zinc-200 font-semibold">
                  <Radio className="w-4 h-4 text-pink-400 animate-pulse shrink-0" />
                  <span>{alert.unitAssigned}</span>
                </div>

                {alert.status !== 'RESOLVED' && onUpdateAlertStatus && (
                  <button
                    onClick={() => onUpdateAlertStatus(alert.id, 'RESOLVED')}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow transition flex items-center gap-1.5 shrink-0 active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark Resolved</span>
                  </button>
                )}
              </div>

              {/* Row 5: Incident Escalation Timeline */}
              <div className="pt-1">
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block mb-1.5">
                  INCIDENT ESCALATION TIMELINE:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] font-bold text-center">
                  <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    1. SOS Triggered
                  </div>
                  <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    2. 112 Alerted
                  </div>
                  <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 animate-pulse">
                    3. Patrol En-Route
                  </div>
                  <div className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400 border border-zinc-700">
                    4. Safe Resolution
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
