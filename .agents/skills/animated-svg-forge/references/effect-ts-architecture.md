# Effect-TS Architecture & Defensive Engineering

Reference: [Effect-TS/effect](https://github.com/Effect-TS/effect) (The TypeScript framework for building robust, type-safe, and fault-tolerant programs)

---

## 1. Typed Failure Boundaries & Zero-Throw Invariant

In profile generation and SVG synthesis pipelines:
- **Never throw raw untyped runtime exceptions.**
- Structure operations using the `Result<T, E>` pattern (`{ _tag: 'Success', value: T } | { _tag: 'Failure', error: E }`).
- Handle every failure explicitly at the boundary (e.g. malformed markdown, unverified SVG attributes, missing images, invalid color hexes).

```typescript
export type SvgSynthesisError =
  | { readonly _tag: 'InvalidDimensions'; readonly width: number; readonly height: number }
  | { readonly _tag: 'ContrastFailure'; readonly fgHex: string; readonly bgHex: string }
  | { readonly _tag: 'XmlSanitizationError'; readonly details: string };

export type Result<T, E> =
  | { readonly ok: true; readonly data: T }
  | { readonly ok: false; readonly error: E };
```

---

## 2. Strict Schema Validation at Trust Boundaries

Validate all external data (user JSON, markdown AST, third-party API payloads) using explicit schemas before rendering:

```typescript
import { z } from 'zod';

export const AnimatedSvgConfigSchema = z.object({
  title: z.string().min(1).max(120),
  subtitle: z.string().max(200).optional(),
  theme: z.enum(['cyberpunk', 'tokyonight', 'dracula', 'matrix', 'minimal']),
  primaryColor: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
  secondaryColor: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/),
  width: z.number().int().min(200).max(1920).default(800),
  height: z.number().int().min(80).max(1080).default(240),
  alignment: z.enum(['left', 'center', 'right']).default('center'),
  heroImageUri: z.string().url().or(z.string().startsWith('/')).optional(),
});
```

---

## 3. Pure Deterministic Synthesis

Keep the SVG generation engine a 100% pure function:
`Config -> ValidatedSvgString`

- Zero side-effects inside the SVG generator.
- Deterministic outputs make unit testing fast, reproducible, and verifiable.
