'use client';

import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor, { OnChange } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeConfigSchema } from '#/lib/plugins/types';
import { CheckCircle2, AlertTriangle, RefreshCw, Copy, Check } from 'lucide-react';

interface EditorProps {
  theme?: 'vs-dark' | 'light';
  className?: string;
}

export const Editor: React.FC<EditorProps> = ({ theme, className = '' }) => {
  const { resolvedTheme } = useTheme();
  const activeMonacoTheme = theme || (resolvedTheme === 'light' ? 'light' : 'vs-dark');

  const config = useReadmeStore(state => state.config);
  const setEntireConfig = useReadmeStore(state => state.setEntireConfig);

  const [editorValue, setEditorValue] = useState<string>(() => JSON.stringify(config, null, 2));
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const isInternalChange = useRef<boolean>(false);

  // Sync external store changes into editor if they originate outside editor
  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    const formatted = JSON.stringify(config, null, 2);
    setEditorValue(formatted);
    setIsValid(true);
    setValidationError(null);
  }, [config]);

  const handleEditorChange: OnChange = value => {
    const text = value ?? '';
    setEditorValue(text);

    try {
      const parsed = JSON.parse(text);
      const result = ReadmeConfigSchema.safeParse(parsed);

      if (!result.success) {
        setIsValid(false);
        const firstIssue = result.error.issues[0];
        setValidationError(`${firstIssue.path.join('.') || 'root'}: ${firstIssue.message}`);
        return;
      }

      setIsValid(true);
      setValidationError(null);

      isInternalChange.current = true;
      setEntireConfig(result.data);
    } catch (err: unknown) {
      setIsValid(false);
      setValidationError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(editorValue);
      setEditorValue(JSON.stringify(parsed, null, 2));
    } catch {
      // Ignore if unparseable
    }
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(editorValue);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-[#18181b] rounded-2xl border-2 border-neutral-900 dark:border-neutral-100 overflow-hidden shadow-[4px_4px_0px_#18181b] dark:shadow-[4px_4px_0px_#f4f4f5] ${className}`}>
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white dark:bg-neutral-900 border-b-2 border-neutral-900 dark:border-neutral-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#ffe600] text-neutral-950 font-black tracking-wider border border-neutral-900">
            CONFIG.JSON
          </span>
          {isValid ? (
            <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-300 bg-emerald-400/20 px-2 py-0.5 rounded border border-emerald-500/40 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> VALID SCHEMA
            </span>
          ) : (
            <span className="flex items-center gap-1 text-red-800 dark:text-red-300 bg-red-400/20 px-2 py-0.5 rounded border border-red-500/40 font-bold" title={validationError || ''}>
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> SYNTAX ERROR
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-neutral-500 font-bold hidden sm:inline">
            {config.sections?.length || 0} SECTIONS
          </span>
          <button
            onClick={handleCopyJson}
            type="button"
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:bg-[#ffe600] hover:text-neutral-950 text-neutral-800 dark:text-neutral-200 transition-all font-bold shadow-2xs"
            title="Copy JSON to clipboard"
          >
            {copiedJson ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copiedJson ? 'COPIED' : 'COPY'}</span>
          </button>
          <button
            onClick={handleFormat}
            type="button"
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 hover:bg-[#ffe600] hover:text-neutral-950 text-neutral-800 dark:text-neutral-200 transition-all font-bold shadow-2xs"
            title="Prettify JSON"
          >
            <RefreshCw className="w-3 h-3 text-amber-500" /> PRETTIFY
          </button>
        </div>
      </div>

      {/* Monaco Container */}
      <div className="flex-1 min-h-0 bg-white dark:bg-[#0d1117]">
        <MonacoEditor
          height="100%"
          defaultLanguage="json"
          value={editorValue}
          theme={activeMonacoTheme}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            formatOnPaste: true,
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
          }}
        />
      </div>

      {/* Error Footer Bar */}
      {validationError && (
        <div className="px-4 py-2 bg-amber-950/80 border-t border-amber-800/80 text-amber-300 text-xs font-mono flex items-center justify-between">
          <span className="truncate">{validationError}</span>
          <button
            type="button"
            onClick={handleFormat}
            className="text-[11px] underline hover:text-amber-100 ml-2 shrink-0"
          >
            Auto-Format
          </button>
        </div>
      )}
    </div>
  );
};
