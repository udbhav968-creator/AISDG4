import React, { useState } from 'react';
import { MessageSquare, Send, ExternalLink, CheckCircle2, Share2 } from 'lucide-react';
import { generateWhatsAppAlertUrl } from '../utils/whatsappBridge';

export default function WhatsAppBotBridge({ activeVehicle }) {
  const [copied, setCopied] = useState(false);
  const links = generateWhatsAppAlertUrl({
    alertId: 'SOS-9421',
    user: 'Ananya Verma (+91 98765-43210)',
    vehicle: activeVehicle ? activeVehicle.name : 'Shared Cab #DL-942',
    location: [28.5910, 77.1960],
    transcript: 'Vehicle diverted off-route into unlit alley near Railway Gate.'
  });

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">WhatsApp & Telegram Alert Bridge</h3>
            <p className="text-[10px] text-zinc-400">Instant live tracking broadcast to contact groups</p>
          </div>
        </div>
        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold rounded-full">
          API CONNECTED
        </span>
      </div>

      {/* Raw Payload Card */}
      <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-xl space-y-1 text-xs">
        <span className="text-[10px] font-mono text-zinc-400">LIVE BROADCAST TEXT PAYLOAD</span>
        <p className="text-zinc-300 font-mono text-[11px] whitespace-pre-line bg-zinc-900 p-2 rounded border border-zinc-800">
          {links.rawText}
        </p>
      </div>

      {/* Direct Action Buttons */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <a
          href={links.whatsappWebUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Send via WhatsApp</span>
        </a>

        <a
          href={links.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send via Telegram</span>
        </a>
      </div>
    </div>
  );
}
