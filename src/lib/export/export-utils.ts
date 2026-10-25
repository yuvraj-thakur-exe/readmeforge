import { ReadmeConfig, ReadmeConfigSchema } from '#/lib/plugins/types';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

/**
 * Encodes a ReadmeConfig object into a URL-safe Base64 string.
 */
export function encodeConfigToUrl(config: ReadmeConfig): string {
  try {
    const jsonStr = JSON.stringify(config);
    // encodeURIComponent handles unicode / emojis safely before btoa
    const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
    return base64;
  } catch {
    return '';
  }
}

/**
 * Decodes and validates a URL Base64 string into a typed ReadmeConfig.
 * Returns null if invalid or corrupt.
 */
export function decodeConfigFromUrl(base64: string): ReadmeConfig | null {
  try {
    const jsonStr = decodeURIComponent(escape(atob(base64)));
    const parsed = JSON.parse(jsonStr);
    const result = ReadmeConfigSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

/**
 * Downloads a markdown string as README.md file in the browser.
 */
export function downloadMarkdownFile(content: string, filename = 'README.md'): boolean {
  try {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Captures an HTML element as PNG using html-to-image and triggers download.
 */
export async function downloadElementAsPng(element: HTMLElement, filename = 'profile-readme.png'): Promise<boolean> {
  try {
    const dataUrl = await toPng(element, { quality: 0.95 });
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch {
    return false;
  }
}

/**
 * Fires celebratory canvas confetti.
 */
export function triggerCelebration(options?: confetti.Options): void {
  try {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#8b5cf6', '#06b6d4', '#ec4899', '#10b981'],
      ...options,
    });
  } catch {
    // Ignored in non-browser / headless environments
  }
}
