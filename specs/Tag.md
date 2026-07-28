# Tag — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6394-1107
> **Component family:** Display · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "tag"
  - "badge"
  - "info badge"
  - "coloured label"
  - "status badge"
  - "notification count"
  - "notification dot"
  - "rating badge"
  - "new badge"
  - "chip label"
```

## Description

Tag is the small-label family. Four types:

- **Info Badge** — a rounded-4 pill (Tag 11px medium) in six hues; each hue pairs a light
  background (`base.color.<hue>.95`, mauve uses `.97`) with a `.40` text colour. Hues:
  Purple (healing-mauve), Yellow (sunshine-yellow), Blue (corporate-horizon-blue),
  Red (vital-red), Orange (sunrise-glow), Green (wellness-green).
- **Notification tag** — a 16px coral circle (`semantic.color.content.cta`) with a white count.
- **Rating Badge** — a green (`semantic.color.states.success`) pill with a white value + star.
- **New Badge** — a green pill, white bold "NEW", radius 6, 1px bottom border `white-alpha.10`.

### When to use
- Labelling status/category, an unread count, a rating score, or a "new" flag.

### When NOT to use
- As an interactive control — tags are non-interactive (use Button / SuggestionChip).

## Tokens
- Radius: `--radius-4` (info/rating), 6px (new), 999px (notification).
- Type: `--font-size-tag-11` / `--font-line-height-16`; medium (info/rating), bold (new/notification).
- Info hues resolve to `--base-color-<hue>-95|97` (bg) and `--base-color-<hue>-40` (text) — badge-only
  hues with no semantic role, so base primitives are the honest source.
