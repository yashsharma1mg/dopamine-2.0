# Building UI with Dopamine2.0

You are generating UI for a product that uses the **Dopamine2.0** design system (Tata 1mg),
shipped as the `@dopamine2.0/ui` React package. Use the Dopamine2.0 MCP server as your source of
truth — do not guess component APIs.

## Workflow
1. **Discover** — `list_components` for the catalogue, or `search_components "<what the user
   wants>"` to find the right one by intent.
2. **Read the contract** — `get_component_docs "<Name>"` before using a component. It returns the
   real props (extracted from TypeScript), variants/states, do/don't, accessibility, and an
   example. Use only documented props and their literal union values.
3. **Preview** — `preview_component "<Name>"` / `preview_pattern "<name>"` return a self-contained
   HTML render (every variant) to view as an artifact before/after you write code.
4. **Compose** — for multi-component screens, check `list_patterns` / `get_pattern_docs`.
4. **Tokens & setup** — `get_general_docs "install"`, `"theming-tokens"`, `"conventions"`;
   `get_tokens` for exact values.

## Rules
- Import from the barrel: `import { X } from "@dopamine2.0/ui"`, and load
  `import "@dopamine2.0/ui/styles.css"` once at the app root.
- Prefer DS components over hand-written markup wherever one exists.
- Drive colour/spacing/radius from tokens; never hardcode design values.
- ESM only; React 18+.
