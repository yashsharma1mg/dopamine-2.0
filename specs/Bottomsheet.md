# Bottomsheet — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6703-6222
> **Component family:** Feedback · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "bottom sheet"
  - "bottomsheet"
  - "slide up sheet"
  - "action sheet"
  - "drawer"
  - "modal sheet"
  - "half sheet"
```

## Description

Bottomsheet slides up from the bottom over a `rgba(0,0,0,0.6)` scrim. Above the sheet float a
40px white **close** circle (top-right) and, optionally, a **back** circle (top-left) — each a
`shadow.level-2` white disc holding an 18px icon. The sheet is `background.primary`, rounded
`radius-16` on the top corners, `space-16` padding.

Two states:
- **default** — no header, just the content slot.
- **with subheading** — a header block (title `title-16` extrabold `content.primary`; subtitle
  `body-14` regular `content.tertiary`) closed by a full-bleed `divider.subtle` rule, then content.

The sheet carries a **drag handle** (`stroke.moderate` pill) at the top and is **draggable to
resize** between 128px and 600px. `height` sets a fixed height (clamped to the same range);
`draggable={false}` disables the handle.

### When to use
- Contextual content or a set of actions surfaced without leaving the screen.

### When NOT to use
- For a focused confirmation/decision — use **Dialog**.

## Tokens
- Scrim `rgba(0,0,0,0.6)`; sheet `background.primary`, `radius-16` top.
- Title `content.primary` (16/24 extrabold); subtitle `content.tertiary` (14/20). Divider `divider.subtle`.
- Floating buttons: `background.primary` disc, `shadow.level-2`, `content.primary` icon.

## Accessibility
- `role="dialog"`, `aria-modal`. Close/back are labelled buttons.
