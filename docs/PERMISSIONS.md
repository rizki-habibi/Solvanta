# Role & Permission Model

This document defines the initial application policy for Solvanta. It is a design baseline, not an implementation of production authorization.

## Roles and access matrix

| Capability | Super Admin | Treasury Owner | Approver | Operator | Auditor | Viewer |
|---|---:|---:|---:|---:|---:|---:|
| Read workspace summary | Yes | Yes | Yes | Yes | Yes | Yes |
| Read treasury balances | Yes | Yes | Yes | Limited | Read-only | Limited |
| Create escrow draft | Yes | Yes | No | Yes | No | No |
| Propose treasury transfer | Yes | Yes | No | By policy | No | No |
| Approve transaction | Policy-bound | No by default | Yes | No | No | No |
| Execute on-chain transaction | Only when authorized by program | Only when authorized by program | Only when authorized by program | No by default | No | No |
| Manage members | Yes | No | No | No | No | No |
| Assign roles | Yes, with safeguards | No | No | No | No | No |
| Change spending policy | Yes, with safeguards | Propose only | No | No | No | No |
| Read audit log | Yes | Yes | Yes | Own actions | Yes | Limited |
| Export audit report | Yes | Yes | Yes | No | Yes | No |

## Required safeguards
1. Enforce least privilege and deny by default.
2. Separate proposing a transaction from approving and executing it.
3. Use multi-party approval for high-value treasury actions.
4. Prevent a proposer from approving their own request where policy requires separation of duties.
5. Apply spending limits, expiry, replay protection, and explicit transaction state transitions.
6. Record actor, action, target, timestamp, decision, and transaction signature in an append-only audit trail.
7. Re-check authorization at every server endpoint and on-chain instruction.
8. Never accept a role or wallet address supplied by the browser as proof of authority.
9. Role changes should require re-authentication and be logged.
10. Emergency pause and recovery paths need explicit governance and tests.

## On-chain identity
For a Solana program, sensitive instructions must validate signer accounts and derive/validate PDAs using canonical seeds and bumps. Application roles alone cannot grant authority to move funds. Treasury ownership, approver sets, thresholds, and escrow state must be represented and validated on-chain.

## Future implementation
- Authentication and wallet-signature challenge with nonce + expiry.
- Server-side session and workspace membership records.
- Central authorization policy and tests for each capability.
- Anchor account constraints and instruction-level authorization.
- Negative tests for unauthorized signer, wrong PDA, stale proposal, replay, expired escrow, and approval threshold failures.
