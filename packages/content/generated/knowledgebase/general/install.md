# Install & set up Dopamine2.0

Dopamine2.0 ships as one self-contained React package: `@dopamine2.0/ui` (ESM, React 18+).

## Install

The package is distributed as a tarball (private design system, not on the public npm registry):

```bash
npm install ./dopamine2.0-ui-0.1.0.tgz
# peer deps (if not already present)
npm install react react-dom
```

## Wire it up

1. Import the stylesheet **once** at your app root — it carries the tokens, fonts, and all
   component styles:

   ```tsx
   import "@dopamine2.0/ui/styles.css";
   ```

2. Import components from the barrel and use them:

   ```tsx
   import { Button, Snackbar } from "@dopamine2.0/ui";

   export function App() {
     return (
       <>
         <Button type="Fill">Save changes</Button>
         <Snackbar type="Success" message="Saved" />
       </>
     );
   }
   ```

Icons are inlined (data-URIs) inside the package — there are **no external asset URLs to host**.
Fonts (Figtree) are bundled and referenced by the stylesheet.

## Requirements

- React `>=18`, React DOM `>=18`.
- A bundler that resolves the `exports` map (Vite, Next.js, webpack 5, esbuild). ESM only —
  CommonJS `require()` is not supported.

## Add the Dopamine2.0 MCP to Claude

The MCP server lets any Claude surface discover, document, and **preview** every component. It
ships two ways from one build (`npm run build`): a self-contained local package and a remote
endpoint on the design-system Worker.

### claude.ai web + Claude Desktop (remote connector)

Add the hosted endpoint as a custom connector — one URL, works in web chat and Desktop:

- **URL:** `https://<your-dopamine-site>/mcp`
- **Auth:** it is gated by a bearer token. Set it once: `wrangler secret put MCP_TOKEN`, then give
  the connector an `Authorization: Bearer <token>` header. Until the secret is set the endpoint
  returns `503` (secure by default).

### Claude Desktop (local, no server)

In `claude_desktop_config.json`:

```json
{ "mcpServers": { "dopamine2": { "command": "node",
  "args": ["/abs/path/to/packages/mcp/dist/index.js"] } } }
```

(or after `npm i -g ./dopamine2.0-mcp-0.2.0.tgz`, use `"command": "dopamine2-mcp", "args": []`.)

### Claude Code

```bash
claude mcp add dopamine2 -- node /abs/path/to/packages/mcp/dist/index.js
```

Inside this repo it is auto-discovered via `.mcp.json` (run `npm run build` first so `dist/` exists).

### Tools

`list_components` · `search_components` · `get_component_docs` · `list_patterns` ·
`get_pattern_docs` · `get_general_docs` · `get_tokens` · `get_agent_rules` · **`preview_component`**
· **`preview_pattern`** (the last two return a self-contained HTML render you can view as an artifact).
