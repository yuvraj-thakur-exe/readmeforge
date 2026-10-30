import { AnimationConfig } from './types';
import { generateAnimatedSvg } from './presets';

/**
 * Safely encodes configuration object into base64 string.
 */
export function encodeConfigToBase64(config: AnimationConfig): string {
  const json = JSON.stringify(config);
  if (typeof window !== 'undefined') {
    return btoa(unescape(encodeURIComponent(json)));
  }
  return Buffer.from(json, 'utf-8').toString('base64');
}

/**
 * Safely decodes base64 string back into configuration object.
 */
export function decodeConfigFromBase64(base64: string): AnimationConfig | null {
  try {
    let json: string;
    if (typeof window !== 'undefined') {
      json = decodeURIComponent(escape(atob(base64)));
    } else {
      json = Buffer.from(base64, 'base64').toString('utf-8');
    }
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Generates hosted demo URL.
 */
export function generateHostedDemoUrl(
  config: AnimationConfig,
  baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://monoforge-studio.vercel.app'
): string {
  const encoded = encodeConfigToBase64(config);
  return `${baseUrl}/animator?c=${encoded}`;
}

/**
 * Generates ready-to-paste markdown snippets for the animation.
 */
export function generateMarkdownSnippet(
  config: AnimationConfig,
  filename = 'monoforge-banner.svg',
  baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://monoforge-studio.vercel.app'
): { relative: string; dataUri: string; githubRaw: string; hostedDemo: string } {
  const svg = generateAnimatedSvg(config);
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  const hostedUrl = generateHostedDemoUrl(config, baseUrl);

  const relative = `<!-- Self-Hosted / Local Asset (Recommended for fastest load) -->
<div align="${config.alignment}">
  <a href="${hostedUrl}">
    <img src="${filename}" width="${config.width}" alt="${config.headline}" />
  </a>
</div>`;

  const githubRaw = `<!-- GitHub Raw URL (Replace <username>/<repo>) -->
<div align="${config.alignment}">
  <a href="${hostedUrl}">
    <img src="https://raw.githubusercontent.com/<username>/<repo>/main/${filename}" width="${config.width}" alt="${config.headline}" />
  </a>
</div>`;

  const dataUri = `<!-- Inline Data URI (Zero external files needed) -->
<div align="${config.alignment}">
  <img src="data:image/svg+xml;utf8,${encoded}" width="${config.width}" alt="${config.headline}" />
</div>`;

  const hostedDemo = `[![Interactive Demo](${filename})](${hostedUrl})`;

  return { relative, githubRaw, dataUri, hostedDemo };
}

/**
 * Initiates a browser file download from a string payload.
 */
export function downloadFile(content: string, filename: string, mimeType: string) {
  if (typeof window === 'undefined') return;

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Downloads the animated SVG.
 */
export function downloadSvgFile(config: AnimationConfig, filename = 'monoforge-banner.svg') {
  const svg = generateAnimatedSvg(config);
  downloadFile(svg, filename, 'image/svg+xml;charset=utf-8');
}

/**
 * Downloads the JSON configuration.
 */
export function downloadAnimationConfigJson(config: AnimationConfig, filename = 'monoforge-animation.json') {
  const json = JSON.stringify(config, null, 2);
  downloadFile(json, filename, 'application/json;charset=utf-8');
}
