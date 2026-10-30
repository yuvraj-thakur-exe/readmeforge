'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Laptop } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-lg border border-palette-line bg-palette-soft" />
    );
  }

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className="flex items-center justify-center w-8 h-8 rounded-lg border border-palette-line bg-palette-soft hover:border-amber-500/50 text-palette-contrast transition-all shadow-sm"
      title={`Current theme: ${theme}. Click to switch.`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' && <Moon className="w-4 h-4 text-amber-400" />}
      {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
      {theme === 'system' && <Laptop className="w-4 h-4 text-cyan-400" />}
    </button>
  );
}
