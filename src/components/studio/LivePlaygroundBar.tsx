'use client';

import { useState } from 'react';
import { Link } from '#/i18n/navigation';
import {
  Copy,
  Check,
  Code2,
} from 'lucide-react';
import { toast } from 'sonner';

const SAMPLE_USERS = ['octocat', 'shadcn', 'torvalds', 'yuvraj-thakur-exe'];

export function LivePlaygroundBar() {
  const [username, setUsername] = useState('octocat');
  const [activePlugin, setActivePlugin] = useState<'isocalendar' | 'habits' | 'languages'>('isocalendar');
  const [copied, setCopied] = useState(false);

  const embedUrl = `https://monoforge-studio.vercel.app/api/telemetry/svg?plugin=${activePlugin}&user=${encodeURIComponent(username || 'octocat')}`;
  const markdownSnippet = `<a href="https://github.com/${username}">\n  <img src="${embedUrl}" alt="${username}'s MonoForge Telemetry" width="100%" />\n</a>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownSnippet);
    setCopied(true);
    toast.success(`Copied Camo SVG Markdown for @${username}!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative bg-white bg-white border-b-2 border-neutral-900 border-neutral-900 py-12 sm:py-16 px-4 sm:px-6 transition-colors">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-neutral-900 border-neutral-900 pb-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-neutral-900 text-neutral-950 mb-1.5">
              <span className="px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black border border-neutral-900">
                LIVE SANDBOX
              </span>
              <span>INSTANT TELEMETRY PREVIEW</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-950 text-neutral-950 uppercase font-sans">
              TEST YOUR GITHUB HANDLE LIVE.
            </h2>
          </div>

          <p className="text-xs font-mono text-neutral-600 text-neutral-600 max-w-sm">
            Type any GitHub username to see real 60fps Camo SVGs generated on the fly with zero external servers.
          </p>
        </div>

        {/* Input & Sample Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-3 text-sm font-mono text-neutral-400 select-none">@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              placeholder="github-username"
              className="w-full pl-8 pr-4 py-2.5 rounded-xl border-2 border-neutral-900 border-neutral-900 bg-[#fafafa] bg-white text-neutral-950 text-neutral-950 font-mono text-sm font-bold shadow-[2px_2px_0px_#18181b]  focus:outline-hidden focus:border-[#ffe600]"
            />
          </div>

          {/* Sample Handle Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[11px] font-mono text-neutral-500 font-bold hidden md:inline">TRY:</span>
            {SAMPLE_USERS.map((user) => (
              <button
                key={user}
                type="button"
                onClick={() => setUsername(user)}
                className={`px-2.5 py-2 rounded-lg font-mono text-xs font-bold border-2 transition-all ${
                  username === user
                    ? 'bg-[#ffe600] text-neutral-950 border-neutral-950 shadow-[2px_2px_0px_#18181b]'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 text-neutral-800 border-neutral-300 border-neutral-900 hover:border-neutral-900'
                }`}
              >
                @{user}
              </button>
            ))}
          </div>
        </div>

        {/* Plugin Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-neutral-200 border-neutral-900 pb-3">
          {[
            { id: 'isocalendar', label: '3D ISOMETRIC CALENDAR' },
            { id: 'habits', label: 'CODING HABITS & HOURS' },
            { id: 'languages', label: 'LANGUAGE BREAKDOWN' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActivePlugin(tab.id as typeof activePlugin)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-black transition-all ${
                activePlugin === tab.id
                  ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-xs'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 text-neutral-600 hover:text-neutral-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live SVG Preview Card */}
        <div className="rounded-2xl border-2 border-neutral-900 border-neutral-900 bg-[#fafafa] bg-white p-6 sm:p-8 shadow-[6px_6px_0px_#18181b]  space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 border-neutral-900 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-neutral-900 text-neutral-950">
                LIVE OUTPUT FOR @{username || 'octocat'}
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 font-bold hidden sm:inline">
              100% GITHUB CAMO CDN SAFE // NO BROKEN IMAGES
            </span>
          </div>

          {/* SVG Frame */}
          <div className="p-4 rounded-xl bg-white bg-white border-2 border-neutral-900/10 border-neutral-900 flex items-center justify-center min-h-[160px] overflow-hidden">
            {/* Direct Image Call to Native Edge Endpoint */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/telemetry/svg?plugin=${activePlugin}&user=${encodeURIComponent(username || 'octocat')}`}
              alt={`${username} telemetry`}
              className="max-w-full h-auto drop-shadow-sm transition-opacity duration-200"
            />
          </div>

          {/* Copy Snippet Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <span className="text-xs font-mono text-neutral-500 truncate">
              {embedUrl}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#ffe600] hover:bg-[#ffdf00] text-neutral-950 font-mono text-xs font-black border-2 border-neutral-900 shadow-[2px_2px_0px_#18181b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-neutral-950" /> : <Copy className="w-3.5 h-3.5 text-neutral-950" />}
                <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY MARKDOWN'}</span>
              </button>

              <Link
                href="/developer"
                className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-950 text-white dark:bg-neutral-100 dark:text-neutral-950 font-mono text-xs font-bold border-2 border-neutral-900 border-neutral-900 shadow-[2px_2px_0px_#18181b]  hover:bg-neutral-800 transition-all"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>OPEN IN /DEVELOPER</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
