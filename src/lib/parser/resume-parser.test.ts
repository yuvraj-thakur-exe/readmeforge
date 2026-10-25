import { describe, it, expect } from 'vitest';
import { parseResumeText, extractTextFromBuffer } from './resume-parser';

describe('resume-parser', () => {
  it('handles empty input cleanly', () => {
    const result = parseResumeText('');
    expect(result.entities).toEqual([]);
    expect(result.skills).toEqual([]);
    expect(result.rawTextLength).toBe(0);
  });

  it('extracts candidate name, role, bio, github, and skills from resume text', () => {
    const sampleResume = `
Jordan Belfort
Senior Full-Stack Engineer
San Francisco, CA
Email: jordan@example.com | GitHub: github.com/jordanb | LinkedIn: linkedin.com/in/jordanb

Summary
Seasoned software craftsman with 8+ years designing scalable cloud architectures, distributed systems, and real-time streaming tools.

Skills
JavaScript, TypeScript, React, Next.js, Node.js, Python, PostgreSQL, Docker, AWS, Git
    `;

    const result = parseResumeText(sampleResume);

    // Verify Name
    const nameEntity = result.entities.find(e => e.field === 'user.name');
    expect(nameEntity).toBeDefined();
    expect(nameEntity?.value).toBe('Jordan Belfort');
    expect(nameEntity?.confidence).toBe('high');

    // Verify Role
    const roleEntity = result.entities.find(e => e.field === 'user.role');
    expect(roleEntity).toBeDefined();
    expect(roleEntity?.value).toBe('Senior Full-Stack Engineer');

    // Verify GitHub
    const githubEntity = result.entities.find(e => e.field === 'user.github');
    expect(githubEntity).toBeDefined();
    expect(githubEntity?.value).toBe('jordanb');

    // Verify Bio
    const bioEntity = result.entities.find(e => e.field === 'user.bio');
    expect(bioEntity).toBeDefined();
    expect(bioEntity?.value).toContain('Seasoned software craftsman');

    // Verify Skills
    expect(result.skills).toContain('TypeScript');
    expect(result.skills).toContain('React');
    expect(result.skills).toContain('Docker');
    expect(result.skills).toContain('PostgreSQL');
  });

  it('does not hallucinate fields when they are absent', () => {
    const sparseText = `
Random notes without candidate details or keywords.
Some grocery list items: apples, bananas, milk.
    `;

    const result = parseResumeText(sparseText);
    expect(result.entities.find(e => e.field === 'user.name')).toBeUndefined();
    expect(result.entities.find(e => e.field === 'user.github')).toBeUndefined();
    expect(result.entities.find(e => e.field === 'user.role')).toBeUndefined();
  });

  it('extracts plain text from text buffers', async () => {
    const buf = Buffer.from('Alex Developer\nFull-Stack Engineer\n');
    const text = await extractTextFromBuffer(buf, 'resume.txt', 'text/plain');
    expect(text).toContain('Alex Developer');
  });
});
