# Sticky — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6525-593 (frame "Sticky")
> **Component family:** Feedback / Sticky
> **Status:** Review

> **Token convention:** colours are `token.semantic.color.*`; several promo/illustration fills only exist as `base.color.*` (flagged). `space`/`radius`/`shadow` are top-level.

---

## Prompt Match

```yaml
prompts:
  - "sticky bar"
  - "bottom notification bar"
  - "delivery tracker sticky"
  - "rating prompt bar"
  - "floating video pill"
```

---

## Description

Sticky is the family of bars pinned to the bottom of a screen. Four types: **Redirection** (a white status bar that links onward), **Rating** and **Standard** (coloured promo bars with a dismiss), and **Video** (a dark floating video pill). Redirection carries several states (default, error, delivery, and multi-delivery).

### When to use

- A persistent, dismissible or tappable status/promo pinned above the bottom nav (order status, rate prompt, PiP video).

### When NOT to use

- A transient confirmation — use a toast.
- The primary screen action — use Action Bar.

---

## Anatomy

```
Redirection (white, upward shadow)
  [icon] Title (bold)                    ›   (or [Track])
         Subtitle…
  Multiple → "+ 3 more ⌃" pill on top edge · 2 deliveries → ●— dots

Rating / Standard (coloured, rounded top)
  [thumb] Title (extrabold)              (✕)
          Subtitle…
  ★ ★ ★ ★ ★    (Rating)   /   [ Rate Tata 1mg ]  (Standard)

Video: 160×320 dark pill, (✕) top-left, "1:2" centred
```

**Key elements:**
- **Rounded top** (16) + upward shadow (`shadow.level-2-inverse-y`) for Redirection.
- **Leading media**: illustration/product tile (placeholder here).
- **Copy**: title (bold/extrabold) + subtitle (ellipsis).
- **Trailing**: chevron / Track button (Redirection) · close ✕ (Rating/Standard/Video).
- **Extras**: star row (Rating), primary button (Standard), "+N more" pill / pagination dots (multi-delivery).

---

## Variants

Two dimensions: **type** (Redirection/Rating/Standard/Video) × **state** (Redirection only: Default/Error/Delivery/2 deliveries/Multiple Delivery).

```yaml
redirection:
  container: { background: token.semantic.color.background.primary, radius_top: token.radius.16, shadow: token.shadow.level-2-inverse-y }
  title:    token.semantic.color.content.primary (bold)
  subtitle: token.semantic.color.content.secondary
  error_title:    token.semantic.color.content.cta          # coral (Figma uses brand coral, not states.error)
  delivery_title: token.semantic.color.states.success       # green + bolt (branding.1mg)
  delivery_subtitle: token.semantic.color.content.tertiary
  lead_rx:       base.color.comfort-pink.90                 # TOKEN MISSING (illustration tile)
  lead_delivery: base.color.sunrise-glow.80                 # TOKEN MISSING
  track_button:  { background: background.primary, border: border.subtle, radius: token.radius.8 }
  more_pill:     { background: background.primary, shadow: shadow.level-2-inverse-y }
  dots:          { active: token.semantic.color.branding.1mg, rest: token.semantic.color.background.moderate }

rating:
  container: { background: base.color.sunshine-yellow.30, radius_top: token.radius.16 }   # TOKEN MISSING: promo surface
  text:  token.semantic.color.content.inverse-primary
  thumb: token.semantic.color.background.primary
  close: { background: base.color.white-alpha.60, icon: content.secondary }
  stars: token.semantic.color.content.inverse-primary

standard:
  container: { background: base.color.comfort-pink.30, radius_top: token.radius.16 }       # TOKEN MISSING: promo surface
  text:  token.semantic.color.content.inverse-primary
  button: { background: background.primary, text: content.primary, radius: token.radius.8 }

video:
  container: { background: token.semantic.color.content.primary, radius: token.radius.16, size: 160×320 }
  close: base.color.white-alpha.60
  time:  token.semantic.color.content.tertiary
```

---

## States

Redirection states are content configs; Rating/Standard/Video are single. No hover/focus in the set (add focus rings — see Token Police).

---

## Accessibility

- Close is a `<button aria-label="Dismiss">`; Track / Rate are labelled buttons; the star row is a `radiogroup` of star buttons.
- Redirection default/error is tappable — expose the whole bar or the chevron as the action.
- Ensure text-on-colour (Rating/Standard) meets contrast; provide visible focus rings.

---

## Content Guidelines

- Title ≤ ~34 chars (one line); subtitle ellipsises. Keep promo copy to two short lines.

---

## Usage Guidelines

### Do's
- ✅ Use Redirection for actionable status; Rating/Standard for a single dismissible prompt.
- ✅ Show "+N more" / dots only when multiple deliveries stack.

### Don'ts
- ❌ Don't stack multiple sticky bars.
- ❌ Don't omit the dismiss on promo (Rating/Standard) bars.

---

## Implementation Notes

- **HTML**: a `<div>` card; actions are `<button>`s. Leading media and product thumbs are placeholders — accept real image props on integration.
- **Pinned**: `position: sticky/fixed; bottom: 0` at app level; the upward shadow reads as lifting off the content.
- **Browser support**: modern browsers, full support.
