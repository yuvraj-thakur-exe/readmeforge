import { describe, it, expect } from 'vitest';
import { generatePersonalizedProfile } from './profile-generator';
import { buildMarkdown } from '../buildMarkdown';

describe('Personalized Profile Generator', () => {
  it('generates distinct tailored profiles for different personas', () => {
    const aiProfile = generatePersonalizedProfile({
      github: 'alice-ai',
      name: 'Alice Turing',
      role: 'ai-ml',
      includeCharts: true,
    });

    const devopsProfile = generatePersonalizedProfile({
      github: 'bob-sre',
      name: 'Bob Hooper',
      role: 'cloud-devops',
      includeCharts: true,
    });

    // Verify role, bio, and typing are distinct and personalized
    expect(aiProfile.settings.user.role).toContain('AI Researcher');
    expect(devopsProfile.settings.user.role).toContain('Platform & Cloud SRE');

    expect(aiProfile.settings.user.bio).toContain('frontier multi-modal models');
    expect(devopsProfile.settings.user.bio).toContain('multi-region production');

    // Distinct accent colors
    expect(aiProfile.settings.accentColor).toBe('#10b981');
    expect(devopsProfile.settings.accentColor).toBe('#06b6d4');

    // Both generate valid markdown via buildMarkdown pipeline
    const aiMarkdown = buildMarkdown(aiProfile);
    const devopsMarkdown = buildMarkdown(devopsProfile);

    expect(aiMarkdown).toContain('alice-ai');
    expect(devopsMarkdown).toContain('bob-sre');

    expect(aiMarkdown).toContain('Top Languages Breakdown');
    expect(devopsMarkdown).toContain('Commit Velocity & Contribution Activity');
  });

  it('respects chart toggles and custom vibes', () => {
    const profile = generatePersonalizedProfile({
      github: 'clara-dev',
      role: 'fullstack',
      vibe: 'cyberpunk',
      includeCharts: false,
      includeSnake: false,
    });

    expect(profile.settings.accentColor).toBe('#ec4899');
    expect(profile.sections.some(s => s.type === 'pie-chart')).toBe(false);
    expect(profile.sections.some(s => s.type === 'snk')).toBe(false);
  });
});
