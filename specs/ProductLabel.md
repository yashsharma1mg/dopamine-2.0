# ProductLabel — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6825-4914
> **Component family:** Display · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "product label"
  - "feature strip"
  - "trust badges"
  - "genuine prescription badge"
  - "pdp feature row"
  - "highlight strip"
```

## Description
ProductLabel is a horizontal strip of trust/feature badges. Each item stacks an icon + bold title
(`body-14` bold `content.primary`) over a description (`body-14` regular `content.secondary`), and
items are separated by 1px × 36px `divider.subtle` rules. A description can carry a dotted underline
(a tappable info affordance). The strip scrolls horizontally when it overflows.

### When to use / not
- Directly under the product hero for trust/feature signals. Keep to 3–4 items.

## Tokens
- Title `content.primary`; description `content.secondary`; dividers `divider.subtle`.

## Accessibility
- Icons are decorative; the titles carry meaning.
