# Input Field — Build Cache

**Built:** 2026-07-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1340

## Variant Properties

| Property | Values |
|----------|--------|
| Type  | Field with CTA text, Field with CTA logo, 4 digit OTP, 6 digit OTP |
| State | default, typing, error, success, disable |

20 variants total (4 × 5). Figma node ids: fields `6586:1341–1430`, 4-OTP `6586:1431–1463`, 6-OTP `6586:1464–1508`.

## Spec

`specs/InputField.md`

## Token Police Audit

**Resolved: 24 / 28 distinct value references map cleanly to `packages/tokens/tokens.json`.**

Clean semantic resolves: `content.primary`, `content.tertiary`, `content.disabled`, `background.primary`, `border.subtle`, `states.error`, `states.success`, `branding.1mg`, `radius.8`, `space.4/8/12/16`, `font.size.body-12/body-14/tag-11`, `font.line-height.16/20`, `font.weight.regular/medium/bold`, `font.family.body`.

### 🚨 TOKEN MISSING (release blockers)

1. **Default/resting border `#a2a9b8`** (Figma `Color/Stroke/Disable`, = base cool-neutral.70). The semantic **border** ramp is subtle(90)/moderate(80)/intense(60) — it skips 70, so there is *no* border token at this value. Currently resolvable only via `content.disabled` (role mismatch). → add `semantic.color.border.default`.
2. **Typing border `#181a1f`** (Figma `Color/Icons/Primary`). No semantic border token for near-black; resolves only via `content.primary`. → add `semantic.color.border.strong` (or `border.active`).
3. **OTP cell size `44px`.** `semantic.space` ramp ends at 40 — no 44 token. → add `space.44` (also useful as the WCAG min touch target).
4. **CTA text colour `#ff5443`.** No `semantic.color.content.cta`; resolves only via `branding.1mg` (branding token used as content). → add `semantic.color.content.cta` aliasing brand coral.

### ⚠️ RAW / INCONSISTENT

- Figma variable `Color/Stroke/Default = #000000` is declared on the set but the **typing** border actually renders `#181a1f` (Icons/Primary). Design inconsistency — pick one and bind it.
- `Color/White + Alpha/60` (#ffffff99) appears in the set's variables but no pulled variant applied it (likely a disabled overlay); `base.color.white-alpha.60` exists if needed.

### 🔧 BASE STATE FIX (required states)

- **focus — MISSING ENTIRELY.** No focus variant in the Figma set. Interactive inputs need a visible focus ring (WCAG 2.4.7). Tokens exist: `semantic.color.focus.ring` + `shadow.focus`. Design must add the variant and specify ring width/offset.
- **disabled** uses colour swaps (border→subtle, text→content.disabled) rather than the system's usual 50% opacity + blocked interaction. Deviation, not a blocker — confirm intent.
- **hover / active** not defined (acceptable for text inputs; typing covers the engaged look).

## Notes

- Two clean variant dimensions: `type` (4) and `state` (5). Recommend implementing `type` as a discriminated prop and `state` as derived (default/typing/success/error) + a `disabled` boolean, rather than a flat 20-way enum.
- Field block = 328×88 fixed in Figma; implement width as fill with 328 as documented max.
- Floating label uses a `background.primary` knockout over the top border (Figma `mb-[-8px]`); reproduce the border-break, not a solid gap.
- OTP frames contain only the cell row — no label/helper inside the component.
- **4 token additions + 1 focus variant** should land in `tokens.json` / Figma before this component is implemented and promoted past `Review`.

## Resolution — Focus ring (2026-07-26)

Focus ring **N/A / not required** — these are native **mobile app** components (touch input, no keyboard Tab focus). Closed by design decision. (Would only apply if reused in mobile web/PWA or for Switch Control / external-keyboard a11y, handled by the OS layer natively.)

## Design decision (2026-07-26)

- Disabled treatment → **colour-swap** (current behaviour) confirmed; not 50% opacity. Closed.
