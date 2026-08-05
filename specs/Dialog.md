# Dialog — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6703-6311
> **Component family:** Feedback · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "dialog"
  - "dialog box"
  - "modal"
  - "alert"
  - "confirmation dialog"
  - "popup"
  - "confirm modal"
```

## Description

Dialog is a centred modal card over a `rgba(0,0,0,0.6)` scrim, with a 40px white **close** circle
floating above its top-right. The card (`background.primary`, `radius-16`, `space-24` vertical
padding, 328px) stacks, centred: an optional **64px image** box (`radius-8`), a **heading**
(`title-16` extrabold `content.primary`), a **description** (`body-14` regular `content.secondary`,
≤ 280px), a `divider.subtle` rule, and the **actions**.

Three states:
- **cta** — no image, one Fill `Button`.
- **image-cta** — image + one Fill `Button`.
- **image-2cta** — image + a Fill `Button` and an Outline `Button`.

The buttons are the DS **Button** (Large / Primary), full-width.

### When to use
- A focused decision, confirmation, or short message that interrupts the flow.

### When NOT to use
- For long or scrollable content — use **Bottomsheet**.

## Tokens
- Scrim `rgba(0,0,0,0.6)`; card `background.primary` `radius-16`; image placeholder `#d9d9d9` `radius-8`.
- Heading `content.primary` (16/24 extrabold); description `content.secondary` (14/20). Divider `divider.subtle`.
- Actions: DS Button (Fill = coral, Outline = coral text on `stroke.subtle`).

## Accessibility
- `role="dialog"`, `aria-modal`. Actions inherit the Button's semantics; close is a labelled button.
