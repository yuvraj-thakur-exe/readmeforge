import { useState, useEffect, useMemo } from 'react';

export interface TypewriterPhrase {
  prefix?: string;
  highlight?: string;
  suffix?: string;
  tag?: string;
  tagColor?: string;
}

export type PhraseItem = string | TypewriterPhrase;

interface KineticTypewriterProps {
  phrases?: PhraseItem[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const DEFAULT_PHRASES: PhraseItem[] = [
  {
    prefix: 'Turn your GitHub profile into an ',
    highlight: 'iconic developer portfolio',
    suffix: '.',
    tag: 'PORTFOLIO',
    tagColor: 'border-cyan-500/40 bg-cyan-950/60 text-cyan-300',
  },
  {
    prefix: 'Dynamic ',
    highlight: '60 FPS GPU-accelerated',
    suffix: ' vector animations & kinetic characters.',
    tag: 'AST VECTOR',
    tagColor: 'border-violet-500/40 bg-violet-950/60 text-violet-300',
  },
  {
    prefix: 'Interactive terminal cards, dynamic stats & ',
    highlight: 'shields badge arsenal',
    suffix: '.',
    tag: 'SHIELDS',
    tagColor: 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300',
  },
  {
    prefix: 'Native agent integration with ',
    highlight: 'Claude Code, Antigravity & Cursor',
    suffix: '.',
    tag: 'AI TOOLCHAIN',
    tagColor: 'border-fuchsia-500/40 bg-fuchsia-950/60 text-fuchsia-300',
  },
  {
    prefix: 'Zero-telemetry & ',
    highlight: '100% client-side private',
    suffix: ' generation in your browser.',
    tag: 'PRIVATE',
    tagColor: 'border-amber-500/40 bg-amber-950/60 text-amber-300',
  },
];

function normalizePhrase(item: PhraseItem): {
  prefix: string;
  highlight: string;
  suffix: string;
  tag?: string;
  tagColor?: string;
  fullText: string;
} {
  if (typeof item === 'string') {
    return {
      prefix: item,
      highlight: '',
      suffix: '',
      fullText: item,
    };
  }
  const prefix = item.prefix || '';
  const highlight = item.highlight || '';
  const suffix = item.suffix || '';
  return {
    prefix,
    highlight,
    suffix,
    tag: item.tag,
    tagColor: item.tagColor,
    fullText: `${prefix}${highlight}${suffix}`,
  };
}

export function KineticTypewriter({
  phrases = DEFAULT_PHRASES,
  typingSpeed = 38,
  deletingSpeed = 18,
  pauseDuration = 2200,
  className = '',
}: KineticTypewriterProps) {
  const normalizedPhrases = useMemo(
    () => phrases.map(normalizePhrase),
    [phrases]
  );

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(() => normalizedPhrases[0]?.fullText.length || 0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const currentPhrase = normalizedPhrases[phraseIndex] || normalizedPhrases[0];

  useEffect(() => {
    if (!hasMounted) return;

    const fullLength = currentPhrase.fullText.length;

    let timer: NodeJS.Timeout;

    if (!isDeleting && charIndex < fullLength) {
      // Natural keystroke cadence variation
      const char = currentPhrase.fullText[charIndex];
      const isPunctuation = char === ',' || char === '.' || char === '—' || char === ':';
      const delay = isPunctuation ? typingSpeed * 3 : typingSpeed + (Math.random() * 15 - 7);

      timer = setTimeout(() => {
        setCharIndex(prev => prev + 1);
      }, Math.max(15, delay));
    } else if (!isDeleting && charIndex >= fullLength) {
      // Finished typing phrase, hold for pauseDuration
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && charIndex > 0) {
      // Deleting characters
      timer = setTimeout(() => {
        setCharIndex(prev => prev - 1);
      }, deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting, proceed to next phrase
      timer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex(prev => (prev + 1) % normalizedPhrases.length);
      }, 350);
    }

    return () => clearTimeout(timer);
  }, [
    charIndex,
    isDeleting,
    phraseIndex,
    currentPhrase,
    hasMounted,
    normalizedPhrases.length,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  // Construct typed segments
  const { prefix, highlight, suffix, tag, tagColor } = currentPhrase;
  const prefixLen = prefix.length;
  const highlightLen = highlight.length;

  const currentPrefix = prefix.slice(0, Math.min(charIndex, prefixLen));
  const currentHighlight =
    charIndex > prefixLen
      ? highlight.slice(0, Math.min(charIndex - prefixLen, highlightLen))
      : '';
  const currentSuffix =
    charIndex > prefixLen + highlightLen
      ? suffix.slice(0, charIndex - prefixLen - highlightLen)
      : '';

  return (
    <div
      className={`inline-flex flex-wrap items-center justify-center gap-2 font-mono text-base sm:text-lg md:text-xl text-neutral-300 ${className}`}
      aria-label={currentPhrase.fullText}
    >
      {/* Terminal prompt symbol with pulsing glow */}
      <span className="text-cyan-400 font-black select-none drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse">
        ❯
      </span>

      {/* Optional Tag badge */}
      {tag && (
        <span
          className={`hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border ${
            tagColor || 'border-cyan-500/40 bg-cyan-950/60 text-cyan-300'
          }`}
        >
          {tag}
        </span>
      )}

      {/* Render typed text with active gradient highlight */}
      <span className="text-neutral-200 font-semibold tracking-tight inline-block min-h-[1.5em]">
        <span>{currentPrefix}</span>
        {currentHighlight && (
          <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent font-bold drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">
            {currentHighlight}
          </span>
        )}
        <span>{currentSuffix}</span>
        {/* Glowing Terminal Caret */}
        <span
          className="inline-block w-2.5 h-[1.15em] ml-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-cursor-blink align-middle select-none rounded-[1px]"
          aria-hidden="true"
        />
      </span>
    </div>
  );
}
