import React, { useState } from 'react';
import { ShieldCheck, FileText, Download, Printer, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { generateFirReport } from '../utils/firGenerator';

export default function EvidenceVault() {
  const [showFirModal, setShowFirModal] = useState(false);
  const firData = generateFirReport({
    alertId: 'SOS-9421',
    user: 'Ananya Verma (+91 98765-43210)',
    vehicle: 'Shared Cab #DL-3C-AZ-4921',
    location: [28.5910, 77.1960],
    transcript: 'Emergency! Shared auto DL-942 diverted off-route into unlit alley near Railway Gate.',
    time: new Date().toLocaleTimeString()
  });

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Cryptographic Legal Evidence Vault</h3>
            <p className="text-[11px] text-zinc-400">SHA-256 court-admissible forensic timestamps</p>
          </div>
        </div>

        <button
          onClick={() => setShowFirModal(true)}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 flex items-center gap-1.5"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Generate Legal FIR</span>
        </button>
      </div>

      {/* Vault Items List */}
      <div className="space-y-2 text-xs">
        <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-center justify-between">
          <div>
            <span className="font-bold text-white block">AUDIO_REC_INCIDENT_9421.wav</span>
            <span className="text-[10px] text-zinc-400 font-mono">SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
          </div>
          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold rounded">VERIFIED</span>
        </div>

        <div className="p-3 bg-zinc-900/80 border border-zinc-800 rounded-xl flex items-center justify-between">
          <div>
            <span className="font-bold text-white block">GPS_TRACK_TELEMETRY_STREAM.json</span>
            <span className="text-[10px] text-zinc-400 font-mono">SHA256: 8f4e0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b12</span>
          </div>
          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold rounded">SEALED</span>
        </div>
      </div>

      {/* FIR Preview Modal */}
      {showFirModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl p-6 rounded-3xl bg-zinc-900 border border-blue-500/40 text-white space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="font-extrabold text-base text-white">POLICE FIRST INFORMATION REPORT (FIR DRAFT)</h3>
              </div>
              <button onClick={() => setShowFirModal(false)} className="text-zinc-400 hover:text-white font-bold text-sm">✕</button>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs space-y-2 font-mono leading-relaxed text-zinc-200">
              <div className="text-blue-400 font-bold border-b border-zinc-800 pb-1">
                DELHI POLICE DIGITAL INCIDENT CELL • FIR NO: {firData.firNumber}
              </div>
              <div>COMPLAINANT: <strong>{firData.complainantName}</strong></div>
              <div>INCIDENT VEHICLE: <strong>{firData.vehicleDetails}</strong></div>
              <div>EXACT GPS COORDINATES: <strong>{firData.locationCoordinates}</strong></div>
              <div>TIMESTAMPS: <strong>{firData.incidentTime}</strong></div>
              <div>LEGAL SECTIONS: <strong>{firData.sectionsApplicable.join(', ')}</strong></div>
              <div>CRYPTO SIGNATURE HASH: <strong className="text-emerald-400">{firData.evidenceHash}</strong></div>
              <div className="pt-2 text-zinc-300 italic border-t border-zinc-800">
                TRANSCRIPT EVIDENCE: "{firData.audioTranscript}"
              </div>
              <div className="pt-1 text-emerald-400 font-bold">STATUS: {firData.status}</div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF Report</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
