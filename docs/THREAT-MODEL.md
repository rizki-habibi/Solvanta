# Threat Model — Initial Draft

## Assets
- Treasury funds and token accounts
- Escrow state and beneficiary/refund authority
- Member roles and approval policy
- Wallet identity and signed messages
- Audit records and transaction metadata

## Threats to test
- Forged client-side role or workspace identifier
- Unauthorized signer or mismatched wallet
- Malicious or unexpected token mint/program
- Incorrect PDA seeds, bump, or account ownership checks
- Replayed signature challenge or transaction proposal
- Self-approval and approval threshold bypass
- Double release, double refund, or invalid state transition
- Integer overflow, zero/negative amount, decimal mismatch
- Expired escrow and timestamp boundary conditions
- Denial of service through unbounded account/data processing
- Sensitive data leakage through logs, URLs, or errors
- Compromised dependency or leaked environment secret

## Minimum controls
- Deny-by-default server authorization
- Nonce + expiry + domain-bound wallet signatures
- Strict signer, owner, PDA, mint, and program validation
- Explicit state machine and replay prevention
- Checked arithmetic and token decimal validation
- Multi-approver policy for high-value operations
- Dependency scanning, lockfile, CI tests, and secret scanning
- Pause/recovery process reviewed by maintainers

## Release gate
No mainnet deployment or real-fund usage before test coverage, independent review, documented remediation, and explicit operational sign-off.
