'use client';

import React, { useState } from 'react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';
import confetti from 'canvas-confetti';
import {
  Check,
  Download,
  Share2,
  Undo2,
  Redo2,
  RotateCcw,
  Sparkles,
  Github,
  Bot,
  Zap,
} from 'lucide-react';
import { OptimizeModal } from './OptimizeModal';

interface ExportBarProps {
  onOpenSync?: () => void;
  className?: string;
}

export const ExportBar: React.FC<ExportBarProps> = ({ onOpenSync, className = '' }) => {
  const config = useReadmeStore(state => state.config);
  const undo = useReadmeStore(state => state.undo);
  const redo = useReadmeStore(state => state.redo);
  const resetConfig = useReadmeStore(state => state.resetConfig);
  const history = useReadmeStore(state => state.history);
  const future = useReadmeStore(state => state.future);

  const [copied, setCopied] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [copiedAiPrompt, setCopiedAiPrompt] = useState<boolean>(false);
  const [isOptimizeOpen, setIsOptimizeOpen] = useState<boolean>(false);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#f59e0b', '#06b6d4', '#10b981', '#fbbf24'],
      });
    } catch {
      // Ignored if canvas not available
    }
  };

  const handleCopyMarkdown = async () => {
    try {
      const markdown = buildMarkdown(config);
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      triggerCelebration();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadMarkdown = () => {
    try {
      const markdown = buildMarkdown(config);
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'README.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback
    }
  };

  const handleShareUrl = async () => {
    try {
      const json = JSON.stringify(config);
      const base64 = btoa(unescape(encodeURIComponent(json)));
      const url = `${window.location.origin}${window.location.pathname}?config=${base64}`;
      await navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyAiPrompt = async () => {
    try {
      const json = JSON.stringify(config, null, 2);
      const prompt = `I am using MonoForge to craft my GitHub profile README. Below is my current configuration JSON conforming to the official schema. Please help me review, optimize, and suggest additional visual telemetry sections for it. Output only valid MonoForge config JSON:\n\n${json}`;
      await navigator.clipboard.writeText(prompt);
      setCopiedAiPrompt(true);
      setTimeout(() => setCopiedAiPrompt(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-4 py-2 bg-white dark:bg-neutral-900 border-t-2 border-neutral-900 dark:border-neutral-800 text-xs shadow-sm ${className}`}
    >
      {/* History and Reset Controls */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => undo()}
          disabled={history.length === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          title="Undo"
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">UNDO</span>
        </button>

        <button
          type="button"
          onClick={() => redo()}
          disabled={future.length === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          title="Redo"
        >
          <Redo2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">REDO</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (confirm('Reset entire configuration to default? All changes will be cleared.')) {
              resetConfig();
            }
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-red-50 dark:bg-neutral-800 dark:hover:bg-red-950/30 border border-neutral-300 dark:border-neutral-700 text-neutral-600 hover:text-red-600 transition-colors font-mono text-xs font-bold ml-1"
          title="Reset configuration to empty profile"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">RESET</span>
        </button>
      </div>

      {/* Center status message */}
      <div className="hidden lg:flex items-center gap-2 text-neutral-500 font-mono text-[11px] font-bold">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>MONOFORGE AST LINT ENGINE ACTIVE</span>
      </div>

      {/* Export & Push Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopyAiPrompt}
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-bold transition-all"
          title="Copy config wrapped in AI assistant prompt"
        >
          {copiedAiPrompt ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Bot className="w-3.5 h-3.5 text-amber-500" />
          )}
          <span>{copiedAiPrompt ? 'PROMPT COPIED' : 'AI PROMPT'}</span>
        </button>

        <button
          type="button"
          onClick={handleShareUrl}
          className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 font-mono text-xs font-bold transition-all"
          title="Copy shareable URL containing base64 configuration"
        >
          {copiedUrl ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Share2 className="w-3.5 h-3.5 text-cyan-500" />
          )}
          <span>{copiedUrl ? 'LINK COPIED' : 'SHARE'}</span>
        </button>

        {onOpenSync && (
          <button
            type="button"
            onClick={onOpenSync}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 dark:border-neutral-100 shadow-[2px_2px_0px_#18181b] dark:shadow-[2px_2px_0px_#f4f4f5] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            title="Push directly to GitHub repository"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">PUSH GITHUB</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleDownloadMarkdown}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 border-2 border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 font-mono text-xs font-bold shadow-[2px_2px_0px_#18181b] dark:shadow-[2px_2px_0px_#f4f4f5] hover:bg-neutral-100 transition-all btn-tactile"
          title="Download README.md file"
        >
          <Download className="w-3.5 h-3.5" />
          <span>README.MD</span>
        </button>

        <button
          type="button"
          onClick={() => setIsOptimizeOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all btn-tactile"
          title="Optimize Markdown output for GitHub Camo CDN caching and size reduction"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>OPTIMIZE</span>
        </button>

        <button
          type="button"
          onClick={handleCopyMarkdown}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-[3px_3px_0px_#18181b] hover:shadow-[1px_1px_0px_#18181b] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all btn-tactile"
          title="Copy markdown with celebratory confetti"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-neutral-950" /> : <Sparkles className="w-3.5 h-3.5 text-neutral-950" />}
          <span>{copied ? 'COPIED!' : 'COPY README'}</span>
        </button>
      </div>

      <OptimizeModal isOpen={isOptimizeOpen} onClose={() => setIsOptimizeOpen(false)} />
    </div>
  );
};

export default ExportBar;
