# Sticky — Build Cache

**Built:** 2026-07-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6525-593 (frame "Sticky")

## Variant Properties

| Property | Values |
|----------|--------|
| type | Redirection, Rating, Standard, Video |
| state (Redirection) | Default, Error, Delivery, 2 deliveries, Multiple Delivery |

8 variants. Node ids: Redirection Default `6525:589`, Error `6525:588`, Delivery `6525:591`, 2 deliveries `6525:590`, Multiple `6525:587`; Rating `6525:586`; Standard 1-button `6525:585`; Video `6525:592`.

## Spec

`specs/Sticky.md`

## Token Police Audit

**Resolved: semantic colours clean. 5 fills fall back to `base.*` (promo/illustration surfaces).**

| Figma variable | Value | Repo token |
|---|---|---|
| Background/Default | #ffffff | `semantic.color.background.primary` |
| Text/Primary | #181a1f | `semantic.color.content.primary` |
| Text/Secondary | #414752 | `semantic.color.content.secondary` |
| Text/Tertiary | #868e9e | `semantic.color.content.tertiary` (≈; Figma is cool-neutral.60) |
| Wellness green/40 | #308956 | `semantic.color.states.success` |
| Branding/1mg | #ff5443 | `semantic.color.branding.1mg` / `content.cta` (error title, bolt, dots) |
| Level 2 (iY) shadow | offset (0,-4) | `shadow.level-2-inverse-y` |

### 🚨 TOKEN MISSING (base fallback)

- **Rating bar bg** `Sunshine Yellow/30` (#715a09) → `base.color.sunshine-yellow.30`.
- **Standard bar bg** `Comfort Pink/30` (#772a4d) → `base.color.comfort-pink.30`.
- **Redirection lead tiles**: rx tile `comfort-pink.90`, delivery tile `sunrise-glow.80` → base.
- **Close button bg** `white-alpha.60` (#ffffff99) → `base.color.white-alpha.60` (no semantic scrim/overlay token).

These are promo-surface / overlay roles with no semantic home — same recurring gap. A **surface / promo / scrim** token set would clear Sticky, Navigation, Event Banner, Action Bar, and Search Bar at once.

### ⚠️ NOTES

- **Error title** uses brand coral (`content.cta`), not `states.error` (#a3111e) — matches Figma; confirm intent (usually error = red).
- Illustration/product images are placeholders (image icon on a tile); wire real assets on integration.
- Video "1:2" is a literal from the frame (video ratio/timer placeholder).

### 🔧 STATES / A11Y

- No focus variant. Close/Track/Rate buttons + star radiogroup need visible focus rings (WCAG 2.4.7). Text-on-colour contrast should be checked for Rating/Standard.

## Notes

- Heterogeneous family: 4 quite-different types under one "Sticky". Modelled as `type` + `state`, branching by type.
- Redirection extras: "+ 3 more" pill overlaps the top edge (Multiple Delivery); pagination dots (2 deliveries).
- Rating/Standard = coloured rounded-top promo bars with close; Standard adds a white primary button.
- Video = dark 160×320 floating pill with close + centred time.
- Verified render vs Figma via headless screenshot — all 8 match structurally.
- Implemented: `Sticky.tsx`, `Sticky.stories.tsx`, CSS, export. Under Components/Sticky.

## Resolution — Focus ring (2026-07-26)

Focus ring **N/A / not required** — these are native **mobile app** components (touch input, no keyboard Tab focus). Closed by design decision. (Would only apply if reused in mobile web/PWA or for Switch Control / external-keyboard a11y, handled by the OS layer natively.)

## Design decision (2026-07-26)

- Error title colour → **`states.error`** (was brand coral). Applied + verified (#a3111e). Fixed a specificity bug where the redirection title rule was overriding it.\n- Surface fallbacks (Rating/Standard promo bg, lead tiles, close scrim) → **accept base usage**; no new semantic surface tokens. Closed.

## Fixes — Figma re-check (2026-07-27)

Text/icon colours corrected to match Figma:
- Default/Error subtitle → cool-neutral.40 (#4e5665); Delivery subtitle → cool-neutral.60 (#868e9e) **Medium**.
- Track button → bg cool-neutral.99, border cool-neutral.60, 12px (was white/subtle/14px).
- Delivery lead tile → sunrise-glow.95 (#fdd7c8, was .80).
- Rating stars left-aligned; Standard button indented to text column.
- **Contrast (WCAG AA):** Rating white text 6.63:1 ✓, Standard 9.45:1 ✓, close-icon 3.40:1 ✓ (non-text ≥3), button text 17.4:1 ✓.
