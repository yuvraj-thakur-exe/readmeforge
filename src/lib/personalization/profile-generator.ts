import { ReadmeConfig, SectionConfig } from '../plugins/types';
import { v4 as uuidv4 } from 'uuid';

export type DeveloperPersonaRole =
  | 'ai-ml'
  | 'cloud-devops'
  | 'fullstack'
  | 'frontend-creative'
  | 'systems-embedded'
  | 'mobile-engineer'
  | 'game-dev'
  | 'security-researcher';

export interface PersonalizeProfileOptions {
  github: string;
  name?: string;
  role?: DeveloperPersonaRole | string;
  skills?: string[];
  vibe?: 'cyberpunk' | 'tokyonight' | 'dracula' | 'matrix' | 'minimal' | 'solar';
  includeCharts?: boolean;
  includeTrophies?: boolean;
  includeSnake?: boolean;
  includeAchievements?: boolean;
}

interface PersonaDetails {
  headlineRole: string;
  tagline: string;
  accentColor: string;
  theme: string;
  typingLines: string[];
  badges: string[];
  bioBullets: string[];
}

const PERSONA_CONFIGS: Record<string, PersonaDetails> = {
  'ai-ml': {
    headlineRole: 'AI Researcher & Machine Learning Engineer',
    tagline: 'Training frontier multi-modal models and architecting autonomous agent runtimes.',
    accentColor: '#10b981',
    theme: 'tokyonight',
    typingLines: [
      'Frontier Machine Learning & Transformer Models',
      'Autonomous Multi-Agent Architecture & Fine-Tuning',
      'High-Throughput Distributed Inference & RAG Runtimes',
    ],
    badges: ['python', 'pytorch', 'tensorflow', 'fastapi', 'huggingface', 'docker', 'cuda'],
    bioBullets: [
      'Exploring latent representations, generative video, and chain-of-thought architectures.',
      'Optimizing inference with TensorRT-LLM and vLLM on multi-GPU clusters.',
      'Active contributor to open-source ML research and Hugging Face models.',
    ],
  },
  'cloud-devops': {
    headlineRole: 'Staff Platform & Cloud SRE Architect',
    tagline: 'Automating everything between `git push` and resilient multi-region production.',
    accentColor: '#06b6d4',
    theme: 'nord',
    typingLines: [
      'Zero-Trust Multi-Region Kubernetes Meshes',
      'Declarative Infrastructure as Code with Terraform',
      'Sub-Second GitOps Pipelines & High-Availability Observability',
    ],
    badges: ['kubernetes', 'docker', 'terraform', 'go', 'rust', 'amazonwebservices', 'prometheus'],
    bioBullets: [
      'Hardening zero-downtime microservice topologies and Istio service meshes.',
      'Architecting multi-cloud cost reduction and automated failover pipelines.',
      'Believer in immutable infrastructure and complete observability observability.',
    ],
  },
  'fullstack': {
    headlineRole: 'Senior Full-Stack & Distributed Systems Engineer',
    tagline: 'Crafting responsive, high-velocity web applications from database index to edge cache.',
    accentColor: '#8b5cf6',
    theme: 'radical',
    typingLines: [
      'Building Full-Stack Reactive Web Platforms',
      'TypeScript, Next.js 16 & Serverless Edge APIs',
      'Distributed Postgres & High-Concurrency Systems',
    ],
    badges: ['typescript', 'react', 'nextdotjs', 'nodedotjs', 'postgresql', 'redis', 'tailwindcss'],
    bioBullets: [
      'Translating complex product requirements into resilient, maintainable distributed code.',
      'Passionate about sub-50ms TTFB, optimistic UI updates, and zero-flash layouts.',
      'Proud open-source builder and creator of high-traction developer toolkits.',
    ],
  },
  'frontend-creative': {
    headlineRole: 'Creative Developer & UI/UX Motion Specialist',
    tagline: 'Bridging engineering rigor with 60fps micro-interactions, shaders, and spatial web design.',
    accentColor: '#ec4899',
    theme: 'radical',
    typingLines: [
      'Designing Fluid 60fps Web Animations & Shaders',
      'Three.js, WebGL & Spatial Interactive 3D UIs',
      'Design Token Architectures & Accessible Micro-Interactions',
    ],
    badges: ['typescript', 'react', 'threedotjs', 'tailwindcss', 'framer', 'figma', 'vite'],
    bioBullets: [
      'Obsessed with motion physics, spring curves, and delightful developer experiences.',
      'Auditing Core Web Vitals, accessible color contrast, and vestibular reduced-motion.',
      'Creating interactive web experiments that blur the line between utility and art.',
    ],
  },
  'systems-embedded': {
    headlineRole: 'Systems & Embedded Software Engineer',
    tagline: 'Writing high-performance, memory-safe software close to bare metal and silicon.',
    accentColor: '#f97316',
    theme: 'onedark',
    typingLines: [
      'High-Performance Systems in Rust & Modern C++',
      'Low-Latency Networking & Lock-Free Data Structures',
      'Embedded Firmware, Linux Drivers & SIMD Acceleration',
    ],
    badges: ['rust', 'cplusplus', 'c', 'linux', 'webassembly', 'cmake', 'git'],
    bioBullets: [
      'Benchmarking cache-locality, instruction throughput, and lock-free concurrency.',
      'Building zero-overhead abstractions for memory-constrained embedded environments.',
      'Enthusiast for deterministic execution and low-level kernel tracing.',
    ],
  },
};

/**
 * Generates a completely customized, persona-tailored ReadmeConfig.
 * Ensures that two different developers receive unique, highly personalized profiles
 * reflecting their specific domain, color harmonies, and technical strengths.
 */
export function generatePersonalizedProfile(options: PersonalizeProfileOptions): ReadmeConfig {
  const userGithub = options.github.trim() || 'developer';
  const userName = options.name?.trim() || userGithub;
  const roleKey = (options.role as string) in PERSONA_CONFIGS ? (options.role as string) : 'fullstack';
  const persona = PERSONA_CONFIGS[roleKey];

  const theme = options.vibe ? options.vibe : persona.theme;
  const accentColor = options.vibe === 'cyberpunk'
    ? '#ec4899'
    : options.vibe === 'matrix'
    ? '#10b981'
    : options.vibe === 'minimal'
    ? '#64748b'
    : options.vibe === 'solar'
    ? '#f59e0b'
    : persona.accentColor;

  const sections: SectionConfig[] = [];

  // 1. Dynamic Typing Hero
  sections.push({
    id: uuidv4(),
    type: 'readme-typing-svg',
    props: {
      content: {
        lines: persona.typingLines,
        color: accentColor.replace('#', ''),
      },
      styles: { align: 'center' },
      state: 'default',
    },
  });

  // 2. Languages Donut & Pie Chart (if charts enabled)
  if (options.includeCharts !== false) {
    sections.push({
      id: uuidv4(),
      type: 'pie-chart',
      props: {
        content: {
          chartMode: 'top-langs-donut',
          title: 'Top Languages Breakdown',
          theme,
        },
        styles: { align: 'center' },
        state: 'default',
      },
    });

    sections.push({
      id: uuidv4(),
      type: 'activity-graph',
      props: {
        content: {
          color: accentColor.replace('#', ''),
          title: 'Commit Velocity & Contribution Activity',
        },
        styles: { align: 'center' },
        state: 'default',
      },
    });
  }

  // 3. Stats & Streaks
  sections.push({
    id: uuidv4(),
    type: 'github-readme-stats',
    props: {
      content: {
        username: userGithub,
        theme,
        showStats: true,
        showStreak: true,
        showLanguages: false, // Languages are spotlighted in the pie chart above
      },
      styles: { align: 'center' },
      state: 'default',
    },
  });

  // 4. Trophies (if requested)
  if (options.includeTrophies !== false) {
    sections.push({
      id: uuidv4(),
      type: 'github-profile-trophy',
      props: {
        content: {
          username: userGithub,
          mirror: 'https://github-profile-repo.vercel.app',
          theme: 'flat',
          row: 1,
          column: 6,
        },
        styles: { align: 'center' },
        state: 'default',
      },
    });
  }

  // 5. Official GitHub Achievements (if requested)
  if (options.includeAchievements !== false) {
    sections.push({
      id: uuidv4(),
      type: 'github-achievements',
      props: {
        content: {
          username: userGithub,
          badgeSize: 64,
        },
        styles: { align: 'center' },
        state: 'default',
      },
    });
  }

  // 6. Contribution Snake (if requested)
  if (options.includeSnake !== false) {
    sections.push({
      id: uuidv4(),
      type: 'snk',
      props: {
        content: {
          username: userGithub,
          theme: 'dark',
        },
        styles: { align: 'center' },
        state: 'default',
      },
    });
  }

  return {
    version: '1.0.0',
    title: `${userName}'s Personalized GitHub Profile`,
    settings: {
      user: {
        github: userGithub,
        name: userName,
        role: persona.headlineRole,
        bio: persona.tagline,
        status: persona.bioBullets[0],
      },
      theme: 'dark',
      accentColor,
      badgeStyle: 'for-the-badge',
      align: 'left',
    },
    sections,
  };
}
