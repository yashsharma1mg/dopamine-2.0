# Checkbox — Build Cache

**Built:** 2026-07-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1536 (frame "Checkboxes")

## Naming

Requested as "radio buttons"; the Figma frame is a **checkbox** (square + tick). User confirmed: build as Checkbox. A true Radio (circle + dot) remains a separate, not-yet-provided frame.

## Variant Properties

| Property | Values |
|----------|--------|
| size (Property 1) | Normal (24), Small (20) |
| state | Default, Selected, Disable, Disabled selected |

8 variants (2 × 4). Node ids: Normal Selected `6586:1537`, Normal Disabled-selected `6586:1541`, Normal Default `6586:1545`, Normal Disable `6586:1546`; Small `6586:1547/1551/1555/1556`.

## Spec

`specs/Checkbox.md`

## Token Police Audit

**Resolved: 5 / 6 colour references clean. 1 exact-value delta. 1 new dimension token added.**

| Figma variable | Value | Repo token |
|---|---|---|
| Color/Background/Primary | #ffffff | `semantic.color.background.primary` |
| Color/Icons/CTA (selected fill) | #ff5443 | `semantic.color.branding.1mg` |
| Color/Icons/Inverse (tick) | #ffffff | `semantic.color.content.inverse-primary` |
| Color/Stroke/Disable | #a2a9b8 | `semantic.color.border.default` |
| Color/Background/Disabled | #a2a9b8 | `semantic.color.background.disabled` |
| Color/Stroke/Default | #000000 | ⚠ `semantic.color.border.strong` (= #181a1f) |

### 🟢 TOKEN ADDED

- **`radius.6`** — box corner radius 6px had no token (ramp had 4/8). Added to `tokens.json` (now 241 tokens).

### 🚨 EXACT-VALUE DELTA

- **Default border `#000000`** (Figma `Stroke/Default`) has no semantic token. Mapped to `border.strong` (#181a1f) — visually near-identical, avoids a second near-black token. **Action for design:** align on one dark-border value (#000000 vs #181a1f) so the checkbox default and the input `typing` border share a token.
- Figma border weight is nominal **1px**; implemented at **1.5px** to match the rendered stroke weight. Confirm intent.

### ⚠️ DERIVED (not tokens)

- Tick 14px (Normal) / 12px (Small) and selected padding 5px are icon/computed sizes, not token candidates.

### 🔧 BASE STATE FIX (required states)

- **focus — MISSING ENTIRELY.** Keyboard-operable; needs a visible focus ring (WCAG 2.4.7). Tokens exist (`focus.ring`, `shadow.focus`). Design should add the variant.
- **hover** not defined (confirm intent).

## Notes

- disabled+selected uses the **grey** fill (`background.disabled`), NOT coral — disabled outranks selected. Same rule as Toggle.
- API: controlled `checked` + `onCheckedChange` + `disabled` + `size`; `state` prop is a gallery convenience mapping the 4 Figma states.
- Implemented: `Checkbox.tsx`, `Checkbox.stories.tsx`, CSS in `styles.css`, export in `index.ts`. Visible under Components/Checkbox.
- Open items before promoting past `Review`: focus ring + the #000000/#181a1f border-value reconciliation.

## Resolution — Focus ring (2026-07-26)

Focus ring **N/A / not required** — these are native **mobile app** components (touch input, no keyboard Tab focus). Closed by design decision. (Would only apply if reused in mobile web/PWA or for Switch Control / external-keyboard a11y, handled by the OS layer natively.)

## Design decision (2026-07-26)

- Border weight → **1px** (was 1.5px). Applied.
