'use client';

import React, { useRef, useEffect, useState } from 'react';
import autoAnimate from '@formkit/auto-animate';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { Copy, Check, Eye, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div || []), 'align'],
    p: [...(defaultSchema.attributes?.p || []), 'align'],
    h1: [...(defaultSchema.attributes?.h1 || []), 'align'],
    h2: [...(defaultSchema.attributes?.h2 || []), 'align'],
    h3: [...(defaultSchema.attributes?.h3 || []), 'align'],
    img: [...(defaultSchema.attributes?.img || []), 'src', 'alt', 'height', 'width', 'align'],
    source: [...(defaultSchema.attributes?.source || []), 'media', 'srcset'],
    picture: [...(defaultSchema.attributes?.picture || [])],
    a: [...(defaultSchema.attributes?.a || []), 'href', 'target', 'rel'],
  },
  tagNames: [
    ...(defaultSchema.tagNames || []),
    'picture',
    'source',
    'svg',
    'path',
    'circle',
    'rect',
  ],
};

export function LivePreviewPane() {
  const config = useReadmeStore(state => state.config);
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const markdown = buildMarkdown(config);

  useEffect(() => {
    if (containerRef.current) {
      autoAnimate(containerRef.current);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'README.md';
    link.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 40, spread: 50 });
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-palette-line bg-palette-base shadow-lg overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-palette-line bg-palette-soft/40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-violet-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-palette-contrast">
            Live Preview
          </span>
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-violet-500/10 text-violet-400 font-mono">
            {config.sections.length} sections
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-palette-base border border-palette-line hover:border-violet-500/50 text-palette-contrast transition-all"
            title="Download README.md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.md</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-sm hover:opacity-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Rendered Preview Body */}
      <div
        ref={containerRef}
        className="flex-1 p-6 overflow-y-auto scrollbar bg-palette-base text-palette-contrast prose prose-invert max-w-none prose-img:inline-block prose-a:text-cyan-400"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
