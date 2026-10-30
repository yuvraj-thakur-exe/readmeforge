'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { Sparkles, Check, Bot, Plus, Headphones } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CyberMonkeyCopilotProps {
  className?: string;
}

const MONKEY_QUOTES = [
  'Zero monkey business in this config. Looking solid!',
  'Need more telemetry? Check out the 3D Isometric Calendar!',
  'All SVG vectors are 100% Camo safe and 60fps.',
  'Turbopack is blazing. 0ms lag on live previews.',
  'Ooh ooh aah! Click Banana Fuel if you need a creative boost!',
  'Confirmation gates protect your GitHub repository from unverified writes.',
];

export const CyberMonkeyCopilot: React.FC<CyberMonkeyCopilotProps> = ({
  className = '',
}) => {
  const config = useReadmeStore(state => state.config);
  const addSection = useReadmeStore(state => state.addSection);

  const [quoteIdx, setQuoteIdx] = useState<number>(0);
  const [visorActive, setVisorActive] = useState<boolean>(true);
  const [beatsActive, setBeatsActive] = useState<boolean>(false);
  const [fuelCount, setFuelCount] = useState<number>(3);
  const [isCopiedPrompt, setIsCopiedPrompt] = useState<boolean>(false);
  const [quickInsertSuccess, setQuickInsertSuccess] = useState<string | null>(null);

  const sectionsCount = config.sections?.length || 0;

  const cycleQuote = () => {
    setQuoteIdx(prev => (prev + 1) % MONKEY_QUOTES.length);
  };

  const handleBananaFuel = () => {
    setFuelCount(prev => prev + 1);
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#f59e0b', '#fbbf24', '#10b981'],
      });
    } catch {
      // Ignored
    }
  };

  const handleQuickInsert = (pluginId: string, name: string) => {
    addSection(pluginId, { content: {}, styles: {}, state: 'default' });
    setQuickInsertSuccess(name);
    try {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#10b981'],
      });
    } catch {
      // Ignored
    }
    setTimeout(() => setQuickInsertSuccess(null), 2000);
  };

  const handleCopyPrompt = async () => {
    const prompt = `Act as an elite developer relations engineer. Help me craft a modern GitHub profile README with clean architectural badges, 3D telemetry widgets, and Camo-safe vector avatars using MonoForge. My username is "${config.settings.user.github || 'octocat'}".`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(prompt);
      setIsCopiedPrompt(true);
      setTimeout(() => setIsCopiedPrompt(false), 2000);
    }
  };

  return (
    <div
      className={`rounded-xl border border-neutral-800 bg-neutral-900/95 p-4 text-xs backdrop-blur-md shadow-xl ${className}`}
    >
      {/* Top Copilot Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              🐵
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-neutral-900 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-neutral-200">Cyber Monkey Co-Pilot</span>
              <span className="text-[9px] font-mono px-1 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                ACTIVE
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-mono">
              {sectionsCount} profile module{sectionsCount === 1 ? '' : 's'} configured
            </p>
          </div>
        </div>

        {/* Gear Toggles */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setVisorActive(!visorActive)}
            className={`p-1.5 rounded transition-colors ${
              visorActive ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/50' : 'bg-neutral-800 text-neutral-400'
            }`}
            title="Toggle Cyber Visor HUD"
          >
            <Bot className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setBeatsActive(!beatsActive)}
            className={`p-1.5 rounded transition-colors ${
              beatsActive ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50' : 'bg-neutral-800 text-neutral-400'
            }`}
            title="Toggle Studio Beats"
          >
            <Headphones className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleBananaFuel}
            className="flex items-center gap-1 px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 font-mono text-[10px] font-bold"
            title="Add Banana Fuel"
          >
            <span>🍌</span>
            <span>{fuelCount}</span>
          </button>
        </div>
      </div>

      {/* Interactive Speech Bubble */}
      <div
        onClick={cycleQuote}
        className="my-3 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-[11px] cursor-pointer hover:border-amber-500/50 transition-colors select-none group"
        title="Click to cycle co-pilot tip"
      >
        <div className="flex items-start gap-1.5">
          <span className="text-amber-400 mt-0.5">💬</span>
          <span className="leading-relaxed flex-1">
            "{MONKEY_QUOTES[quoteIdx]}"
          </span>
          <span className="text-[9px] text-neutral-500 group-hover:text-amber-400 transition-colors font-sans">
            [next]
          </span>
        </div>
      </div>

      {/* Fast Actions Strip */}
      <div className="space-y-2 pt-1 border-t border-neutral-800/80">
        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold block">
          Telemetry Quick Inserts
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            type="button"
            onClick={() => handleQuickInsert('isometric-calendar', '3D Calendar')}
            className="flex items-center justify-between p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700/80 border border-neutral-700/60 text-neutral-200 text-left transition-colors text-[10px] font-mono"
          >
            <span>3D Commit City</span>
            <Plus className="w-3 h-3 text-cyan-400" />
          </button>

          <button
            type="button"
            onClick={() => handleQuickInsert('habits', 'Coding Habits')}
            className="flex items-center justify-between p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700/80 border border-neutral-700/60 text-neutral-200 text-left transition-colors text-[10px] font-mono"
          >
            <span>Habits Radar</span>
            <Plus className="w-3 h-3 text-amber-400" />
          </button>

          <button
            type="button"
            onClick={() => handleQuickInsert('languages', 'Languages Bar')}
            className="flex items-center justify-between p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700/80 border border-neutral-700/60 text-neutral-200 text-left transition-colors text-[10px] font-mono"
          >
            <span>Language Stats</span>
            <Plus className="w-3 h-3 text-emerald-400" />
          </button>

          <button
            type="button"
            onClick={() => handleQuickInsert('leetcode', 'LeetCode Rank')}
            className="flex items-center justify-between p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700/80 border border-neutral-700/60 text-neutral-200 text-left transition-colors text-[10px] font-mono"
          >
            <span>LeetCode Stats</span>
            <Plus className="w-3 h-3 text-orange-400" />
          </button>
        </div>

        {quickInsertSuccess && (
          <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] flex items-center gap-1.5 animate-fade-in">
            <Check className="w-3 h-3" />
            <span>Inserted {quickInsertSuccess} into profile!</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleCopyPrompt}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-[10px] font-semibold border border-neutral-700/70 transition-all active:scale-98"
        >
          {isCopiedPrompt ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-300">Prompt Copied!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Copy AI Prompt For This Profile</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CyberMonkeyCopilot;
