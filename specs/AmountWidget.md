# AmountWidget — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6763-4065
> **Component family:** Cart · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "amount widget"
  - "bill summary"
  - "cart total"
  - "to be paid"
  - "payment breakdown"
  - "billing widget"
  - "order total"
  - "delivery address bill"
```

## Description

AmountWidget is the cart's billing surface on a white background, in two states.

### Collapsed (`state="Collapsed"`)
A single `space-16` row: a 24px receipt chip (subtle grey gradient) + "To be paid:
**₹42700**" (`body-14`, amount bold) + a green **savings pill**
(`wellness-green-95` bg / `wellness-green-40` text, `radius-4`, `tag-11` bold) + a coral
(`content-cta`) chevron.

### Expanded (`state="Expanded"`)
1. **Delivery header** — 28px home chip + "Delivering to **DLF Colony**" / "Sector 14,
   Gurugram" (`content-tertiary`) + coral chevron, closed by a dashed divider.
2. **Bill summary** — a `body-14` bold title, then label/value rows (`space-between`):
   - Item total, Total discount (`states-success`, dotted-underlined label, `-₹` value in green),
   - dashed divider,
   - Delivery fee **[Care Plan]** with `~~₹5~~ FREE` (FREE in `#903e38` maroon),
     Green packaging charge (dotted label), NeuCoins (green),
   - dashed divider,
   - **Total Amount** (`body-16` bold) + amount.

Labels with a dotted underline signal an info affordance. Dividers are dashed
`border-subtle` rules.

### When to use
- The bill breakdown at the bottom of the cart / checkout.

### When NOT to use
- For a single savings headline — use SavingStrip.

## Tokens
- Surface `background-primary`; text `content-primary` / `content-tertiary`.
- Discounts & NeuCoins `states-success`; FREE literal `#903e38`; chevron `content-cta`.
- Savings pill `wellness-green-95 / 40`; dividers `border-subtle`.

## Accessibility
- Bill rows are label→value pairs; preserve that reading order.
- The FREE state keeps the struck original price for context.
