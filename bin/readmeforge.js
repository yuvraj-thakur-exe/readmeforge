#!/usr/bin/env node

/**
 * ReadmeForge CLI & AI Agent Skill Tool
 * Autonomous GitHub profile README generator, archetype renderer, and MCP server.
 * Zero external dependencies — runs anywhere with Node.js 18+.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Complete Archetypes Catalog with Configurations
export const ARCHETYPES = [
  {
    id: 'wow-3d-city-cat',
    name: '#1 Wow Profile (3D City & Peeking Cat)',
    category: 'Popular',
    accent: '#10b981',
    description: 'Turn your GitHub profile into a work of art with a peeking black cat mascot, retro pixel-art avatar header, 3D isometric contribution city, glowing language stack, and featured projects.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Alex Rivers';
      const role = u.role || 'Frontend & Full-Stack Systems Engineer';
      return `<div align="center">
  <img src="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/assets/peeking-cat-header.svg" width="100%" alt="Peeking Cat Header" />
</div>

<br/>

<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${user}&theme=radical&no-frame=false&no-bg=true&margin-w=4" alt="Trophies" />
</div>

<br/>

<div align="center">
  <h3>🏙️ The City I Built This Year</h3>
  <img src="https://github-profile-3d-contrib.vercel.app/api?username=${user}&theme=dark" alt="3D Contributions City" />
</div>

<br/>

<div align="center">
  <h3>⚡ Language &amp; Tech Stack</h3>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=kotlin,rust,javascript,python,typescript,react,docker,git,linux,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Commit Velocity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'bento-signal-dashboard',
    name: '#5 Signal Dashboard (Bento Grid & Anime Cat)',
    category: 'Popular',
    accent: '#38bdf8',
    description: 'Data-driven GitHub stats bento grid with anime cinematic banner, live profile signal metrics (Stars, Commits, Repos, Followers), emerald contribution activity graph, and featured repo showcase.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/assets/bento-dashboard-header.svg" width="100%" alt="Bento Dashboard Header" />
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Annual Contribution Activity" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=c,rust,python,bash,linux,docker,git,react,typescript,nextjs&theme=dark&perline=10" alt="Languages" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=donut&theme=tokyonight" alt="Top Languages" />
</div>`;
    },
  },
  {
    id: 'metrics-telemetry-dashboard',
    name: 'Metrics & Telemetry Dashboard',
    category: 'Popular',
    accent: '#10b981',
    description: 'Telemetry dashboard inspired by lowlighter/metrics with PageSpeed scores, 3D contribution calendar, commit activity graphs, and tech icons.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Alex Rivers';
      const role = u.role || 'Principal Systems Architect & Open-Source Engineer';
      return `# Hi there, I'm ${name} 👋
### ${role}

<div align="center">
  <img src="https://img.shields.io/badge/Performance-97%25-10B981?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Performance" />
  <img src="https://img.shields.io/badge/Accessibility-100%25-10B981?style=for-the-badge&logo=w3c&logoColor=white" alt="Accessibility" />
  <img src="https://img.shields.io/badge/Best_Practices-100%25-10B981?style=for-the-badge&logo=lighthouse&logoColor=white" alt="Best Practices" />
  <img src="https://img.shields.io/badge/SEO-100%25-10B981?style=for-the-badge&logo=google&logoColor=white" alt="SEO" />
</div>

<br/>

<div align="center">
  <img src="https://github-profile-3d-contrib.vercel.app/api?username=${user}&theme=dark" alt="3D Contributions" />
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Commit Habits" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,ts,python,cpp,vue,docker,git,aws,gcp,arduino,raspberrypi,linux,bash,react&theme=dark&perline=14" alt="Skills" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'neon-craftsman-owl',
    name: 'Purple Neon & Digital Craftsman',
    category: 'Design',
    accent: '#9333ea',
    description: 'Curved waving purple neon banner (HELLO WORLD), two-column layout with emoji status bullets and celebratory owl party popper mascot sticker.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Morgan Reed';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:6a11cb,100:2575fc&height=220&section=header&text=HELLO%20WORLD&desc=WELCOME%20TO%20MY%20PROFILE&fontSize=40&fontColor=ffffff&fontAlignY=42&descAlignY=64&descSize=16" alt="Header" width="100%" />
</div>

<br/>

<table>
  <tr>
    <td valign="top" width="65%">
      <h3>⚡ I'm ${name}!</h3>
      <p><em>Digital Craftsman (Developer / Programmer)</em></p>
      <ul>
        <li>🌱 Student of life :)</li>
        <li>🔭 Currently learning distributed systems &amp; cloud-native Go</li>
        <li>👨‍💻 Dedicated open-source contributor and technical mentor</li>
        <li>✍️ Writing technical deep dives on systems engineering</li>
        <li>🤝 Passionate about collaborative open-source</li>
      </ul>
      <br/>
      <a href="https://github.com/${user}">
        <img src="https://komarev.com/ghpvc/?username=${user}&label=PROFILE+VIEWS&color=9333ea&style=for-the-badge" alt="Profile Views" />
      </a>
    </td>
    <td valign="top" width="35%" align="center">
      <img src="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/assets/owl-confetti.svg" alt="Owl Mascot" width="260" />
    </td>
  </tr>
</table>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,react,nodejs,django,postgres,fastapi,typescript,docker,git,linux&theme=dark&perline=10" alt="Skills" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=radical" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'minimal-light-unicorn',
    name: 'Minimal Light & Coding Unicorn',
    category: 'Minimal',
    accent: '#3b82f6',
    description: 'Clean light-mode layout with centered greeting, monochromatic social badges row, checkmarked bio achievements, and cute pastel coding unicorn at laptop sticker.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Jordan Lee';
      return `<div align="center">
  <h1>Hi 👋, I'm ${name}</h1>
  <p>Software Engineer | Technical Writer | Open Source Enthusiast</p>
  <a href="https://github.com/${user}"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub" /></a>
  <a href="https://linkedin.com"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://dev.to"><img src="https://img.shields.io/badge/Dev.to-0A0A0A?style=flat&logo=devdotto&logoColor=white" alt="Dev.to" /></a>
</div>

<br/>

<table>
  <tr>
    <td valign="top" width="65%">
      <h3>🌟 Talking about Personal Stuffs...</h3>
      <p><em>Learning while HOPING &amp; HUSTLING! Building scalable apps and sharing knowledge along the way.</em></p>
      <ul>
        <li>✔ Currently developing payment gateways &amp; microservices</li>
        <li>✔ Learning ReactJS, NodeJS &amp; cloud architecture</li>
        <li>✔ Looking to collaborate on high-impact open source</li>
        <li>✔ Regularly writing technical blogs and tutorials</li>
        <li>✔ Active problem solver on LeetCode</li>
        <li>✔ Fun fact: I turn coffee into clean, well-tested commits</li>
      </ul>
      <br/>
      <a href="https://github.com/${user}">
        <img src="https://komarev.com/ghpvc/?username=${user}&label=Profile+views&color=3b82f6&style=flat" alt="Profile Views" />
      </a>
    </td>
    <td valign="top" width="35%" align="center">
      <img src="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/assets/coding-unicorn.svg" alt="Coding Unicorn" width="260" />
    </td>
  </tr>
</table>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=c,cpp,python,flask,css,html,js,nodejs,react,sass,git,linux&theme=light&perline=12" alt="Skills" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=default" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'constellation-devops-desk',
    name: 'Constellation DevOps & Workstation',
    category: 'DevOps',
    accent: '#38bdf8',
    description: 'Dark constellation cyberpunk DevOps engineer profile with deep space banner, SRE bullet points, and programmer at workstation desk illustration.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Samir Patel';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&color=0:090d16,100:111827&height=180&section=header&text=Hey!%20I%20am%20a%20DevOps%20Engineer&desc=Automating%20everything%20between%20commit%20and%20production&fontSize=32&fontColor=38bdf8&descSize=16" alt="Header" width="100%" />
</div>

<br/>

<table>
  <tr>
    <td valign="top" width="65%">
      <h3>Hi 👋, I'm ${name}</h3>
      <p><em>Passionate and aspiring DevOps &amp; Cloud Infrastructure Engineer</em></p>
      <ul>
        <li>🔭 Currently engineering multi-region Kubernetes clusters</li>
        <li>🌱 Learning eBPF, service mesh observability, and zero-trust security</li>
        <li>👨‍💻 Stack: Git, Docker, Kubernetes, Jenkins, Ansible, AWS, GCP, Grafana</li>
        <li>⚡ Passionate about automated testing, 99.99% uptime, and sub-minute deploys</li>
      </ul>
      <br/>
      <a href="https://github.com/${user}">
        <img src="https://komarev.com/ghpvc/?username=${user}&label=Profile+views&color=38bdf8&style=flat" alt="Profile views" />
      </a>
    </td>
    <td valign="top" width="35%" align="center">
      <img src="https://raw.githubusercontent.com/yuvrajlaptop2008-byte/readmeforge/main/public/assets/developer-desk.svg" alt="Dev at Desk" width="260" />
    </td>
  </tr>
</table>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=docker,kubernetes,aws,gcp,linux,git,ansible,grafana,prometheus,bash,python,go&theme=dark&perline=12" alt="DevOps Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/38BDF8/${user}" alt="Commit Velocity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="Stats" />
</div>`;
    },
  },
  {
    id: 'isometric-terminal-connect',
    name: 'Isometric Terminal & Fullstack Connect',
    category: 'Popular',
    accent: '#6366f1',
    description: '3D isometric terminal cube header banner, Competitive Programmer subtitle, vibrant "Let\'s Connect and have a Chat!" callout with colorful rounded social badge arsenal, skills matrix, and trophy rack.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Casey Vance';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=cylinder&color=0:0b0f19,100:1e1b4b&height=200&section=header&text=Hey!%20I'm%20a%20Full-Stack%20Developer&desc=%3E_%20Competitive%20Programmer%20%7C%20Cloud%20Architect&fontSize=34&fontColor=ffffff&descSize=18&fontAlignY=42&descAlignY=64" alt="Header" width="100%" />
</div>

<br/>

<div align="center">
  <h3>Let's Connect and have a Chat! 💭</h3>
  <a href="https://github.com/${user}"><img src="https://img.shields.io/badge/Portfolio-2563EB?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>
  <a href="https://linkedin.com"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
  <a href="https://dev.to"><img src="https://img.shields.io/badge/DEV.TO-0A0A0A?style=for-the-badge&logo=devdotto&logoColor=white" alt="Dev.to" /></a>
  <a href="https://twitter.com"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>
  <a href="https://instagram.com"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white" alt="Instagram" /></a>
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=java,spring,ts,react,nodejs,mongodb,docker,git,mysql,aws,redux,tailwind&theme=dark&perline=12" alt="Fullstack Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${user}&theme=radical&no-frame=false&no-bg=true&margin-w=4" alt="Trophies" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="Stats" />
</div>`;
    },
  },
  {
    id: 'pinterest-lofi-aesthetic',
    name: 'Aesthetic Lo-Fi & Pinterest Art',
    category: 'Design',
    accent: '#ec4899',
    description: 'Vibrant, cozy developer profile with animated Lo-Fi midnight coding desk artwork from Pinterest, ambient music player, aesthetic tech badges, and clean stats.',
    generator: (u) => {
      const user = u.username || 'octocat';
      const name = u.name || 'Aria Vance';
      return `<div align="center">
  <img src="https://i.pinimg.com/originals/0a/61/52/0a6152a25992955f134764b86378e994.gif" alt="Aesthetic Lo-Fi Midnight Coding" width="100%" />
  <br/>
  <p align="center"><em>✦ Turning coffee and midnight playlists into clean software architectures ✦</em></p>
</div>

<br/>

<div align="center">
  <h1>Hi there, I'm ${name} 🎧</h1>
  <p>Creative Technologist &amp; Lo-Fi Enthusiast</p>
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=ts,react,nextjs,tailwind,nodejs,python,docker,git&theme=dark&perline=10" alt="Aesthetic Skills" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/EC4899/${user}" alt="Aesthetic Commit Velocity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=radical" alt="GitHub Stats" />
</div>`;
    },
  },
];

// Helper to generate profile markdown with footer attribution
export function generateProfile(options) {
  const archetypeId = options.archetype || 'wow-3d-city-cat';
  const archetype = ARCHETYPES.find((a) => a.id === archetypeId) || ARCHETYPES[0];
  const body = archetype.generator(options);
  const footer = `\n---\n<p align="center">\n  <sub>⚡ Powered by <a href="https://readmeforge.dev"><b>ReadmeForge</b></a> — Forge a GitHub profile that gets noticed.</sub>\n</p>`;
  return body + footer;
}

// CLI Argument Parsing
function parseArgs(args) {
  const result = { _: [] };
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        result[key] = next;
        i++;
      } else {
        result[key] = true;
      }
    } else if (arg.startsWith('-')) {
      const key = arg.slice(1);
      const next = args[i + 1];
      if (next && !next.startsWith('-')) {
        result[key] = next;
        i++;
      } else {
        result[key] = true;
      }
    } else {
      result._.push(arg);
    }
  }
  return result;
}

// Help message
function showHelp() {
  console.log(`
ReadmeForge — Forge a GitHub profile that gets noticed.
Autonomous Profile Generator, AI Agent Skill, and MCP Server.

USAGE:
  npx readmeforge generate --username <handle> [options]
  npx readmeforge list
  npx readmeforge skill-install [--target <dir>]
  npx readmeforge mcp

COMMANDS:
  generate          Forge a complete GitHub profile README.md
  list              List all available visual archetypes
  skill-install     Install ReadmeForge as an AI Agent Skill (.agents/skills/readmeforge/)
  mcp               Start Model Context Protocol (MCP) stdio server for AI agents

OPTIONS:
  --username, -u    GitHub username (default: 'octocat')
  --archetype, -a   Archetype ID (default: 'wow-3d-city-cat')
  --output, -o      Output file path (default: 'README.md', use '-' for stdout)
  --name            Display name (default: auto-detected or persona name)
  --role            Developer headline or role
  --help, -h        Show this help message

EXAMPLES:
  # 1-Liner: Generate #1 Wow Profile for your GitHub username
  npx readmeforge generate --username octocat --archetype wow-3d-city-cat

  # Generate Bento Signal Dashboard
  npx readmeforge generate --username octocat --archetype bento-signal-dashboard

  # Install AI Agent Skill into current workspace
  npx readmeforge skill-install
`);
}

// Install agent skill files into target project
function installAgentSkill(targetDir = '.') {
  const destDir = path.resolve(targetDir, '.agents/skills/readmeforge');
  fs.mkdirSync(destDir, { recursive: true });

  const skillContent = `---
name: readmeforge
description: AI Agent skill for generating, customizing, and validating high-impact, Camo-compliant GitHub profile READMEs with 18+ visual archetypes, animated vector SVGs, 3D contribution cities, and telemetry bento widgets.
---

# ReadmeForge Agent Skill

Use this skill whenever asked to create, revamp, or forge a developer's GitHub profile README.md.

## Available Archetypes
- \`wow-3d-city-cat\`: #1 Wow Profile with peeking black cat mascot, retro pixel-art avatar, 3D contribution city, and glowing language stack.
- \`bento-signal-dashboard\`: #5 Signal Dashboard with anime silhouette bento header, live signal metrics widgets, and contribution heatmap.
- \`metrics-telemetry-dashboard\`: Dark telemetry dashboard with PageSpeed scores, 3D calendar, and coding habits graphs.
- \`neon-craftsman-owl\`: Curved waving purple neon header banner with celebratory owl mascot holding party popper cannon.
- \`minimal-light-unicorn\`: Clean light-mode layout with checkmarked achievements and cute pastel coding unicorn at laptop sticker.
- \`constellation-devops-desk\`: Deep space constellation header with DevOps engineer at workstation desk illustration.
- \`isometric-terminal-connect\`: 3D isometric terminal cube banner with glossy social badges arsenal.
- \`pinterest-lofi-aesthetic\`: Cozy animated Lo-Fi midnight coding desk artwork from Pinterest with ambient music aesthetics.

## CLI Execution
\`\`\`bash
npx readmeforge generate --username <github-username> --archetype <archetype-id>
\`\`\`
`;

  fs.writeFileSync(path.join(destDir, 'SKILL.md'), skillContent, 'utf8');
  console.log(`✅ ReadmeForge AI Agent Skill installed to ${destDir}/SKILL.md`);
}

// Model Context Protocol (MCP) stdio JSON-RPC 2.0 Server
function startMcpServer() {
  process.stdin.setEncoding('utf8');

  let buffer = '';
  process.stdin.on('data', (chunk) => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const req = JSON.parse(line.trim());
        handleMcpRequest(req);
      } catch (e) {
        // Ignore JSON parse errors on stream
      }
    }
  });

  function sendMcp(res) {
    process.stdout.write(JSON.stringify(res) + '\n');
  }

  function handleMcpRequest(req) {
    const { id, method, params } = req;

    if (method === 'initialize') {
      sendMcp({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'readmeforge-mcp', version: '1.0.0' },
        },
      });
      return;
    }

    if (method === 'tools/list') {
      sendMcp({
        jsonrpc: '2.0',
        id,
        result: {
          tools: [
            {
              name: 'generate_profile_readme',
              description: 'Generate a production-ready, Camo-compliant GitHub profile README.md using visual archetypes.',
              inputSchema: {
                type: 'object',
                properties: {
                  username: { type: 'string', description: 'Target GitHub username' },
                  archetype: {
                    type: 'string',
                    description: 'Archetype ID (e.g. wow-3d-city-cat, bento-signal-dashboard, metrics-telemetry-dashboard, neon-craftsman-owl, minimal-light-unicorn, constellation-devops-desk, isometric-terminal-connect, pinterest-lofi-aesthetic)',
                  },
                  name: { type: 'string', description: 'Developer display name' },
                  role: { type: 'string', description: 'Developer headline or title' },
                },
                required: ['username'],
              },
            },
            {
              name: 'list_archetypes',
              description: 'List all available ReadmeForge visual archetypes with descriptions and styles.',
              inputSchema: { type: 'object', properties: {} },
            },
          ],
        },
      });
      return;
    }

    if (method === 'tools/call') {
      const { name, arguments: args } = params;
      if (name === 'list_archetypes') {
        sendMcp({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: JSON.stringify(ARCHETYPES, null, 2) }],
          },
        });
        return;
      }

      if (name === 'generate_profile_readme') {
        const md = generateProfile(args || {});
        sendMcp({
          jsonrpc: '2.0',
          id,
          result: {
            content: [{ type: 'text', text: md }],
          },
        });
        return;
      }
    }

    // Default response for unhandled notifications/methods
    if (id !== undefined) {
      sendMcp({ jsonrpc: '2.0', id, result: {} });
    }
  }
}

// Main CLI Controller
async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] || (args.help || args.h ? 'help' : 'interactive');

  if (command === 'help' || args.help || args.h) {
    showHelp();
    return;
  }

  if (command === 'mcp' || args.mcp) {
    startMcpServer();
    return;
  }

  if (command === 'list') {
    console.log('\n📦 ReadmeForge Visual Archetypes Catalog:\n');
    console.log(
      'ID'.padEnd(30) +
        'CATEGORY'.padEnd(14) +
        'ACCENT'.padEnd(10) +
        'NAME'
    );
    console.log('-'.repeat(80));
    for (const a of ARCHETYPES) {
      console.log(
        a.id.padEnd(30) +
          a.category.padEnd(14) +
          a.accent.padEnd(10) +
          a.name
      );
    }
    console.log('\nRun "npx readmeforge generate --archetype <id>" to forge any archetype!\n');
    return;
  }

  if (command === 'skill-install') {
    const target = args.target || '.';
    installAgentSkill(target);
    return;
  }

  if (command === 'generate') {
    const username = args.username || args.u || 'octocat';
    const archetype = args.archetype || args.a || 'wow-3d-city-cat';
    const outputFile = args.output || args.o || 'README.md';

    const md = generateProfile({
      username,
      archetype,
      name: args.name,
      role: args.role,
    });

    if (outputFile === '-') {
      process.stdout.write(md + '\n');
    } else {
      fs.writeFileSync(outputFile, md, 'utf8');
      console.log(`✨ Successfully forged GitHub Profile README (${archetype}) for @${username}!`);
      console.log(`📄 Saved to: ${path.resolve(outputFile)}`);
    }
    return;
  }

  // If no arguments passed, display help with quick-run instructions
  showHelp();
}

main().catch((err) => {
  console.error('ReadmeForge CLI Error:', err);
  process.exit(1);
});
