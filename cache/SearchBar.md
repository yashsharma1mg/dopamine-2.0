# Search Bar — Build Cache

**Built:** 2026-07-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6425-2956 (frame "Search")

## Variant Properties

| Property | Values |
|----------|--------|
| state | Default, selected, typing |
| type | Bar Only, Bar with entry |

6 variants (3 × 2). Node ids: Bar Only `6425:2955/2952/2954`; Bar with entry `6425:2953/2951/2950`.

## Spec

`specs/SearchBar.md`

## Token Police Audit

**Resolved: 6/6 colours clean. 3 shape/size tokens absent (implemented as pill/circle/literal).**

| Figma variable | Value | Repo token |
|---|---|---|
| Color/Background/Primary | #ffffff | `semantic.color.background.primary` |
| Color/Content/Primary | #181a1f | `semantic.color.content.primary` |
| Color/Icons/Primary (icons + mic circle bg) | #181a1f | `semantic.color.content.primary` |
| Color/Icons/Inverse (mic icon) | #ffffff | `semantic.color.content.inverse-primary` |
| Color/Background/Subtle (clear chip) | #eef1f5 | `semantic.color.background.subtle` |
| Color/Stroke/Disable (bar + entry border) | #a2a9b8 | `semantic.color.border.default` |

Spacing resolves: `space.16` / `space.8` (padding), `space.8` (gap).

### 🚨 TOKEN MISSING / ROLE NOTES

- **Bar radius 30px** and **icon-button radius 20px** — no radius tokens (ramp ends at 24). Both are full pills/circles → implemented as `999px`. Non-blocking.
- **Entry button 48px** — no `space.48` token. Implemented as literal 48px. Candidate token if icon buttons recur.
- **Mic circle background `#181a1f`** — used as a dark surface, but there is no semantic dark-background token; resolves via `content.primary`. Role mismatch — consider `semantic.color.background.inverse`.

### 🔧 BASE STATE FIX

- **focus — MISSING.** The input and each icon button need visible focus rings (WCAG 2.4.7). Tokens exist.
- **disabled** state not defined in the set.

## Notes

- State drives the internals (leading back arrow, trailing search/mic/clear); `type` appends the 48px entry button. Modelled as a presentational, state-driven component.
- Icons are inline SVGs (search, back, mic, close, category) — no asset dependency, coloured via `currentColor`.
- Placeholder colour uses `content.primary` per Figma (typically tertiary; confirm intent).
- Rotating hint is a static sample ("‘crocin’…"); wire to a real rotator on integration.
- Implemented: `SearchBar.tsx`, `SearchBar.stories.tsx`, CSS, export. Under Components/Search Bar.
- Open before promotion: focus rings, dark-surface token for the mic circle, optional `space.48`.

## Resolution — Focus ring (2026-07-26)

Focus ring **N/A / not required** — these are native **mobile app** components (touch input, no keyboard Tab focus). Closed by design decision. (Would only apply if reused in mobile web/PWA or for Switch Control / external-keyboard a11y, handled by the OS layer natively.)

## Design decision (2026-07-26)

- Mic dark-surface fallback (`content.primary` as bg) → **accept base usage**. Closed.
