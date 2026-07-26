# Swipe Indicator — Build Cache

**Built:** 2026-07-27 · **Figma:** node 6401-1174

## Variants
| Property | Values |
|---|---|
| type | Line Filling, Staggered (Small uses "Default" = staggered) |
| size | Normal (216px), Small (48px) |
| state | First / Second / Third / Fourth (current, 1-based) |

## Token Police Audit
- content.primary (fill) — clean. `2px` height, `999px` radius (pill), 54px segment (216/4).
- ⚠️ **Track colour:** Figma's container is **white** `background.primary` (meant to sit on images/dark surfaces). Implemented the track as **`background.moderate`** (#dde2eb) so the indicator is self-visible on light pages. Confirm — swap to white if it will only ever sit on imagery.

## Notes
- Props: `type`, `size`, `total` (default 4), `current` (1-based). line-filling = cumulative width; staggered = sliding segment.
- Verified vs Figma via headless screenshot — Line Filling / Staggered / Small all match.
