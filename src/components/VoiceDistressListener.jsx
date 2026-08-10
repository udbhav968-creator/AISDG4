import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import { analyzeAudioStream, detectDecibelSpike } from '../utils/voiceClassifier';

export default function VoiceDistressListener({ onAutoTriggerSOS }) {
  const [isListening, setIsListening] = useState(false);
  const [simulatedTranscript, setSimulatedTranscript] = useState('System ready. Speak or shout distress keywords...');
  const [decibels, setDecibels] = useState(42);
  const [detectedDistress, setDetectedDistress] = useState(null);

  // Simulated dB fluctuation and keyword listener
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        // Random natural background noise (35-55 dB)
        const currentDb = Math.floor(Math.random() * 20) + 38;
        setDecibels(currentDb);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleSimulateVoiceDistress = (phrase) => {
    setSimulatedTranscript(phrase);
    const analysis = analyzeAudioStream(phrase);
    setDetectedDistress(analysis);

    if (analysis.isDistress) {
      setTimeout(() => {
        if (onAutoTriggerSOS) onAutoTriggerSOS();
      }, 1200);
    }
  };

  const handleSimulateScream = () => {
    const screamDb = 94;
    setDecibels(screamDb);
    setSimulatedTranscript('⚠️ ACOUSTIC SHOUT / SCREAM DETECTED (94 dB)');
    const screamAnalysis = detectDecibelSpike(screamDb);
    setDetectedDistress({
      isDistress: true,
      confidence: 0.98,
      matchedKeywords: ['HIGH_DECIBEL_SCREAM'],
      alertLevel: screamAnalysis.severity
    });

    setTimeout(() => {
      if (onAutoTriggerSOS) onAutoTriggerSOS();
    }, 1000);
  };

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400">
            <Mic className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">AI Edge Voice & Scream Sentinel</h3>
            <p className="text-[11px] text-zinc-400">On-device acoustic classifier • Zero internet required</p>
          </div>
        </div>

        <button
          onClick={() => setIsListening(!isListening)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
            isListening
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse'
              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
          }`}
        >
          {isListening ? 'Sentinel Active' : 'Enable Voice Shield'}
        </button>
      </div>

      {/* Audio Decibel Level Gauge */}
      <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-zinc-400 font-semibold flex items-center gap-1">
            <Volume2 className="w-3.5 h-3.5 text-pink-400" />
            Ambient Audio Gauge
          </span>
          <span className={`font-mono font-bold ${decibels > 82 ? 'text-red-400 animate-bounce' : 'text-emerald-400'}`}>
            {decibels} dB {decibels > 82 ? '(SCREAM SPIKE!)' : ''}
          </span>
        </div>

        <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              decibels > 82 ? 'bg-red-500' : decibels > 65 ? 'bg-amber-400' : 'bg-emerald-400'
            }`}
            style={{ width: `${Math.min(decibels, 100)}%` }}
          />
        </div>

        <p className="text-xs text-zinc-300 italic pt-1">"{simulatedTranscript}"</p>
      </div>

      {/* Quick Test Voice Triggers */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">TEST AI VOICE RECOGNITION</label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSimulateVoiceDistress('Bachao! Help me please!')}
            className="px-2.5 py-1 bg-zinc-900 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs rounded-lg font-semibold"
          >
            🗣️ "Bachao! Help me!"
          </button>
          <button
            onClick={() => handleSimulateVoiceDistress('Chhodo mujhe! Leave me alone!')}
            className="px-2.5 py-1 bg-zinc-900 hover:bg-pink-500/20 text-pink-300 border border-pink-500/30 text-xs rounded-lg font-semibold"
          >
            🗣️ "Chhodo mujhe!"
          </button>
          <button
            onClick={handleSimulateScream}
            className="px-2.5 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs rounded-lg font-extrabold animate-pulse"
          >
            😱 Simulate High-dB Scream
          </button>
        </div>
      </div>
    </div>
  );
}
