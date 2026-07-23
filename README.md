# Internal Design System

A private documentation platform, Storybook, token pipeline, and registry-ready React package.

## Workspace

- `app/` — multi-route documentation website.
- `packages/tokens/` — canonical token JSON and generated CSS/TypeScript.
- `packages/content/` — typed manifests shared by website and Storybook.
- `packages/ui/` — distributable React components and stories.
- `skills/` — Figma-to-spec and deterministic token audit workflow.

## Commands

```bash
npm run dev
npm run storybook
npm test
npm run build
npm run pack:ui
```

`npm run build` regenerates tokens, builds the UI package, creates the static Storybook under `/storybook`, and produces the deployable website.

## Component release

1. Supply an approved, node-specific Figma link.
2. Component God writes the spec without generating code.
3. Token Police verifies every token and required state.
4. Implement the React API with generated tokens.
5. Add stories, interaction assertions, accessibility checks, and the shared manifest.
6. Build and install the packed package in a consumer before promotion.

The canonical token JSON wins when implementation and Figma disagree; mismatches remain explicit audit items.
