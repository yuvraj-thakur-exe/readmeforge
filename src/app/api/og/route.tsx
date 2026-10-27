import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Forge a GitHub profile that gets noticed.';
    const username = searchParams.get('username') || 'readmeforge';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#090a0f',
            backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(139, 92, 246, 0.25), transparent 70%), radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.15), transparent 60%)',
            fontFamily: 'sans-serif',
            padding: '40px 60px',
            color: '#f8fafc',
          }}
        >
          {/* Logo Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)',
              }}
            >
              <span style={{ fontSize: '36px' }}>⚡</span>
            </div>
            <span
              style={{
                fontSize: '44px',
                fontWeight: 800,
                letterSpacing: '-1px',
                background: 'linear-gradient(to right, #a78bfa, #38bdf8)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              ReadmeForge
            </span>
          </div>

          {/* Heading */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: 800,
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.2,
              marginBottom: '20px',
              color: '#f1f5f9',
            }}
          >
            {title}
          </div>

          {/* Tagline / Subtitle */}
          <div
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: '750px',
            }}
          >
            Visual 6-Step Wizard · Monaco /developer Mode · 8+ OSS Plugins · Direct GitHub Sync
          </div>

          {/* Footer handle */}
          <div
            style={{
              position: 'absolute',
              bottom: '36px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '18px',
              color: '#64748b',
              fontWeight: 600,
            }}
          >
            <span>readmeforge.dev</span>
            <span>·</span>
            <span>github.com/{username}</span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response('Failed to generate OG image', { status: 500 });
  }
}
