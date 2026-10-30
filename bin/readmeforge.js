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
  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/assets/wow-profile-full.svg" width="100%" alt="#1 Wow Profile 3D City & Peeking Cat" />
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
  <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/assets/bento-dashboard-full.svg" width="100%" alt="#5 Signal Dashboard Bento Grid" />
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
    id: 'forge-telemetry-dashboard',
    name: 'ReadmeForge Telemetry Dashboard',
    category: 'Popular',
    accent: '#10b981',
    description: 'Native telemetry dashboard with PageSpeed scores, 3D contribution calendar, commit activity graphs, and tech icons.',
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
      <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/assets/owl-confetti.svg" alt="Owl Mascot" width="260" />
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
      <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/assets/coding-unicorn.svg" alt="Coding Unicorn" width="260" />
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
      <img src="https://raw.githubusercontent.com/yuvraj-thakur-exe/readmeforge/main/public/assets/developer-desk.svg" alt="Dev at Desk" width="260" />
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
  {
    id: 'data-engineer-streaming',
    name: 'Data Engineer & Stream Processor',
    category: 'AI & Data',
    accent: '#0284c7',
    description: 'High-throughput data pipelines, Kafka streaming, Spark transformations, and Snowflake analytics warehouse.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0284c7&height=180&section=header&text=Data%20Platform%20%26%20Distributed%20Systems&desc=Streaming%20billions%20of%20events%20per%20second%20with%20sub-second%20latency&fontSize=28&fontColor=ffffff&descSize=14&descColor=0284c7" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,kafka,apache,spark,postgres,docker,aws,linux,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/0284C7/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'game-dev-3d-graphics',
    name: '3D Game Developer & Graphics Engineer',
    category: 'Design',
    accent: '#ec4899',
    description: 'Real-time ray tracing, custom HLSL/GLSL shaders, Unreal Engine 5, Unity, and procedural generation.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:ec4899&height=180&section=header&text=3D%20Graphics%20%26%20Game%20Engine%20Architecture&desc=Translating%20mathematical%20equations%20into%20living%2C%20breathing%20real-time%20wo&fontSize=28&fontColor=ffffff&descSize=14&descColor=ec4899" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=cpp,rust,unity,unreal,blender,js,webgl,git,linux&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/EC4899/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'web3-solidity-defi',
    name: 'Web3 & DeFi Smart Contract Architect',
    category: 'Mobile & Web3',
    accent: '#8b5cf6',
    description: 'Gas-optimized EVM bytecode, formal smart contract verification, Foundry test suites, and decentralized finance.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:8b5cf6&height=180&section=header&text=Trustless%20Decentralized%20Protocols&desc=Formal%20verification%2C%20sub-21k%20gas%20execution%2C%20and%20cryptographic%20security&fontSize=28&fontColor=ffffff&descSize=14&descColor=8b5cf6" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=solidity,rust,ethereum,ts,ipfs,git,linux,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/8B5CF6/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'embedded-iot-firmware',
    name: 'Embedded Systems & IoT Firmware Engineer',
    category: 'Systems',
    accent: '#10b981',
    description: 'Bare-metal C/C++, FreeRTOS multitasking, STM32 microcontrollers, low-power Bluetooth, and hardware drivers.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:10b981&height=180&section=header&text=Bare-Metal%20%26%20Real-Time%20Firmware&desc=Deterministic%20execution%20in%20microsecond%20budgets%20on%20resource-constrained&fontSize=28&fontColor=ffffff&descSize=14&descColor=10b981" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=c,cpp,rust,linux,arduino,raspberrypi,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'creative-technologist-motion',
    name: 'Creative Technologist & Interaction Designer',
    category: 'Design',
    accent: '#f43f5e',
    description: 'Fluid GLSL canvas shaders, reactive micro-interactions, generative SVG animations, and design systems.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:f43f5e&height=180&section=header&text=Interactive%20Motion%20%26%20Generative%20Systems&desc=Sculpting%20delightful%20digital%20interactions%20at%20silky%2060fps&fontSize=28&fontColor=ffffff&descSize=14&descColor=f43f5e" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,ts,threejs,figma,tailwind,css,html,git,nextjs&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/F43F5E/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'quantum-algorithms-physicist',
    name: 'Quantum Computing & Algorithms Researcher',
    category: 'AI & Data',
    accent: '#6366f1',
    description: 'Quantum circuits, Qiskit error mitigation, topological qubits, and quantum variational eigensolvers.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:6366f1&height=180&section=header&text=Quantum%20Information%20%26%20Superposition&desc=Harnessing%20quantum%20entanglement%20to%20solve%20classically%20intractable%20probl&fontSize=28&fontColor=ffffff&descSize=14&descColor=6366f1" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,julia,c,linux,git,latex,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/6366F1/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'site-reliability-sre-chaos',
    name: 'Site Reliability Engineer (SRE & Observability)',
    category: 'DevOps',
    accent: '#f59e0b',
    description: 'Multi-region Kubernetes clusters, 99.999% SLA budgeting, eBPF telemetry, and chaos engineering drills.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:f59e0b&height=180&section=header&text=Five-Nines%20Uptime%20%26%20Chaos%20Engineering&desc=Automated%20self-healing%20infrastructure%20engineered%20for%20planetary%20scale&fontSize=28&fontColor=ffffff&descSize=14&descColor=f59e0b" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=kubernetes,docker,prometheus,grafana,linux,bash,go,python,terraform&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/F59E0B/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'competitive-programmer-grandmaster',
    name: 'Competitive Programmer & Algorithmic Specialist',
    category: 'Systems',
    accent: '#ef4444',
    description: 'Master of graph theory, dynamic programming, Segment Trees, and sub-millisecond C++20 execution.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:ef4444&height=180&section=header&text=Optimal%20Algorithms%20%26%20Sub-Millisecond%20Speed&desc=Transforming%20NP-hard%20computational%20challenges%20into%20elegant%20optimal%20sol&fontSize=28&fontColor=ffffff&descSize=14&descColor=ef4444" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=cpp,java,python,c,linux,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/EF4444/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'indie-hacker-solopreneur',
    name: 'Solo Founder & Indie Hacker',
    category: 'Popular',
    accent: '#10b981',
    description: 'Shipping profitable micro-SaaS products, public revenue metrics, full-stack velocity, and user-centric features.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:10b981&height=180&section=header&text=Building%20in%20Public%20%26%20Bootstrapping%20SaaS&desc=Zero%20fluff%2C%20zero%20meetings%2C%20100%25%20customer%20value%20delivered%20weekly&fontSize=28&fontColor=ffffff&descSize=14&descColor=10b981" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,postgres,supabase,git,html,css&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'bioinformatics-genomics-core',
    name: 'Bioinformatics & Computational Genomics Specialist',
    category: 'AI & Data',
    accent: '#06b6d4',
    description: 'Whole-genome sequencing pipelines, variant effect prediction, single-cell RNA-seq, and reproducibility.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:06b6d4&height=180&section=header&text=Genomic%20Big%20Data%20%26%20Molecular%20Discovery&desc=Accelerating%20therapeutic%20breakthroughs%20with%20statistical%20genomics%20and%20d&fontSize=28&fontColor=ffffff&descSize=14&descColor=06b6d4" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,r,linux,bash,docker,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/06B6D4/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'audio-dsp-audio-engineer',
    name: 'Audio Programmer & DSP Software Engineer',
    category: 'Systems',
    accent: '#a855f7',
    description: 'Real-time VST/AU plugins, low-latency SIMD buffers, spatial HRTF synthesis, and musical acoustics.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:a855f7&height=180&section=header&text=Digital%20Signal%20Processing%20%26%20Acoustics&desc=Microsecond%20buffer%20latency%2C%20pristine%20harmonics%2C%20and%20real-time%20DSP%20filt&fontSize=28&fontColor=ffffff&descSize=14&descColor=a855f7" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=cpp,c,rust,python,linux,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/A855F7/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'backend-systems-rust-tokio',
    name: 'High-Concurrency Distributed Systems Engineer',
    category: 'Systems',
    accent: '#ea580c',
    description: 'Lock-free data structures, Tokio async runtime, Raft consensus, and microsecond IPC communication.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:ea580c&height=180&section=header&text=Zero-Cost%20Abstractions%20%26%20Concurrency&desc=Memory%20safety%20without%20garbage%20collection%2C%20scaling%20horizontally%20across%20&fontSize=28&fontColor=ffffff&descSize=14&descColor=ea580c" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=rust,go,redis,postgres,docker,linux,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/EA580C/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'enterprise-java-spring-boot',
    name: 'Enterprise Java & Microservices Architect',
    category: 'Systems',
    accent: '#b45309',
    description: 'Domain-Driven Design, event-driven Kafka messaging, Spring Boot 3, and mission-critical reliability.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:b45309&height=180&section=header&text=Enterprise%20Resilience%20%26%20Event%20Sourcing&desc=Domain-Driven%20Design%2C%20robust%20transaction%20boundaries%2C%20and%2099.999%25%20enter&fontSize=28&fontColor=ffffff&descSize=14&descColor=b45309" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=java,spring,docker,kubernetes,postgres,aws,git,linux&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/B45309/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'flutter-crossplatform-specialist',
    name: 'Cross-Platform Mobile Architect',
    category: 'Mobile & Web3',
    accent: '#0284c7',
    description: 'Pixel-perfect mobile applications for iOS & Android, offline-first sync, reactive Riverpod state, and native plugins.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0284c7&height=180&section=header&text=High-Performance%20Cross-Platform%20Mobile&desc=Single%20codebase%2C%20120fps%20native%20performance%20across%20iOS%2C%20Android%2C%20and%20De&fontSize=28&fontColor=ffffff&descSize=14&descColor=0284c7" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=flutter,dart,react,ts,swift,kotlin,git,figma&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/0284C7/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'red-team-ethical-hacker',
    name: 'Penetration Tester & Offensive Security Specialist',
    category: 'Systems',
    accent: '#dc2626',
    description: 'Red team adversary simulation, binary exploitation, zero-day research, and network intrusion analysis.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:dc2626&height=180&section=header&text=Offensive%20Security%20%26%20Binary%20Exploitation&desc=Discovering%20edge-case%20attack%20vectors%20to%20harden%20mission-critical%20softwa&fontSize=28&fontColor=ffffff&descSize=14&descColor=dc2626" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,bash,linux,c,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/DC2626/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'synthwave-outrun-coder',
    name: 'Synthwave 80s Cyber Hacker',
    category: 'Design',
    accent: '#d946ef',
    description: 'Retro 80s synthwave horizon, neon purple chrome gradients, electronic beats, and ultra-fast frontend applications.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:d946ef&height=180&section=header&text=Neon%20Outrun%20%26%20Retro%20Synth%20Aesthetics&desc=Cruising%20down%20the%20digital%20highway%20with%2080s%20synths%20and%20modern%20clean%20cod&fontSize=28&fontColor=ffffff&descSize=14&descColor=d946ef" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=vue,ts,tailwind,vite,pinia,git,html,css&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/D946EF/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'terminal-matrix-digital-rain',
    name: 'Neo Matrix Cyber Terminal',
    category: 'Popular',
    accent: '#22c55e',
    description: 'Phosphor green digital rain, pure terminal cadence, Linux kernel hacker aesthetic, and minimal overhead.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:22c55e&height=180&section=header&text=Phosphor%20Green%20Matrix%20Terminal&desc=Wake%20up%2C%20Neo...%20The%20terminal%20holds%20the%20truth&fontSize=28&fontColor=ffffff&descSize=14&descColor=22c55e" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=c,bash,linux,git,python&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/22C55E/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'frontend-design-system-lead',
    name: 'Design Systems Lead & UI Architect',
    category: 'Design',
    accent: '#3b82f6',
    description: 'Token architectures, WCAG AAA accessibility, component libraries, Storybook documentation, and micro-interactions.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:3b82f6&height=180&section=header&text=Accessible%20Design%20Systems%20%26%20Tokens&desc=Pixel%20precision%2C%20WCAG%20AAA%20conformance%2C%20and%20effortless%20multi-brand%20them&fontSize=28&fontColor=ffffff&descSize=14&descColor=3b82f6" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,ts,tailwind,nextjs,figma,html,css,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/3B82F6/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'deep-learning-computer-vision',
    name: 'Deep Learning & Computer Vision Researcher',
    category: 'AI & Data',
    accent: '#8b5cf6',
    description: 'Convolutional neural networks, Vision Transformers (ViT), real-time object detection, and edge tensor runtimes.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:8b5cf6&height=180&section=header&text=Spatial%20Vision%20%26%20Neural%20Representations&desc=Real-time%20multi-modal%20perception%20models%20running%20inference%20on%20edge%20hard&fontSize=28&fontColor=ffffff&descSize=14&descColor=8b5cf6" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=pytorch,python,opencv,linux,docker,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/8B5CF6/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'platform-engineer-kubernetes',
    name: 'Platform Engineer & Developer Portal Specialist',
    category: 'DevOps',
    accent: '#0ea5e9',
    description: 'Internal Developer Platforms (IDP), GitOps with ArgoCD, golden path infrastructure templates, and developer happiness.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0ea5e9&height=180&section=header&text=Internal%20Developer%20Platforms%20%26%20GitOps&desc=Empowering%20product%20engineers%20to%20deploy%20with%20confidence%20in%20seconds%2C%20not&fontSize=28&fontColor=ffffff&descSize=14&descColor=0ea5e9" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=kubernetes,docker,terraform,go,linux,bash,git,aws&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/0EA5E9/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'graphql-api-architect',
    name: 'API Architect & GraphQL Specialist',
    category: 'Systems',
    accent: '#e11d48',
    description: 'Federated GraphQL supergraphs, schema stitching, ultra-fast Fastify servers, and OpenAPI contract testing.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:e11d48&height=180&section=header&text=Federated%20Graph%20Architecture%20%26%20Gateway&desc=Type-safe%20client%20contracts%20with%20zero%20over-fetching%20and%20millisecond%20res&fontSize=28&fontColor=ffffff&descSize=14&descColor=e11d48" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,ts,graphql,postgres,redis,docker,git,linux&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/E11D48/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'database-tuner-dba',
    name: 'Database Architect & Performance Tuner',
    category: 'Systems',
    accent: '#0284c7',
    description: 'Query plan optimization, pgvector similarity indexing, horizontal sharding, and high-availability replication.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:0284c7&height=180&section=header&text=High-Throughput%20Relational%20%26%20Vector%20Storage&desc=Zero-downtime%20failovers%2C%20index%20optimization%2C%20and%20sub-millisecond%20query&fontSize=28&fontColor=ffffff&descSize=14&descColor=0284c7" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=postgres,redis,linux,bash,python,docker,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/0284C7/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'blue-team-soc-analyst',
    name: 'Security Operations & Blue Team Defense Specialist',
    category: 'Systems',
    accent: '#3b82f6',
    description: 'Threat hunting, SIEM log correlation, automated incident response playbooks, and perimeter defense.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:3b82f6&height=180&section=header&text=Defensive%20Perimeter%20%26%20Threat%20Detection&desc=Uncompromising%20security%20posture%2C%20automated%20containment%2C%20and%2024%2F7%20resil&fontSize=28&fontColor=ffffff&descSize=14&descColor=3b82f6" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=python,bash,linux,docker,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/3B82F6/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'robotics-ros2-navigation',
    name: 'Robotics & Autonomous Navigation Engineer',
    category: 'Systems',
    accent: '#f97316',
    description: 'Simultaneous Localization and Mapping (SLAM), ROS2 micro-nodes, trajectory planning, and hardware sensor fusion.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:f97316&height=180&section=header&text=Autonomous%20Navigation%20%26%20Sensor%20Fusion&desc=Real-time%20kinematic%20planning%2C%20multi-sensor%20integration%2C%20and%20determinis&fontSize=28&fontColor=ffffff&descSize=14&descColor=f97316" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=cpp,python,linux,ros,git,docker,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/F97316/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'spatial-computing-visionos',
    name: 'Spatial Computing & VisionOS Developer',
    category: 'Mobile & Web3',
    accent: '#6366f1',
    description: 'Volumetric windows, RealityKit spatial anchors, hand-tracking gestures, and immersive 3D mixed reality.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:6366f1&height=180&section=header&text=Spatial%20Computing%20%26%20Volumetric%20Realities&desc=Transcending%20flat%20screens%20with%20interactive%20spatial%20anchors%20and%20mixed%20r&fontSize=28&fontColor=ffffff&descSize=14&descColor=6366f1" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=swift,apple,unity,blender,git,figma&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/6366F1/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'tech-educator-content-creator',
    name: 'Technical Content Creator & Educator',
    category: 'Popular',
    accent: '#eab308',
    description: 'Visual coding tutorials, open-source educational repositories, engineering guides, and community mentorship.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:eab308&height=180&section=header&text=Open%20Knowledge%20%26%20Developer%20Mentorship&desc=Empowering%20the%20next%20million%20engineers%20with%20free%2C%20accessible%2C%20and%20cryst&fontSize=28&fontColor=ffffff&descSize=14&descColor=eab308" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,ts,react,python,git,markdown,html,css&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/EAB308/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'kernel-driver-lowlevel-dev',
    name: 'Linux Kernel & Low-Level Driver Developer',
    category: 'Systems',
    accent: '#64748b',
    description: 'Ring-0 privilege programming, memory-mapped I/O, PCIe device drivers, and kernel crash dump analysis.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:64748b&height=180&section=header&text=Kernel%20Internals%20%26%20Memory%20Architecture&desc=Operating%20at%20Ring%200%2C%20where%20every%20byte%20and%20cycle%20directly%20controls%20phys&fontSize=28&fontColor=ffffff&descSize=14&descColor=64748b" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=c,linux,bash,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/64748B/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'fintech-hft-low-latency',
    name: 'FinTech & High-Frequency Trading Developer',
    category: 'Systems',
    accent: '#059669',
    description: 'Sub-microsecond order execution, kernel-bypass networking, FPGA packet parsing, and modern C++20.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:059669&height=180&section=header&text=Sub-Microsecond%20Quantitative%20Systems&desc=Deterministic%20nanosecond%20performance%20where%20latency%20directly%20equals%20com&fontSize=28&fontColor=ffffff&descSize=14&descColor=059669" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=cpp,python,linux,git,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/059669/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'edtech-simulation-developer',
    name: 'EdTech & Interactive Simulation Developer',
    category: 'Design',
    accent: '#8b5cf6',
    description: 'Interactive STEM physics simulations, mathematical visualizations, HTML5 Canvas animations, and gamified learning.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:8b5cf6&height=180&section=header&text=Interactive%20STEM%20Simulations&desc=Visualizing%20abstract%20mathematical%20principles%20into%20playful%2C%20intuitive%20t&fontSize=28&fontColor=ffffff&descSize=14&descColor=8b5cf6" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,react,ts,html,css,git&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/8B5CF6/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'pixel-art-indie-gamedev',
    name: 'Cozy Pixel Artist & Retro Indie Gamedev',
    category: 'Design',
    accent: '#f59e0b',
    description: '16-bit nostalgic worlds, chiptune soundscapes, Godot game mechanics, and handcrafted sprite animations.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:f59e0b&height=180&section=header&text=16-Bit%20Nostalgia%20%26%20Handcrafted%20Games&desc=Painting%20retro%20worlds%20one%20pixel%20at%20a%20time%20with%20endless%20heart%20and%20imagi&fontSize=28&fontColor=ffffff&descSize=14&descColor=f59e0b" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=godot,blender,git,linux,python&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/F59E0B/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'cloud-serverless-specialist',
    name: 'Cloud Native Serverless Architect',
    category: 'DevOps',
    accent: '#f97316',
    description: 'Event-driven architectures, DynamoDB single-table design, zero-idle infrastructure cost, and AWS CDK/SST.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:f97316&height=180&section=header&text=True%20Serverless%20%26%20Event%20Choreography&desc=Scaling%20from%200%20to%20100%2C000%20requests%20in%20milliseconds%20with%20zero%20idle%20infr&fontSize=28&fontColor=ffffff&descSize=14&descColor=f97316" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=aws,ts,nodejs,docker,git,linux,bash&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/F97316/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
  {
    id: 'developer-experience-dx-lead',
    name: 'Developer Experience & Documentation Engineer',
    category: 'Popular',
    accent: '#10b981',
    description: 'Instant CLI toolchain feedback, interactive SDK documentation, AST code generation, and ergonomic APIs.',
    generator: (u) => {
      const user = u.username || 'octocat';
      return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,100:10b981&height=180&section=header&text=Zero-Friction%20Developer%20Experience&desc=Transforming%20painful%20onboarding%20friction%20into%20effortless%2C%20delightfully&fontSize=28&fontColor=ffffff&descSize=14&descColor=10b981" width="100%" alt="Header" />
</div>

<br/>

<div align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=astro,react,ts,tailwind,markdown,git,nextjs&theme=dark&perline=10" alt="Tech Stack" />
  </a>
</div>

<br/>

<div align="center">
  <img src="https://ghchart.rshah.org/10B981/${user}" alt="Commit Activity" />
</div>

<br/>

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&theme=tokyonight" alt="GitHub Stats" />
</div>`;
    },
  },
];

// Helper to generate profile markdown with footer attribution
export function generateProfile(options) {
  const archetypeId = options.archetype || 'wow-3d-city-cat';
  const archetype =
    ARCHETYPES.find((a) => a.id === archetypeId || (archetypeId === 'metrics-telemetry-dashboard' && a.id === 'forge-telemetry-dashboard')) ||
    ARCHETYPES[0];
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
- \`forge-telemetry-dashboard\`: Dark telemetry dashboard with PageSpeed scores, 3D calendar, and coding habits graphs.
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
                    description: 'Archetype ID (e.g. wow-3d-city-cat, bento-signal-dashboard, forge-telemetry-dashboard, neon-craftsman-owl, minimal-light-unicorn, constellation-devops-desk, isometric-terminal-connect, pinterest-lofi-aesthetic)',
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
