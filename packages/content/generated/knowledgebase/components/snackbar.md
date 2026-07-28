# Snackbar

A single-line transient message bar: White, Warning, Success, Error, Default, and Default + Action.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Feedback
- **Import:** `import { Snackbar } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** snackbar, toast, notification bar, inline alert, success message, error toast, undo snackbar

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"White" \| "Warning" \| "Success" \| "Error" \| "Default"` | no | `Default` | Surface / intent. |
| `message` | `ReactNode` | yes |  | The message. |
| `leadingIcon` | `boolean` | no |  | Leading help/info icon. |
| `action` | `string` | no |  | Trailing action label (e.g. "Undo") — replaces the close button when set. |
| `onAction` | `() => void` | no |  |  |
| `onClose` | `() => void` | no |  |  |
| `dismissible` | `boolean` | no | `true` | Show the trailing close (✕). Ignored when `action` is set. |

## Variants / sizes / states
- **Variants:** White, Warning, Success, Error, Default, Default + Action
- **Sizes:** 328px wide
- **States:** Per type surface; close or action trailing

## Usage
**Do**
- Use the type that matches the message intent.
- Use Default + Action for an undoable action.

**Don't**
- Do not omit the dismiss on promo/info snackbars.
- Do not stack multiple snackbars.

## Accessibility
- Renders role=status (polite live region); close is a labelled button.
- Auto-dismiss timing is the consumer's responsibility.

## Example
```tsx
import { Snackbar } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Snackbar message="…" type="Default" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6405-1125)
