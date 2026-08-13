import React from 'react';
import { Eye, Users, ShieldCheck, AlertTriangle, Video } from 'lucide-react';

export default function CrowdDensityHeatmapVisualizer() {
  return (
    <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-zinc-800 space-y-4 w-full">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-xl border border-cyan-500/30 shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white">YOLOv8 Computer Vision Crowd Density</h3>
            <p className="text-[11px] text-zinc-400">Live CCTV Bounding Box Commuter Ratio Scanner</p>
          </div>
        </div>

        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold rounded">
          FPS: 30.0
        </span>
      </div>

      {/* Camera Feed Visualizer */}
      <div className="relative h-40 bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 p-3 flex flex-col justify-between">
        
        {/* Simulated Camera Overlay Bounding Boxes */}
        <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>

        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-zinc-300">
          <span className="flex items-center gap-1">
            <Video className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
            <span>CAM-04 (Anand Vihar Transit Shelter)</span>
          </span>
          <span className="text-emerald-400 font-bold">● YOLOv8 ACTIVE</span>
        </div>

        {/* Bounding Box Mock Elements */}
        <div className="relative z-10 grid grid-cols-3 gap-2 text-[10px] font-mono">
          <div className="p-2 border border-pink-500/80 bg-pink-500/10 rounded text-pink-300">
            <span>[PERSON_FEMALE 98%]</span>
            <div className="text-[9px] text-zinc-400">Commuter #1</div>
          </div>

          <div className="p-2 border border-cyan-500/80 bg-cyan-500/10 rounded text-cyan-300">
            <span>[PERSON_MALE 94%]</span>
            <div className="text-[9px] text-zinc-400">Commuter #2</div>
          </div>

          <div className="p-2 border border-pink-500/80 bg-pink-500/10 rounded text-pink-300">
            <span>[PERSON_FEMALE 99%]</span>
            <div className="text-[9px] text-zinc-400">Commuter #3</div>
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-center text-[10px] font-mono border-t border-zinc-800/80 pt-1.5 text-zinc-400">
          <span>Density: 14 Persons / 20m²</span>
          <span className="text-cyan-400 font-bold">68.5% Female Ratio</span>
        </div>

      </div>
    </div>
  );
}
