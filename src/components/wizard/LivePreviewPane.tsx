'use client';

import { useRef, useEffect, useMemo } from 'react';
import autoAnimate from '@formkit/auto-animate';
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
import { Eye, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CopyButton } from '#/components/common/CopyButton';

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

  const markdown = useMemo(() => buildMarkdown(config), [config]);

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
        <pre className="font-mono text-xs text-palette-contrast/80 whitespace-pre-wrap">
          {markdown}
        </pre>
      );
    }
  }, [markdown]);

  useEffect(() => {
    if (containerRef.current) {
      autoAnimate(containerRef.current);
    }
  }, []);

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

  const rawUser = config.settings?.user?.github?.trim().toLowerCase();
  const isPlaceholder = !rawUser || rawUser === 'username' || rawUser === 'zusername' || rawUser === 'your-username';

  return (
    <div className="flex flex-col h-full rounded-xl border border-palette-line bg-palette-base shadow-lg overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-palette-line bg-palette-soft/40 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-palette-contrast">
            Live Preview
          </span>
          <span className="px-2 py-0.5 text-[10px] rounded-full bg-amber-500/10 text-amber-500 font-mono">
            {config.sections.length} sections
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-palette-base border border-palette-line hover:border-amber-500/50 text-palette-contrast transition-all"
            title="Download README.md"
            aria-label="Download README.md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.md</span>
          </button>

          <CopyButton
            textToCopy={markdown}
            label="Copy"
            copiedLabel="Copied!"
            variant="primary"
            size="xs"
            className="rounded-lg shadow-sm"
          />
        </div>
      </div>

      {isPlaceholder && (
        <div className="mx-4 mt-3 mb-1 px-3 py-2 rounded-lg bg-violet-950/40 border border-violet-800/40 text-[11px] text-amber-600 dark:text-amber-300 flex items-center gap-2">
          <span>💡</span>
          <span>
            Previewing with active demo account (<strong>octocat</strong>). Set your GitHub username in step 1 to see your real personal trophies and stats!
          </span>
        </div>
      )}

      {/* Rendered Preview Body */}
      <div
        ref={containerRef}
        className="flex-1 p-6 overflow-y-auto scrollbar bg-palette-base text-palette-contrast prose prose-invert max-w-none prose-img:inline-block prose-a:text-cyan-400"
      >
        {renderedContent}
      </div>
    </div>
  );
}
