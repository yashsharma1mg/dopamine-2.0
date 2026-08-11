# Product — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6825-4912
> **Component family:** Display · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "product hero"
  - "pdp hero"
  - "product card"
  - "product image carousel"
  - "product title brand composition"
  - "generic alternative"
```

## Description
Product is the PDP hero: a horizontally scrollable **image carousel** (201×200 bordered slots,
`radius-8`), then the **title** (`title-22` extrabold `content.primary`), **brand**
(`body-14` medium `content.secondary`), and **composition** (label + an underlined value), plus an
optional green **alternative** pill (2px `#afe3c5` border, bold text + a green chevron) that links
to a cheaper generic.

### When to use / not
- The top of a product page. Not for a compact list row (use OrderStrip).

## Tokens
- Image border `stroke.moderate`; title `content.primary`; brand/label `content.secondary`.
- Composition underline `stroke.moderate`; alternative border `#afe3c5` (plan light-green literal),
  chevron `states.success`.

## Accessibility
- The carousel scrolls; the alternative pill is a labelled button.
