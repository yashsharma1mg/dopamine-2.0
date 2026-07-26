# Vertical Tabs — Spec

> **Figma:** node 6429-2319 ("Vertical Tabs") · **Family:** Navigation · **Status:** Review

## Description
A vertical category rail (88px wide). The selected item stands out with a white background, a dark image chip, a bold label, and a right-edge indicator bar; unselected items sit on a light grey background with white chips.

## Tokens
```yaml
container: { width: 88px, background: token.semantic.color.background.primary, radius: token.radius.16 0 0 0 }
item:       { padding: token.space.16 token.space.8, gap: token.space.4 }
item_inactive_bg: #f0f2f5   # TOKEN MISSING (background-secondary/low-contrast)
item_active_bg:   token.semantic.color.background.primary
chip:       { size: 48px, radius: token.radius.8 }
chip_inactive: { bg: background.primary, icon: content.tertiary }
chip_active:   { bg: content.primary, icon: content.inverse-primary }
label:      { size: 11px, line: 16px, content.primary; medium → bold when active }
bar:        { width: 4px, height: 116px, bg content.primary, right edge, radius 4 0 0 4 }
```

## Accessibility
- `role="tablist"` `aria-orientation="vertical"`; add arrow-key nav + panel association in the consumer.
