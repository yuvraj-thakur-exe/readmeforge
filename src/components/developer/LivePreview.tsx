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
import { Copy, Check, Eye, Code, FileText } from 'lucide-react';

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
    <div className={`flex flex-col h-full bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-950 border-b border-neutral-800 text-xs">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-colors ${
              tab === 'preview'
                ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Rendered
          </button>
          <button
            type="button"
            onClick={() => setTab('raw')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-medium transition-colors ${
              tab === 'raw'
                ? 'bg-violet-600/30 text-violet-300 border border-violet-500/40'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" /> Raw Markdown
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-neutral-500 font-mono text-[11px] hidden sm:inline">
            {lineCount} lines · {charCount} chars
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs transition-colors"
            title="Copy markdown to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'raw' ? (
          <pre className="font-mono text-xs text-neutral-300 whitespace-pre-wrap break-words leading-relaxed select-all">
            {markdown}
          </pre>
        ) : (
          <div className="max-w-none text-neutral-200 text-sm">
            {isPlaceholder && (
              <div className="mb-3 px-3 py-2 rounded bg-violet-950/40 border border-violet-800/40 text-[11px] text-violet-300 flex items-center gap-2">
                <span>💡</span>
                <span>
                  Previewing live cards with active demo account (<strong>octocat</strong>). Set <code>settings.user.github</code> to your username to see your real profile trophies and stats!
                </span>
              </div>
            )}
            <div className="p-5 bg-neutral-950/90 rounded-md border border-neutral-800/80 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-neutral-800 text-xs text-neutral-400">
                <FileText className="w-4 h-4 text-violet-400" />
                <span className="font-medium">README.md Live Preview</span>
              </div>
              <div className="markdown-body text-neutral-200 text-sm leading-relaxed overflow-x-auto">
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
