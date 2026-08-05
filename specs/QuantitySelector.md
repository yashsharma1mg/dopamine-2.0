# QuantitySelector — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6703-6776
> **Component family:** Selection · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "quantity selector"
  - "quantity picker"
  - "select quantity"
  - "number picker"
  - "option picker"
  - "single select list"
  - "radio list sheet"
```

## Description

QuantitySelector is a modal single-select picker over a `rgba(0,0,0,0.6)` scrim, with a floating
40px close above it. The card (`background.primary`, `radius-16`, 328px) has a 72px **header**
(`title-16` extrabold `content.primary`, `stroke.moderate` bottom border), a **scrollable list** of
option rows (`space-16`/`space-24` padding, value `body-16` regular + a 21.6px select control on the
right), and an optional 72px **Remove** footer.

- **Selected row** — `base.color.sunrise-glow.97` tint + a coral (`content.cta`) circle with a white tick.
- **Unselected row** — white with an outline (`stroke.moderate`) circle.
- **Remove footer** — a `delete` icon + "Remove" in `#c50f1f`, `stroke.moderate` top border.

### When to use
- Pick one value/option from a bounded list (a cart quantity, a variant).

### When NOT to use
- For multi-select — this is strictly single-select.

## Tokens
- Scrim `rgba(0,0,0,0.6)`; card `background.primary` `radius-16`; header/footer borders `stroke.moderate`.
- Selected tint `base.color.sunrise-glow.97`; select control + tick `content.cta`.
- Remove `#c50f1f` (red-50 literal — no semantic token at this step).

## Accessibility
- `role="radiogroup"`; rows are `role="radio"` with `aria-checked`. Remove is a labelled button.
