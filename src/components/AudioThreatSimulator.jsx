import React, { useState } from 'react';
import { Volume2, Mic, AlertCircle, Play, CheckCircle2, Zap } from 'lucide-react';

export default function AudioThreatSimulator({ onTriggerSOS }) {
  const [activeSound, setActiveSound] = useState(null);
  const [dbLevel, setDbLevel] = useState(62);
  const [classification, setClassification] = useState('NORMAL_AMBIENT_NOISE');

  const soundPresets = [
    { id: 'scream', label: 'Human Scream (>85 dB)', db: 94, class: 'CRITICAL_SCREAM_DETECTED', color: 'text-red-400', trigger: true },
    { id: 'skid', label: 'Vehicle Crash & Hard Brake', db: 88, class: 'VEHICLE_IMPACT_NOISE', color: 'text-amber-400', trigger: true },
    { id: 'bachao', label: 'Distress Phrase ("Bachao!")', db: 78, class: 'MULTILINGUAL_VERBAL_DISTRESS', color: 'text-pink-400', trigger: true },
    { id: 'normal', label: 'Normal Traffic & Engine Hum', db: 58, class: 'NORMAL_AMBIENT_NOISE', color: 'text-emerald-400', trigger: false }
  ];

  const handleSimulateSound = (preset) => {
    setActiveSound(preset.id);
    setDbLevel(preset.db);
    setClassification(preset.class);

    if (preset.trigger && onTriggerSOS) {
      setTimeout(() => {
        onTriggerSOS();
      }, 800);
    }
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-zinc-800 space-y-4 w-full">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 text-purple-400 rounded-xl border border-purple-500/30 shrink-0">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">Live AI Acoustic Threat Simulator</h3>
            <p className="text-[11px] text-zinc-400">WebAudio Spectrograph & Vocal Stress Edge Classifier</p>
          </div>
        </div>

        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold rounded">
          {dbLevel} dB
        </span>
      </div>

      {/* Preset Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {soundPresets.map((sp) => (
          <button
            key={sp.id}
            onClick={() => handleSimulateSound(sp)}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeSound === sp.id
                ? 'bg-purple-900/40 border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]'
                : 'bg-zinc-900/70 border-zinc-800 hover:bg-zinc-900'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-extrabold text-white">{sp.label}</span>
              <Play className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            </div>
            <span className={`text-[10px] font-mono font-bold ${sp.color}`}>{sp.class}</span>
          </button>
        ))}
      </div>

      {/* Live Decibel Bar */}
      <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-850 space-y-1.5 font-mono text-xs">
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>Acoustic Waveform Intensity</span>
          <span className="text-pink-400 font-bold">{classification}</span>
        </div>

        <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden p-0.5 border border-zinc-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              dbLevel > 80 ? 'bg-gradient-to-r from-amber-500 to-red-500' : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min((dbLevel / 110) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
