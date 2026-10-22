# Solvanta Anchor Program — Planned

The on-chain program is intentionally **not implemented yet**. This folder reserves the planned program location and documents the security requirements before any code is used to control funds.

Planned instructions:
- Initialize a workspace/treasury authority.
- Register or revoke member roles under the authority.
- Create escrow with explicit payer, beneficiary, refund authority, amount, mint/program, and expiry.
- Approve proposals with a defined threshold and separation-of-duties rules.
- Release or refund escrow with one-way state transitions.
- Pause and recover only under a documented governance policy.

Before implementation, select and pin compatible Anchor/Solana versions, define account layouts and PDA seeds, write invariants, and create positive and negative tests. Never deploy this draft to mainnet or deposit real funds.