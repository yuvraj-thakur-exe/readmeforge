import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';

describe('API Route: /api/telemetry/svg', () => {
  it('returns valid SVG for isocalendar plugin', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=isocalendar&user=yuvraj');
    const res = await GET(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('image/svg+xml');
    const text = await res.text();
    expect(text).toContain('<svg');
    expect(text).toContain('@yuvraj');
    expect(text).toContain('Isometric Contribution Landscape');
  });

  it('returns valid SVG for languages plugin', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=languages&user=dev');
    const res = await GET(req);

    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('Polyglot Language Telemetry');
    expect(text).toContain('@dev');
  });

  it('returns valid SVG for terminal plugin', async () => {
    const req = new NextRequest('http://localhost:3000/api/telemetry/svg?plugin=terminal&user=neo');
    const res = await GET(req);

    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toContain('monoforge@neo');
  });
});

