# Swipe Indicator — Spec

> **Figma:** node 6401-1174 ("swipe Indicator") · **Family:** Navigation / Feedback · **Status:** Review

## Description
A thin progress/pagination bar. **Line Filling** fills cumulatively as you advance; **Staggered** slides a single segment to the current position. Sizes: Normal (216px) and Small (48px); 2px tall.

## Tokens
```yaml
track:  { height: 2px, radius 999px, background: token.semantic.color.background.moderate }  # Figma container is white (for on-image use); a light track is used here for visibility
fill:   { height: 2px, radius 999px, background: token.semantic.color.content.primary }
sizes:  { Normal: 216px, Small: 48px }
segment: width = track / total  (≈54px for Normal/4)
line-filling: fill width = step × current
staggered:    fill = one step, offset by (current-1) steps
```

## Accessibility
- `role="progressbar"` with `aria-valuemin/max/now`.

## Notes
- Props: `type`, `size`, `total`, `current` (1-based). Fill animates on change (respects the browser; add reduced-motion if needed).
