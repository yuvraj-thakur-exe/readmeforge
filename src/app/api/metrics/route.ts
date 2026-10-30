import { NextRequest, NextResponse } from 'next/server';
import {
  buildMetricsActionWorkflow,
  buildMetricsEmbedUrl,
  buildMetricsMarkdownSnippet,
} from '#/lib/forge-metrics/builder';
import { ForgeMetricsConfig, MetricsTemplate } from '#/lib/forge-metrics/types';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user') || 'octocat';
  const template = (searchParams.get('template') as MetricsTemplate) || 'classic';
  const hasIsocalendar = searchParams.get('isocalendar') === '1' || searchParams.get('isocalendar') === 'true';
  const hasLanguages = searchParams.get('languages') === '1' || searchParams.get('languages') === 'true';
  const hasHabits = searchParams.get('habits') === '1' || searchParams.get('habits') === 'true';
  const hasAchievements = searchParams.get('achievements') === '1' || searchParams.get('achievements') === 'true';

  const config: ForgeMetricsConfig = {
    username: user,
    template,
    outputMode: 'direct_svg',
    isocalendar: { enabled: hasIsocalendar },
    languages: { enabled: hasLanguages },
    habits: { enabled: hasHabits },
    achievements: { enabled: hasAchievements },
  };

  const embedUrl = buildMetricsEmbedUrl(config);
  const markdown = buildMetricsMarkdownSnippet(config);

  return NextResponse.json({
    engine: 'ReadmeForge Metrics Engine',
    version: '3.35.0-readmeforge',
    user,
    template,
    embedUrl,
    markdown,
    availableTemplates: ['classic', 'terminal', 'repository', 'markdown', 'community'],
    supportedPlugins: [
      'isocalendar',
      'languages',
      'habits',
      'achievements',
      'leetcode',
      'topics',
      'wakatime',
      'music',
      'stargazers',
      'lines',
      'activity',
      'followup',
      'licenses',
      'discussions',
      'notable',
      'projects',
      'sponsors',
      'stackoverflow',
      'steam',
    ],
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ForgeMetricsConfig;
    const user = body.username || 'octocat';
    const workflowYaml = buildMetricsActionWorkflow(body);
    const embedUrl = buildMetricsEmbedUrl(body);
    const markdown = buildMetricsMarkdownSnippet(body);

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
