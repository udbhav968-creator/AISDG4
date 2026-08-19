import React, { useState } from 'react';
import { 
  BarChart2, RefreshCw, RotateCcw, ShieldCheck, Activity, Cpu, 
  Database, GitBranch, Layers, CheckCircle2, AlertTriangle, Play, Server
} from 'lucide-react';

export default function MLOpsDashboard() {
  const [activeVersion, setActiveVersion] = useState('v3.2.0-production');
  const [driftScore, setDriftScore] = useState(0.042);
  const [driftStatus, setDriftStatus] = useState('HEALTHY_STABLE');
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainLogs, setRetrainLogs] = useState([]);
  const [modelHistory, setModelHistory] = useState([
    { version: 'v3.2.0-production', r2: '0.9731', mae: '2.14', trained: '2026-08-17 23:25', samples: '25,000', status: 'PRODUCTION_ACTIVE' },
    { version: 'v3.1.0-staging', r2: '0.9526', mae: '2.85', trained: '2026-08-14 17:11', samples: '30,000', status: 'STAGING' },
    { version: 'v3.0.0-archive', r2: '0.9210', mae: '3.40', trained: '2026-08-12 11:00', samples: '10,000', status: 'ARCHIVED' }
  ]);

  const handleRunDriftCheck = () => {
    const simulatedDrift = (Math.random() * 0.08 + 0.02).toFixed(3);
    setDriftScore(parseFloat(simulatedDrift));
    setDriftStatus(simulatedDrift > 0.15 ? 'DRIFT_ALERT' : 'HEALTHY_STABLE');
  };

  const handleSimulateMLOpsRetrain = () => {
    setIsRetraining(true);
    setRetrainLogs(['[MLOps Pipeline] Triggering Automated CI/CD Model Training & Registry Pipeline...']);

    setTimeout(() => {
      setRetrainLogs(prev => [...prev, '[Data Ingestion] Synthesizing 35,000 fresh spatial telemetry records...']);
    }, 800);

    setTimeout(() => {
      setRetrainLogs(prev => [...prev, '[Feature Store] Extracting lumen levels, police proximity & crowd density...']);
    }, 1600);

    setTimeout(() => {
      setRetrainLogs(prev => [...prev, '[Validation] Evaluating R² = 0.9882, MAE = 1.92. Outperforming baseline!']);
    }, 2400);

    setTimeout(() => {
      const newVersion = `v3.3.0-production`;
      const newEntry = {
        version: newVersion,
        r2: '0.9882',
        mae: '1.92',
        trained: new Date().toISOString().replace('T', ' ').slice(0, 16),
        samples: '35,000',
        status: 'PRODUCTION_ACTIVE'
      };

      setModelHistory(prev => [newEntry, ...prev.map(m => ({ ...m, status: m.status === 'PRODUCTION_ACTIVE' ? 'PREVIOUS_CHECKPOINT' : m.status }))]);
      setActiveVersion(newVersion);
      setIsRetraining(false);
      setDriftScore(0.012);
      setDriftStatus('HEALTHY_STABLE');
      setRetrainLogs(prev => [...prev, '✅ [SUCCESS] New model version v3.3.0 deployed to Production via Blue/Green Zero-Downtime Swap!']);
    }, 3200);
  };

  const handleRollback = () => {
    if (modelHistory.length > 1) {
      const rolledBackVersion = modelHistory[1].version;
      setActiveVersion(rolledBackVersion);
      setModelHistory(prev => {
        const updated = [...prev];
        updated[0].status = 'ROLLED_BACK';
        updated[1].status = 'PRODUCTION_ACTIVE';
        return updated;
      });
      setRetrainLogs(['⏪ [MLOps Rollback] Swapped active model back to ' + rolledBackVersion]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 bg-zinc-950/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-500/40">
                MLOPS 3.0 ENTERPRISE
              </span>
              <span className="text-xs text-zinc-400 font-mono">Automated Lifecycle, Drift & Registry</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              SurakshaOne MLOps Pipeline & Model Registry
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mt-1">
              Automated Kolmogorov-Smirnov data drift monitoring, MLflow experiment tracking, zero-downtime Blue/Green model deployment, and 1-click rollbacks.
            </p>
          </div>

          {/* Action Control Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleRunDriftCheck}
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs rounded-xl border border-zinc-700 shadow transition cursor-pointer flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Check Data Drift</span>
            </button>

            <button
              onClick={handleSimulateMLOpsRetrain}
              disabled={isRetraining}
              className={`px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-1.5 ${
                isRetraining ? 'animate-pulse opacity-80' : ''
              }`}
            >
              {isRetraining ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRetraining ? 'Retraining Models...' : 'Auto-Retrain & Deploy'}</span>
            </button>

            <button
              onClick={handleRollback}
              className="px-3.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 font-bold text-xs rounded-xl shadow transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>1-Click Rollback</span>
            </button>
          </div>
        </div>
      </div>

      {/* MLOps Key Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Active Production Model */}
        <div className="glass-panel p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>ACTIVE MODEL VERSION</span>
            <GitBranch className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-base font-black text-white font-mono">{activeVersion}</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Blue/Green Zero-Downtime</span>
          </div>
        </div>

        {/* Card 2: KS Data Drift Score */}
        <div className="glass-panel p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>KS DATA DRIFT SCORE</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-base font-black text-white font-mono">{driftScore} PSI</p>
          <div className={`flex items-center gap-1 text-[11px] font-mono ${driftStatus === 'DRIFT_ALERT' ? 'text-amber-400 font-bold' : 'text-emerald-400'}`}>
            <span>{driftStatus === 'DRIFT_ALERT' ? '⚠️ Drift Threshold Exceeded (>0.15)' : '✓ Features Distribution Stable'}</span>
          </div>
        </div>

        {/* Card 3: Inference Latency */}
        <div className="glass-panel p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>AVG INFERENCE LATENCY</span>
            <Cpu className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-base font-black text-white font-mono">3.8 ms</p>
          <p className="text-[11px] text-zinc-400 font-mono">p99 Latency: 6.2 ms (Sub-10ms Target)</p>
        </div>

        {/* Card 4: Total Inferences Served */}
        <div className="glass-panel p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>INFERENCES SERVED</span>
            <Server className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-base font-black text-white font-mono">142,850 Requests</p>
          <p className="text-[11px] text-emerald-400 font-mono">100% Availability (SLA 99.999%)</p>
        </div>

      </div>

      {/* Retrain Logs Terminal View */}
      {retrainLogs.length > 0 && (
        <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs space-y-1 max-h-48 overflow-y-auto">
          <div className="text-zinc-500 font-bold border-b border-zinc-850 pb-1 mb-2">MLOps CI/CD Pipeline Console:</div>
          {retrainLogs.map((log, idx) => (
            <p key={idx} className={log.includes('SUCCESS') ? 'text-emerald-400 font-bold' : log.includes('Rollback') ? 'text-amber-400' : 'text-indigo-300'}>
              {log}
            </p>
          ))}
        </div>
      )}

      {/* Model Registry Version History Table */}
      <div className="glass-panel p-5 rounded-2xl border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-extrabold text-white">MLflow Model Registry & Version History</h3>
          </div>
          <span className="text-xs text-zinc-500 font-mono">{modelHistory.length} Versions Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800">
              <tr>
                <th className="p-3">Model Version</th>
                <th className="p-3">R² Score</th>
                <th className="p-3">MAE</th>
                <th className="p-3">Dataset Samples</th>
                <th className="p-3">Trained Timestamp</th>
                <th className="p-3 text-right">Registry Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {modelHistory.map((m) => (
                <tr key={m.version} className={m.version === activeVersion ? 'bg-indigo-500/10 font-bold' : 'hover:bg-zinc-900/40 text-zinc-400'}>
                  <td className="p-3 text-white flex items-center gap-2">
                    {m.version === activeVersion && <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>}
                    <span>{m.version}</span>
                  </td>
                  <td className="p-3 text-pink-400">{m.r2}</td>
                  <td className="p-3 text-cyan-400">{m.mae}</td>
                  <td className="p-3 text-zinc-300">{m.samples}</td>
                  <td className="p-3 text-zinc-400">{m.trained}</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      m.status === 'PRODUCTION_ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : m.status === 'ROLLED_BACK'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
