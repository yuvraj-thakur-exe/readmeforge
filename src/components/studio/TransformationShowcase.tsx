'use client';

import { useState } from 'react';
import { Link } from '#/i18n/navigation';
import {
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { MonoForgeMonkeyIcon } from '#/components/common/MonoForgeLogo';

export function TransformationShowcase() {
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');

  return (
    <section className="relative bg-[#fafafa] bg-white border-b-2 border-neutral-900 border-neutral-900 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-neutral-900 border-neutral-900 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-900 text-neutral-950 mb-2">
              <span className="px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black border border-neutral-900">
                [ 03 // VISUAL TRANSFORMATION ]
              </span>
              <span>POULO STYLE DUAL STATE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 text-neutral-950 uppercase font-sans">
              THE NIGHT &amp; DAY DIFFERENCE.
            </h2>
          </div>

          {/* Toggle Switch */}
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white bg-white border-2 border-neutral-900 border-neutral-900 shadow-[2px_2px_0px_#18181b] ">
            <button
              type="button"
              onClick={() => setViewMode('before')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                viewMode === 'before'
                  ? 'bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              BORING DEFAULT README
            </button>
            <button
              type="button"
              onClick={() => setViewMode('after')}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'after'
                  ? 'bg-[#ffe600] text-neutral-950 font-black border border-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>MONOFORGE PROFILE</span>
            </button>
          </div>
        </div>

        {/* Viewport Card */}
        <div className="relative rounded-2xl border-2 border-neutral-900 border-neutral-900 bg-white bg-white shadow-[6px_6px_0px_#18181b]  overflow-hidden">
          {/* GitHub Window Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 border-neutral-900">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 border border-neutral-900/40" />
              <span className="w-3 h-3 rounded-full bg-amber-400 border border-neutral-900/40" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 border border-neutral-900/40" />
              <span className="text-xs font-mono text-neutral-600 text-neutral-600 font-semibold ml-2">
                github.com/developer/developer/README.md
              </span>
            </div>
            <div className="text-[11px] font-mono text-neutral-500">
              {viewMode === 'after' ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  ✓ MONOFORGE 60FPS CAMO ENGINE
                </span>
              ) : (
                <span className="text-red-500 font-bold">⚠ DEFAULT TEMPLATE</span>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 font-sans">
            {viewMode === 'before' ? (
              /* BORING BEFORE STATE */
              <div className="space-y-4 max-w-xl text-neutral-600 text-neutral-600 font-mono text-sm leading-relaxed opacity-75">
                <div className="inline-block px-2 py-0.5 rounded bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs font-bold mb-2">
                  Generic GitHub Starter
                </div>
                <h3 className="text-xl font-bold text-neutral-900 text-neutral-950">
                  Hi there 👋
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>🔭 I’m currently working on my personal portfolio...</li>
                  <li>🌱 I’m currently learning Rust and TypeScript...</li>
                  <li>👯 I’m looking to collaborate on open source projects...</li>
                  <li>💬 Ask me about React, Next.js, and CSS...</li>
                  <li>📫 How to reach me: myemail@example.com</li>
                  <li>⚡ Fun fact: I drink a lot of coffee!</li>
                </ul>
                <div className="pt-6 text-xs text-neutral-400 italic">
                  (Visitors bounce after 3 seconds. Zero personality. Zero visual retention.)
                </div>
              </div>
            ) : (
              /* MONOFORGE ICONIC AFTER STATE */
              <div className="space-y-8">
                {/* Hero HUD Banner */}
                <div className="rounded-xl border-2 border-neutral-900 border-neutral-900 bg-neutral-950 text-white p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-15">
                    <MonoForgeMonkeyIcon className="w-32 h-32" />
                  </div>
                  <div className="relative z-10 space-y-3">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-mono text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>FULL-STACK ARCHITECT // SYSTEMS ENGINEER</span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black font-sans tracking-tight">
                      ALEXANDER FORGE
                    </h2>
                    <p className="text-xs sm:text-sm font-mono text-neutral-300 max-w-lg">
                      Architecting distributed systems, zero-dependency CLIs, and 60fps GPU web applications.
                    </p>
                  </div>
                </div>

                {/* Telemetry Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Stat Card 1 */}
                  <div className="p-4 rounded-xl border border-neutral-200 border-neutral-900 bg-neutral-50 bg-white font-mono text-xs">
                    <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                      YEARLY CONTRIBUTIONS
                    </span>
                    <span className="text-2xl font-black text-neutral-900 text-neutral-950">
                      2,419
                    </span>
                    <span className="text-[10px] text-emerald-500 font-bold block mt-1">
                      Top 2% Worldwide
                    </span>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="p-4 rounded-xl border border-neutral-200 border-neutral-900 bg-neutral-50 bg-white font-mono text-xs">
                    <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                      CORE STACK
                    </span>
                    <span className="text-sm font-bold text-neutral-900 text-neutral-950 block">
                      TypeScript &bull; Rust &bull; Go
                    </span>
                    <span className="text-[10px] text-amber-500 font-bold block mt-1">
                      Verified Commit Distribution
                    </span>
                  </div>

                  {/* Stat Card 3 */}
                  <div className="p-4 rounded-xl border border-neutral-200 border-neutral-900 bg-neutral-50 bg-white font-mono text-xs">
                    <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                      TELEMETRY STATUS
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block">
                      Active Action Sync
                    </span>
                    <span className="text-[10px] text-neutral-400 block mt-1">
                      Midnight UTC Daily Dispatch
                    </span>
                  </div>
                </div>

                {/* CTA inside preview */}
                <div className="pt-2 flex items-center justify-between border-t border-neutral-200 border-neutral-900">
                  <span className="text-xs font-mono text-neutral-500">
                    Ready to transform your own profile in 60 seconds?
                  </span>
                  <Link
                    href="/wizard"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-neutral-950 dark:bg-neutral-100 text-white dark:text-neutral-950 font-bold text-xs hover:bg-amber-400 hover:text-neutral-950 transition-colors"
                  >
                    <span>Forge My Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
