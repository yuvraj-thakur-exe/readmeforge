# Security Policy — 100% Open Source & Zero Boundaries

MonoForge is 100% free, community-driven, and open-source software licensed under the MIT License. There are zero corporate gates, zero private silos, and zero boundaries.

## Open & Transparent Security

We believe in open collaboration and transparent, community-first security practices:

- **Public Issues & Discussions Welcome**: Any security inquiry, bug report, vulnerability discussion, or enhancement proposal can be opened directly and transparently via public GitHub Issues or GitHub Discussions.
- **Direct Pull Requests**: Anyone in the global developer community can review the code, audit dependencies, submit security patches, and open Pull Requests.
- **Zero Red Tape**: No private email barriers, no NDAs, and no bureaucratic disclosure queues. All security patches and reviews are merged and published openly in the public repository.

## Invariant Safeguards

Even with complete open-source transparency, MonoForge enforces strict architectural security invariants:

1. **Client-Side Token Privacy**:
   - All Personal Access Tokens (PATs) and GitHub credentials exist exclusively in your local browser session memory.
   - Tokens are **never** sent to any external server, remote database, or third-party telemetry logger.

2. **Strictly Scoped Permissions**:
   - Automated telemetry workflows and profile syncs require only fine-grained permissions restricted strictly to your own profile repository (`<username>/<username>`).
   - Never grant account-wide `admin:*` privileges.

3. **GitHub Camo Proxy Compliance**:
   - All animated vector graphics adhere to GitHub Camo proxy rules:
     - Zero `<script>` tags
     - Zero `<foreignObject>` tags
     - Pure CSS keyframe animations operating exclusively via hardware-accelerated `transform` and `opacity`
     - Clean SVG vector path sanitization

4. **Confirmation-Gated Remote Actions**:
   - MonoForge never pushes silently or automatically to remote repositories. All synchronization operations require explicit side-by-side diff review and user confirmation.
