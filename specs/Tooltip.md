# Tooltip — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6621-3120
> **Component family:** Feedback · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "tooltip"
  - "hint bubble"
  - "coach mark"
  - "contextual hint"
  - "popover hint"
  - "callout"
  - "onboarding tooltip"
  - "info bubble"
```

## Description

Tooltip is a dark contextual bubble with a directional tail. The bubble
(`semantic.color.content.primary` background, `radius-8`, `space-8` padding, `space-8` gap,
max-width 272px, Level-2 drop shadow) contains, left→right:

- **Lead icon** — a 22px `white-alpha.10` circle holding a 16px icon.
- **NEW pill** — the Tag `new` badge (optional).
- **Message** — Tag 11px medium, `content.inverse-primary` (white).
- **Close** — a 14px cross button.

The **tail** sits on one of four corners via `variant`: `Top left`, `Top right`,
`Bottom left`, `Bottom right` (Top = tail on the top edge pointing up; left/right = horizontal
offset). The tail is a CSS triangle in the bubble colour.

### When to use
- A brief, dismissible hint pointing at a specific element (e.g. a new feature callout).

### When NOT to use
- For essential information the user always needs — put that inline.

## Tokens
- Bubble: `--semantic-color-content-primary` bg, `--semantic-color-content-inverse-primary` text,
  `--radius-8`, `--space-8`, shadow Level 2 (`0 4px 12px #272B3314`).
- Lead circle: `--base-color-white-alpha-10`. Text: `--font-size-tag-11` / `--font-line-height-16`.
