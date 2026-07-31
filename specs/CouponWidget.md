# CouponWidget — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6757-2345
> **Component family:** Cart · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "coupon"
  - "coupon widget"
  - "promo code"
  - "discount code"
  - "apply coupon"
  - "cart coupon"
  - "offer widget"
  - "explore coupons"
```

## Description

CouponWidget is the cart's coupon surface. It is a white card (`space-16` padding,
`space-16` gaps) built from a **coupon row**, an optional **second Care Plan row**, a
1px divider, and a centred **View all coupons** entry point.

A coupon row is: a **40px icon chip** (`radius-4`) + a text block (title `body-16`
bold, subtitle `body-14` regular `content-secondary`) + an optional coral action
(`content-cta` bold `body-14`, "Apply" / "Applied"). The chip carries one of three
marks:

- **Discount %** on a green gradient (`#f8fffb → #daffea`, icon `states-success`) when a
  coupon is applyable, or on a grey gradient (`#f8f9fb → #eef1f5`, icon
  `content-tertiary`) when it is locked.
- **Party popper** on a yellow gradient (`#fffdf2 → rgba(255,244,192,.5)`) for applied
  savings.

### States (`state`)
- **No Coupon** — single "Explore coupons" row + chevron; no divider/footer.
- **Not Available** — locked grey chip, no action ("… off locked" / "Add items worth … to unlock").
- **Not Applicable** — green chip + **Apply**.
- **Applied** — party chip + **Applied**.
- **CarePlan Applied** — party chip, Care Plan badge inline in the title, no action.
- **CarePlan Not Applicable** — Applied row **plus** a second "Save … with [Care Plan]" + **Apply** row.

### When to use
- The cart's single coupon summary + entry point into the full coupon list.

### When NOT to use
- For a scrollable list of coupons — this is the summary, not the catalogue.

## Tokens
- Surface `background-primary`; title `content-primary` / subtitle `content-secondary`.
- Actions & View-all: `content-cta` (coral). Divider `border-subtle`.
- Chip gradients are cart-specific literals; icons resolve to `states-success` /
  `content-tertiary`. Care Plan badge is the shared `CarePlanBadge`.

## Accessibility
- **Apply / Applied** are text actions — bind them to real buttons in product.
- The Care Plan badge carries an accessible label; colour is never the only signal.
