# AddToCartPill — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6825-6198
> **Component family:** Cart · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "add to cart"
  - "add to cart pill"
  - "pdp price bar"
  - "buy bar"
  - "sticky add to cart"
  - "price and add button"
```

## Description
AddToCartPill is the PDP buy bar: a price group (effective price `title-22` extrabold, struck MRP
`content.tertiary`, discount `states.success`) and an **ADD** button (the DS `Button`, Fill/Large).
`default` also shows the pack unit + tax note; `sticky` is the compact single-row bottom bar.

### When to use / not
- `default` inline on the PDP; `sticky` pinned to the bottom on scroll.

## Tokens
- Price `content.primary`; MRP `content.tertiary`; discount `states.success`. ADD = DS Button.

## Accessibility
- ADD inherits the Button semantics.
