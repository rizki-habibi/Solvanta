# Solvanta

**Secure Treasury & Escrow on Solana** — a role-aware treasury and escrow workspace designed for transparent approvals, clear permissions, and safer on-chain workflows.

> **Development status:** early-stage prototype. The current web interface uses demo data and simulated actions. It is not audited, and it must not be used to custody real funds.

## Product goals
- Create and track escrow agreements.
- Organize treasury operations around explicit roles and permissions.
- Provide approval workflows and a reviewable activity log.
- Connect a Solana wallet in a later integration phase.
- Keep application permissions separate from on-chain program authorization.

## Roles
| Role | Purpose |
|---|---|
| Super Admin | Manage workspace settings, members, and role assignments |
| Treasury Owner | Manage treasury configuration and propose transactions |
| Approver | Review and approve eligible requests |
| Operator | Create escrow drafts and prepare transactions |
| Auditor | Read records, permissions, and activity history |
| Viewer | Read-only access to permitted workspace information |

**Security note:** UI permissions are not a security boundary. Every sensitive action must be independently authorized by the backend and/or Solana program. Never trust client-side role checks alone.

## Planned stack
- Next.js App Router, React, TypeScript
- Tailwind CSS
- Solana Wallet Adapter and Anchor (integration phase)
- Anchor/Rust program with explicit signer and account constraints
- TypeScript tests, Rust tests, CI checks

## Run locally
Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Current prototype limitations
- Dashboard data is mock data.
- “Connect wallet”, create, approve, and export actions are visual/demo interactions only.
- No production database, authentication, or on-chain program is wired yet.
- Do not describe Solvanta as audited or secure until an independent audit and remediation are complete.

## Planned structure
```
app/
  globals.css
  layout.tsx
  page.tsx
components/
  (shared UI components to be extracted as the product grows)
docs/
  ARCHITECTURE.md
  PERMISSIONS.md
  THREAT-MODEL.md
  AUDIT-SCOPE.md
programs/
  solana/                 # Anchor program planned
tests/
  (application and program tests)
```
