import React, { useState } from 'react';
import { HelpCircle, ArrowUpRight, ArrowDownRight, Database, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function SHAPExplainabilityVisualizer() {
  const [selectedScenario, setSelectedScenario] = useState('MAIN_CORRIDOR');

  const scenarios = {
    MAIN_CORRIDOR: {
      name: 'Main Arterial Corridor (South Delhi)',
      baseScore: 58.5,
      predictedScore: 92.4,
      waterfall: [
        { feature: 'Lighting Level (92%)', shap: +14.2, impact: 'POSITIVE', desc: 'High lumen output boosts safety' },
        { feature: 'Police Proximity (220m)', shap: +12.8, impact: 'POSITIVE', desc: 'Active Pink Police Booth within 250m' },
        { feature: 'Open Stores (24)', shap: +7.6, impact: 'POSITIVE', desc: 'Active commercial storefront eyes-on-street' },
        { feature: 'Crowd Density (78%)', shap: +3.5, impact: 'POSITIVE', desc: 'Optimal commuter presence' },
        { feature: 'Historical Crime Index (0.5)', shap: -4.2, impact: 'NEGATIVE', desc: 'Low baseline crime probability' }
      ]
    },
    DARK_ALLEY: {
      name: 'Unlit Shortcut Alley',
      baseScore: 58.5,
      predictedScore: 28.1,
      waterfall: [
        { feature: 'Lighting Level (12%)', shap: -18.4, impact: 'NEGATIVE', desc: 'Critical unlit blackout segment' },
        { feature: 'Police Proximity (2,800m)', shap: -14.6, impact: 'NEGATIVE', desc: 'Nearest police unit >2.5 km away' },
        { feature: 'Open Stores (0)', shap: -8.0, impact: 'NEGATIVE', desc: 'Zero active commercial storefronts' },
        { feature: 'Historical Crime Index (4.8)', shap: -9.4, impact: 'NEGATIVE', desc: 'Elevated late-night crime frequency' },
        { feature: 'Crowd Density (10%)', shap: +2.0, impact: 'POSITIVE', desc: 'Isolated commuter vulnerability' }
      ]
    }
  };

  const activeData = scenarios[selectedScenario];

  return (
    <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-zinc-950/80 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-850 pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          <div>
            <h3 className="text-sm font-black text-white">SHAP Model Explainability & Feature Attribution</h3>
            <p className="text-xs text-zinc-400">Shapley value decomposition for 100% transparent safety scoring</p>
          </div>
        </div>

        {/* Scenario Toggle */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            onClick={() => setSelectedScenario('MAIN_CORRIDOR')}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              selectedScenario === 'MAIN_CORRIDOR' ? 'bg-cyan-500 text-zinc-950 shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Safe Main Corridor
          </button>
          <button
            onClick={() => setSelectedScenario('DARK_ALLEY')}
            className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
              selectedScenario === 'DARK_ALLEY' ? 'bg-red-500 text-white shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Unlit Alley Risk
          </button>
        </div>
      </div>

      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono">
          <span className="text-zinc-400 block">Baseline Global Mean:</span>
          <span className="text-base font-black text-zinc-200">{activeData.baseScore} / 100</span>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono">
          <span className="text-zinc-400 block">SHAP Sum Total Impact:</span>
          <span className={`text-base font-black ${activeData.predictedScore >= 80 ? 'text-emerald-400' : 'text-red-400'}`}>
            {(activeData.predictedScore - activeData.baseScore).toFixed(1)} Points
          </span>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono">
          <span className="text-zinc-400 block">Final Predicted Score:</span>
          <span className={`text-base font-black ${activeData.predictedScore >= 80 ? 'text-emerald-400' : 'text-red-400'}`}>
            {activeData.predictedScore} / 100
          </span>
        </div>
      </div>

      {/* SHAP Waterfall Chart Bars */}
      <div className="space-y-3 pt-2">
        <div className="text-xs font-bold text-zinc-300 font-mono">SHAP Feature Attribution Waterfall:</div>

        {activeData.waterfall.map((item) => (
          <div key={item.feature} className="p-2.5 rounded-xl bg-zinc-900/40 border border-zinc-850 space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white font-bold flex items-center gap-1.5">
                {item.impact === 'POSITIVE' ? (
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400" />
                )}
                {item.feature}
              </span>

              <span className={`font-bold font-mono ${item.impact === 'POSITIVE' ? 'text-emerald-400' : 'text-red-400'}`}>
                {item.shap > 0 ? `+${item.shap}` : item.shap} pts
              </span>
            </div>

            {/* Visual Bar */}
            <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden relative">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  item.impact === 'POSITIVE' ? 'bg-emerald-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(100, Math.abs(item.shap) * 4)}%` }}
              ></div>
            </div>

            <p className="text-[10px] text-zinc-500 font-mono">{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
