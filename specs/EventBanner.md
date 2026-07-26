# Event Banner — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6453-598 (frame "Event Promotion Section")
> **Component family:** Display / Promotion
> **Status:** Review

> **Token convention:** colours are `token.semantic.color.*`; `space`/`radius`/`font` are top-level. `# TOKEN MISSING` marks a value with no token.

---

## Prompt Match

```yaml
prompts:
  - "event banner"
  - "promo card"
  - "event promotion section"
  - "banner with thumbnails"
  - "carousel promo banner"
```

---

## Description

Event Banner is a promotional card: a hero image area with a dark overlay panel at the bottom holding an optional strip of thumbnail items and an optional message row (icon + text + chevron), optionally with pagination dots. Used to promote events/offers with a set of related items.

### When to use

- Promoting an event/offer on a home or category surface, optionally previewing 1–5+ related items.

### When NOT to use

- A single plain call-to-action — use Button / Action Bar.
- Dense list content — use a list, not a banner.

---

## Anatomy

```
┌───────────────────────────────┐
│                               │  ← hero image area (content.tertiary placeholder)
│                               │
│ ┌─── dark panel ───────────┐ │
│ │ [thumb][thumb][thumb]     │ │  ← items strip (0–5, subtle thumbnails)
│ │ [▢] Lorem ispum. Lorem…  ›│ │  ← message: icon chip + bold/regular text + chevron
│ │ ▬ ·                       │ │  ← pagination dots (only when bottom message = 2)
│ └───────────────────────────┘ │
└───────────────────────────────┘
```

**Key elements:**
- **Hero**: the card background — event image placeholder (`content.tertiary`).
- **Panel**: dark overlay (`content.secondary`) pinned to the bottom; appears only when there are items and/or a message.
- **Items strip**: 1–5 thumbnail cards (`background.subtle`, radius 8). 1–4 stretch to fill; ">4" shows 5 fixed 64px cards that overflow/clip.
- **Message row**: 24px icon chip (`background.moderate`) + bold+regular white text (ellipsis) + trailing chevron button.
- **Dots**: pagination indicator (active pill + dot), only when bottom message = 2.

---

## Variants

Two dimensions: **items** (none/1/2/3/4/>4) × **bottom message** (none/1/2) = 18.

```yaml
container:
  element: div
  tokens:
    width: 328px
    radius: token.radius.16
    background: token.semantic.color.content.tertiary   # hero placeholder (Figma Icons/Tertiary #626a7a)

panel:
  tokens:
    background: token.semantic.color.content.secondary   # Figma Icons/Secondary #414752
    padding: token.space.12
    gap: token.space.8

items_strip:
  tokens:
    gap: token.space.8
    thumb_background: token.semantic.color.background.subtle   # #eef1f5
    thumb_radius: token.radius.8
  rules:
    "1-4": flex:1 each (stretch)
    ">4": 5 × 64px fixed (overflow-clipped)

message:
  tokens:
    gap: 6px                 # TOKEN MISSING: no space.6 (literal)
    icon_chip_bg: token.semantic.color.background.moderate   # #dde2eb
    icon_chip_radius: token.radius.8
    text: token.semantic.color.content.inverse-primary        # white
    text_type: token.font.size.body-12 / token.font.line-height.16 (bold + regular spans)
    chevron: white circle (bg content.inverse-primary) + dark chevron (content.primary), 24px

dots:                        # bottom message = 2 only, centred
  tokens:
    gap: token.space.4
    align: center
    colour: token.semantic.color.content.inverse-primary (active opaque pill, inactive 50% dot)
```

---

## States

The 18 "states" are content configurations, not interaction states:

| bottom message | renders |
|---|---|
| none | no message row (panel present only if items > 0) |
| 1 | message row (icon + text + chevron) |
| 2 | message row + pagination dots |

Interaction: the chevron is the affordance (`onAction`). No hover/focus variants in the Figma set.

---

## Accessibility

- The banner is promotional content; expose the action via the chevron `<button aria-label="Open event">`.
- Real images must carry meaningful `alt`; the placeholder icons here are decorative (`aria-hidden`).
- Text truncates with ellipsis — ensure the full title is available to assistive tech / on the destination.

---

## Content Guidelines

- Title (bold) is the hook; the regular text is a short qualifier. Keep to one line (it ellipsises).
- Items strip previews related products/sessions; ">4" communicates "more than shown".

---

## Usage Guidelines

### Do's
- ✅ Use the dots (bottom message = 2) when the banner is one of a swipeable set.
- ✅ Keep the message to a single line.

### Don'ts
- ❌ Don't stuff more than 5 thumbnails — use ">4".
- ❌ Don't rely on the hero image alone to convey the offer; keep the message.

---

## Implementation Notes

- **HTML**: a `<div>` card; the chevron is a `<button>`. Hero and thumbnails are placeholders here — accept real image props on integration.
- **Sizing**: 328px wide, min-height 248px; the hero flexes and the panel sits at the bottom (`justify-content: flex-end`).
- **Browser support**: modern browsers, full support.
