# Toggle — Build Cache

**Built:** 2026-07-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6356-403

## Variant Properties

| Property | Values |
|----------|--------|
| state | Default, selected, disabled, disabled+selected |

4 variants (one `state` dimension; modelled as `checked` × `disabled`). Figma node ids: Default `6356:402`, selected `6356:404`, disabled `6356:406`, disabled+selected `6356:422`.

## Spec

`specs/Toggle.md`

## Token Police Audit

**Resolved: 6 / 6 colour references map cleanly. No missing colour tokens.**

| Figma variable | Value | Repo token |
|---|---|---|
| Color/Background/Moderate | #dde2eb | `semantic.color.background.moderate` |
| Color/Brand/Coral | #ff5443 | `semantic.color.branding.1mg` |
| Color/Background/Disabled | #a2a9b8 | `semantic.color.background.disabled` |
| Color/Background/Primary | #ffffff | `semantic.color.background.primary` |
| Color/Icons/CTA | #ff5443 | `semantic.color.content.cta` (added during InputField build) |
| tick (disabled) | #a2a9b8 | `semantic.color.content.disabled` |

Dimensions resolve: `space.40` (w), `space.24` (h), `space.20` (thumb), `space.2` (pad), `radius.12` (track).

### 🚨 TOKEN MISSING

- **Thumb radius 10** — `radius` ramp is 0/2/4/8/12/16/24, no 10. Thumb is a full circle → implemented as `50%`, no token needed. Non-blocking.

### ⚠️ DERIVED (not tokens)

- Thumb travel 16px (= 40 − 2×2 − 20) and tick 14px are computed/icon sizes, not token candidates.

### 🔧 BASE STATE FIX (required states)

- **focus — MISSING ENTIRELY.** A switch is keyboard-operable; needs a visible focus ring (WCAG 2.4.7). Tokens exist (`semantic.color.focus.ring`, `shadow.focus`). Design should add the variant.
- **hover** not defined (acceptable; confirm intent).

## Notes

- Clean component — no new tokens required (unlike InputField). `content.cta` reused from the InputField pass.
- disabled+selected uses the **grey** track (`background.disabled`), NOT coral — disabled outranks selected. Implemented accordingly.
- API: controlled `checked` + `onCheckedChange` + `disabled`; `state` prop is a gallery convenience that maps to the 4 Figma variants.
- Implemented: `Toggle.tsx`, `Toggle.stories.tsx`, CSS in `styles.css`, export in `index.ts`. Visible in Storybook under Components/Toggle.
- Focus ring is the one open item before promoting past `Review`.

## Resolution — Focus ring (2026-07-26)

Focus ring **N/A / not required** — these are native **mobile app** components (touch input, no keyboard Tab focus). Closed by design decision. (Would only apply if reused in mobile web/PWA or for Switch Control / external-keyboard a11y, handled by the OS layer natively.)
