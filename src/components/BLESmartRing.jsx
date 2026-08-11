import React, { useState } from 'react';
import { Watch, Radio, CheckCircle2, RefreshCw } from 'lucide-react';

export default function BLESmartRing({ onTriggerSOS }) {
  const [isScanning, setIsScanning] = useState(false);
  const [pairedDevice, setPairedDevice] = useState('Suraksha Smart Ring BLE (Connected)');

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setPairedDevice('Suraksha Smart Ring BLE v2 (Paired)');
    }, 1500);
  };

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-pink-500/10 text-pink-400">
            <Watch className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">BLE Smart Ring & Jewellery Link</h3>
            <p className="text-[10px] text-zinc-400">Web Bluetooth Low Energy (BLE 5.2) Sync</p>
          </div>
        </div>

        <button
          onClick={handleScan}
          className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-lg border border-zinc-700 flex items-center gap-1"
        >
          <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning...' : 'Pair BLE'}</span>
        </button>
      </div>

      <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="font-bold text-zinc-200">{pairedDevice}</span>
        </div>

        <button
          onClick={onTriggerSOS}
          className="px-3 py-1 bg-pink-600 hover:bg-pink-500 text-white text-[11px] font-extrabold rounded-lg shadow-md shadow-pink-600/20"
        >
          Test Panic Press
        </button>
      </div>
    </div>
  );
}
