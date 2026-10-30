'use client';

import React, { useState, useMemo } from 'react';
import parse from 'html-react-parser';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { useReadmeStore } from '#/store/useReadmeStore';
import { buildMarkdown } from '#/lib/buildMarkdown';
import { Copy, Check, Eye, Code, FileText, Monitor, Smartphone, Terminal } from 'lucide-react';

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    div: [...(defaultSchema.attributes?.div || []), 'align', 'className', 'class'],
    p: [...(defaultSchema.attributes?.p || []), 'align', 'className', 'class'],
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

interface LivePreviewProps {
  className?: string;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ className = '' }) => {
  const config = useReadmeStore(state => state.config);
  const [tab, setTab] = useState<'preview' | 'raw'>('preview');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile' | 'crt'>('desktop');
  const [copied, setCopied] = useState<boolean>(false);

  const markdown = useMemo(() => {
    try {
      return buildMarkdown(config);
    } catch {
      return '<!-- Error generating markdown from configuration -->';
    }
  }, [config]);

  const renderedContent = useMemo(() => {
    try {
      const file = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeSanitize, sanitizeSchema)
        .use(rehypeStringify)
        .processSync(markdown);
      return parse(String(file));
    } catch {
      return (
        <pre className="font-mono text-xs text-neutral-300 whitespace-pre-wrap leading-relaxed">
          {markdown}
        </pre>
      );
    }
  }, [markdown]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const lineCount = markdown.split('\n').length;
  const charCount = markdown.length;

  const rawUser = config.settings?.user?.github?.trim().toLowerCase();
  const isPlaceholder = !rawUser || rawUser === 'username' || rawUser === 'zusername' || rawUser === 'your-username';

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm dark:shadow-2xl ${className}`}>
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800 text-xs gap-2">
        <div className="flex items-center gap-2">
          {/* Rendered vs Raw Markdown */}
          <div className="flex items-center bg-white dark:bg-neutral-900 rounded-lg p-0.5 border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <button
              type="button"
              onClick={() => setTab('preview')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                tab === 'preview'
                  ? 'bg-amber-400 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Rendered
            </button>
            <button
              type="button"
              onClick={() => setTab('raw')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                tab === 'raw'
                  ? 'bg-cyan-500 text-neutral-950 font-bold shadow-sm'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> Raw Markdown
            </button>
          </div>

          {/* Viewport Frame Switcher */}
          {tab === 'preview' && (
            <div className="hidden sm:flex items-center bg-white dark:bg-neutral-900 rounded-lg p-0.5 border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 shadow-sm">
              <button
                type="button"
                onClick={() => setViewMode('desktop')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'desktop' ? 'bg-neutral-100 dark:bg-neutral-800 text-cyan-600 dark:text-cyan-400' : 'hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'mobile' ? 'bg-neutral-100 dark:bg-neutral-800 text-amber-600 dark:text-amber-400' : 'hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
                title="Mobile View"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('crt')}
                className={`p-1 rounded transition-colors ${
                  viewMode === 'crt' ? 'bg-neutral-100 dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400' : 'hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
                title="Cyber CRT View"
              >
                <Terminal className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-neutral-500 dark:text-neutral-400 font-mono text-[11px] hidden sm:inline">
            {lineCount} lines · {charCount} chars
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-transparent text-neutral-800 dark:text-neutral-200 text-xs font-semibold transition-colors shadow-sm"
            title="Copy markdown to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 bg-neutral-100 dark:bg-[#0d1117] flex justify-center">
        {tab === 'raw' ? (
          <pre className="w-full font-mono text-xs text-neutral-800 dark:text-neutral-300 whitespace-pre-wrap break-words leading-relaxed select-all bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            {markdown}
          </pre>
        ) : (
          <div
            className={`w-full transition-all duration-300 ${
              viewMode === 'mobile'
                ? 'max-w-[390px] border-4 border-neutral-300 dark:border-neutral-800 rounded-3xl p-3 bg-white dark:bg-neutral-950 shadow-2xl my-2'
                : viewMode === 'crt'
                ? 'max-w-4xl border-2 border-emerald-500/40 rounded-xl p-4 bg-[#0a100d] text-emerald-300 font-mono shadow-[0_0_20px_rgba(16,185,129,0.15)] scanline-overlay'
                : 'max-w-4xl'
            }`}
          >
            {isPlaceholder && (
              <div className="mb-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <span>⚡</span>
                <span>
                  Using demo preview (<strong>octocat</strong>). Set <code>settings.user.github</code> to your handle to generate real telemetry!
                </span>
              </div>
            )}
            <div className="p-4 sm:p-6 bg-white dark:bg-neutral-950/90 rounded-xl border border-neutral-200 dark:border-neutral-800/80 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">README.md</span>
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">● 60FPS CAMO SAFE</span>
              </div>
              <div className="markdown-body text-neutral-900 dark:text-neutral-200 text-sm leading-relaxed overflow-x-auto">
                {renderedContent}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;
