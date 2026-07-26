# Horizontal Tabs — Build Cache

**Built:** 2026-07-27 · **Figma:** node 6428-2280

## Variants
| Property | Values |
|---|---|
| type | underline, highlighted |
| underline states | text-only / with-images · single / multiple · active per index |
| highlighted states | 2 tabs · 2 tabs with icon+subtext |

## Token Police Audit
- content.primary (active label/underline/pill), content.inverse-primary (active pill text), space.12/8/4, radius.8 — clean.
- 🚨 **`#f0f2f5`** (chip bg, highlighted container = Figma *background-secondary*): **no token, not even in base**. Implemented as a literal. Recurring surface gap.
- ⚠️ **`#4e5665`** (highlighted inactive text = *foreground-secondary*, cool-neutral.40): literal; no semantic content token at cool-neutral.40.
- ⚠️ **Font:** Figma's highlighted *inactive* label is **Poppins Medium** (not in the DS); implemented in **Figtree Medium** for consistency. Confirm.
- Radius: highlighted pill is Figma `radius-24` → implemented `999px` (radius scale capped at 16).

## Notes
- Controlled: `items` + `activeIndex` + `onChange`. `withImages` = 64px chips (underline). Row scrolls horizontally.
- Verified vs Figma via headless screenshot — underline (text + images), highlighted (2 tabs, 2 tabs w/ icon) all match.
- Focus ring N/A (mobile).
