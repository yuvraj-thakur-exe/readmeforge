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
} from 'lucide-react';

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

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981'],
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
      triggerCelebration();
    } catch {
      // Fallback
    }
  };

  const handleDownloadJson = () => {
    try {
      const json = JSON.stringify(config, null, 2);
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'readmeforge-config.json';
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
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(config))));
      const shareUrl = `${window.location.origin}/developer?config=${encoded}`;
      await navigator.clipboard.writeText(shareUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyAiPrompt = async () => {
    try {
      const prompt = `Act as an expert GitHub Profile README engineer.
I am configuring my profile README via ReadmeForge (https://readmeforge.vercel.app).
Schema Documentation: https://readmeforge.vercel.app/api/schema
AI Guidance: https://readmeforge.vercel.app/llms.txt

Here is my current profile JSON configuration:
\`\`\`json
${JSON.stringify(config, null, 2)}
\`\`\`

Please update or enhance this ReadmeConfig JSON. Return only the valid JSON.`;
      await navigator.clipboard.writeText(prompt);
      setCopiedAiPrompt(true);
      setTimeout(() => setCopiedAiPrompt(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className={`flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-neutral-900 border-t border-neutral-800 text-xs ${className}`}>
      {/* Undo / Redo / Reset */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={undo}
          disabled={history.length === 0}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-neutral-800 text-neutral-300 transition-colors"
          title="Undo"
        >
          <Undo2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Undo</span>
        </button>

        <button
          type="button"
          onClick={redo}
          disabled={future.length === 0}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 disabled:hover:bg-neutral-800 text-neutral-300 transition-colors"
          title="Redo"
        >
          <Redo2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Redo</span>
        </button>

        <button
          type="button"
          onClick={resetConfig}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors"
          title="Reset to default config"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Export Actions */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleCopyAiPrompt}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-cyan-300 border border-cyan-800/40 hover:border-cyan-700 transition-colors"
          title="Copy pre-engineered prompt and config for AI coding agents"
        >
          {copiedAiPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bot className="w-3.5 h-3.5 text-cyan-400" />}
          <span>{copiedAiPrompt ? 'Prompt Copied!' : 'AI Prompt'}</span>
        </button>

        <button
          type="button"
          onClick={handleShareUrl}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
          title="Copy shareable configuration URL"
        >
          {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          <span>{copiedUrl ? 'URL Copied!' : 'Share URL'}</span>
        </button>

        <button
          type="button"
          onClick={handleDownloadJson}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
          title="Download JSON config"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden md:inline">JSON</span>
        </button>

        {onOpenSync && (
          <button
            type="button"
            onClick={onOpenSync}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
            title="Push directly to GitHub repository"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sync</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleDownloadMarkdown}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
          title="Download README.md file"
        >
          <Download className="w-3.5 h-3.5" />
          <span>README.md</span>
        </button>

        <button
          type="button"
          onClick={handleCopyMarkdown}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-medium shadow-sm transition-all"
          title="Copy markdown with celebratory confetti"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Sparkles className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy README'}</span>
        </button>
      </div>
    </div>
  );
};

export default ExportBar;
