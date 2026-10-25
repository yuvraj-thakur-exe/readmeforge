import { AnimationConfig } from './types';
import { generateAnimatedSvg } from './presets';

/**
 * Generates ready-to-paste markdown snippets for the animation.
 */
export function generateMarkdownSnippet(
  config: AnimationConfig,
  filename = 'banner-animated.svg'
): { relative: string; dataUri: string; githubRaw: string } {
  const svg = generateAnimatedSvg(config);
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');

  const relative = `<!-- Self-Hosted / Local Asset (Recommended for fastest load) -->
<div align="${config.alignment}">
  <img src="${filename}" width="${config.width}" alt="${config.headline}" />
</div>`;

  const githubRaw = `<!-- GitHub Raw URL (Replace <username>/<repo>) -->
<div align="${config.alignment}">
  <img src="https://raw.githubusercontent.com/<username>/<repo>/main/${filename}" width="${config.width}" alt="${config.headline}" />
</div>`;

  const dataUri = `<!-- Inline Data URI (Zero external files needed) -->
<div align="${config.alignment}">
  <img src="data:image/svg+xml;utf8,${encoded}" width="${config.width}" alt="${config.headline}" />
</div>`;

  return { relative, githubRaw, dataUri };
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
export function downloadSvgFile(config: AnimationConfig, filename = 'banner-animated.svg') {
  const svg = generateAnimatedSvg(config);
  downloadFile(svg, filename, 'image/svg+xml;charset=utf-8');
}

/**
 * Downloads the JSON configuration.
 */
export function downloadAnimationConfigJson(config: AnimationConfig, filename = 'readmeforge-animation.json') {
  const json = JSON.stringify(config, null, 2);
  downloadFile(json, filename, 'application/json;charset=utf-8');
}
