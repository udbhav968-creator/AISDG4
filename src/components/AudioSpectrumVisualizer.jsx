import React, { useState, useEffect } from 'react';
import { Mic, Activity, AlertCircle, ShieldAlert } from 'lucide-react';

export default function AudioSpectrumVisualizer({ onAutoTriggerSOS }) {
  const [decibels, setDecibels] = useState(42);
  const [isListening, setIsListening] = useState(true);
  const [screamDetected, setScreamDetected] = useState(false);

  useEffect(() => {
    if (!isListening) return;

    // Simulate real-time acoustic ambient audio decibel fluctuations
    const interval = setInterval(() => {
      const db = Math.floor(35 + Math.random() * 25);
      setDecibels(db);
    }, 600);

    return () => clearInterval(interval);
  }, [isListening]);

  const handleSimulateScream = () => {
    setDecibels(94);
    setScreamDetected(true);
    if (onAutoTriggerSOS) onAutoTriggerSOS();
    setTimeout(() => setScreamDetected(false), 3000);
  };

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-xl ${screamDetected ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-pink-500/10 text-pink-400'}`}>
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Ultra-Pro WebAudio Scream Shield</h3>
            <p className="text-[10px] text-zinc-400">Continuous Acoustic & High-dB Distress Sensor</p>
          </div>
        </div>

        <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
          screamDetected ? 'bg-red-500 text-white animate-ping' : 'bg-emerald-500/20 text-emerald-300'
        }`}>
          {screamDetected ? '🚨 SCREAM DETECTED' : 'LISTENING (30-90 dB)'}
        </span>
      </div>

      {/* Real-time Decibel Meter & Audio Waveform Bars */}
      <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-400">Acoustic Input Volume:</span>
          <span className={`font-extrabold ${decibels > 85 ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
            {decibels} dB {decibels > 85 ? '(HIGH DISTRESS)' : '(NORMAL)'}
          </span>
        </div>

        {/* Animated Waveform Bars */}
        <div className="flex items-end justify-between gap-1 h-12 pt-2">
          {[...Array(24)].map((_, i) => {
            const barHeight = Math.min(Math.max((decibels * (0.4 + (i % 5) * 0.15)), 10), 100);
            return (
              <div
                key={i}
                className={`w-full rounded-t transition-all duration-300 ${
                  decibels > 85
                    ? 'bg-gradient-to-t from-red-600 to-pink-500 animate-pulse'
                    : 'bg-gradient-to-t from-pink-600/40 to-emerald-500/80'
                }`}
                style={{ height: `${barHeight}%` }}
              ></div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="text-[10px] text-zinc-400">Trigger Threshold: &gt;85 dB for 2.0s</span>
        <button
          onClick={handleSimulateScream}
          className="px-3 py-1 bg-red-600/80 hover:bg-red-600 text-white font-extrabold text-[11px] rounded-lg shadow"
        >
          Test Scream Spike (94 dB)
        </button>
      </div>
    </div>
  );
}
