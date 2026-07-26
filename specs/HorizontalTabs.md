# Horizontal Tabs — Spec

> **Figma:** node 6428-2280 ("Horizontal Tabs") · **Family:** Navigation · **Status:** Review

## Description
Horizontal tab bar in two shapes: **underline** tabs (text, or with a 64px image chip; single or a scrollable multiple row) and **highlighted** segmented pills (2 tabs, optionally with an icon + subtext).

## Variants / tokens
```yaml
underline:
  chip: 64px circle, bg #f0f2f5 (TOKEN MISSING), icon 24px
  label: 14/20, content.primary — bold when active
  underline: 4px, transparent → content.primary (active)
  layout: row, gap token.space.12, horizontally scrollable; tab width 80px when withImages
highlighted:
  container: bg #f0f2f5 (TOKEN MISSING), radius 999px (Figma 24 → pill), width 328px
  segment: flex-1, min-height 40px (56px with icon+subtext), radius 999px, padding 0 token.space.16
  active: bg token.semantic.color.content.primary, text token.semantic.color.content.inverse-primary bold
  inactive: text #4e5665 (base cool-neutral.40) — Figma uses Poppins Medium; implemented in Figtree Medium
```

## Accessibility
- `role="tablist"` of `role="tab"` + `aria-selected`; wire arrow-key roving tabindex + a `tabpanel` in the consumer.

## Notes
- Selection is controlled: `items`, `activeIndex`, `onChange`. `withImages` toggles the image chips (underline only).
