# Checkbox — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1536 (frame "Checkboxes")
> **Component family:** Forms
> **Status:** Review

> **Note on naming:** requested as "radio buttons", but the Figma frame is a **checkbox** (rounded square + ✓ tick, independent on/off). A radio (circle + dot, single-select group) is a separate component. Built as Checkbox per the source frame.

> **Token reference convention:** colours are `token.semantic.color.*`; `space`/`radius` are top-level (`token.space.24`, `token.radius.6`). `# TOKEN MISSING` marks a Figma value with no semantic token.

---

## Prompt Match

```yaml
prompts:
  - "checkbox"
  - "check box"
  - "accept terms checkbox"
  - "multi select option"
  - "tick box"
```

---

## Description

Checkbox is a square on/off control with a checkmark when selected. Each checkbox is independent — use it for multi-select lists or single opt-ins (accept terms). Comes in two sizes (Normal 24px, Small 20px).

### When to use

- Selecting zero or more options from a list.
- A single binary opt-in (accept terms, remember me).

### When NOT to use

- Choosing exactly one of several mutually-exclusive options — use Radio.
- An immediate self-applying setting — use Toggle.

---

## Anatomy

```
 unchecked        checked
   ▢               ▣✓
 square, radius 6   coral fill + white tick
```

**Key elements:**
- **Box**: square, `radius: 6`. Border in the unchecked state; solid fill when checked.
- **Tick**: 14px (Normal) / 12px (Small) white checkmark, shown only when checked.

---

## Variants

Two dimensions: **size** (Normal/Small) × **state** (4). Modelled in code as `checked` × `disabled` + a `size` prop.

```yaml
checkbox:
  element: button          # role="checkbox", aria-checked
  tokens:
    radius: token.radius.6
    box_normal: token.space.24
    box_small: token.space.20
    tick_size: 14px          # Normal (12px Small) — derived icon size, no space.14 token
    padding_selected: 5px    # derived: (24 - 14) / 2
```

---

## States

```yaml
default:            # unchecked, enabled
  applies_to: [all]
  changes:
    background: token.semantic.color.background.primary
    border: token.semantic.color.border.strong    # RESOLVES TO #181a1f. Figma value is Stroke/Default #000000 — exact-value delta, see Token Police.
    border_width: 1.5px                            # Figma nominal 1px; 1.5px matches rendered weight

selected:           # checked, enabled
  applies_to: [all]
  changes:
    background: token.semantic.color.branding.1mg  # coral #ff5443 (Figma Icons/CTA)
    border: none
    tick: token.semantic.color.content.inverse-primary   # white (Figma Icons/Inverse)

disable:            # unchecked, disabled
  applies_to: [all]
  changes:
    background: token.semantic.color.background.primary
    border: token.semantic.color.border.default    # #a2a9b8 (Figma Stroke/Disable)
    pointer_events: none

disabled+selected:  # checked, disabled
  applies_to: [all]
  changes:
    background: token.semantic.color.background.disabled  # grey #a2a9b8, NOT coral
    border: none
    tick: token.semantic.color.content.inverse-primary   # white
    pointer_events: none

# --- ABSENT FROM FIGMA (see Token Police) ---
focus:
  applies_to: [all]
  status: MISSING_IN_DESIGN
  required:
    ring: token.semantic.color.focus.ring
    ring_shadow: token.shadow.focus
  note: "No focus variant in the set. Keyboard-operable; needs a visible focus ring (WCAG 2.4.7)."

hover:
  applies_to: [all]
  status: NOT_DEFINED
```

---

## Sizes

```yaml
Normal: { box: token.space.24, tick: 14px }
Small:  { box: token.space.20, tick: 12px }
```

---

## Accessibility

### ARIA / semantics

```html
<button role="checkbox" aria-checked="false" aria-label="Accept terms">…</button>
```

- `role="checkbox"` + `aria-checked`; disabled uses the native `disabled` attribute.
- Needs an accessible name — the box has no inline text. Associate a visible label where possible.

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move focus to / from the checkbox |
| `Space` | Toggle checked/unchecked |

### Touch Targets

- Visual is 24 (or 20) px; provide a ≥44×44 hit area (label + padding) to meet WCAG 2.5.5.

### Screen Reader Announcements

- Announces name + role ("checkbox") + state ("checked"/"not checked"), re-announced on change.

---

## Content Guidelines

- Pair with a clear label describing the option. Use the label as the accessible name.
- Don't rely on colour alone — the tick + fill also encode the checked state.

---

## Usage Guidelines

### Do's
- ✅ Use for independent multi-select; each box toggles on its own.
- ✅ Keep disabled+selected grey (matches Figma) so disabled reads as inert.

### Don'ts
- ❌ Don't use where exactly one option must be chosen — that's Radio.
- ❌ Don't ship without a focus ring (see Token Police).

---

## Implementation Notes

- **HTML**: `<button role="checkbox">`; tick is an inline SVG using `currentColor`.
- **Small** scales the box (24→20) and tick (14→12); all colours unchanged.
- **Browser support**: modern browsers, full support.
