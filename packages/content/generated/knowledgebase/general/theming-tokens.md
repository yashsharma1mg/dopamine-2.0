# Theming & design tokens

All colour, spacing, radius, typography, and shadow decisions come from the token layer. The
stylesheet (`@dopamine2.0/ui/styles.css`) defines them as CSS custom properties, and components
consume them internally — you rarely set them by hand.

## Using tokens in your own CSS

Reference the CSS variables directly:

```css
.my-surface {
  background: var(--semantic-color-background-primary);
  color: var(--semantic-color-content-primary);
  padding: var(--space-16);
  border-radius: var(--radius-8);
  box-shadow: var(--shadow-level-2);
}
```

Naming:
- **Colours:** `--semantic-color-*` (roles, e.g. `content-primary`, `branding-1mg`,
  `states-error`, `stroke-subtle`) and `--base-color-*` (raw primitives — avoid using directly).
- **Spacing / radius / type / shadow are top-level:** `--space-16`, `--radius-8`,
  `--font-size-body-14`, `--shadow-level-2`.

## Using tokens in JS/TS

```ts
import { tokens } from "@dopamine2.0/ui";
tokens["semantic.color.branding.1mg"]; // "#..."
```

## Rules

- Prefer **semantic** roles over base primitives.
- Do not hardcode hex values, px spacing, or radii that a token already expresses.
- The canonical source is the token JSON; the MCP `get_tokens` tool returns current values.
