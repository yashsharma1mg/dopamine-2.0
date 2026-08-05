# PackOfMultiples — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6703-6807
> **Component family:** Cart · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "pack of multiples"
  - "select quantity packs"
  - "buy in bulk"
  - "multi pack selector"
  - "bulk pricing picker"
  - "pack size selector"
  - "quantity discount sheet"
```

## Description

PackOfMultiples is a modal "Select Quantity" picker (over a `rgba(0,0,0,0.6)` scrim, floating close)
for buying an item in packs. The card (`background.primary`, `radius-16`, 328px) has a 72px header
and a scrollable list of **pack rows**, each with:

- a **qty chip** — a `divider.subtle` pill holding a 32px white (`stroke.moderate`) box + "x N" (`body-14` bold),
- a **price group** — struck MRP (`content.disabled` 12px), price (`body-16` bold `content.primary`),
  and a green **discount tag** (`states.offer`, white 12px bold),
- a 21.6px **select control** (coral tick when selected).

One row may be **Recommended**: a purple (`base.color.healing-mauve.50`) ribbon in the top-left
corner + an "extra discount" line (`base.color.wellness-green.30`). An optional 72px **Remove**
footer sits at the bottom.

Three states:
- **selected recommendation** — the recommended row is selected → `sunrise-glow.97` (coral) tint + coral tick.
- **not selected recommendation** — recommended row present but unselected → `wellness-green.97` (green) tint.
- **no recommendation** — plain rows, standard selection.

### When to use
- Selling packs/multiples with per-pack pricing and an optional recommended pack.

### When NOT to use
- For a plain quantity list without pricing — use **QuantitySelector**.

## Tokens
- Selected tint `sunrise-glow.97`; recommended-unselected tint `wellness-green.97`; ribbon `healing-mauve.50`.
- Price `content.primary`; struck MRP `content.disabled`; discount tag `states.offer`; extra discount `wellness-green.30`.
- Chip `divider.subtle` / `stroke.moderate`; Remove `#c50f1f`.

## Accessibility
- `role="radiogroup"`; rows are `role="radio"` with `aria-checked`. Prices read MRP → price → discount.
