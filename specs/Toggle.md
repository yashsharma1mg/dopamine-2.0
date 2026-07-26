# Toggle — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6356-403
> **Component family:** Forms
> **Status:** Review

> **Token reference convention:** IDs are the flattened keys from `packages/tokens/generated/tokens.ts` (mirror of `tokens.json`). Colours are `token.semantic.color.*`; `space`/`radius`/`font` are **top-level** (`token.space.20`, `token.radius.12`). `# TOKEN MISSING` marks a Figma value with no semantic token.

---

## Prompt Match

```yaml
prompts:
  - "toggle"
  - "switch"
  - "on off toggle"
  - "settings switch"
  - "enable disable toggle"
```

---

## Description

Toggle is a binary on/off switch: a 40×24 pill track with a 20px circular thumb that slides between sides. When on, the track turns coral and the thumb shows a tick. Use it for immediate, self-applying settings — no separate save action.

### When to use

- Turning a single setting on or off with instant effect (notifications, dark mode).

### When NOT to use

- Choosing between two labelled, opposing options — use a segmented control.
- A choice that only applies after form submit — use a Checkbox.
- Selecting one of several options — use Radio.

---

## Anatomy

```
 off                 on
 ┌────────────┐      ┌────────────┐
 │ ⬤          │      │          ⬤✓│
 └────────────┘      └────────────┘
  track (pill)         track (coral)
  thumb left           thumb right + tick
```

**Key elements:**
- **Track**: 40×24 rounded pill (radius 12). Background carries the state signal.
- **Thumb**: 20px white circle, inset 2px, slides 16px between off (left) and on (right).
- **Tick**: 14px check inside the thumb, shown only when on. Coral when enabled, grey when disabled.

---

## Variants

Single dimension `state` (4 values). Modelled in code as `checked` × `disabled`.

```yaml
toggle:
  element: button          # role="switch", aria-checked
  tokens:
    width: token.space.40
    height: token.space.24
    padding: token.space.2
    radius: token.radius.12
    thumb_size: token.space.20
    thumb_radius: 50%       # TOKEN MISSING: radius ramp has no 10; thumb is a full circle, use 50%
    thumb_background: token.semantic.color.background.primary
    thumb_travel: 16px      # derived: width - 2*padding - thumb_size
    tick_size: 14px         # derived icon size (no space.14 token)
```

---

## States

```yaml
default:            # off, enabled
  applies_to: [all]
  changes:
    track: token.semantic.color.background.moderate     # #dde2eb
    thumb: token.semantic.color.background.primary
    tick: hidden

selected:           # on, enabled
  applies_to: [all]
  changes:
    track: token.semantic.color.branding.1mg            # coral #ff5443
    tick: token.semantic.color.content.cta              # coral

disabled:           # off, disabled
  applies_to: [all]
  changes:
    track: token.semantic.color.background.disabled     # #a2a9b8
    pointer_events: none

disabled+selected:  # on, disabled
  applies_to: [all]
  changes:
    track: token.semantic.color.background.disabled     # grey, NOT coral
    tick: token.semantic.color.content.disabled         # grey #a2a9b8
    pointer_events: none

# --- ABSENT FROM FIGMA (see Token Police) ---
focus:
  applies_to: [all]
  status: MISSING_IN_DESIGN
  required:
    ring: token.semantic.color.focus.ring
    ring_shadow: token.shadow.focus
  note: "No focus variant in the set. A switch is keyboard-operable and needs a visible focus ring (WCAG 2.4.7)."

hover:
  applies_to: [all]
  status: NOT_DEFINED
```

---

## Sizes

Single size (40×24). No size dimension in the Figma set.

---

## Accessibility

### ARIA / semantics

```html
<button role="switch" aria-checked="false" aria-label="Notifications">…</button>
```

- `role="switch"` with `aria-checked` reflecting on/off; disabled state sets the native `disabled` attribute.
- Needs an accessible name (`aria-label` or an associated visible label) — the switch has no inline text.

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move focus to / from the switch |
| `Space` / `Enter` | Toggle on/off |

### Touch Targets

- Visual is 40×24; wrap in a ≥44×44 hit area (padding) to meet WCAG 2.5.5.

### Screen Reader Announcements

- Announces name + role ("switch") + state ("on"/"off"), and re-announces on change.

---

## Content Guidelines

- Pair with a nearby label describing what the switch controls; state the setting, not the action ("Notifications", not "Turn on notifications").
- Don't rely on colour alone — the thumb position + tick also encode state.

---

## Usage Guidelines

### Do's
- ✅ Apply the change immediately on toggle.
- ✅ Keep the disabled+selected track grey (matches Figma) so disabled reads as inert, not active.

### Don'ts
- ❌ Don't use a toggle where the user expects to Save/Cancel later.
- ❌ Don't ship without a focus ring (see Token Police).

---

## Implementation Notes

- **HTML**: `<button role="switch">`. Slide via `transform: translateX(16px)` on the thumb (honours `prefers-reduced-motion`).
- **Thumb travel**: 16px = 40 − 2×2 − 20.
- **Browser support**: modern browsers, full support.
