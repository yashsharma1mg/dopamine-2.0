# Vertical Tabs — Build Cache

**Built:** 2026-07-27 · **Figma:** node 6429-2319

## Variants
| Property | Values |
|---|---|
| state | which item is selected (first / second / fourth demoed) |

## Token Police Audit
- content.primary (active chip + label + bar), content.inverse-primary (active chip icon), background.primary (container + inactive chip), content.tertiary (chip icon), radius.16/8, space.16/8/4 — clean.
- 🚨 **`#f0f2f5`** (inactive item background = *low-contrast*): **no token**; literal. Same recurring surface gap.

## Notes
- 88px rail. Selected item: white bg + dark 48px chip + bold 11px label + 4px right indicator bar (116px). Inactive: #f0f2f5 bg + white chip + medium label.
- Controlled: `items` + `activeIndex` + `onChange`.
- Verified vs Figma via headless screenshot — first/second/fourth-selected columns match.
- Focus ring N/A (mobile).
