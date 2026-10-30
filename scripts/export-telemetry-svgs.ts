import * as fs from 'fs';
import * as path from 'path';
import {
  generateIsocalendarSvg,
  generateLanguagesDonutSvg,
  generateHabitsRadarSvg,
  generateAchievementsRackSvg,
  generateTerminalHudSvg,
  generatePageSpeedAuditSvg,
  generateMusicPlayerSvg,
  generateLeetCodeStatsSvg,
} from '../src/lib/forge-telemetry/svg-generators';

const publicDir = path.resolve(process.cwd(), 'public/assets');

const svgs = [
  { file: 'telemetry-isocalendar-3d.svg', content: generateIsocalendarSvg() },
  { file: 'telemetry-languages-donut.svg', content: generateLanguagesDonutSvg() },
  { file: 'telemetry-habits-radar.svg', content: generateHabitsRadarSvg() },
  { file: 'telemetry-achievements-rack.svg', content: generateAchievementsRackSvg() },
  { file: 'telemetry-terminal-hud.svg', content: generateTerminalHudSvg() },
  { file: 'telemetry-pagespeed-audit.svg', content: generatePageSpeedAuditSvg() },
  { file: 'telemetry-music-player.svg', content: generateMusicPlayerSvg() },
  { file: 'telemetry-leetcode-stats.svg', content: generateLeetCodeStatsSvg() },
];

for (const { file, content } of svgs) {
  const filePath = path.join(publicDir, file);
  fs.writeFileSync(filePath, content.trim(), 'utf-8');
  console.log(`Generated: ${filePath}`);
}

// Remove old metrics-*.svg files from public/assets
const oldFiles = [
  'metrics-isocalendar-3d.svg',
  'metrics-languages-donut.svg',
  'metrics-habits-radar.svg',
  'metrics-achievements-rack.svg',
  'metrics-terminal-hud.svg',
  'metrics-pagespeed-audit.svg',
  'metrics-music-player.svg',
  'metrics-leetcode-stats.svg',
];

for (const oldFile of oldFiles) {
  const oldPath = path.join(publicDir, oldFile);
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
    console.log(`Deleted old: ${oldFile}`);
  }
}

console.log('All standalone telemetry SVGs successfully updated in public/assets!');
