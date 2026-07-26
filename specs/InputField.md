# Input Field — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1340
> **Component family:** Forms
> **Status:** Review

> **Token reference convention:** token IDs below are the flattened keys from `packages/tokens/generated/tokens.ts` (which mirror `packages/tokens/tokens.json`). A `token.semantic.…` reference resolves to a real leaf; a `# TOKEN MISSING` comment marks a Figma value with **no semantic token** (reaching into `base.*` directly is disallowed — base values are never direct component inputs).

---

## Prompt Match

```yaml
prompts:
  - "input field"
  - "text field with apply button"
  - "text input with cta"
  - "otp input"
  - "4 digit otp"
  - "6 digit otp"
  - "coupon code field"
```

---

## Description

Input Field is the text-entry family for Dopamine 2.0. It covers a single-line labelled text field with a trailing call-to-action (either an `APPLY` text button or an icon), and segmented one-time-passcode (OTP) inputs of 4 or 6 cells. All variants share one border/label/helper colour language driven by state.

### When to use

- Collecting a single line of user text (address, coupon/promo code) where an inline action applies the value.
- Entering a 4- or 6-digit verification code (OTP).

### When NOT to use

- Multi-line text — use a Textarea.
- A standalone action with no text entry — use Button.
- Selecting from known options — use Select / Combobox.

---

## Anatomy

```
Field with CTA (text | logo)
  ┌─ label chip (floats over the border, background-primary knockout) ─┐
  │  House number / Flat number                                        │
  ┌────────────────────────────────────────────────────────────────────┐
  │  1582/ 5, Patel nagar, sector 15  |            APPLY / ✕            │  ← bordered box
  └────────────────────────────────────────────────────────────────────┘
  Helping text or error message goes here                                 ← helper/error

4-digit OTP                         6-digit OTP
  ▢  ▢  ▢  ▢                          ▢  ▢  ▢  ▢  ▢  ▢
  (44×44 cells, 16px gap)
```

**Key elements:**
- **Label chip**: floating label, sits on the box border with a `background.primary` knockout so the border appears broken behind it. Recolours by state.
- **Input box**: bordered, rounded container holding the value text and the trailing CTA. Border colour is the primary state signal.
- **Value text**: the user's entered text (Body 14 / Medium).
- **CTA slot** (field types only): either the `APPLY` text (Body 14 / Bold) or a logo/icon (observed: a clear ✕ icon). Right-aligned via space-between.
- **Helper/error text**: Tag 11 line below the box; carries validation messaging and recolours by state.
- **OTP cell**: a 44×44 square, bordered, radius 8; one per digit. No label or helper in the OTP frames.

---

## Variants

Two dimensions in Figma: **Type** (4 values) × **State** (5 values) = 20 variants.

### Type: Field with CTA text

```yaml
field_with_cta_text:
  use_when: "Single-line text entry with an inline text action (e.g. APPLY a coupon)."
  element: div            # wraps <label>, <input>, <button>, helper <p>
  width: 328px            # fixed in Figma; treat as fill in implementation
  height: 88px
  tokens:
    background: token.semantic.color.background.primary
    padding_y: token.semantic.space.8       # container py
    gap: token.semantic.space.4             # box → helper
    box_padding: token.semantic.space.12
    radius: token.semantic.radius.8
    value_text: token.semantic.font.size.body-14 / token.semantic.font.line-height.20 / token.semantic.font.weight.medium / token.semantic.font.family.body
    cta_text: token.semantic.font.size.body-14 / token.semantic.font.line-height.20 / token.semantic.font.weight.bold
    label_text: token.semantic.font.size.body-12 / token.semantic.font.line-height.16 / token.semantic.font.weight.regular
    helper_text: token.semantic.font.size.tag-11 / token.semantic.font.line-height.16 / token.semantic.font.weight.regular
```

### Type: Field with CTA logo

```yaml
field_with_cta_logo:
  use_when: "Same as CTA text, but the inline action is an icon (observed: clear/✕) instead of the word APPLY."
  element: div
  inherits: field_with_cta_text     # identical box/label/helper; CTA slot renders an icon
  tokens:
    icon_slot: 24px                 # trailing icon button
    # icon colour: see States (follows CTA colour per state)
```

### Type: 4 digit OTP

```yaml
otp_4:
  use_when: "Entering a 4-character verification code."
  element: div            # row of 4 single-char <input>
  width: 224px            # 4×44 + 3×16
  height: 44px
  cells: 4
  tokens:
    gap: token.semantic.space.16
    cell_size: 44px       # TOKEN MISSING: no space token = 44px (space ramp ends at 40). Meets WCAG 2.5.5 touch target.
    radius: token.semantic.radius.8
    digit_text: token.semantic.font.size.body-14 / token.semantic.font.weight.medium
```

### Type: 6 digit OTP

```yaml
otp_6:
  use_when: "Entering a 6-character verification code."
  element: div
  width: 344px            # 6×44 + 5×16
  height: 44px
  cells: 6
  inherits: otp_4
```

---

## States

Applies to all four types. The border is the primary signal; label + helper (fields) or digit colour (OTP) follow.

```yaml
default:
  applies_to: [all]
  changes:
    border: token.semantic.color.content.disabled   # RESOLVES BY VALUE ONLY (#a2a9b8). TOKEN MISSING: semantic.color.border.default — the border ramp (subtle 90 / moderate 80 / intense 60) has no cool-neutral.70 entry. Using a content token for a border is a role mismatch.
    label: token.semantic.color.content.tertiary
    value: token.semantic.color.content.primary
    cta: token.semantic.color.content.tertiary       # APPLY is grey until the field is engaged
    helper: token.semantic.color.content.tertiary

typing:
  applies_to: [all]
  changes:
    border: token.semantic.color.content.primary     # RESOLVES BY VALUE ONLY (#181a1f, from Figma "Icons/Primary"). TOKEN MISSING: semantic.color.border.strong. NOTE: Figma also defines "Stroke/Default = #000000" which is NOT the value actually applied (#181a1f) — design inconsistency to resolve.
    label: token.semantic.color.content.tertiary
    value: token.semantic.color.content.primary
    cta: token.semantic.color.branding.1mg           # APPLY turns coral (#ff5443) when active. NOTE: role mismatch — no semantic.color.content.cta exists; resolves via branding.1mg.
    helper: token.semantic.color.content.tertiary

error:
  applies_to: [all]
  changes:
    border: token.semantic.color.states.error
    label: token.semantic.color.states.error
    value: token.semantic.color.content.primary
    cta: token.semantic.color.branding.1mg           # coral (see note above)
    helper: token.semantic.color.states.error
    otp_digit: token.semantic.color.states.error

success:
  applies_to: [all]
  changes:
    border: token.semantic.color.states.success
    label: token.semantic.color.states.success
    value: token.semantic.color.content.primary
    cta: token.semantic.color.content.tertiary
    helper: token.semantic.color.states.success
    otp_digit: token.semantic.color.states.success

disable:
  applies_to: [all]
  changes:
    border: token.semantic.color.border.subtle       # #dde2eb
    label: token.semantic.color.content.disabled
    value: token.semantic.color.content.disabled
    cta: token.semantic.color.content.tertiary       # APPLY stays tertiary even when disabled (deviation — expected content.disabled)
    helper: token.semantic.color.content.disabled
    pointer_events: none

# --- STATES ABSENT FROM FIGMA (release-blocking gaps, see Token Police) ---
focus:
  applies_to: [all]
  status: MISSING_IN_DESIGN
  required:
    ring: token.semantic.color.focus.ring
    ring_shadow: token.shadow.focus       # 0 0 0 3px rgba(255,84,67,0.32)
  note: "No focus variant exists in the Figma set. Interactive inputs require a visible focus indicator (WCAG 2.4.7). Tokens exist in the system; the design must specify offset/width."

hover:
  applies_to: [all]
  status: NOT_DEFINED
  note: "No hover variant in Figma. Acceptable for text inputs, but confirm intended."

active:
  applies_to: [all]
  status: COVERED_BY_TYPING
```

---

## Sizes

Single size per type. Field box height is intrinsic (~44px box + label + helper = 88px block). OTP cells are fixed 44×44. No sm/md/lg dimension exists in the Figma set.

---

## With Icons

```yaml
cta_logo:
  layout: space-between        # value text left, icon right
  align: center
  icon_size: 24px
  colour: follows CTA colour per state (see States)
```

---

## Composition

```yaml
composition:
  can_contain: [Icon]                 # CTA logo slot
  can_be_contained_by: [Form, Dialog, PageHeader search area]
  cannot_combine_with: []
```

---

## Accessibility

### ARIA / semantics

```html
<!-- Field types -->
<label for="addr">House number / Flat number</label>
<div class="ds-input" data-state="default">
  <input id="addr" type="text" aria-describedby="addr-help" />
  <button type="button">APPLY</button>   <!-- or icon button with aria-label -->
</div>
<p id="addr-help">Helping text or error message goes here</p>
<!-- error state: input gets aria-invalid="true", helper referenced by aria-describedby -->

<!-- OTP: group of single-char inputs -->
<div role="group" aria-label="Verification code">
  <input inputmode="numeric" maxlength="1" aria-label="Digit 1" /> …
</div>
```

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move between field, CTA, or across OTP cells |
| `Enter` | Submit / trigger APPLY when focus is in the field |
| Arrow / Backspace (OTP) | Move between cells; Backspace on empty cell moves to previous |

### Touch Targets

- OTP cells are 44×44 — meets WCAG 2.5.5. CTA icon button must reach 44×44 hit area even if the glyph is 24px.

### Screen Reader Announcements

- Label, current value, and validation message (error/success helper) must be associated via `aria-describedby` and announced on state change (`aria-invalid` for error).

---

## Content Guidelines

- **Label**: ≤ 40 chars, sentence case ("House number / Flat number").
- **Value placeholder**: realistic sample; do not rely on colour alone for state.
- **Helper/error**: ≤ 80 chars. Error messages state what to fix, not just "invalid".

---

## Usage Guidelines

### Do's
- ✅ Pair every field with its label chip and a helper line reserved for errors (prevents layout shift).
- ✅ Turn the CTA coral only once the field is engaged (typing/error), matching the design.

### Don'ts
- ❌ Don't signal error/success with border colour alone — keep the helper text (colour is not the only cue).
- ❌ Don't ship without a focus state (see Token Police blocker).

---

## Implementation Notes

- **HTML**: `<input type="text">` for fields; `<button>` for the APPLY/icon CTA; a `role="group"` of single-char `<input inputmode="numeric">` for OTP.
- **Label knockout**: the floating label uses a `background.primary` fill over the border (negative margin `mb-[-8px]` in Figma) — reproduce with the label overlapping the box top edge.
- **Width**: Figma fixes field width at 328px; implement as fill/`100%` with 328 as a max in docs.
- **Browser support**: modern browsers, full support. OTP paste-to-fill and `autocomplete="one-time-code"` recommended.
