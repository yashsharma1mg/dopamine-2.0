# Event Banner — Build Cache

**Built:** 2026-07-26
**Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6453-598 (frame "Event Promotion Section")

## Variant Properties

| Property | Values |
|----------|--------|
| items | none, 1, 2, 3, 4, >4 |
| bottom message | none, 1, 2 |

18 variants (6 × 3). Node ids: rows items=none..>4, cols bottom=2/1/none → `6453:256/270/272`, `294/312/319`, `344/365/375`, `403/427/440`, `471/498/514`, `548/578/597`.

## Spec

`specs/EventBanner.md`

## Token Police Audit

**Resolved: all colour references map cleanly. 1 literal spacing. 2 role notes.**

| Figma variable | Value | Repo token |
|---|---|---|
| Color/Icons/Tertiary (hero bg) | #626a7a | `semantic.color.content.tertiary` |
| Color/Icons/Secondary (panel bg) | #414752 | `semantic.color.content.secondary` |
| Color/Background/Subtle (thumbnails) | #eef1f5 | `semantic.color.background.subtle` |
| Color/Background/Moderate (icon chip) | #dde2eb | `semantic.color.background.moderate` |
| Color/Content Inverse/Primary (text/dots/chevron) | #ffffff | `semantic.color.content.inverse-primary` |
| Color/Content/Primary | #181a1f | `semantic.color.content.primary` (Figma text token; overridden to white in-context) |

Spacing/type resolve: `space.12` (panel padding), `space.8` (gaps), `space.4` (dots gap), `radius.16` (card), `radius.8` (thumbs/chip), `font.size.body-12`, `line-height.16`, `weight.bold`/`regular`.

### ⚠️ ROLE NOTES

- **Hero (`#626a7a`) and panel (`#414752`)** are Figma **Icons/Tertiary** and **Icons/Secondary** used as **background surfaces**. They resolve by value via `content.tertiary` / `content.secondary`, but that's a content/icon token used as a surface. These greys are image/overlay placeholders; a neutral **surface scale** (or `background.inverse`) would be the cleaner home. Same dark-surface theme as Search Bar mic / Action Bar badge.

### 🚨 TOKEN MISSING (minor)

- **Message row gap 6px** — no `space.6` (ramp: 4, 8). Implemented as literal 6px. Non-blocking; add `space.6` if it recurs.

### 🔧 STATES

- The 18 are content configs, not interaction states. No hover/focus in the set. Chevron is the action (`onAction`).

## Correction (post-review)

Re-checked against per-node Figma renders (656px). Two fixes applied:
- **Chevron** is a **white circle with a dark chevron** (bg `content.inverse-primary`, glyph `content.primary`, 24px) — was a bare white chevron.
- **Dots** are **centred** under the message — were left-aligned.
Full 6×3 grid re-diffed against Figma after the fix — matches. Minor remaining: items=none/bottom=none is 281px in Figma vs the shared 248px min-height here (hero a touch shorter); non-blocking.

## Notes

- `bottomMessage`: **2** = message + pagination dots · **1** = message only · **none** = no message row. Verified via nodes 256 (dots) vs 270 (no dots) vs 319 (no message).
- Items strip: 1–4 stretch (`flex:1`); ">4" = 5 fixed 64px thumbnails, overflow-clipped by the card (matches Figma ">4").
- Panel appears only when items > 0 OR message present; items=none + bottom=none → plain hero card.
- Hero + thumbnails are placeholders (image icon on grey); accept real image props on integration.
- Verified render vs Figma via headless screenshot — full 6×3 grid matches.
- Implemented: `EventBanner.tsx`, `EventBanner.stories.tsx`, CSS, export. Under Components/Event Banner.

## Design decision (2026-07-26)

- Hero/panel surface fallbacks (`content.tertiary`/`content.secondary` as bg) → **accept base usage**. Closed.

## Fix — pixel-match (2026-07-27)

Per-variant heights now match Figma exactly: **248px** (with message) · **211px** (items only) · **281px** (empty hero). Full 6×3 grid re-diffed vs Figma — matches.
