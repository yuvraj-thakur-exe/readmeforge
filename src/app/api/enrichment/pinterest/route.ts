import { NextRequest, NextResponse } from 'next/server';
import { resolvePinterestUrl, PINTEREST_PRESETS } from '#/lib/pinterest/resolver';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const url = body?.url || '';

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing "url" in request body',
          presets: PINTEREST_PRESETS,
        },
        { status: 400 }
      );
    }

    const result = await resolvePinterestUrl(url);
    return NextResponse.json(result);
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    // Return available presets
    return NextResponse.json({
      success: true,
      message: 'Provide ?url=<pinterest-url> to resolve',
      presets: PINTEREST_PRESETS,
    });
  }

  const result = await resolvePinterestUrl(url);
  return NextResponse.json(result);
}
