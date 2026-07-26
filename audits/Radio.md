# Radio — Build Cache

**Built:** 2026-07-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1573 (frame "Component 1")

## Variant Properties

| Property | Values |
|----------|--------|
| size | Default (21.6→24), Small (20) |
| state | Default, Selected, Disable, Disable+select, Select with icon, Disable+select with icon |

12 variants (2 × 6). Node ids: Default-size row `6586:1574/1576/1578/1582/1584/1586`; small row `6586:1590/1592/1594/1598/1600/1602`.

## Spec

`specs/Radio.md`

## Token Police Audit

**Resolved: 5/6 colours clean; 1 exact-value delta; no new tokens.**

| Figma variable | Value | Repo token |
|---|---|---|
| Color/Background/Primary | #ffffff | `semantic.color.background.primary` |
| Color/Icons/CTA (ring + dot + fill) | #ff5443 | `semantic.color.branding.1mg` |
| Color/Icons/Inverse (dot/check on fill) | #ffffff | `semantic.color.content.inverse-primary` |
| Color/Stroke/Disable | #a2a9b8 | `semantic.color.border.default` |
| Color/Background/Disabled | #a2a9b8 | `semantic.color.background.disabled` |
| Color/Stroke/Default | #000000 | ⚠ `semantic.color.border.strong` (= #181a1f) |

### 🚨 EXACT-VALUE DELTA

- **Default ring `#000000`** → mapped to `border.strong` (#181a1f). Same delta flagged for Checkbox — one dark-border reconciliation covers both. (Border weight 1.5px; Figma nominal 1px.)

### ⚠️ SIZE / SHAPE

- **Default size 21.6px** → normalized to **24** (Small stays 20). ✅ RESOLVED — 20/24 pair approved by design (2026-07-26). Already implemented at 24px.
- Shape is a full circle → `border-radius: 50%` (no radius token needed).
- Dot (10/8px) and check (14/12px) are derived indicator sizes.

### 🔧 BASE STATE FIX

- **focus — MISSING.** Keyboard-operable; needs a focus ring (WCAG 2.4.7). Tokens exist. Single-select keyboard nav (arrow keys) is owned by the consuming `radiogroup`, not the atom.
- **hover** not defined.

## Correction (post-review)

- First implementation was WRONG for the dot states: rendered thin-ring+dot (Selected) and filled-disc+dot (Disable+select). Figma actually shows a **donut** — a filled coral/grey disc with a **white centre hole**. Fixed: a checked radio is a filled disc; `dot` = white hole knockout, `check` = white checkmark. Verified against per-node Figma renders.

## Notes

- The set has TWO selected treatments: **dot** = donut (white hole) and **check** = white checkmark ("...with icon"). Both sit on a filled disc; modelled as `indicator: "dot" | "check"`.
- CSS state resolution by specificity + source order: disabled-selected rule is last so grey fill wins over coral. Verified for both dot and check.
- disabled-selected uses grey fill, NOT coral (disabled outranks selected) — consistent with Toggle/Checkbox.
- API: `checked` × `disabled` × `indicator` + `size`; `state` prop maps the 6 Figma variants for galleries. Single-select lives in the consumer's `radiogroup`.
- Implemented: `Radio.tsx`, `Radio.stories.tsx`, CSS, export. Under Components/Radio (Interactive story demos a 3-radio group).
- Open before promotion: focus ring + the 21.6→24 size confirmation + #000000/#181a1f reconciliation.

## Resolution — Focus ring (2026-07-26)

Focus ring **N/A / not required** — these are native **mobile app** components (touch input, no keyboard Tab focus). Closed by design decision. (Would only apply if reused in mobile web/PWA or for Switch Control / external-keyboard a11y, handled by the OS layer natively.)

## Design decision (2026-07-26)

- Border weight → **1px** for consistency with Checkbox (sibling controls). Applied. Revert to 1.5px if checkbox-only was intended.
