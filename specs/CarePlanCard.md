# CarePlanCard — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6763-4245
> **Component family:** Cart · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "care plan card"
  - "careplan"
  - "membership upsell"
  - "plan card"
  - "subscription card"
  - "add plan"
  - "benefits card"
```

## Description

CarePlanCard is the Care Plan upsell card: a 328×243 cream card
(`linear-gradient(162deg, #fcf2e5, #fff)`, `radius-8`) with three stacked regions.

- **Header** (`space-8`/`space-16`, dashed `#fbeedd` bottom border) — a `heading-18`
  bold title + the Care Plan badge. The saving amount is `states-success` green.
- **Body** (`space-16`) — either a "Benefits applied" label (`#d97c37`) with green tick
  rows (`tick` icon `#208376` + `body-14`), **or** illustrated benefit rows (32px
  illustration + `body-16` medium). Both close with a "More benefits" text button
  (`#a65316`) and a filled-circle chevron.
- **Footer** (60px, `linear-gradient(90deg, #fbeedd, transparent)`, `#fbeedd` top
  border) — "3 months at ₹165 **~~₹200~~**" + an action button.

### Variants (`type`)
- **Added** — "Saved ₹460 extra with [Care Plan]", ticks, **Remove** (coral outline).
- **updated** — "Cart updated with [Care Plan]", ticks, **Remove**.
- **Not Added** — "Save ₹460 extra with [Care Plan]", illustrated benefits, **Add Plan** (dark fill).

### When to use
- To pitch or reflect Care Plan membership inside the cart.

### When NOT to use
- As a generic promo card — the cream theme and badge are Care-Plan-specific.

## Tokens
- Saving amount `states-success`; Remove `branding-1mg` on `border-subtle`; Add Plan
  `content-primary` / `content-inverse-primary`.
- Theme accents (`#fcf2e5`, `#fbeedd`, `#d97c37`, `#a65316`, `#208376`) are Care-Plan
  (plan-3) literals with no semantic token.

## Accessibility
- **Add Plan** / **Remove** are real buttons — wire `onAction`.
- Tick / illustration marks are decorative; the benefit text carries the meaning.
