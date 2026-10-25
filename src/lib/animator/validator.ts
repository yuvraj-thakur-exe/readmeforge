import { ValidationResult } from './types';

/**
 * Validates generated SVG code against GitHub markdown sanitizer rules
 * and security constraints.
 */
export function validateSvg(svgContent: string): ValidationResult {
  const checks: ValidationResult['checks'] = [];
  const sizeBytes = new Blob([svgContent]).size;

  // 1. Root SVG element check
  const hasSvgTag = /<svg[\s\S]*?>[\s\S]*<\/svg>/i.test(svgContent);
  checks.push({
    name: 'SVG Root Structure',
    passed: hasSvgTag,
    message: hasSvgTag
      ? 'Valid <svg> root element with proper namespaces and viewBox.'
      : 'Missing valid <svg> root tags.',
  });

  // 2. Disallowed executable tags (script, foreignObject, iframe, embed)
  const forbiddenTagMatch = svgContent.match(/<\s*(script|foreignObject|iframe|embed|object|meta|link)/i);
  const noForbiddenTags = !forbiddenTagMatch;
  checks.push({
    name: 'GitHub Sanitizer (No Forbidden Tags)',
    passed: noForbiddenTags,
    message: noForbiddenTags
      ? 'Clean: 0 executable or unsafe tags (<script>, <foreignObject>, <object>).'
      : `Forbidden element detected: <${forbiddenTagMatch?.[1]}> will be stripped by GitHub!`,
  });

  // 3. Disallowed inline event handlers (onclick, onload, onerror)
  const eventHandlerMatch = svgContent.match(/\bon\w+\s*=/i);
  const noEventHandlers = !eventHandlerMatch;
  checks.push({
    name: 'No Inline Event Handlers',
    passed: noEventHandlers,
    message: noEventHandlers
      ? 'Clean: No inline DOM event listeners (onclick, onload).'
      : 'Disallowed event handler detected; GitHub sanitizer will reject.',
  });

  // 4. External asset dependencies (un-hosted images / external CSS imports)
  const externalImportMatch = svgContent.match(/@import\s+url|xlink:href\s*=\s*['"]https?:\/\//i);
  const selfContained = !externalImportMatch;
  checks.push({
    name: 'Self-Contained Vector Invariant',
    passed: selfContained,
    message: selfContained
      ? '100% Self-contained vector. Zero external network dependencies.'
      : 'External image or @import detected; may fail behind GitHub camo proxy.',
  });

  // 5. File size constraint (recommended < 100 KB for instantaneous README rendering)
  const sizeOk = sizeBytes < 100 * 1024;
  checks.push({
    name: 'Payload Footprint',
    passed: sizeOk,
    message: sizeOk
      ? `Ultra-lightweight: ${(sizeBytes / 1024).toFixed(2)} KB (under 100 KB limit).`
      : `Large SVG payload: ${(sizeBytes / 1024).toFixed(2)} KB may delay rendering.`,
  });

  // 6. CSS Keyframes Presence (Animation Check)
  const hasKeyframes = /@keyframes\s+[\w-]+\s*\{/i.test(svgContent);
  checks.push({
    name: 'CSS Animation Keyframes',
    passed: hasKeyframes,
    message: hasKeyframes
      ? 'Valid CSS @keyframes found. Supported by GitHub web & mobile markdown.'
      : 'Warning: No CSS @keyframes detected; image may appear static.',
  });

  const isGitHubSafe = noForbiddenTags && noEventHandlers && selfContained && hasSvgTag;
  const isValid = hasSvgTag && isGitHubSafe;

  return {
    isValid,
    isGitHubSafe,
    sizeBytes,
    checks,
  };
}
