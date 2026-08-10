import React, { useState } from 'react';
import { WifiOff, Radio, Copy, CheckCircle2, ShieldCheck } from 'lucide-react';
import { generateEncryptedSmsPayload, simulateMeshNodes } from '../utils/meshRelay';

export default function OfflineMeshRelay() {
  const [copied, setCopied] = useState(false);
  const meshNodes = simulateMeshNodes();
  const payload = generateEncryptedSmsPayload({
    lat: 28.5910,
    lon: 77.1960,
    vehicleId: 'DL-3C-AZ-4921',
    triggerType: 'SMARTWATCH_SOS',
    hashId: 'SHA256-S19421'
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(payload.rawPayload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <WifiOff className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Off-Grid Mesh Relay & 2G SMS Engine</h3>
            <p className="text-[11px] text-zinc-400">Zero data connectivity fallback protocol</p>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[10px] font-extrabold rounded-lg">
          2G SMS READY
        </span>
      </div>

      {/* Mesh Relay Nodes Topo */}
      <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Nearby Peer Mesh Relay Hops
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">3 HOP CONNECTED</span>
        </div>

        <div className="space-y-1 text-xs">
          {meshNodes.map((n) => (
            <div key={n.id} className="flex items-center justify-between p-1.5 bg-zinc-950 rounded text-zinc-300">
              <span className="font-mono text-[11px] text-zinc-200">{n.id}</span>
              <span className="text-zinc-400">{n.distance}</span>
              <span className="text-emerald-400 font-semibold">{n.signal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Encrypted SMS Payload Preview */}
      <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[10px] text-zinc-400 uppercase">ENCRYPTED 2G SMS PAYLOAD (112 PCR)</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] text-pink-400 font-semibold hover:text-pink-300"
          >
            {copied ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy SMS'}</span>
          </button>
        </div>
        <p className="font-mono text-[11px] text-amber-300 break-all bg-zinc-900 p-2 rounded border border-zinc-800">
          {payload.rawPayload}
        </p>
      </div>
    </div>
  );
}
