import React from 'react';
import { Activity, Gauge, Navigation, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function VehicleTelemetryChart({ selectedVehicle }) {
  const telemetryData = [
    { time: '21:38', speed: 38, deviation: 0 },
    { time: '21:39', speed: 42, deviation: 10 },
    { time: '21:40', speed: 35, deviation: 25 },
    { time: '21:41', speed: 18, deviation: 140 },
    { time: '21:42', speed: 12, deviation: 340 },
    { time: '21:43', speed: 0, deviation: 340 }
  ];

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-purple-500/10 text-purple-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Live Vehicle Speed & Trajectory Analytics</h3>
            <p className="text-[10px] text-zinc-400">Real-Time Telemetry Stream (km/h vs Geofence Deviation)</p>
          </div>
        </div>

        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 text-[10px] font-extrabold rounded-full">
          TELEMETRY GRAPH
        </span>
      </div>

      <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl">
        <div className="h-36 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetryData}>
              <XAxis dataKey="time" tick={{ fill: '#a1a1aa', fontSize: 10 }} />
              <YAxis tick={{ fill: '#a1a1aa', fontSize: 10 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '0.75rem', fontSize: '11px' }}
              />
              <Line type="monotone" dataKey="speed" stroke="#ec4899" strokeWidth={2} name="Speed (km/h)" />
              <Line type="monotone" dataKey="deviation" stroke="#ef4444" strokeWidth={2} name="Deviation (m)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
