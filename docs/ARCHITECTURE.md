# Solvanta Architecture (Draft)

## Current prototype
Next.js App Router renders a responsive workspace UI with mock treasury metrics, escrow rows, activity items, and an interactive role selector. Creating an escrow only adds a local demo row in browser state; it does not call an API or blockchain.

## Target architecture
1. **Web client** — Next.js + TypeScript, accessible UI, wallet adapter integration.
2. **Identity** — wallet signature challenge with server-generated nonce, expiry, origin/domain validation, replay protection, and session invalidation.
3. **Policy API** — server-side membership and permission checks. Every mutation checks role, workspace scope, policy limits, and request state.
4. **Solana program** — Anchor/Rust instructions for initializing treasury, creating escrow, proposing transfer, approving, releasing, refunding, and pausing. Each instruction validates signer, PDA, token mint/program, amount, status, and timing.
5. **Indexing/storage** — optional database for searchable metadata and audit projection. On-chain state remains the source of truth for program-controlled assets.
6. **Observability** — structured logs, transaction signature correlation, alerting, and redaction of secrets.

## Transaction lifecycle
Draft → Proposed → Pending approvals → Approved → Executed; alternate terminal states include Rejected, Cancelled, Expired, and Refunded. Transitions must be validated server-side and on-chain. Do not infer a successful transfer from a client toast; confirm the transaction on the intended cluster.

## Deployment stages
- Phase 1: local UI prototype and role policy.
- Phase 2: authentication and unit/integration tests.
- Phase 3: Anchor program on local validator and Devnet.
- Phase 4: threat modeling, independent audit, remediation.
- Phase 5: only after sign-off, consider production deployment.

Never store wallet private keys, seed phrases, or signing secrets in the web application or repository.
