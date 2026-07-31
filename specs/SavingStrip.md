# SavingStrip — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6763-3519
> **Component family:** Cart · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "saving strip"
  - "savings bar"
  - "total savings"
  - "cart savings"
  - "you're saving"
  - "pay day sale strip"
  - "order savings summary"
```

## Description

SavingStrip is a green cart summary bar. It is an outer `space-4` / `space-16` frame
around a `wellness-green-97` surface (`radius-8`, `space-8` padding) that states the
order's total saving. Amounts are `states-success` green; supporting copy is
`content-primary` (14/20 bold) or `content-secondary` (12/16).

### Variants (`variant`)
- **default** — one centred line: "**₹x** saved on this order" + chevron.
- **careplan-1line** — one line + Care Plan badge + chevron (`space-between`).
- **careplan** — two centred lines: "Total Savings of **₹x**" / "Including **₹y** saved with [Care Plan]".
- **careplan-chevron** — as `careplan` with a chevron after the amount.
- **payday** — two left-aligned lines ("You're saving **₹x** on this order" / "**2x higher** than usual!") with a **Pay Day Sale** gift-tag.
- **payday-chevron** — as `payday` with a chevron after "than usual!".

The **Pay Day Sale** tag is a tilted gradient chip (`precision-blue-50 → wellness-green-50 → wellness-green-30`) with a dashed inner border and the display font.

### When to use
- To surface the order's total saving above the bill, with optional Care Plan / Pay Day attribution.

### When NOT to use
- For a per-line discount (that belongs in the AmountWidget bill rows).

## Tokens
- Surface `base.color.wellness-green.97`; amount `states-success`.
- Text `content-primary` / `content-secondary`; chevron `content-secondary`.
- Pay Day gradient uses `precision-blue-50` + `wellness-green-50/30` base primitives.

## Accessibility
- Amounts read inline as part of the sentence; do not rely on colour alone.
- Add the chevron only when the strip is actually tappable.
