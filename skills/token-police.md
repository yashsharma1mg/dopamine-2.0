# Token Police

Token Police audits a completed component spec. It never changes the spec or implementation.

## Audit

1. Verify every `token.<path>` resolves to a leaf with a `value` in `packages/tokens/tokens.json`.
2. Flag raw hexadecimal values in component YAML.
3. Echo every `TOKEN MISSING` entry.
4. For interactive components, verify focus includes ring, width, and offset.
5. Verify disabled behavior includes 50% opacity and blocked interaction.
6. Return the resolved count, missing tokens, raw values, and required state fixes.

Missing values remain release blockers until the design-system team adds or selects an approved token.
