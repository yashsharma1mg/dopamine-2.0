# Tooltip

A dark contextual bubble — lead icon, optional NEW pill, message, and close — with the tail on any of four corners.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Feedback
- **Import:** `import { Tooltip } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** tooltip, hint bubble, coach mark, contextual hint, popover hint, callout, onboarding tooltip, info bubble

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `"Top left" \| "Top right" \| "Bottom left" \| "Bottom right"` | no | `Top left` | Tail placement — which edge/side the arrow sits on. |
| `leadIcon` | `boolean` | no | `true` | Leading circular icon. |
| `newPill` | `boolean` | no | `true` | Show the green NEW pill. |
| `closeIcon` | `boolean` | no | `true` | Show the trailing close (✕). |
| `onClose` | `() => void` | no |  |  |

## Variants / sizes / states
- **Variants:** Top left, Top right, Bottom left, Bottom right
- **Sizes:** Bubble (max 272px)
- **States:** Tail placement; lead/pill/close toggles

## Usage
**Do**
- Point the tail at the element the tooltip explains.
- Keep the message to a single short line.
- Use the corner variant that keeps the bubble on-screen.

**Don't**
- Do not put essential, always-needed information in a tooltip.
- Do not stack multiple tooltips.

## Accessibility
- Renders role=tooltip; the close is a labelled button.
- Trigger association (aria-describedby) is the consumer's responsibility.

## Example
```tsx
import { Tooltip } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Tooltip variant="Top left" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6621-3120)
