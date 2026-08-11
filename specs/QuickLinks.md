# QuickLinks — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6934-4002
> **Component family:** Navigation · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "quick links"
  - "homepage shortcuts"
  - "shortcut tiles"
  - "quick actions row"
  - "home quick links"
  - "reorder health plans tiles"
  - "labs quick links"
```

## Description
QuickLinks is the homepage shortcut strip, in two types:

- **For you** — a row of four **icon tiles** (`background.subtle` `radius-16`, 48px, with a label
  below in `body-12`); the "More discounts" tile sits on the Care Plan maroon
  (`brand.care-plan` #903e38) with a light icon. Below the tiles is a **delivery promo** card
  (`background.subtle`, `radius-16`): a `branding.rapid` lightning mark, "Get medicines in under
  **30mins** (mauve). Now in your locality", a coral (`content.cta`) circular chevron, and a
  "1/4" pager. A 1px `background.subtle` divider closes it.
- **Labs** — a row of four **labelled tiles** (`background.subtle` `radius-8`, 104px, icon + a
  two-line label, second word bold), then two **outline pills** (white, `stroke.subtle`,
  `radius-12`) with an icon + label.

Tiles, pills and the delivery card are data-driven — pass real illustrations via `items`.

### When to use / not
- Directly under the homepage header. Keep to four tiles per row; don't mix For-you and Labs tiles.

## Tokens
- Tile surface `background.subtle`; Care Plan tile `base.color.brand.care-plan`.
- Delivery accents `branding.rapid` + `content.cta`; label `content.primary` / `content.secondary`.
- Pills `background.primary` on `stroke.subtle`.

## Accessibility
- Tiles, pills and the delivery card are labelled buttons.
