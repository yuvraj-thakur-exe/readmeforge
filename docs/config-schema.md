# ReadmeForge Config Schema Specification

The ReadmeForge configuration schema is a standardized, declarative JSON format that defines the complete state of a GitHub Profile README.

Both the visual wizard and the `/developer` Monaco editor synchronize against this single source of truth (`useReadmeStore`). AI agents and CLI tools can generate or modify a README profile by outputting valid JSON conforming to this specification.

---

## 1. Top-Level Schema (`ReadmeConfig`)

```json
{
  "version": "1.0.0",
  "title": "ReadmeForge Profile",
  "settings": {
    "user": {
      "github": "your-github-username",
      "name": "Your Full Name",
      "role": "Full-Stack Engineer",
      "bio": "Building high-performance developer tools.",
      "location": "San Francisco, CA",
      "pronouns": "they/them",
      "status": "Building ReadmeForge"
    },
    "theme": "dark",
    "accentColor": "#8b5cf6",
    "badgeStyle": "for-the-badge",
    "align": "left"
  },
  "sections": [
    {
      "id": "sec-1",
      "type": "typing-svg",
      "props": {
        "content": {
          "lines": ["Hey there! 👋", "I am a full-stack developer.", "Welcome to my profile!"]
        },
        "styles": {
          "align": "left"
        }
      }
    }
  ]
}
```

---

## 2. Fields Breakdown

### `settings.user`
- `github` (string, required): The target GitHub profile username.
- `name` (string, optional): Display name.
- `role` (string, optional): Professional title or specialty.
- `bio` (string, optional): One-liner or brief introduction.
- `location` (string, optional): Geographic location.
- `pronouns` (string, optional): Personal pronouns.
- `status` (string, optional): Current focus or working-on description.

### `settings` Design Tokens
- `theme` (`"light"` | `"dark"` | `"auto"`): Color scheme preference.
- `accentColor` (hex string): Primary branding/accent color (default `#8b5cf6`).
- `badgeStyle` (`"flat"` | `"flat-square"` | `"plastic"` | `"for-the-badge"`): Global Shields.io badge style.
- `align` (`"left"` | `"center"` | `"right"`): Document default alignment.

### `sections[]`
Each section represents an independent component or plugin entry:
- `id` (string, unique): Unique identifier for reordering and selection.
- `type` (string): Plugin identifier (e.g. `github-readme-stats`, `snk`, `typing-svg`, `trophies`, `techs`, `socials`, `visitor-counter`).
- `props`:
  - `content` (object): Plugin-specific data fields.
  - `styles` (object): Layout options (`align`, `height`, `direction`, etc.).
  - `state` (optional string): Interactive UI state.

---

## 3. Zod Schema Reference
Source definition: [`src/lib/plugins/types.ts`](file:///d:/profile%20genrater/src/lib/plugins/types.ts).
Validated using `ReadmeConfigSchema.parse(jsonPayload)`.
