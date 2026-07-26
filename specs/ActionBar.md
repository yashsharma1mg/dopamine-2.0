# Action Bar — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6383-870 (frame "action bar")
> **Use cases:** node 6628-4691 (sticky bottom bar across mobile screens)
> **Component family:** Navigation / Actions
> **Status:** Review

> **Composition note:** the Action Bar does not define its own buttons — it **composes the existing `Button` component** (Fill / Outline). This spec covers the container + billing summary only.
> **Token convention:** colours are `token.semantic.color.*`; `space`/`font` are top-level.

---

## Prompt Match

```yaml
prompts:
  - "action bar"
  - "sticky bottom bar"
  - "bottom cta bar"
  - "checkout action bar"
  - "bill summary with button"
```

---

## Description

Action Bar is the sticky bar pinned to the bottom of a mobile screen that holds the primary action(s). It has two shapes: a billing summary beside a single CTA ("CTA with Billing"), or one/two buttons on their own ("Buttons Only", side by side or stacked).

### When to use

- Presenting the primary (and optional secondary) action for a screen, always reachable at the bottom.
- Pairing a running total / summary with its confirming CTA (cart, diagnostics booking).

### When NOT to use

- Inline actions within page content — use Button directly.
- More than two competing actions — reduce to one primary + one secondary.

---

## Anatomy

```
CTA with Billing
  ┌──────────────────────────────────────────────┐
  │  ₹69,420                          [  Button  ] │   (Pharma: price + link)
  │  see bill summary                              │
  └──────────────────────────────────────────────┘

Buttons Only
  One      : [        Button (full width)         ]
  2 Buttons: [ Outline ]        [ Fill ]
  2 Vertical:[        Fill (full width)           ]
             [        Outline (full width)        ]
```

**Key elements:**
- **Container**: white surface, 360px wide, 16px padding, pinned to the bottom in use.
- **Billing summary** (billing types): a left-aligned block — Pharma = price (`content.primary`, 16/bold) + link (`content.cta`, 12/bold); Diagno = label (`content.tertiary`, 12) + count with an up-chevron badge.
- **Actions**: one or two `Button`s. Fill = primary; Outline = secondary.

---

## Variants

Two dimensions in Figma: **type** (CTA with Billing / Buttons Only) × **state** (5 named layouts). In code: `billing` slot + `orientation` + Button children.

```yaml
container:
  element: div
  tokens:
    width: 360px
    padding: token.space.16
    gap: token.space.16
    background: token.semantic.color.background.primary

pharma_billing:
  use_when: "Running bill total with a link to the breakdown."
  price: { color: token.semantic.color.content.primary, size: token.font.size.body-16, line: token.font.line-height.24, weight: token.font.weight.bold }
  link:  { color: token.semantic.color.content.cta,     size: token.font.size.body-12, line: token.font.line-height.16, weight: token.font.weight.bold }

diagno_billing:
  use_when: "Count of added items with an expand affordance."
  label: { color: token.semantic.color.content.tertiary, size: token.font.size.body-12, line: token.font.line-height.16 }
  count: { color: token.semantic.color.content.primary, size: token.font.size.body-16, weight: token.font.weight.bold }
  badge: { background: token.semantic.color.content.primary, icon: token.semantic.color.content.inverse-primary }   # NOTE: dark surface via content.primary — see Token Police

buttons_only:
  one_button:  { children: 1 Fill, layout: full-width }
  two_buttons: { children: [Outline, Fill], layout: horizontal, each: flex-1 }
  two_vertical:{ children: [Fill, Outline], layout: vertical,   each: full-width }
```

---

## States

The 5 Figma "states" are layout presets, not interaction states:

| Figma state | type | Composition |
|---|---|---|
| Pharma Billing | CTA with Billing | price+link · Fill |
| Diagno Billing | CTA with Billing | label+count · Fill |
| One Button | Buttons Only | 1 × Fill (full width) |
| 2 Buttons | Buttons Only | Outline + Fill (row) |
| 2 Buttons Vertical | Buttons Only | Fill + Outline (stacked) |

Interaction states (hover/focus/disabled) belong to the composed `Button`, not the bar.

---

## Accessibility

- Render as a landmark or labelled region: `<div role="region" aria-label="Actions">` (or a `<footer>`), so it's reachable and announced.
- Button order = DOM order: for a destructive/secondary + primary pair, put the primary last (right / bottom) matching Figma.
- Each `Button` owns its own focus ring and `disabled` semantics.
- When pinned, keep it clear of the on-screen keyboard and honour safe-area insets.

---

## Content Guidelines

- One primary action per bar; at most one secondary.
- Billing text stays terse: a total and a short link/label. Keep button labels to 1–2 words.

---

## Usage Guidelines

### Do's
- ✅ Keep the primary (Fill) action visually dominant; secondary is Outline.
- ✅ Stack vertically ("2 Buttons Vertical") when both labels are long or emphasis is equal.

### Don'ts
- ❌ Don't place more than two buttons.
- ❌ Don't recolour the composed buttons — use Button's Fill/Outline types.

---

## Implementation Notes

- **Composition**: `<ActionBar billing={…} orientation="horizontal|vertical"><Button/>…</ActionBar>`. Buttons stretch to fill unless a `billing` block is present.
- **Sticky**: the component itself is static; pin it with `position: sticky/fixed; bottom: 0` at the app level, adding safe-area padding.
- **Browser support**: modern browsers, full support.
