export const PINTEREST_PRESETS: Record<string, { label: string; url: string; title: string }> = {
  'lofi-coder': {
    label: 'Cozy Lo-Fi Coder (Midnight Desk)',
    url: 'https://i.pinimg.com/originals/0a/61/52/0a6152a25992955f134764b86378e994.gif',
    title: 'Cozy Lo-Fi Midnight Coding Desk',
  },
  'cyberpunk-neon': {
    label: 'Cyberpunk Neon City Skyline',
    url: 'https://i.pinimg.com/originals/24/49/a0/2449a022416b0817024f227b23395b28.gif',
    title: 'Cyberpunk Neon Metropolis',
  },
  'pixel-sunset': {
    label: 'Retro Pixel Twilight Horizon',
    url: 'https://i.pinimg.com/originals/a0/d5/9c/a0d59c636f890cf30c1be1ff5c58a69b.gif',
    title: 'Retro Pixel Sunset Horizon',
  },
  'vaporwave-grid': {
    label: 'Dark Vaporwave Synthwave Grid',
    url: 'https://i.pinimg.com/originals/3a/0d/bb/3a0dbb3a53e990b7936a2e212dbd4090.gif',
    title: 'Dark Synthwave Wireframe Horizon',
  },
  'ghibli-scenic': {
    label: 'Studio Ghibli Coding Sanctuary',
    url: 'https://i.pinimg.com/originals/60/a4/09/60a409549df9c4d2994db7a2fec34d9a.gif',
    title: 'Studio Ghibli Scenic Sanctuary',
  },
  'cat-typing': {
    label: 'Speed Hacker Cat Typing',
    url: 'https://i.pinimg.com/originals/e4/26/70/e426702edf874b181aced1e2fa5c6cde.gif',
    title: 'Cat Typing at Light Speed',
  },
};

export interface ResolvePinterestResult {
  success: boolean;
  url: string;
  title?: string;
  source: 'pinterest-cdn' | 'pinterest-pin' | 'preset' | 'external';
  error?: string;
}

/**
 * Resolves any Pinterest pin link, shortlink, or CDN link into a direct high-resolution image URL.
 */
export async function resolvePinterestUrl(input: string): Promise<ResolvePinterestResult> {
  const clean = input ? input.trim() : '';

  // 1. Check if it matches a preset key
  if (PINTEREST_PRESETS[clean]) {
    const p = PINTEREST_PRESETS[clean];
    return {
      success: true,
      url: p.url,
      title: p.title,
      source: 'preset',
    };
  }

  if (!clean) {
    return {
      success: false,
      url: '',
      source: 'preset',
      error: 'Empty Pinterest URL provided',
    };
  }

  // 2. Direct Pinterest CDN URL (i.pinimg.com)
  if (clean.includes('pinimg.com')) {
    // Automatically upgrade downsampled thumbnails (736x, 564x, 236x) to original uncompressed HD
    const upgraded = clean.replace(/\/\d+x\//, '/originals/');
    return {
      success: true,
      url: upgraded,
      source: 'pinterest-cdn',
    };
  }

  // 3. Pinterest Pin Webpage (pinterest.com/pin/... or pin.it/...)
  if (clean.includes('pinterest.com') || clean.includes('pin.it')) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const res = await fetch(clean, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
        redirect: 'follow',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        return {
          success: false,
          url: clean,
          source: 'pinterest-pin',
          error: `Pinterest returned status ${res.status}`,
        };
      }

      const html = await res.text();

      // Extract OpenGraph Image meta tag
      const ogMatch = html.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i);
      if (ogMatch && ogMatch[1]) {
        const directImg = ogMatch[1].replace(/\/\d+x\//, '/originals/');
        const titleMatch = html.match(/<meta property=["']og:title["'] content=["']([^"']+)["']/i);
        return {
          success: true,
          url: directImg,
          title: titleMatch?.[1] || undefined,
          source: 'pinterest-pin',
        };
      }

      // Fallback: look for JSON-LD image
      const jsonMatch = html.match(/"image":\s*"([^"]+)"/);
      if (jsonMatch && jsonMatch[1]) {
        return {
          success: true,
          url: jsonMatch[1].replace(/\\u002F/g, '/').replace(/\/\d+x\//, '/originals/'),
          source: 'pinterest-pin',
        };
      }
    } catch (err: unknown) {
      return {
        success: false,
        url: clean,
        source: 'pinterest-pin',
        error: err instanceof Error ? err.message : 'Failed to resolve pin webpage',
      };
    }
  }

  // 4. General image URL fallback
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return {
      success: true,
      url: clean,
      source: 'external',
    };
  }

  return {
    success: false,
    url: clean,
    source: 'preset',
    error: 'Unrecognized URL format',
  };
}
