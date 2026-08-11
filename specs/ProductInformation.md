# ProductInformation — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6933-2425
> **Component family:** Display · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "product information"
  - "pdp accordion"
  - "collapsible sections"
  - "dosage key usage faq accordion"
  - "expandable content sections"
  - "see more see less"
```

## Description
ProductInformation is the PDP accordion: a stack of collapsible sections separated by 8px
`cool-neutral.95` bands. Each header is a button (title `title-16` extrabold + a **chevron-right
that rotates 90° to point down when expanded**); clicking toggles the body. Long sections carry a
`readMore` flag that clamps the body with a **See more / See less** toggle. Sections are
data-driven (`title`, `content`, `defaultOpen?`, `readMore?`).

### When to use / not
- For long PDP content split into named sections (Highlights, Key Usage, Dosage, FAQ…).

## Tokens
- Title `content.primary`; body `content.primary`/`content.secondary`; bands `cool-neutral.95`.
- **Chevron:** a 20px frame with a ~14px glyph; rotates on expand — do not oversize it.

## Accessibility
- Headers are buttons with `aria-expanded`; the chevron rotation mirrors the open state.
