import React, { useState } from 'react';
import { 
  Siren, 
  Radio, 
  MapPin, 
  PhoneCall, 
  ShieldAlert, 
  Video, 
  Mic, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Send,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export default function AuthorityDashboard({ activeAlerts = [], onUpdateAlertStatus }) {
  const [selectedAlertId, setSelectedAlertId] = useState(activeAlerts[0]?.id || 'SOS-9421');

  // Fallback initial sample alert for demo
  const sampleAlerts = activeAlerts.length > 0 ? activeAlerts : [
    {
      id: 'SOS-9421',
      trigger: 'Smartwatch Wearable Triple-Press Panic Trigger',
      user: 'Ananya Verma (+91 98765-43210)',
      vehicle: 'Shared Cab #DL-3C-AZ-4921',
      location: [28.5910, 77.1960],
      addressName: 'Rear Railway Gate, Unlit Alley Segment #03',
      time: '21:42:10 (3 mins ago)',
      transcript: 'Emergency! Cab DL-942 diverted off-route into unlit alley. Driver ignored route request.',
      status: 'POLICE_DISPATCHED',
      unitAssigned: 'Pink Patrol Mobile Unit #12 (ETA 4 mins)'
    },
    {
      id: 'SOS-5120',
      trigger: 'Bus Route Deviation Anomaly Engine Auto-Flag',
      user: 'Priya Sharma (+91 98112-99887)',
      vehicle: 'DTC Bus #512',
      location: [28.6105, 77.2185],
      addressName: 'AIIMS Guard Post Junction',
      time: '21:35:00',
      transcript: 'Vehicle halted at unscheduled stop for 3 minutes.',
      status: 'INVESTIGATING',
      unitAssigned: 'Janpath Pink Booth #04 Check'
    }
  ];

  const currentAlert = sampleAlerts.find(a => a.id === selectedAlertId) || sampleAlerts[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-white font-outfit">Police & Authority Emergency Control Dashboard</h2>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/40 rounded-full animate-pulse">
              112 PCR DISPATCH LINK
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time live queue of discreet SOS alerts, telemetry telemetry, audio transcripts, and Pink Patrol unit dispatch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-bold rounded-xl flex items-center gap-2">
            <Radio className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>4 Patrol Units En-Route</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Active SOS Alerts Feed Queue */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest">Active Emergency SOS Queue</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {sampleAlerts.map((alert) => {
              const isSelected = alert.id === selectedAlertId;

              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-zinc-900 border-purple-500 ring-1 ring-purple-500/50 shadow-xl'
                      : 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-purple-400">{alert.id}</span>
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/40 rounded">
                      {alert.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-white mt-1.5">{alert.user}</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">{alert.vehicle}</p>

                  <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" /> {alert.time}
                    </span>
                    <span className="text-purple-300 font-semibold">{alert.unitAssigned}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Alert Detail, Evidence Telemetry & Dispatch Control */}
        {currentAlert && (
          <div className="lg:col-span-2 space-y-4 p-5 rounded-2xl glass-panel border border-zinc-800">
            
            {/* Header Alert Details */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded">
                    {currentAlert.id}
                  </span>
                  <span className="text-xs text-zinc-400">{currentAlert.time}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">{currentAlert.user}</h3>
                <p className="text-xs text-zinc-400">{currentAlert.vehicle} • {currentAlert.addressName}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateAlertStatus(currentAlert.id, 'RESOLVED')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Resolved</span>
                </button>
              </div>
            </div>

            {/* Alert Trigger Method */}
            <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-xl flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse shrink-0" />
              <div className="text-xs">
                <span className="text-zinc-400 block font-semibold">ACTIVATION METHOD</span>
                <span className="text-white font-bold">{currentAlert.trigger}</span>
              </div>
            </div>

            {/* Evidence Playback Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Speech-to-Text Transcript */}
              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-purple-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5 animate-pulse text-red-400" />
                    Ambient Audio Transcript
                  </span>
                  <span className="text-[10px] text-zinc-500">LIVE SYNC</span>
                </div>
                <p className="text-xs text-zinc-200 italic bg-zinc-950 p-2.5 rounded-lg border border-zinc-850">
                  "{currentAlert.transcript}"
                </p>
              </div>

              {/* Pink Patrol Unit Dispatch Status */}
              <div className="p-4 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Siren className="w-3.5 h-3.5" />
                    Pink Patrol Mobile Unit Status
                  </span>
                  <span className="text-[10px] text-emerald-400">EN ROUTE</span>
                </div>
                <div className="text-xs text-zinc-200">
                  Unit Assigned: <strong>Pink Patrol Unit #12</strong>
                  <br />
                  Driver Officer: Const. Sunita Devi
                  <br />
                  Estimated Arrival: <strong className="text-emerald-400">3 Mins 20 Secs</strong>
                </div>
              </div>

            </div>

            {/* Incident Status Progress Bar */}
            <div className="pt-3 border-t border-zinc-800">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">INCIDENT ESCALATION TIMELINE</label>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="p-2 rounded bg-purple-950/60 border border-purple-700 text-purple-300 font-bold">
                  1. SOS Triggered
                </div>
                <div className="p-2 rounded bg-purple-950/60 border border-purple-700 text-purple-300 font-bold">
                  2. PCR Alerted
                </div>
                <div className="p-2 rounded bg-emerald-950/60 border border-emerald-700 text-emerald-300 font-bold animate-pulse">
                  3. Patrol En Route
                </div>
                <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-500">
                  4. Safe Resolution
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
