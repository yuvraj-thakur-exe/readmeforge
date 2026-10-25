'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { useReadmeStore } from '#/store/useReadmeStore';
import { useTheme } from 'next-themes';
import {
  Wand2,
  Terminal,
  Sun,
  Moon,
  Laptop,
  Copy,
  Download,
  FileUp,
  Sparkles,
} from 'lucide-react';
import { buildMarkdown } from '#/lib/buildMarkdown';
import confetti from 'canvas-confetti';

interface CommandPaletteProps {
  onOpenImport?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onOpenImport }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const config = useReadmeStore(state => state.config);

  // Toggle Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleCopyMarkdown = async () => {
    const md = buildMarkdown(config);
    await navigator.clipboard.writeText(md);
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    } catch {
      // Ignored
    }
    setOpen(false);
  };

  const handleDownloadMarkdown = () => {
    const md = buildMarkdown(config);
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    link.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  return (
    <>
      {/* Quick trigger hint */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-palette-line bg-palette-soft/50 hover:bg-palette-soft text-palette-contrast/70 text-xs transition-colors"
        title="Open Command Palette (Cmd+K)"
      >
        <Sparkles className="w-3.5 h-3.5 text-violet-400" />
        <span>Quick actions...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-[10px] font-mono text-neutral-400 border border-neutral-700">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      >
        <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
          <div className="flex items-center px-4 border-b border-neutral-800">
            <Command.Input
              placeholder="Type a command or search sections..."
              className="w-full py-3 bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
            />
          </div>

          <Command.List className="max-h-80 overflow-y-auto p-2 text-xs space-y-1">
            <Command.Empty className="py-6 text-center text-neutral-500 text-xs">
              No matching actions found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="text-neutral-500 font-semibold px-2 py-1 uppercase text-[10px]">
              <Command.Item
                onSelect={() => {
                  router.push('/');
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-neutral-200 hover:bg-violet-600/30 hover:text-violet-200 cursor-pointer transition-colors"
              >
                <Wand2 className="w-4 h-4 text-violet-400" />
                <span>Go to Visual Wizard</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  router.push('/developer');
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-neutral-200 hover:bg-violet-600/30 hover:text-violet-200 cursor-pointer transition-colors"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Go to /developer Raw Mode</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  router.push('/animator');
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-neutral-200 hover:bg-cyan-600/30 hover:text-cyan-200 cursor-pointer transition-colors"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Go to Animation Studio (SVG &amp; Presets)</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Export Actions" className="text-neutral-500 font-semibold px-2 py-1 uppercase text-[10px]">
              <Command.Item
                onSelect={handleCopyMarkdown}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-neutral-200 hover:bg-violet-600/30 hover:text-violet-200 cursor-pointer transition-colors"
              >
                <Copy className="w-4 h-4 text-emerald-400" />
                <span>Copy README Markdown</span>
              </Command.Item>
              {onOpenImport && (
                <Command.Item
                  onSelect={() => {
                    onOpenImport();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-neutral-200 hover:bg-violet-600/30 hover:text-violet-200 cursor-pointer transition-colors"
                >
                  <FileUp className="w-4 h-4 text-emerald-400" />
                  <span>Import Existing README</span>
                </Command.Item>
              )}
              <Command.Item
                onSelect={handleDownloadMarkdown}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-neutral-200 hover:bg-violet-600/30 hover:text-violet-200 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>Download README.md</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Theme" className="text-neutral-500 font-semibold px-2 py-1 uppercase text-[10px]">
              <Command.Item
                onSelect={() => {
                  setTheme('dark');
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-neutral-200 hover:bg-violet-600/30 hover:text-violet-200 cursor-pointer transition-colors"
              >
                <Moon className="w-4 h-4 text-violet-400" />
                <span>Set Theme to Dark</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setTheme('light');
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-neutral-200 hover:bg-violet-600/30 hover:text-violet-200 cursor-pointer transition-colors"
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Set Theme to Light</span>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  setTheme('system');
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-neutral-200 hover:bg-violet-600/30 hover:text-violet-200 cursor-pointer transition-colors"
              >
                <Laptop className="w-4 h-4 text-neutral-400" />
                <span>Set Theme to System</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="flex items-center justify-between px-3 py-2 bg-neutral-950 border-t border-neutral-800 text-[11px] text-neutral-500">
            <span>Use ↑↓ to navigate</span>
            <span>ESC to close</span>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
};

export default CommandPalette;
