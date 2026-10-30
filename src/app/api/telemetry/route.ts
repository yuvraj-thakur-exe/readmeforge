import { NextRequest, NextResponse } from 'next/server';
import {
  buildTelemetryActionWorkflow,
  buildTelemetryEmbedUrl,
  buildTelemetryMarkdownSnippet,
} from '#/lib/forge-telemetry/builder';
import { ForgeTelemetryConfig, TelemetryTemplate } from '#/lib/forge-telemetry/types';
import { TELEMETRY_PLUGINS_CATALOG } from '#/lib/forge-telemetry/catalog';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user') || 'octocat';
  const template = (searchParams.get('template') as TelemetryTemplate) || 'classic';
  const hasIsocalendar = searchParams.get('isocalendar') === '1' || searchParams.get('isocalendar') === 'true';
  const hasLanguages = searchParams.get('languages') === '1' || searchParams.get('languages') === 'true';
  const hasHabits = searchParams.get('habits') === '1' || searchParams.get('habits') === 'true';
  const hasAchievements = searchParams.get('achievements') === '1' || searchParams.get('achievements') === 'true';

  const config: ForgeTelemetryConfig = {
    username: user,
    template,
    outputMode: 'direct_svg',
    isocalendar: { enabled: hasIsocalendar },
    languages: { enabled: hasLanguages },
    habits: { enabled: hasHabits },
    achievements: { enabled: hasAchievements },
  };

  const embedUrl = buildTelemetryEmbedUrl(config);
  const markdown = buildTelemetryMarkdownSnippet(config);

  return NextResponse.json({
    engine: 'ReadmeForge Telemetry Engine',
    version: '3.35.0-readmeforge',
    user,
    template,
    embedUrl,
    markdown,
    availableTemplates: ['classic', 'terminal', 'repository', 'markdown', 'community'],
    supportedPlugins: TELEMETRY_PLUGINS_CATALOG.map(p => p.id),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ForgeTelemetryConfig;
    const user = body.username || 'octocat';
    const workflowYaml = buildTelemetryActionWorkflow(body);
    const embedUrl = buildTelemetryEmbedUrl(body);
    const markdown = buildTelemetryMarkdownSnippet(body);

    return NextResponse.json({
      success: true,
      user,
      workflowYaml,
      embedUrl,
      markdown,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Invalid request payload' },
      { status: 400 }
    );
  }
}

