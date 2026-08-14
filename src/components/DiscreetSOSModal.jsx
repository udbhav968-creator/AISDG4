import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ShieldAlert, PhoneCall, CheckCircle2, AlertTriangle, X, Radio, MapPin, Video, Lock } from 'lucide-react';

export default function DiscreetSOSModal({ isOpen, onClose, onAlertDispatched, activeVehicle }) {
  const [countdown, setCountdown] = useState(5);
  const [isDispatched, setIsDispatched] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setIsDispatched(false);
      return;
    }

    if (countdown > 0 && !isDispatched) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !isDispatched) {
      handleConfirmDispatch();
    }
  }, [isOpen, countdown, isDispatched]);

  if (!isOpen) return null;

  const handleConfirmDispatch = () => {
    setIsDispatched(true);
    const newAlert = {
      id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
      trigger: 'Discreet Wearable Double-Tap Trigger',
      user: 'Ananya Verma (+91 98765-43210)',
      vehicle: activeVehicle?.name || 'Shared Cab #DL-3C-AZ-4921',
      location: activeVehicle?.currentLocation || [28.5910, 77.1960],
      addressName: 'Near Unlit Alley Segment #03, Rear Railway Gate',
      time: new Date().toLocaleTimeString(),
      transcript: 'Emergency! Cab DL-942 diverted off-route into unlit alley. Driver ignored route request.',
      status: 'POLICE_DISPATCHED',
      unitAssigned: 'Pink Patrol Mobile Unit #12 (ETA 3 mins 20s)'
    };
    if (onAlertDispatched) onAlertDispatched(newAlert);
  };

  const modalContent = (
    <div 
      className="fixed inset-0 p-4"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(5, 5, 8, 0.95)',
        zIndex: 99999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl space-y-4 text-zinc-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isDispatched ? (
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
              <ShieldAlert className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-white">Discreet Emergency SOS Triggered</h2>
              <p className="text-xs text-zinc-300">
                Silent police dispatching to Delhi Police 112 Control Room in:
              </p>
            </div>

            <div className="text-5xl font-black text-red-500 font-mono my-2 animate-bounce">
              00:0{countdown}
            </div>

            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-left text-xs space-y-1">
              <p className="text-zinc-400 font-mono text-[11px]">📍 Live Location: Near Unlit Alley Segment #03</p>
              <p className="text-zinc-400 font-mono text-[11px]">🚕 Vehicle: {activeVehicle?.name || 'Shared Cab #DL-942'}</p>
              <p className="text-pink-400 font-bold text-[11px]">🎙️ Ambient Audio Recording: ACTIVE</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={onClose}
                className="py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs rounded-xl cursor-pointer"
              >
                Cancel False Alert
              </button>

              <button
                onClick={handleConfirmDispatch}
                className="py-2.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-600/30 cursor-pointer"
              >
                Dispatch 112 PCR Now
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-white">Police 112 PCR Dispatched</h2>
              <p className="text-xs text-emerald-400 font-bold">
                Pink Patrol Mobile Unit #12 assigned (ETA 3 mins 20s)
              </p>
            </div>

            <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-left text-xs space-y-1.5 font-mono">
              <p className="text-emerald-400 font-bold">✓ Live GPS Stream Connected to Control Room</p>
              <p className="text-zinc-300">✓ Emergency Contacts Notified via WhatsApp API</p>
              <p className="text-zinc-300">✓ Encrypted Evidence Vault Logging Telemetry</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow cursor-pointer"
            >
              Close & Monitor Incident
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
