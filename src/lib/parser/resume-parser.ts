/**
 * Resume Parser Engine
 * Extracts evidence-backed profile fields from resume text and buffers (PDF, DOCX, TXT, MD).
 * Guaranteed to never hallucinate or inject demonstration values without explicit text evidence.
 */

export interface ParsedResumeEntity {
  field: 'user.name' | 'user.role' | 'user.bio' | 'user.github' | 'user.location';
  label: string;
  value: string;
  category: 'identity' | 'bio' | 'socials';
  confidence: 'high' | 'medium' | 'low';
  evidence: string;
}

export interface ResumeParseResult {
  entities: ParsedResumeEntity[];
  skills: string[];
  rawTextLength: number;
}

// Common tech keywords to match from resume text
const COMMON_TECHS: string[] = [
  'TypeScript', 'JavaScript', 'Python', 'React', 'Next.js', 'Node.js',
  'Go', 'Rust', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'GraphQL', 'Docker',
  'Kubernetes', 'AWS', 'GCP', 'Azure', 'Git', 'Linux', 'Tailwind CSS',
  'HTML5', 'CSS3', 'Vue.js', 'Angular', 'Svelte', 'FastAPI', 'Django'
];

/**
 * Extracts entities from raw resume text
 */
export function parseResumeText(rawText: string): ResumeParseResult {
  const entities: ParsedResumeEntity[] = [];
  const skills: string[] = [];

  if (!rawText || !rawText.trim()) {
    return { entities, skills, rawTextLength: 0 };
  }

  const cleanText = rawText.replace(/\r\n/g, '\n').trim();
  const lines = cleanText.split('\n').map(l => l.trim()).filter(Boolean);

  // 1. Extract GitHub Handle
  const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})|(?:github:\s*@?)(?!github\.com)([a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38})/i;
  const githubMatch = cleanText.match(githubRegex);
  const rawGhUser = githubMatch ? (githubMatch[1] || githubMatch[2]) : null;
  if (rawGhUser && !['settings', 'about', 'join', 'pricing', 'features'].includes(rawGhUser.toLowerCase())) {
    entities.push({
      field: 'user.github',
      label: 'GitHub Username',
      value: rawGhUser.trim(),
      category: 'socials',
      confidence: 'high',
      evidence: githubMatch ? githubMatch[0] : '',
    });
  }

  // 2. Extract Candidate Name (usually the first prominent non-contact line)
  const candidateNameLine = lines.find(line => {
    // Avoid lines with emails, urls, or common section headers
    if (/@|http|github|linkedin|resume|curriculum|vitae|page\s*\d/i.test(line)) return false;
    // Name should be 2 to 4 words, alphabetic
    const words = line.split(/\s+/);
    return words.length >= 2 && words.length <= 4 && /^[A-Z][a-zA-Z.'-]+(?:\s+[A-Z][a-zA-Z.'-]+)+$/.test(line);
  });

  if (candidateNameLine) {
    entities.push({
      field: 'user.name',
      label: 'Full Name',
      value: candidateNameLine.trim(),
      category: 'identity',
      confidence: 'high',
      evidence: candidateNameLine,
    });
  }

  // 3. Extract Role / Headline
  const roleRegex = /(?:Senior|Junior|Lead|Principal|Staff|Full[- ]?Stack|Front[- ]?end|Back[- ]?end|DevOps|Cloud|Data|Mobile|Software|Systems|\s)+\s*(?:Software\s+Engineer|Engineer|Developer|Architect|Designer|Analyst|Programmer)/i;
  const roleLine = lines.find(line => roleRegex.test(line) && line.length < 80);
  if (roleLine) {
    const matched = roleLine.match(roleRegex);
    entities.push({
      field: 'user.role',
      label: 'Headline / Role',
      value: matched ? matched[0].trim() : roleLine.trim(),
      category: 'identity',
      confidence: 'medium',
      evidence: roleLine,
    });
  }

  // 4. Extract Bio / Professional Summary
  let summaryText = '';
  const summaryHeaderIndex = lines.findIndex(l => /^(?:Professional\s+)?(?:Summary|Profile|About\s+Me|Objective)/i.test(l));
  if (summaryHeaderIndex !== -1 && lines[summaryHeaderIndex + 1]) {
    const summaryLines: string[] = [];
    for (let i = summaryHeaderIndex + 1; i < Math.min(lines.length, summaryHeaderIndex + 6); i++) {
      if (/^(?:Experience|Skills|Education|Projects|Certifications)/i.test(lines[i])) break;
      summaryLines.push(lines[i]);
    }
    summaryText = summaryLines.join(' ').trim();
  }

  if (summaryText && summaryText.length > 20) {
    // Truncate to reasonable profile bio length if very long
    const bioVal = summaryText.length > 240 ? `${summaryText.slice(0, 237)}...` : summaryText;
    entities.push({
      field: 'user.bio',
      label: 'Bio / Summary',
      value: bioVal,
      category: 'bio',
      confidence: 'high',
      evidence: summaryText.slice(0, 60),
    });
  }

  // 5. Extract Location
  const locationLine = lines.find(line => /^(?:Location|Address):\s*(.+)/i.test(line) || /^[A-Z][a-zA-Z\s]+,\s*[A-Z]{2,}(?:\s+\d{5})?$/.test(line));
  if (locationLine) {
    const match = locationLine.match(/^(?:Location|Address):\s*(.+)/i);
    const locVal = match ? match[1].trim() : locationLine.trim();
    entities.push({
      field: 'user.location',
      label: 'Location',
      value: locVal,
      category: 'identity',
      confidence: 'medium',
      evidence: locationLine,
    });
  }

  // 6. Extract Skills / Tech Stack
  for (const tech of COMMON_TECHS) {
    const escaped = tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(cleanText)) {
      skills.push(tech);
    }
  }

  return {
    entities,
    skills,
    rawTextLength: cleanText.length,
  };
}

/**
 * Extracts plain text from an uploaded buffer (PDF, DOCX, TXT)
 */
export async function extractTextFromBuffer(
  buffer: Buffer,
  filename: string,
  mimeType?: string
): Promise<string> {
  const lowerName = filename.toLowerCase();

  // DOCX extraction via mammoth
  if (lowerName.endsWith('.docx') || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const mammoth = await import('mammoth');
    const result = await mammoth.extractRawText({ buffer });
    return result.value || '';
  }

  // PDF extraction via pdf-parse
  if (lowerName.endsWith('.pdf') || mimeType === 'application/pdf') {
    // pdf-parse uses standard CommonJS function
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pdfParse = require('pdf-parse');
    const data = await pdfParse(buffer);
    return data.text || '';
  }

  // Plain text / Markdown fallback
  return buffer.toString('utf-8');
}
