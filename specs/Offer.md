# Offer — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6825-5309
> **Component family:** Display · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "offers section"
  - "additional offers"
  - "bank offers"
  - "cashback offers list"
  - "pdp offers"
  - "see all offers"
```

## Description
Offer is the PDP offers block: an optional promo **banner** (a 328×164 media slot) and a
"Save more with additional offers" **list** — each row an icon (circle) + bold title + tertiary
subtitle + a chevron — closed by a coral-outline **See all offers** action. Sections are separated
by 8px `cool-neutral.95` bands.

### When to use / not
- Below the price on the PDP. Not for a single inline coupon (use CouponWidget).

## Tokens
- Row title `content.primary`; subtitle `content.tertiary`; See-all `content.cta` outline; band `cool-neutral.95`.

## Accessibility
- Offer rows and See-all are buttons.
