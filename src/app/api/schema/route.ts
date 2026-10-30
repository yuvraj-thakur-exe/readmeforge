import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'MonoForgeConfig',
    description: 'JSON Configuration schema for MonoForge GitHub profile generator',
    type: 'object',
    required: ['version', 'title', 'settings', 'sections'],
    properties: {
      version: {
        type: 'string',
        default: '1.0.0',
        description: 'Schema version',
      },
      title: {
        type: 'string',
        default: 'MonoForge Profile',
        description: 'Profile title or headline',
      },
      settings: {
        type: 'object',
        required: ['user', 'theme', 'accentColor', 'badgeStyle', 'align'],
        properties: {
          user: {
            type: 'object',
            required: ['github'],
            properties: {
              github: { type: 'string', description: 'GitHub username' },
              name: { type: 'string', description: 'Display name' },
              role: { type: 'string', description: 'Primary engineering role' },
              bio: { type: 'string', description: 'Short bio or philosophy' },
              location: { type: 'string', description: 'Geographical location' },
              pronouns: { type: 'string', description: 'Pronouns' },
              status: { type: 'string', description: 'Current status or focus' },
            },
          },
          theme: {
            type: 'string',
            enum: ['dark', 'light', 'auto'],
            default: 'dark',
          },
          accentColor: {
            type: 'string',
            default: '#8b5cf6',
            pattern: '^#[0-9a-fA-F]{6}$',
          },
          badgeStyle: {
            type: 'string',
            enum: ['for-the-badge', 'flat', 'flat-square', 'plastic'],
            default: 'for-the-badge',
          },
          align: {
            type: 'string',
            enum: ['left', 'center', 'right'],
            default: 'left',
          },
        },
      },
      sections: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'type', 'props'],
          properties: {
            id: { type: 'string' },
            type: {
              type: 'string',
              enum: [
                'header-bio',
                'readme-typing-svg',
                'markdown-badges',
                'github-readme-stats',
                'streak-stats',
                'activity-graph',
                'github-profile-trophy',
                'pie-chart',
                'visitor-counter',
                'snk',
                'social-links',
              ],
            },
            props: {
              type: 'object',
              properties: {
                content: { type: 'object' },
                styles: { type: 'object' },
                state: { type: 'string' },
              },
            },
          },
        },
      },
    },
  };

  return NextResponse.json(schema, {
    status: 200,
    headers: {
      'Content-Type': 'application/schema+json',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

