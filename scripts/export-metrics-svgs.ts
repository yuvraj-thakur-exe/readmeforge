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
} from '../src/lib/forge-metrics/svg-generators';

const publicDir = path.resolve(process.cwd(), 'public/assets');

const svgs = [
  { file: 'metrics-isocalendar-3d.svg', content: generateIsocalendarSvg() },
  { file: 'metrics-languages-donut.svg', content: generateLanguagesDonutSvg() },
  { file: 'metrics-habits-radar.svg', content: generateHabitsRadarSvg() },
  { file: 'metrics-achievements-rack.svg', content: generateAchievementsRackSvg() },
  { file: 'metrics-terminal-hud.svg', content: generateTerminalHudSvg() },
  { file: 'metrics-pagespeed-audit.svg', content: generatePageSpeedAuditSvg() },
  { file: 'metrics-music-player.svg', content: generateMusicPlayerSvg() },
  { file: 'metrics-leetcode-stats.svg', content: generateLeetCodeStatsSvg() },
];

for (const { file, content } of svgs) {
  const filePath = path.join(publicDir, file);
  fs.writeFileSync(filePath, content.trim(), 'utf-8');
  console.log(`Generated: ${filePath}`);
}

console.log('All 8 standalone metrics SVGs successfully generated in public/assets!');
