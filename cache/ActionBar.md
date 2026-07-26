# Action Bar — Build Cache

**Built:** 2026-07-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6383-870 (frame "action bar")
**Use cases:** node 6628-4691

## Variant Properties

| Property | Values |
|----------|--------|
| type | CTA with Billing, Buttons Only |
| state | Pharma Billing, Diagno Billing, One Button, 2 Buttons, 2 Buttons Vertical |

5 variants. Node ids: Pharma `6383:869`, Diagno `6383:947`, One Button `6390:283`, 2 Buttons `6391:303`, 2 Buttons Vertical `6391:296`.

## Spec

`specs/ActionBar.md`

## Token Police Audit

**Resolved: all references clean. No new tokens. Buttons reuse the existing `Button` component + its tokens.**

| Figma variable | Value | Repo token |
|---|---|---|
| Color/Background/Primary | #ffffff | `semantic.color.background.primary` |
| Color/Content/Primary | #181a1f | `semantic.color.content.primary` |
| Color/Content/Cta | #ff5443 | `semantic.color.content.cta` |
| Color/Content/Tertiary | #626a7a | `semantic.color.content.tertiary` |
| Standard buttons/Bg, Branding/1mg | #ff5443 | `semantic.color.branding.1mg` (via Button) |
| Content Inverse/Primary | #ffffff | `semantic.color.content.inverse-primary` (via Button) |
| Stroke/Subtle (outline btn) | #dde2eb | `semantic.color.border.subtle` (via Button) |
| Corner radius/cr-8 | 8 | `radius.8` (via Button) |

Spacing/type resolve: `space.16` (padding/gap), `space.2`/`space.4` (billing gaps), `font.size.body-16`/`body-12`, `line-height.24`/`16`, `weight.bold`.

### 🟢 REUSE (ponytail)

- Buttons are **not reimplemented** — ActionBar composes `Button` (type Fill/Outline). The bar is pure layout + a billing slot.

### ⚠️ ROLE NOTE

- **Diagno count badge `#181a1f`** used as a dark circular surface (up-chevron). Same dark-surface gap as Search Bar's mic circle — resolves via `content.primary`. Candidate: `semantic.color.background.inverse`.

### 🔧 STATES

- No interaction states on the bar itself — hover/focus/disabled belong to the composed `Button`. Button focus ring is still an open item across the library.

## Notes

- The 5 "states" are layout presets, not interaction states. Modelled as `billing` slot + `orientation` + Button children, not a rigid 5-way enum — keeps it composable.
- Button order matches Figma: 2 Buttons row = Outline, Fill; Vertical = Fill, Outline.
- Buttons stretch (`flex:1` / `width:100%`) only in Buttons-Only layouts; in billing layouts the billing block takes remaining width and the button sits at natural size.
- Verified render vs Figma via headless screenshot diff — all 5 match.
- **Use Cases story** (mirrors Figma node 6628-4691) composes the real **`PageHeader` (usage="Location")** for the top chrome + `ActionBar` pinned bottom, in a 377px phone frame (PageHeader is a fixed 361px + 2×8px border).
- Implemented: `ActionBar.tsx`, `ActionBar.stories.tsx`, CSS, export. Under Components/Action Bar.
- Sticky positioning is an app-level concern (`position: sticky; bottom: 0` + safe-area); the component is static.

## Design decision (2026-07-26)

- Diagno badge dark-surface fallback → **accept base usage**. Closed.
