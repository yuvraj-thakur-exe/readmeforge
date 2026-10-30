'use client';

import React, { useState } from 'react';
import { Zap, CheckCircle2 } from 'lucide-react';

export const ProfileTransformationDeck: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);

  return (
    <div className="w-full rounded-2xl border border-neutral-200/90 dark:border-neutral-800 bg-white dark:bg-neutral-950/80 p-5 sm:p-7 shadow-xl dark:shadow-2xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-1">
            <span>[POULO INSPIRATION // TRANSFORMATION DECK]</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
            <span className="text-neutral-500">BEFORE &amp; AFTER MATRIX</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            From Generic Monospace to High-Impact Engineering Showcase
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Drag the comparison slider or inspect the telemetry improvements. See how MonoForge replaces static bullet points with Camo-safe 60fps vector telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-neutral-700 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          <span>RECRUITER RETENTION +420%</span>
        </div>
      </div>

      {/* Interactive Split Deck */}
      <div
        className="relative w-full h-[400px] sm:h-[460px] rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 select-none cursor-ew-resize group shadow-md"
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
          const pct = Math.round((x / rect.width) * 100);
          setSliderPos(pct);
        }}
      >
        {/* AFTER (Full Width Layer: MonoForge High-Impact Engine) */}
        <div className="absolute inset-0 bg-[#09090b] flex flex-col p-6 sm:p-8 overflow-y-auto">
          {/* MonoForge Header Mockup */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  MonoForge Enhanced
                </span>
                <span className="text-xs font-mono text-neutral-400">README.md</span>
              </div>
              <span className="text-[11px] font-mono text-amber-400">100% Camo Safe</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-neutral-100 flex items-center gap-2">
                <span>Hi, I'm Alex Vance</span>
                <span className="text-amber-400">⚡</span>
              </h2>
              <p className="text-xs font-mono text-cyan-300">
                Staff Cloud Systems &amp; Distributed Engine Specialist
              </p>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Building zero-latency microservices, WebAssembly plugins, and edge orchestration frameworks with Rust &amp; TypeScript.
              </p>
            </div>

            {/* Simulated Live Camo Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-cyan-800/60 text-cyan-300 font-mono text-[10px] font-bold">
                REACT 19
              </span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-amber-800/60 text-amber-300 font-mono text-[10px] font-bold">
                NEXT.JS 16
              </span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-orange-800/60 text-orange-300 font-mono text-[10px] font-bold">
                RUST CORE
              </span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-emerald-800/60 text-emerald-300 font-mono text-[10px] font-bold">
                DOCKER &amp; K8S
              </span>
            </div>

            {/* Simulated 3D Isometric Calendar / Bento Widget */}
            <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-neutral-400">3D Isometric Contribution Sphere</span>
                <span className="text-emerald-400">1,842 Commits • Top 1% Velocity</span>
              </div>
              {/* Mini commit bar simulation */}
              <div className="grid grid-cols-12 gap-1.5 h-10 items-end pt-1">
                {[40, 75, 90, 60, 85, 100, 70, 95, 65, 80, 100, 90].map((h, i) => (
                  <div
                    key={i}
                    className="rounded-sm bg-gradient-to-t from-emerald-600 to-emerald-400"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BEFORE (Clipped Layer: Generic Raw Profile) */}
        <div
          className="absolute inset-0 bg-[#0d1117] flex flex-col p-6 sm:p-8 border-r-2 border-amber-400 overflow-hidden shadow-2xl transition-all duration-75"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="space-y-4 max-w-3xl min-w-[340px]">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                  Standard Default
                </span>
                <span className="text-xs font-mono text-neutral-500">README.md</span>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">Unstyled Text</span>
            </div>

            <div className="space-y-2 font-mono">
              <h2 className="text-xl font-normal text-neutral-300">
                # Alex Vance
              </h2>
              <p className="text-xs text-neutral-400">
                Software Engineer looking for opportunities.
              </p>
              <ul className="text-xs text-neutral-500 list-disc list-inside space-y-1 pt-1">
                <li>I code in JavaScript and Python.</li>
                <li>I like to learn new technologies.</li>
                <li>Contact me at alex@example.com</li>
              </ul>
              <div className="p-3 rounded border border-neutral-800 bg-neutral-900 text-neutral-500 text-xs">
                [No activity graph or visual telemetry configured]
              </div>
            </div>
          </div>
        </div>

        {/* Floating Draggable Slider Divider */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none flex items-center justify-center -ml-4"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-lg border-2 border-neutral-950 font-mono text-xs font-extrabold cursor-ew-resize">
            ⇄
          </div>
        </div>

        {/* Badges Overlay */}
        <div className="absolute bottom-3 left-4 pointer-events-none">
          <span className="px-2 py-1 rounded bg-neutral-950/80 border border-neutral-800 text-[10px] font-mono text-neutral-400 backdrop-blur-sm">
            BEFORE (Default)
          </span>
        </div>
        <div className="absolute bottom-3 right-4 pointer-events-none">
          <span className="px-2 py-1 rounded bg-neutral-950/80 border border-amber-500/40 text-[10px] font-mono text-amber-300 backdrop-blur-sm">
            AFTER (MonoForge)
          </span>
        </div>
      </div>

      {/* Feature Comparison Checklist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-neutral-800">
        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-neutral-200">100% Camo Compliant</span>
            <p className="text-[11px] text-neutral-400">Zero broken image icons or CDN blocklists on GitHub profile page.</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-neutral-200">47+ Telemetry Modules</span>
            <p className="text-[11px] text-neutral-400">Live isometric commit cities, WakaTime coding pace, and LeetCode ranks.</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-neutral-200">Kinetic Vector Characters</span>
            <p className="text-[11px] text-neutral-400">Cyber Monkey, Pixel Dev, Ninja Coder, and custom interactive avatars.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTransformationDeck;
