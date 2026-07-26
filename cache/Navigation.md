# Navigation — Build Cache

**Built:** 2026-07-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6466-4967 (frame "navigation")

## Variant Properties

| Property | Values |
|----------|--------|
| type | labs, pharmacy, for you-no scroll, CP-profile icon, for you-scroll |

5 variants. Node ids: labs `6466:4966`, pharmacy `6466:4965`, for you-no scroll `6466:4964`, CP-profile icon `6466:4962`, for you-scroll `6466:4963`.

## Spec

`specs/Navigation.md`

## Token Police Audit

**Resolved: most references clean. 4 values fall back to `base.*` (no semantic) — flagged.**

| Figma variable | Value | Repo token |
|---|---|---|
| Background/Primary | #ffffff | `semantic.color.background.primary` |
| Content/Primary, Icons/Primary | #181a1f | `semantic.color.content.primary` |
| Icons/CTA | #ff5443 | `semantic.color.content.cta` |
| Stroke/Subtle | #dde2eb | `semantic.color.border.subtle` |
| Background/Subtle | #eef1f5 | `semantic.color.background.subtle` |
| Content Inverse/Primary | #ffffff | `semantic.color.content.inverse-primary` |
| badge #ff5443 | | `semantic.color.branding.1mg` |
| Level 2 shadow | | `shadow.level-2` |

### 🚨 TOKEN MISSING (base fallback)

- **Location pill** `Sunrise Glow/99` (#fffbfa) bg + `Sunrise Glow/97` (#fee9e1) border → only `base.color.sunrise-glow.99/.97`. Needs a semantic **accent-subtle surface** pair.
- **Tab chip** `Cool Neutral/97` (#f7f8fa) → `base.color.cool-neutral.97`. The **background** scale is 100/95/90/70 — skips 97. Add `background.raised` or similar.
- **Find best tests** blue (`precision-blue.50` #1772bb) → `base.color.precision-blue.50`. No semantic blue action colour.
- **CP avatar**: golden border → `base.color.golden.50`; fill is a Care-Plan **gradient** (hardcoded, `brand.care-plan` family). Needs a documented gradient token.

### 🔧 STATES / A11Y

- No focus variant in the set. Tab strip needs `role="tablist"` + arrow-key roving tabindex and a visible focus ring (WCAG 2.4.7 / 4.1.2). Tokens exist (`focus.ring`).

### Radii

- Pills 30/40/20 and search 40 → implemented as `999px` (no radius tokens above 24).

## Notes

- Composite of 3 rows (location+profile+cart · tab strip · search+CTA). `type` sets active tab + profile variant + trailing CTA.
- Trailing CTA by type: labs → Find best tests (blue), pharmacy → Categories (dark), for you/CP/scroll → Upload Prescription (coral). Verified against Figma.
- Divider follows the first ("For you") tab; tab strip is horizontally scrollable.
- Icons are inline SVG placeholders; wire real assets + rotating search hint on integration.
- Verified render vs Figma via headless screenshot — all 5 types match.
- Implemented: `Navigation.tsx`, `Navigation.stories.tsx`, CSS, export. Under Components/Navigation.
- **Recurring theme:** this is the 5th component needing semantic surface/accent tokens (with Search mic, Action Bar badge, Event Banner ×2). A small surface/accent token pass is overdue.

## Resolution — Focus ring (2026-07-26)

Focus ring **N/A / not required** — these are native **mobile app** components (touch input, no keyboard Tab focus). Closed by design decision. (Would only apply if reused in mobile web/PWA or for Switch Control / external-keyboard a11y, handled by the OS layer natively.)

## Design decision (2026-07-26)

- Surface/accent fallbacks (location pill, tab chip, blue action, CP gradient) → **accept base usage**; no new semantic tokens. Closed.
