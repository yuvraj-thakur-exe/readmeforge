'use client';

import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor, { OnChange } from '@monaco-editor/react';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeConfigSchema } from '#/lib/plugins/types';
import { CheckCircle2, AlertTriangle, RefreshCw, Copy, Check } from 'lucide-react';

interface EditorProps {
  theme?: 'vs-dark' | 'light';
  className?: string;
}

export const Editor: React.FC<EditorProps> = ({ theme = 'vs-dark', className = '' }) => {
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
    <div className={`flex flex-col h-full bg-[#18181b] rounded-xl border border-neutral-800 overflow-hidden shadow-2xl ${className}`}>
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900 border-b border-neutral-800 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-bold tracking-wider">config.json</span>
          {isValid ? (
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> Valid Schema
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20" title={validationError || ''}>
              <AlertTriangle className="w-3.5 h-3.5" /> Syntax Error
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-neutral-400 hidden sm:inline">
            {config.sections?.length || 0} sections
          </span>
          <button
            onClick={handleCopyJson}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            title="Copy JSON to clipboard"
          >
            {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedJson ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleFormat}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
            title="Prettify JSON"
          >
            <RefreshCw className="w-3 h-3 text-amber-400" /> Prettify
          </button>
        </div>
      </div>

      {/* Monaco Container */}
      <div className="flex-1 min-h-0 bg-[#0d1117]">
        <MonacoEditor
          height="100%"
          defaultLanguage="json"
          value={editorValue}
          theme={theme}
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
