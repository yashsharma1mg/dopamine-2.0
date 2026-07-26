# Snackbar — Spec

> **Figma:** node 6405-1125 ("Snackbars") · **Family:** Feedback · **Status:** Review

## Description
A single-line transient message bar (328×44, rounded 8). The `type` sets the surface; content colour follows (dark text on White, white on the coloured/Default surfaces). Default+Action swaps the close ✕ for a coral action label.

## Variants / tokens
```yaml
container: { width: 328px, radius: token.radius.8, padding: token.space.12, gap: token.space.16, shadow: token.shadow.level-2 }  # shadow added for float/visibility (not in the flat Figma spec)
body:      { gap: token.space.8, leading help icon 20px, message 14/20 regular }
close:     { 20px ✕, colour: inherits surface content }
action:    { label bold 14/20, token.semantic.color.content.cta (coral) }
types:
  White:   { bg token.semantic.color.background.primary, content token.semantic.color.content.primary }
  Warning: { bg token.semantic.color.states.warning,  content content.inverse-primary }
  Success: { bg token.semantic.color.states.success,  content content.inverse-primary }
  Error:   { bg token.semantic.color.states.error,    content content.inverse-primary }
  Default: { bg token.semantic.color.content.primary, content content.inverse-primary }
```

## Accessibility
- `role="status"` (polite live region); close is a labelled button. Auto-dismiss timing is the consumer's responsibility.

## Notes
- Props: `type`, `message`, `leadingIcon`, `action` (replaces close), `onAction`, `onClose`, `dismissible`.
