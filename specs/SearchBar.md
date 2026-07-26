# Search Bar — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6425-2956 (frame "Search")
> **Component family:** Navigation / Forms
> **Status:** Review

> **Token convention:** colours are `token.semantic.color.*`; `space` is top-level. Pills/circles use `999px`/`50%` (no radius token for 30/20). `# TOKEN MISSING` marks a value with no token.

---

## Prompt Match

```yaml
prompts:
  - "search bar"
  - "search input"
  - "search field with voice"
  - "search with back button"
```

---

## Description

Search Bar is a pill-shaped search entry (328×52). Its contents change by state: a resting placeholder + search icon; an engaged bar with a back arrow, a rotating hint, and a voice (mic) button; and a typing state with a clear (×) button. "Bar with entry" appends a separate 48px circular entry button beside the bar.

### When to use

- Product/content search where the user expects an inline field with voice and quick-clear.

### When NOT to use

- Filtering a small known list — use a Select/Combobox.
- A plain text field — use Input Field.

---

## Anatomy

```
Bar Only
  Default : [ placeholder …………………………  🔍 ]
  selected: [ ←  Search for ‘crocin’…        ●mic ]
  typing  : [ ←  Whe|                         ⊗clear ]

Bar with entry
  [ …bar… ]  ( ◎ 48px entry button )
```

**Key elements:**
- **Bar**: pill container (radius 30 → full pill), border, white fill.
- **Leading**: back-arrow button (selected/typing only).
- **Content**: placeholder input (Default), rotating hint text (selected), typed value + cursor (typing).
- **Trailing**: search icon (Default), mic on a dark circle (selected), clear × on a subtle chip (typing).
- **Entry button**: separate 48px circle with a category/apps icon ("Bar with entry" only).

---

## Variants

Two dimensions: **state** (Default/selected/typing) × **type** (Bar Only / Bar with entry).

```yaml
bar:
  element: div            # contains input / buttons
  tokens:
    width: 328px
    height: 52px
    radius: 999px          # TOKEN MISSING: Figma 30px (full pill); implement as pill
    padding_default: token.space.16
    padding_compact: token.space.8   # selected/typing (icon buttons present)
    gap: token.space.8
    background: token.semantic.color.background.primary
    border: token.semantic.color.border.default    # #a2a9b8
    text: token.semantic.color.content.primary
    text_size: token.font.size.body-14 / token.font.line-height.20

icon_button:
  radius: 999px            # TOKEN MISSING: Figma 20px on ~36px control (full circle)
  padding: token.space.8
  icon: 20px               # derived
  default_trailing: plain search icon, token.semantic.color.content.primary
  mic (selected): { background: token.semantic.color.content.primary, icon: token.semantic.color.content.inverse-primary }   # NOTE: #181a1f used as a dark surface — no semantic dark-bg token; resolves via content.primary
  clear (typing): { background: token.semantic.color.background.subtle, icon: token.semantic.color.content.primary }         # #eef1f5

entry_button:              # "Bar with entry" only
  size: 48px               # TOKEN MISSING: no space.48
  radius: 999px            # Figma 24 on 48px = full circle
  background: token.semantic.color.background.primary
  border: token.semantic.color.border.default
  icon: token.semantic.color.content.primary
```

---

## States

```yaml
Default:  { leading: none,        content: placeholder input, trailing: search icon }
selected: { leading: back button, content: "Search for <hint>", trailing: mic (dark circle) }
typing:   { leading: back button, content: value + cursor,      trailing: clear (subtle chip) }

# --- ABSENT FROM FIGMA ---
focus:
  status: MISSING_IN_DESIGN
  required: { ring: token.semantic.color.focus.ring, ring_shadow: token.shadow.focus }
  note: "No focus variant. The input and each icon button need a visible focus ring (WCAG 2.4.7)."
disabled:
  status: NOT_DEFINED
```

---

## Accessibility

```html
<div role="search">
  <button aria-label="Back">…</button>
  <input type="search" aria-label="Search" />
  <button aria-label="Voice search">…</button>   <!-- or "Clear" / "Categories" -->
</div>
```

- Wrap in `role="search"` (or a `<form role="search">`). The input is `type="search"` with an accessible name.
- Every icon button needs an `aria-label` (Back, Voice search, Clear, Categories).

### Keyboard Support

| Key | Action |
|---|---|
| `Tab` | Move across back / input / trailing / entry |
| `Enter` | Submit the query |
| `Escape` | Clear (typing state) |

### Touch Targets

- Icon buttons render ~36px; ensure a ≥44×44 hit area. The entry button is already 48px.

---

## Content Guidelines

- Placeholder: short, example-led ("Search for ‘crocin’…"). Rotating hints cycle example queries.
- Keep the query text single-line with ellipsis overflow.

---

## Usage Guidelines

### Do's
- ✅ Show the back arrow only once the bar is engaged (selected/typing).
- ✅ Swap the trailing control by state: search → mic → clear.

### Don'ts
- ❌ Don't keep the mic and clear visible at once.
- ❌ Don't ship without focus rings on the input and buttons.

---

## Implementation Notes

- **HTML**: `<input type="search">` inside a `role="search"` container; icon actions are `<button>`s with labels.
- **Bar with entry**: bar is `flex: 1`, entry button is a fixed 48px sibling with 8px gap.
- **Rotating hint** is presentational here (static sample); wire to a real rotator when integrated.
- **Browser support**: modern browsers, full support.
