# Dopamine2.0

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

## MCP — generate UI with any coding agent

A Model Context Protocol server (`packages/mcp/`) serves the design system to coding agents
(Cursor, Claude Code, …) so they generate correct Dopamine2.0 UI.

- Source of truth: `scripts/generate-registry.mts` (`npm run generate:registry`) extracts real
  prop types from the TypeScript components (react-docgen-typescript), merges the curated
  manifest prose + spec retrieval keywords, and emits `packages/content/generated/registry.json`
  plus an LLM knowledgebase under `packages/content/generated/knowledgebase/`.
- Server tools: `list_components`, `search_components`, `get_component_docs`, `list_patterns`,
  `get_pattern_docs`, `get_general_docs`, `get_tokens`, `get_agent_rules`.
- This repo ships `.mcp.json` (auto-discovered by Claude Code) and `AGENTS.md` (drop-in agent
  rules). Run standalone with `npm --prefix packages/mcp start`.
- Deferred: Figma Code Connect (frame→component) and the project scaffolder.

## Component release

1. Supply an approved, node-specific Figma link.
2. Component God writes the spec without generating code.
3. Token Police verifies every token and required state.
4. Implement the React API with generated tokens.
5. Add stories, interaction assertions, accessibility checks, and the shared manifest.
6. Build and install the packed package in a consumer before promotion.

The canonical token JSON wins when implementation and Figma disagree; mismatches remain explicit audit items.
