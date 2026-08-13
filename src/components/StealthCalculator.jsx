import React, { useState } from 'react';
import { Calculator, ShieldAlert, X } from 'lucide-react';

export default function StealthCalculator({ isOpen, onClose, onSecretSOSTrigger }) {
  const [display, setDisplay] = useState('0');

  if (!isOpen) return null;

  const handleBtnClick = (val) => {
    if (val === 'C') {
      setDisplay('0');
      return;
    }

    if (val === '=') {
      if (display === '9999') {
        onSecretSOSTrigger();
        setDisplay('DURESS SOS DISPATCHED');
        setTimeout(() => onClose(), 2000);
        return;
      }
      try {
        setDisplay(String(eval(display)));
      } catch {
        setDisplay('Error');
      }
      return;
    }

    if (display === '0' || display === 'Error') {
      setDisplay(val);
    } else {
      setDisplay((d) => d + val);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xs bg-zinc-900 border border-zinc-800 rounded-2xl p-4 shadow-2xl space-y-3 text-zinc-100">
        
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
          <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs">
            <Calculator className="w-4 h-4 text-purple-400" />
            <span>Standard Calculator</span>
          </div>

          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-850 text-right font-mono text-xl text-emerald-400 font-black min-h-[48px] flex items-center justify-end overflow-x-auto">
          {display}
        </div>

        <div className="grid grid-cols-4 gap-2 text-sm font-bold">
          {['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'].map((btn) => (
            <button
              key={btn}
              onClick={() => handleBtnClick(btn)}
              className="p-3 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-white rounded-xl shadow transition"
            >
              {btn}
            </button>
          ))}
        </div>

        <p className="text-[10px] text-zinc-500 text-center font-mono pt-1">
          Stealth Cover Interface (Enter 9999 and = for Duress Alert)
        </p>
      </div>
    </div>
  );
}
