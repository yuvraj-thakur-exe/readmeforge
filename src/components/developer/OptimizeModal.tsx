'use client';

import React, { useState } from 'react';
import { optimizeMarkdown, OptimizationResult } from '#/lib/optimizer/markdown-optimizer';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';
import confetti from 'canvas-confetti';
import {
  Zap,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Check,
  X,
  Gauge,
  Sparkles,
  Download,
  Flame,
} from 'lucide-react';
import { toast } from 'sonner';

interface OptimizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OptimizeModal: React.FC<OptimizeModalProps> = ({ isOpen, onClose }) => {
  const config = useReadmeStore(state => state.config);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rawMarkdown = buildMarkdown(config);
  const result: OptimizationResult = optimizeMarkdown(rawMarkdown);

  const handleCopyOptimized = async () => {
    try {
      await navigator.clipboard.writeText(result.optimizedMarkdown);
      setCopied(true);
      toast.success('Optimized README copied to clipboard!');

      // Tactile sound & confetti
      if (typeof window !== 'undefined') {
        (window as unknown as { __monoforge_playClick?: (freq?: number) => void }).__monoforge_playClick?.(1300);
      }

      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#ffe600', '#18181b', '#10b981', '#38bdf8'],
      });

      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy optimized markdown');
    }
  };

  const handleDownloadOptimized = () => {
    try {
      const blob = new Blob([result.optimizedMarkdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'README.optimized.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Downloaded optimized README.md');
    } catch {
      toast.error('Failed to download');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-100 rounded-2xl shadow-[8px_8px_0px_#18181b] dark:shadow-[8px_8px_0px_#f4f4f5] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#ffe600] border-b-2 border-neutral-900 text-neutral-950">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-neutral-950 text-[#ffe600] border border-neutral-900 shadow-xs">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight font-mono uppercase">
                MONOFORGE Telemetry Optimizer
              </h2>
              <p className="text-xs font-mono font-bold text-neutral-800">
                100% GitHub Camo CDN Ready • Zero-Lag Output
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-neutral-950 border border-neutral-900 transition-all hover:scale-105"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-neutral-900 dark:text-neutral-100">
          {/* Key Metrics Bento */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 shadow-[2px_2px_0px_#18181b]">
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">Camo Score</span>
              <div className="flex items-center gap-1.5 mt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-lg font-black font-mono text-emerald-600">{result.stats.camoScore}%</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 shadow-[2px_2px_0px_#18181b]">
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">Payload Savings</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Flame className="w-4 h-4 text-amber-500" />
                <span className="text-lg font-black font-mono text-amber-500">{result.stats.percentSaved}%</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 shadow-[2px_2px_0px_#18181b]">
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">Edge Cache Latency</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Gauge className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-black font-mono text-blue-500">{result.stats.latencyEstimate}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-700 shadow-[2px_2px_0px_#18181b]">
              <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase block">Optimized Size</span>
              <div className="flex items-center gap-1.5 mt-1">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-black font-mono text-neutral-900 dark:text-neutral-100">
                  {result.stats.optimizedBytes} bytes
                </span>
              </div>
            </div>
          </div>

          {/* Checklist of Optimizations Applied */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border-2 border-neutral-900 dark:border-neutral-700 space-y-2">
            <h3 className="text-xs font-mono font-black uppercase text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verified Telemetry &amp; Camo Rules
            </h3>
            <ul className="space-y-1.5 pt-1 text-xs font-mono">
              {result.stats.improvements.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Preview Box */}
          <div className="relative rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-950 p-3 max-h-40 overflow-y-auto">
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase mb-1 block">
              Optimized Output Stream:
            </span>
            <pre className="text-[11px] font-mono text-neutral-300 whitespace-pre-wrap select-all">
              {result.optimizedMarkdown.slice(0, 500)}...
            </pre>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-neutral-100 dark:bg-neutral-800 border-t-2 border-neutral-900 dark:border-neutral-700 gap-3">
          <div className="text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400">
            Saved {result.stats.bytesSaved} bytes across {result.stats.imageCount} telemetry blocks
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadOptimized}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white dark:bg-neutral-700 border-2 border-neutral-900 text-neutral-950 dark:text-neutral-100 font-mono text-xs font-bold shadow-[2px_2px_0px_#18181b] hover:bg-neutral-50 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              type="button"
              onClick={handleCopyOptimized}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ffe600] hover:bg-[#ffd900] text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY OPTIMIZED README'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

