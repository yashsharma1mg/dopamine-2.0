# Conventions for generating Dopamine2.0 UI

Follow these when composing UI so generated code matches the design system.

## Always
- **Use Dopamine2.0 components** for anything they cover (buttons, inputs, tabs, snackbars,
  headers, chips, steppers…). Look it up with `search_components` / `get_component_docs` before
  hand-rolling markup.
- Import from the barrel: `import { X } from "@dopamine2.0/ui"`.
- Import `@dopamine2.0/ui/styles.css` once at the app root.
- Drive colour/spacing/radius from tokens (see `theming-tokens`), never hardcoded values.
- Match each component's prop contract exactly — props and their literal union values come from
  `get_component_docs` (they are extracted from the real TypeScript types).

## Never
- Don't recreate a component with raw `<div>`/`<button>` when a DS component exists.
- Don't invent props or values outside a prop's documented union.
- Don't restyle DS components with ad-hoc CSS overrides; use their variants/states.
- Don't add an icon library — icons ship inside the components.

## Component model
- These are **mobile-app** components (no focus-ring styling expected).
- Selection controls (Checkbox, Radio, Toggle) are uncontrolled-capable: they self-toggle on
  click when no `checked` is passed, and still fire their change callback.
- Composition (multiple components into a screen/pattern) is documented under **patterns** —
  use `list_patterns` / `get_pattern_docs`.
