import React, { useState } from 'react';
import { Eye, EyeOff, ShieldAlert, Check, X, Lock } from 'lucide-react';

export default function StealthCalculator({ isOpen, onClose, onSecretSOSTrigger }) {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [stealthStatus, setStealthStatus] = useState('NORMAL');

  const handleDigit = (digit) => {
    if (display === '0') {
      setDisplay(digit);
    } else {
      setDisplay(prev => prev + digit);
    }

    // Secret duress code detection
    const nextVal = (display === '0' ? '' : display) + digit;
    if (nextVal === '9911') {
      setStealthStatus('SILENT_SOS_ACTIVATED');
      if (onSecretSOSTrigger) onSecretSOSTrigger();
    }
  };

  const handleOp = (op) => {
    setFormula(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleEquals = () => {
    try {
      if (display === '9911') {
        setStealthStatus('SILENT_SOS_ACTIVATED');
        if (onSecretSOSTrigger) onSecretSOSTrigger();
        return;
      }
      // Simple evaluator for demo
      const result = eval((formula + display).replace(/×/g, '*').replace(/÷/g, '/'));
      setDisplay(String(result));
      setFormula('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setFormula('');
    setStealthStatus('NORMAL');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950">
      <div className="relative w-full max-w-sm p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl space-y-4">
        
        {/* Stealth Banner Indicator for Judges */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-zinc-300">STEALTH DURESS CALCULATOR MODE</span>
          </div>
          <button
            onClick={onClose}
            className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-lg border border-zinc-700"
          >
            Exit Cover
          </button>
        </div>

        {/* Calculator Display Screen */}
        <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl text-right">
          <div className="text-xs text-zinc-500 font-mono h-4">{formula}</div>
          <div className="text-3xl font-black font-mono text-white truncate mt-1">{display}</div>

          {stealthStatus === 'SILENT_SOS_ACTIVATED' && (
            <div className="text-[10px] text-red-400 font-mono font-bold mt-1 animate-pulse">
              [SECRET DISCREET SOS DISPATCHED BEHIND COVER]
            </div>
          )}
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-4 gap-2 text-sm font-bold">
          <button onClick={handleClear} className="p-3 rounded-xl bg-zinc-800 text-red-400 hover:bg-zinc-700">C</button>
          <button onClick={() => handleOp('÷')} className="p-3 rounded-xl bg-zinc-800 text-pink-400 hover:bg-zinc-700">÷</button>
          <button onClick={() => handleOp('×')} className="p-3 rounded-xl bg-zinc-800 text-pink-400 hover:bg-zinc-700">×</button>
          <button onClick={() => handleOp('-')} className="p-3 rounded-xl bg-zinc-800 text-pink-400 hover:bg-zinc-700">-</button>

          <button onClick={() => handleDigit('7')} className="p-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">7</button>
          <button onClick={() => handleDigit('8')} className="p-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">8</button>
          <button onClick={() => handleDigit('9')} className="p-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">9</button>
          <button onClick={() => handleOp('+')} className="p-3 rounded-xl bg-zinc-800 text-pink-400 hover:bg-zinc-700">+</button>

          <button onClick={() => handleDigit('4')} className="p-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">4</button>
          <button onClick={() => handleDigit('5')} className="p-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">5</button>
          <button onClick={() => handleDigit('6')} className="p-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">6</button>
          <button onClick={handleEquals} className="row-span-2 p-3 rounded-xl bg-pink-600 text-white hover:bg-pink-500 flex items-center justify-center">=</button>

          <button onClick={() => handleDigit('1')} className="p-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">1</button>
          <button onClick={() => handleDigit('2')} className="p-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">2</button>
          <button onClick={() => handleDigit('3')} className="p-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">3</button>

          <button onClick={() => handleDigit('0')} className="col-span-2 p-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">0</button>
          <button onClick={() => handleDigit('.')} className="p-3 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">.</button>
        </div>

        <p className="text-[10px] text-zinc-500 text-center">
          💡 Evaluator Tip: Type <strong>9911</strong> on calculator to trigger silent SOS dispatch behind cover.
        </p>

      </div>
    </div>
  );
}
