'use client';

import { useState } from 'react';
import { Link } from '#/i18n/navigation';
import {
  BarChart3,
  Code2,
  ShieldCheck,
  Terminal,
  Zap,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';

type TelemetryTab = 'isocalendar' | 'habits' | 'languages' | 'achievements';

export function StudioBento() {
  const [telemetryTab, setTelemetryTab] = useState<TelemetryTab>('isocalendar');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copySnippet = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(label);
    toast.success(`Copied ${label} snippet!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="relative bg-white bg-white border-b border-neutral-200 border-neutral-900 py-16 sm:py-24 px-4 sm:px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header: Editorial & Technical */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-neutral-900 border-neutral-900 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              <span>[ 02 // CRAFT ARCHITECTURE ]</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-neutral-500">NO FLUFF. PURE HARDWARE-ACCELERATED SVGS.</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 text-neutral-950 uppercase">
              THE MONOFORGE ARSENAL.
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-neutral-600 text-neutral-600 max-w-md">
            Everything your profile needs to command respect: 47+ native telemetry engines, split Monaco IDE, and 60fps Camo SVGs with zero external tracking servers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Card 1: 47+ Telemetry Engine (7 cols) */}
          <div className="md:col-span-7 rounded-2xl border-2 border-neutral-900 border-neutral-900 bg-[#fafafa] bg-white p-6 sm:p-8 shadow-[4px_4px_0px_#18181b]  flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 font-bold shadow-[2px_2px_0px_#18181b]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-neutral-950 text-neutral-950 uppercase font-sans">
                      MonoForge Native Telemetry
                    </h3>
                    <p className="text-xs font-mono text-neutral-500">
                      47+ Plugins &bull; 335 Options &bull; Zero External Server Calls
                    </p>
                  </div>
                </div>

                <Link
                  href="/telemetry"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 text-xs font-mono font-black shadow-[2px_2px_0px_#18181b] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                >
                  <span>Explore All 47</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Telemetry Tabs */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-b border-neutral-200 border-neutral-900 pb-3">
                {[
                  { id: 'isocalendar', label: '3D Isocalendar' },
                  { id: 'habits', label: 'Coding Habits' },
                  { id: 'languages', label: 'Language Breakdown' },
                  { id: 'achievements', label: 'Trophy Matrix' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setTelemetryTab(tab.id as TelemetryTab)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                      telemetryTab === tab.id
                        ? 'bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 font-black shadow-[2px_2px_0px_#18181b]'
                        : 'bg-white bg-white border border-neutral-300 border-neutral-900 text-neutral-700 text-neutral-600 hover:text-neutral-950'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Live Interactive Telemetry Canvas */}
              <div className="relative rounded-xl border border-neutral-300 border-neutral-900 bg-white bg-white p-4 min-h-[220px] flex items-center justify-center overflow-hidden">
                {telemetryTab === 'isocalendar' && (
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                      <span>ISOMETRIC CONTRIBUTION CALENDAR (365 DAYS)</span>
                      <span className="text-emerald-500 font-bold">1,842 COMMITS</span>
                    </div>
                    {/* Simulated Isometric SVG commit grid */}
                    <div className="grid grid-cols-12 gap-1.5 p-3 rounded-lg bg-neutral-50 bg-white border border-neutral-200 border-neutral-900">
                      {Array.from({ length: 48 }).map((_, i) => {
                        const level = (i * 7) % 5;
                        const colors = [
                          'bg-neutral-200 dark:bg-neutral-800',
                          'bg-emerald-200 dark:bg-emerald-950',
                          'bg-emerald-400 dark:bg-emerald-800',
                          'bg-emerald-500 dark:bg-emerald-600',
                          'bg-emerald-600 dark:bg-emerald-400',
                        ];
                        return (
                          <div
                            key={i}
                            className={`h-4 rounded-xs ${colors[level]} transition-transform hover:scale-125`}
                            title={`Day ${i + 1}: ${level * 4} commits`}
                          />
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span>RENDER: CAMO-SAFE SVG // NO JS REQUIRED</span>
                      <span>OUTPUT: GITHUB ACTIONS OR HOSTED SVG</span>
                    </div>
                  </div>
                )}

                {telemetryTab === 'habits' && (
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                      <span>MOST PRODUCTIVE CODING HOURS (UTC+0)</span>
                      <span className="text-amber-500 font-bold">PEAK: 21:00 - 02:00</span>
                    </div>
                    <div className="space-y-2 p-3 rounded-lg bg-neutral-50 bg-white border border-neutral-200 border-neutral-900 font-mono text-xs">
                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span>Night Owl Developer Index</span>
                          <span className="text-amber-500">89%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                          <div className="w-[89%] h-full bg-amber-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] mb-1">
                          <span>Weekend Commits</span>
                          <span className="text-cyan-500">64%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                          <div className="w-[64%] h-full bg-cyan-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {telemetryTab === 'languages' && (
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                      <span>VERIFIED LANGUAGE TIME DISTRIBUTION</span>
                      <span className="text-cyan-500 font-bold">14 LANGUAGES</span>
                    </div>
                    <div className="p-3 rounded-lg bg-neutral-50 bg-white border border-neutral-200 border-neutral-900 space-y-2 font-mono text-xs">
                      <div className="flex h-3 rounded-full overflow-hidden w-full gap-0.5">
                        <div className="w-[45%] bg-[#3178c6]" title="TypeScript 45%" />
                        <div className="w-[28%] bg-[#dea584]" title="Rust 28%" />
                        <div className="w-[15%] bg-[#f7df1e]" title="JavaScript 15%" />
                        <div className="w-[12%] bg-[#00add8]" title="Go 12%" />
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] pt-1">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#3178c6]" /> TypeScript 45%</span>
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#dea584]" /> Rust 28%</span>
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#f7df1e]" /> JavaScript 15%</span>
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#00add8]" /> Go 12%</span>
                      </div>
                    </div>
                  </div>
                )}

                {telemetryTab === 'achievements' && (
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                      <span>SPECIALIZED GITHUB TROPHY MATRIX</span>
                      <span className="text-amber-500 font-bold">TIER: MASTER</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-3 rounded-lg bg-neutral-50 bg-white border border-neutral-200 border-neutral-900 text-center font-mono text-[10px]">
                      {['PULL SHARK', 'QUICKDRAW', 'YOLO', 'PAIR DEV', 'GALAXY', 'ARCTIC'].map((trophy, i) => (
                        <div key={i} className="p-2 rounded bg-white bg-white border border-neutral-200 border-neutral-900">
                          <span className="text-amber-500 text-base block mb-0.5">🏆</span>
                          <span className="font-bold block truncate">{trophy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">
                Embed anywhere: GitHub README, portfolio, blog, or resume.
              </span>
              <button
                type="button"
                onClick={() => copySnippet(`<img src="https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=${telemetryTab}&user=octocat" />`, telemetryTab)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                {copiedCode === telemetryTab ? <Check className="w-3.5 h-3.5 text-neutral-950" /> : <Copy className="w-3.5 h-3.5 text-neutral-950" />}
                <span>COPY SVG MARKDOWN</span>
              </button>
            </div>
          </div>

          {/* Bento Card 2: Monaco IDE Raw Mode (5 cols) */}
          <div className="md:col-span-5 rounded-2xl border-2 border-neutral-900 border-neutral-900 bg-[#fafafa] bg-white p-6 sm:p-8 shadow-[4px_4px_0px_#18181b]  flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 font-bold shadow-[2px_2px_0px_#18181b]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-neutral-950 text-neutral-950 uppercase font-sans">
                    /developer Monaco IDE
                  </h3>
                  <p className="text-xs font-mono text-neutral-500">
                    AST-Safe JSON &bull; Real-time Preview &bull; Schema Validated
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-600 text-neutral-600">
                Power users don&apos;t want handholding. Open full-screen Monaco Editor with live AST linting, autocomplete, and split rendered markdown.
              </p>

              {/* Monaco Mockup Box */}
              <div className="rounded-xl border border-neutral-300 border-neutral-900 bg-neutral-950 text-neutral-200 p-4 font-mono text-[11px] leading-relaxed overflow-hidden">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-[10px] text-neutral-500">
                  <span>monoforge-config.json</span>
                  <span className="text-emerald-400">ZOD VALIDATED</span>
                </div>
                <pre className="text-cyan-300">
                  {`{
  "title": "MonoForge Profile",
  "theme": "light",
  "accent": "#f59e0b",
  "archetype": "cyber-monkey-hud",
  "telemetry": [
    "isocalendar", "habits", "languages"
  ]
}`}
                </pre>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/developer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-black text-xs font-mono tracking-wider uppercase border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] hover:shadow-[1px_1px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
              >
                <span>Launch /developer Raw Mode</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Card 3: 60fps Kinetic Vector Animator (4 cols) */}
          <div className="md:col-span-4 rounded-2xl border-2 border-neutral-900 border-neutral-900 bg-[#fafafa] bg-white p-6 shadow-[4px_4px_0px_#18181b]  flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-2 rounded-lg bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 font-bold w-fit shadow-[2px_2px_0px_#18181b]">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-neutral-950 text-neutral-950 uppercase font-sans">
                60fps Vector Characters
              </h3>
              <p className="text-xs text-neutral-600 text-neutral-600 leading-relaxed font-mono">
                Handcrafted animated SVGs: Cyber Bot, Pixel Dev at dual-monitor desk with coffee steam, and Ninja Coder. Pure GPU keyframes, 0% JS.
              </p>
            </div>

            <Link
              href="/animator"
              className="mt-6 inline-flex items-center justify-between text-xs font-mono font-black text-neutral-900 text-neutral-950 hover:text-amber-500 transition-colors pt-3 border-t border-neutral-200 border-neutral-900"
            >
              <span>Open Vector Animator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Bento Card 4: GitHub Camo CDN Guarantee (4 cols) */}
          <div className="md:col-span-4 rounded-2xl border-2 border-neutral-900 border-neutral-900 bg-[#fafafa] bg-white p-6 shadow-[4px_4px_0px_#18181b]  flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-2 rounded-lg bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 font-bold w-fit shadow-[2px_2px_0px_#18181b]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-neutral-950 text-neutral-950 uppercase font-sans">
                100% Camo CDN Safe
              </h3>
              <p className="text-xs text-neutral-600 text-neutral-600 leading-relaxed font-mono">
                Zero external tracking. GitHub sanitizes SVGs through its Camo proxy. MonoForge assets strictly follow Camo specs so images never break.
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-200 border-neutral-900 flex items-center justify-between text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              <span>ZERO &lt;script&gt; TAGS</span>
              <span>PASSED ✓</span>
            </div>
          </div>

          {/* Bento Card 5: 1-Click Authenticated GitHub Sync (4 cols) */}
          <div className="md:col-span-4 rounded-2xl border-2 border-neutral-900 border-neutral-900 bg-[#fafafa] bg-white p-6 shadow-[4px_4px_0px_#18181b]  flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-2 rounded-lg bg-[#ffe600] text-neutral-950 border-2 border-neutral-900 font-bold w-fit shadow-[2px_2px_0px_#18181b]">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="font-black text-base text-neutral-950 text-neutral-950 uppercase font-sans">
                Confirmed GitHub Push
              </h3>
              <p className="text-xs text-neutral-600 text-neutral-600 leading-relaxed font-mono">
                Never silent. Remote README is fetched, side-by-side git diff is previewed, and explicit user confirmation triggers the commit.
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-200 border-neutral-900 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>DIFF VERIFIED</span>
              <span className="font-bold text-neutral-900 text-neutral-950">SAFETY GATE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
