# Navigation — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6466-4967 (frame "navigation")
> **Component family:** Navigation
> **Status:** Review

> **Token convention:** colours are `token.semantic.color.*`; a few values only exist as `base.color.*` (flagged). `space`/`radius`/`font` are top-level.

---

## Prompt Match

```yaml
prompts:
  - "navigation header"
  - "top nav bar"
  - "app header with tabs"
  - "location search nav"
  - "category tab strip"
```

---

## Description

Navigation is the composite top header for a mobile screen: a location pill with profile + cart, a horizontal category tab strip with an active-underline, and a search row whose trailing action changes by context (upload prescription, categories, or find-tests).

### When to use

- The persistent top-of-screen navigation for a primary app surface.

### When NOT to use

- A simple page title bar — use Page Header.
- A standalone search — use Search Bar.

---

## Anatomy

```
┌──────────────────────────────────────────────┐
│ ⟨▲ Office  3rd floor, Motorola… ⌄⟩  (👤) (🛍3) │  ← location pill + profile + cart(badge)
│ [▢]     [▢]      [▢]     [▢]      [▢]          │  ← tab chips
│ For you│Pharmacy  Labs   Consults  Insurance   │  ← labels (active = bold + underline)
│ ▬▬▬▬                                          │
│ (🔍 Search ‘crocin’… )      [ trailing CTA ]  │  ← search + context action
└──────────────────────────────────────────────┘
```

**Key elements:**
- **Location pill**: coral navigation icon + bold name + muted detail + chevron (`sunrise-glow` tinted pill).
- **Profile**: 40px avatar (default person, or the maroon **CP** Care-Plan avatar with golden border).
- **Cart**: 40px bag button with a coral count badge.
- **Tab strip**: grey chip + label per tab; the active tab is bold with a dark 2px underline. A divider follows the first ("For you") tab. Scrolls horizontally.
- **Search row**: search pill (flex) + a context CTA.

---

## Variants

One dimension: **type** (5). Each sets the active tab, profile variant, and trailing CTA.

```yaml
labs:               { active: Labs,     profile: default, cta: find-best-tests }
pharmacy:           { active: Pharmacy, profile: default, cta: categories }
for-you-no-scroll:  { active: For you,  profile: default, cta: upload }
CP-profile-icon:    { active: For you,  profile: cp,       cta: upload }
for-you-scroll:     { active: For you,  profile: default, cta: upload, tabs: scroll }
```

### Tokens

```yaml
container: { width: 360px, background: token.semantic.color.background.primary, shadow: token.shadow.level-2 }
location_pill:
  background: base.color.sunrise-glow.99   # TOKEN MISSING: no semantic accent-subtle surface
  border: base.color.sunrise-glow.97       # TOKEN MISSING
  radius: 999px                            # Figma 30 (pill)
  icon: token.semantic.color.content.cta
  name: token.font.weight.bold
  detail: token.semantic.color.content.secondary
avatar_cart: { border: token.semantic.color.border.subtle, radius: 999px }   # Figma 20
avatar_cp:   { border: base.color.golden.50, fill: care-plan gradient }       # gradient hardcoded (brand.care-plan family)
badge:       { background: token.semantic.color.branding.1mg, text: token.semantic.color.content.inverse-primary, radius: token.radius.8 }
tab_chip:    { background: base.color.cool-neutral.97, radius: token.radius.8 }   # TOKEN MISSING: background scale skips 97
tab_active:  { label: token.font.weight.bold, underline: token.semantic.color.content.primary, chip: token.semantic.color.background.subtle }
tab_label:   { colour: token.semantic.color.content.primary, size: token.font.size.body-12, line: token.font.line-height.16 }
divider:     token.semantic.color.border.subtle
search:      { background: token.semantic.color.background.primary, border: token.semantic.color.border.subtle, radius: 999px, icon: token.semantic.color.content.cta }
cta_upload:  { background: token.semantic.color.background.subtle, icon_chip: token.semantic.color.content.cta, label: Upload (tag-11) / Prescription (body-12 bold) }
cta_categories: { background: token.semantic.color.content.primary, text: token.semantic.color.content.inverse-primary }
cta_find:    { background: base.color.precision-blue.50, text: token.semantic.color.content.inverse-primary }   # TOKEN MISSING: no semantic blue
```

---

## States

The 5 types are configurations. Per-tab: **active** (bold + underline) vs inactive. No hover/focus variants in the set (keyboard focus + arrow-key tab nav should be added — see Token Police).

---

## Accessibility

- Tab strip: `role="tablist"` of `role="tab"` with `aria-selected`; support arrow-key navigation and roving tabindex.
- Location, profile, cart, search, and CTA are all `<button>`s with labels; cart announces the count.
- Provide a visible focus ring on every control (missing in the design).

---

## Content Guidelines

- Keep the location detail short (it ellipsises). Tab labels are single words. Search shows a rotating hint.

---

## Usage Guidelines

### Do's
- ✅ Match the trailing CTA to the active surface (Labs → find tests, Pharmacy → categories, For you → upload).
- ✅ Keep exactly one active tab.

### Don'ts
- ❌ Don't show more than one primary trailing CTA.
- ❌ Don't recolour the CP avatar — it signals a Care-Plan member.

---

## Implementation Notes

- **Composite**: three rows in one card; tab strip is `overflow-x: auto`. Icons are inline SVG placeholders; wire real assets + the rotating search hint on integration.
- **Recurring token gap**: location pill (`sunrise-glow`), tab chip (`cool-neutral.97`), and find-tests (`precision-blue`) fall back to `base.*` — they need semantic accent/surface tokens.
- **Browser support**: modern browsers, full support.
