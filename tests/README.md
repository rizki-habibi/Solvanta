# Test Plan

Tests are not implemented yet. Add tests before any program deployment.

Required cases:
- Unauthorized member cannot modify workspace roles.
- Only configured authority can alter treasury policy.
- A proposer cannot self-approve when separation of duties is enabled.
- Wrong PDA, wrong owner, wrong mint, or wrong token program is rejected.
- Zero amount, decimal mismatch, expiry, and arithmetic boundary cases are rejected.
- Release and refund cannot both succeed; terminal states cannot be reopened.
- Replayed approval or stale proposal is rejected.
- All state-changing instructions have positive and negative tests on a local validator.
