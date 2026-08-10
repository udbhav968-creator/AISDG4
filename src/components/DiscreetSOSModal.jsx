import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  X, 
  Mic, 
  Camera, 
  Radio, 
  Send, 
  CheckCircle2, 
  PhoneCall, 
  AlertTriangle, 
  Watch, 
  Lock, 
  Volume2, 
  VolumeX,
  Sparkles,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DiscreetSOSModal({ isOpen, onClose, onAlertDispatched, activeVehicle }) {
  const [countdown, setCountdown] = useState(10);
  const [isCountingDown, setIsCountingDown] = useState(true);
  const [pinInput, setPinInput] = useState('');
  const [dispatched, setDispatched] = useState(false);
  const [audioTranscript, setAudioTranscript] = useState('Recording ambient audio...');
  const [triggerType, setTriggerType] = useState('Smartwatch Wearable Panic Trigger');

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (isOpen && isCountingDown && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isCountingDown) {
      handleFinalDispatch();
    }
    return () => clearInterval(timer);
  }, [isOpen, isCountingDown, countdown]);

  // Reset modal state on open
  useEffect(() => {
    if (isOpen) {
      setCountdown(10);
      setIsCountingDown(true);
      setDispatched(false);
      setPinInput('');
      setAudioTranscript('Listening for distress keywords... "Emergency! Vehicle diverted near Railway Gate."');
    }
  }, [isOpen]);

  const handleCancelCountdown = () => {
    setIsCountingDown(false);
    onClose();
  };

  const handleFinalDispatch = () => {
    setIsCountingDown(false);
    setDispatched(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    
    if (onAlertDispatched) {
      onAlertDispatched({
        id: `SOS-${Date.now().toString().slice(-4)}`,
        trigger: triggerType,
        user: 'Ananya Verma (+91 98765-43210)',
        vehicle: activeVehicle ? activeVehicle.name : 'DTC Bus #512',
        location: [28.5910, 77.1960],
        time: new Date().toLocaleTimeString(),
        transcript: 'Emergency! Shared auto DL-942 diverted off-route into unlit alley.',
        status: 'POLICE_DISPATCHED'
      });
    }
  };

  const handlePinCheck = (e) => {
    e.preventDefault();
    if (pinInput === '9911' || pinInput === '0000') {
      handleFinalDispatch();
    } else if (pinInput === '1234') {
      // Safe duress PIN - cancels silently
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-lg p-6 rounded-3xl glass-panel border border-red-500/50 shadow-2xl shadow-red-500/20 text-white space-y-5 animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleCancelCountdown}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-400 animate-pulse">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black font-outfit text-white">DISCREET SOS ACTIVATED</h3>
            <p className="text-xs text-zinc-400">Silent emergency protocol engaged • Direct Police & Contacts Alert</p>
          </div>
        </div>

        {/* Status Mode 1: Countdown in Progress */}
        {isCountingDown && !dispatched && (
          <div className="space-y-4 text-center p-5 bg-red-950/40 border border-red-500/30 rounded-2xl">
            <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">
              AUTO-DISPATCHING IN
            </div>
            <div className="text-5xl font-black font-outfit text-red-500 animate-pulse">
              00:{countdown < 10 ? `0${countdown}` : countdown}
            </div>
            <p className="text-xs text-zinc-300">
              Silent signal broadcast to <strong>Delhi Police PCR (112)</strong> and <strong>3 Trusted Contacts</strong>.
            </p>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                onClick={handleFinalDispatch}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-red-600/30"
              >
                DISPATCH SOS IMMEDIATELY
              </button>
              <button
                onClick={handleCancelCountdown}
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold rounded-xl border border-zinc-700"
              >
                CANCEL (I AM SAFE)
              </button>
            </div>
          </div>
        )}

        {/* Status Mode 2: Dispatched Confirmation */}
        {dispatched && (
          <div className="p-5 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-emerald-300">PINK PATROL DISPATCHED!</h4>
            <p className="text-xs text-zinc-300">
              Police Unit #12 dispatched to coordinates [28.5910, 77.1960]. Live audio & camera feed active. Contacts notified via SMS & WhatsApp.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl"
            >
              CLOSE & TRACK UNIT
            </button>
          </div>
        )}

        {/* Silent Triggers Demo Switcher */}
        <div className="space-y-2 pt-2 border-t border-zinc-800">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">DISCREET ACTIVATION METHODS DEMO</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setTriggerType('Smartwatch Wearable Panic Trigger')}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 ${
                triggerType.includes('Smartwatch') ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              <Watch className="w-4 h-4" />
              <span>Smartwatch Tap</span>
            </button>

            <button
              onClick={() => setTriggerType('Device Shake Motion Detector')}
              className={`p-2.5 rounded-xl border text-left flex items-center gap-2 ${
                triggerType.includes('Shake') ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Device Shake</span>
            </button>
          </div>
        </div>

        {/* Background Audio Evidence Buffer */}
        <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl space-y-1.5">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold">
            <span className="flex items-center gap-1.5 text-pink-400">
              <Mic className="w-3.5 h-3.5 animate-pulse" />
              Ambient Audio Evidence Stream
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">RECORDING</span>
          </div>
          <p className="text-xs text-zinc-300 italic">"{audioTranscript}"</p>
        </div>

      </div>
    </div>
  );
}
