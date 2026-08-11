import React, { useState } from 'react';
import { Bot, Send, Mic, Sparkles, ShieldCheck, MapPin, Bus } from 'lucide-react';

export default function SurakshaCopilot({ onNavigateToHaven, onSelectVehicle }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am Suraksha AI, your personal safety copilot. Ask me about transit safety, nearest safe havens, or set an automated check-in timer.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (queryText) => {
    const query = queryText || input;
    if (!query.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');

    // AI Contextual Response Parsing
    setTimeout(() => {
      let reply = 'I am monitoring your route telemetry continuously. You are currently in a high-safety zone.';
      const lower = query.toLowerCase();

      if (lower.includes('bus') || lower.includes('512')) {
        reply = 'DTC Bus #512 is currently ON-ROUTE with a High Safety Index (92/100). Driver is verified with 14 female commuters onboard.';
        if (onSelectVehicle) onSelectVehicle('bus-512');
      } else if (lower.includes('hospital') || lower.includes('pharmacy') || lower.includes('safe')) {
        reply = 'Nearest Safe Haven: AIIMS Emergency Trauma Care (1.2 km away) and 24 Seven All-Night Pharmacy (1.8 km). I have highlighted them on your radar.';
      } else if (lower.includes('check-in') || lower.includes('timer')) {
        reply = 'Automated silent check-in countdown set for 15 minutes. I will prompt you if your speed drops to zero in an unlit segment.';
      }

      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div className="p-4 rounded-2xl glass-panel border border-zinc-800 space-y-3 flex flex-col h-[380px]">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-pink-500/10 text-pink-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Suraksha AI Voice Copilot</h3>
            <p className="text-[10px] text-zinc-400">Conversational Safety & Transit Intelligence</p>
          </div>
        </div>
        <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 text-[10px] font-extrabold rounded-full">
          AI ONLINE
        </span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-2.5 rounded-2xl ${
                m.sender === 'user'
                  ? 'bg-pink-600 text-white rounded-br-none font-medium'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
        <button
          onClick={() => handleSend('Is Bus #512 safe right now?')}
          className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-pink-300 border border-zinc-800 rounded-lg whitespace-nowrap"
        >
          🚌 Is Bus 512 safe?
        </button>
        <button
          onClick={() => handleSend('Find nearest open hospital')}
          className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-purple-300 border border-zinc-800 rounded-lg whitespace-nowrap"
        >
          🏥 Nearest Hospital
        </button>
        <button
          onClick={() => handleSend('Set automatic check-in timer')}
          className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-emerald-300 border border-zinc-800 rounded-lg whitespace-nowrap"
        >
          ⏱️ Set 15m Check-in
        </button>
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-1 border-t border-zinc-800"
      >
        <input
          type="text"
          placeholder="Ask Suraksha AI safety questions..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-pink-500"
        />
        <button
          type="submit"
          className="p-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl shadow-md shadow-pink-600/20"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
