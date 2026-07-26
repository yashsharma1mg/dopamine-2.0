# Radio — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1573 (frame "Component 1")
> **Component family:** Forms
> **Status:** Review

> **Token convention:** colours are `token.semantic.color.*`; shape is a circle (`50%`, no radius token). `# TOKEN MISSING` marks a Figma value with no semantic token.

---

## Prompt Match

```yaml
prompts:
  - "radio button"
  - "radio group"
  - "single select option"
  - "choose one option"
```

---

## Description

Radio selects exactly one option from a set. Circular control: an outlined ring when unselected, and when selected either a coral dot (default) or a white checkmark on a coral fill ("with icon"). Two sizes (Default 24px, Small 20px).

### When to use

- Choosing exactly one of several mutually-exclusive options.

### When NOT to use

- Independent multi-select — use Checkbox.
- Immediate on/off setting — use Toggle.

---

## Anatomy

```
 unselected      selected (dot)       selected (check)
    ◯               ◉ coral donut        ✓ on coral fill
 thin ring       filled disc +        filled disc +
                 white centre hole    white check
```

**Key elements:**
- **Disc / ring**: thin outlined ring when unselected; a solid filled disc when selected (either indicator).
- **Indicator (selected only)**: `dot` = a white circular hole knocked out of the disc (donut); `check` = a white checkmark on the disc.

---

## Variants

Two dimensions: **size** (Default/Small) × **state** (6). API: `checked` × `disabled` × `indicator` + `size`.

```yaml
radio:
  element: button          # role="radio", aria-checked
  tokens:
    size_default: 24px      # TOKEN NOTE: Figma reports 21.6px (90%-scaled); normalized to 24 to match Checkbox
    size_small: token.space.20
    shape: 50%              # full circle, no radius token
    dot: 10px (Default) / 8px (Small)     # derived
    check: 14px (Default) / 12px (Small)  # derived
```

---

## States

```yaml
default:            # unselected, enabled
  applies_to: [all]
  changes:
    background: token.semantic.color.background.primary
    border: token.semantic.color.border.strong    # #181a1f. Figma Stroke/Default #000000 — exact-value delta, see Token Police.

disable:            # unselected, disabled
  applies_to: [all]
  changes:
    border: token.semantic.color.border.default    # #a2a9b8
    pointer_events: none

selected:           # selected, enabled, dot → coral donut
  applies_to: [all]
  changes:
    background: token.semantic.color.branding.1mg        # coral filled disc
    border: none
    hole: token.semantic.color.background.primary        # white centre knockout

select_with_icon:   # selected, enabled, check
  applies_to: [all]
  changes:
    background: token.semantic.color.branding.1mg  # coral fill
    border: none
    check: token.semantic.color.content.inverse-primary  # white

disable+select:     # selected, disabled, dot → grey donut
  applies_to: [all]
  changes:
    background: token.semantic.color.background.disabled  # grey filled disc, NOT coral
    border: none
    hole: token.semantic.color.background.primary        # white centre knockout
    pointer_events: none

disable+select_with_icon:  # selected, disabled, check
  applies_to: [all]
  changes:
    background: token.semantic.color.background.disabled  # grey fill
    border: none
    check: token.semantic.color.content.inverse-primary  # white
    pointer_events: none

# --- ABSENT FROM FIGMA (see Token Police) ---
focus:
  applies_to: [all]
  status: MISSING_IN_DESIGN
  required: { ring: token.semantic.color.focus.ring, ring_shadow: token.shadow.focus }
  note: "No focus variant. Keyboard-operable; needs a visible focus ring (WCAG 2.4.7)."
hover:
  applies_to: [all]
  status: NOT_DEFINED
```

---

## Sizes

```yaml
Default: { box: 24px, dot: 10px, check: 14px }   # Figma 21.6px normalized
Small:   { box: token.space.20, dot: 8px, check: 12px }
```

---

## Accessibility

```html
<div role="radiogroup" aria-label="Choose one">
  <button role="radio" aria-checked="true"  aria-label="Option A">…</button>
  <button role="radio" aria-checked="false" aria-label="Option B">…</button>
</div>
```

| Key | Action |
|---|---|
| `Tab` | Move focus into the group (to the checked radio) |
| `Arrow keys` | Move selection between radios in the group |
| `Space` | Select the focused radio |

- Wrap radios in `role="radiogroup"`; only one `aria-checked="true"` per group. Provide a ≥44×44 hit area.

---

## Content Guidelines

- Label each option clearly; the label is the accessible name. Keep options parallel in phrasing.

---

## Usage Guidelines

### Do's
- ✅ Use inside a group where exactly one option is selectable.
- ✅ Keep disabled-selected grey (matches Figma) — disabled outranks selected.

### Don'ts
- ❌ Don't use a single radio for a yes/no — that's a Checkbox or Toggle.
- ❌ Don't mix `dot` and `check` indicators within one group.

---

## Implementation Notes

- **HTML**: `<button role="radio">` inside a `role="radiogroup"`; single-select is owned by the group container.
- **indicator**: `dot` (default) or `check`; `state` prop maps the 6 Figma variants for galleries.
- **Browser support**: modern browsers, full support.
