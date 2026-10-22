# Proposed Audit Scope

This is a preliminary scope for a future independent review. No audit has been performed by this repository commit.

## Intended in-scope components
- Anchor/Rust program instructions and account validation
- Treasury authority and role/threshold configuration
- Escrow create, release, cancel, refund, and expiry transitions
- Token transfers, mint validation, decimal handling, and arithmetic
- Proposal/approval state machine and replay resistance
- Tests and deployment configuration

## Out of scope until implemented
- Production web authentication
- Backend authorization and database
- Third-party wallet extensions and RPC providers
- Infrastructure and operational security

## Readiness criteria
- Program code complete and frozen for review
- Reproducible build and tests
- Public repository and exact commit hash documented
- Architecture, invariants, and threat model complete
- Maintainers available to answer questions and remediate findings
- No claims of audit status until an auditor provides a report
