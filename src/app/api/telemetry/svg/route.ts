import { NextRequest, NextResponse } from 'next/server';
import {
  generateIsocalendarSvg,
  generateLanguagesDonutSvg,
  generateHabitsRadarSvg,
  generateAchievementsRackSvg,
  generateTerminalHudSvg,
  generatePageSpeedAuditSvg,
  generateMusicPlayerSvg,
  generateLeetCodeStatsSvg,
} from '#/lib/forge-telemetry/svg-generators';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const plugin = searchParams.get('plugin') || 'isocalendar';
  const user = searchParams.get('user') || 'octocat';

  let svgContent = '';

  switch (plugin.toLowerCase()) {
    case 'isocalendar':
    case 'calendar':
    case 'iso': {
      const streak = searchParams.get('streak') ? parseInt(searchParams.get('streak')!, 10) : undefined;
      const maxStreak = searchParams.get('max_streak') ? parseInt(searchParams.get('max_streak')!, 10) : undefined;
      const commits = searchParams.get('commits') ? parseInt(searchParams.get('commits')!, 10) : undefined;
      svgContent = generateIsocalendarSvg({ username: user, streak, maxStreak, commits });
      break;
    }

    case 'languages':
    case 'langs': {
      svgContent = generateLanguagesDonutSvg({ username: user });
      break;
    }

    case 'habits':
    case 'rhythm': {
      const peakHour = searchParams.get('peak') ? parseInt(searchParams.get('peak')!, 10) : undefined;
      svgContent = generateHabitsRadarSvg({ username: user, peakHour });
      break;
    }

    case 'achievements':
    case 'medals':
    case 'trophies': {
      svgContent = generateAchievementsRackSvg({ username: user });
      break;
    }

    case 'terminal':
    case 'console':
    case 'hud': {
      const repos = searchParams.get('repos') ? parseInt(searchParams.get('repos')!, 10) : undefined;
      const stars = searchParams.get('stars') ? parseInt(searchParams.get('stars')!, 10) : undefined;
      svgContent = generateTerminalHudSvg({ username: user, repos, stars });
      break;
    }

    case 'pagespeed':
    case 'speed':
    case 'lighthouse': {
      const url = searchParams.get('url') || `${user}.github.io`;
      svgContent = generatePageSpeedAuditSvg({ url });
      break;
    }

    case 'music':
    case 'spotify':
    case 'nowplaying': {
      const track = searchParams.get('track') || undefined;
      const artist = searchParams.get('artist') || undefined;
      svgContent = generateMusicPlayerSvg({ track, artist });
      break;
    }

    case 'leetcode':
    case 'algorithms': {
      const solved = searchParams.get('solved') ? parseInt(searchParams.get('solved')!, 10) : undefined;
      svgContent = generateLeetCodeStatsSvg({ username: user, solved });
      break;
    }

    default:
      svgContent = generateIsocalendarSvg({ username: user });
      break;
  }

  return new NextResponse(svgContent, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

