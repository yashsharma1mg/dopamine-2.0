# Dialog

A centred modal card over a scrim with a floating close — heading, description, and one or two CTAs.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Feedback
- **Import:** `import { Dialog } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** dialog, dialog box, modal, alert, confirmation dialog, popup, confirm modal

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `"cta" \| "image-cta" \| "image-2cta"` | no | `image-2cta` | Which dialog layout to render. |
| `heading` | `string` | no | `Heading` | Dialog title. |
| `description` | `ReactNode` | no |  | Supporting copy. |
| `image` | `ReactNode` | no |  | Optional 64px media slot (image variants). Defaults to a placeholder box. |
| `primaryLabel` | `string` | no | `Button` | Fill button label. |
| `secondaryLabel` | `string` | no | `Button` | Outline button label (2-CTA variant). |
| `onClose` | `() => void` | no |  |  |
| `onPrimary` | `() => void` | no |  |  |
| `onSecondary` | `() => void` | no |  |  |

## Variants / sizes / states
- **Variants:** cta, image-cta, image-2cta
- **Sizes:** 328px width
- **States:** 1 CTA (Fill) or 2 CTA (Fill + Outline); with or without image

## Usage
**Do**
- Use for a focused decision or confirmation.
- Lead the primary action with a Fill Button.

**Don't**
- Do not use for long or scrollable content — use Bottomsheet.

## Accessibility
- role=dialog, aria-modal.
- Actions are the DS Button component.

## Example
```tsx
import { Dialog } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Dialog variant="image-2cta" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6703-6311)
