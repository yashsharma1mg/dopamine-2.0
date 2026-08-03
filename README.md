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

A Model Context Protocol server (`packages/mcp/`) serves the design system to any Claude surface
so it can **discover, document, and preview** Dopamine2.0 UI. It ships two ways from one
`npm run build`: a self-contained local package (`dist/` + bundled `data/`) and a remote endpoint
on the site Worker (`app/mcp/route.ts` → `/mcp`). Both serve the same 10 tools — see
[packages/mcp/README.md](packages/mcp/README.md) for how to add it to claude.ai web, Claude
Desktop, and Claude Code.

- Source of truth: `scripts/generate-registry.mts` extracts real prop types from the TypeScript
  components, merges the curated manifest prose + spec retrieval keywords, and emits
  `packages/content/generated/registry.json` + an LLM knowledgebase. `scripts/prerender-previews.mjs`
  SSRs each component's variants (+ the cart pattern) to self-contained HTML, and
  `scripts/bundle-mcp.mjs` copies it all into the package (`data/`) and one `edge-bundle.json` for
  the Worker — so the local package and remote endpoint never drift.
- Tools: `list_components`, `search_components`, `get_component_docs`, `list_patterns`,
  `get_pattern_docs`, `get_general_docs`, `get_tokens`, `get_agent_rules`, `preview_component`,
  `preview_pattern`.
- The remote `/mcp` endpoint is gated by a bearer token — `wrangler secret put MCP_TOKEN` (returns
  `503` until set). This repo ships `.mcp.json` (auto-discovered by Claude Code) and `AGENTS.md`.
- Deferred: Figma Code Connect (frame→component) and the project scaffolder.

## Component release

1. Supply an approved, node-specific Figma link.
2. Component God writes the spec without generating code.
3. Token Police verifies every token and required state.
4. Implement the React API with generated tokens.
5. Add stories, interaction assertions, accessibility checks, and the shared manifest.
6. Build and install the packed package in a consumer before promotion.

The canonical token JSON wins when implementation and Figma disagree; mismatches remain explicit audit items.
