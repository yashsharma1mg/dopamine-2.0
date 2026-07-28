# Button

Triggers an immediate action or confirms a decision.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Actions
- **Import:** `import { Button } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** button, primary button, cta button, submit button, action button

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"Fill" \| "Outline" \| "Ghost"` | no | `Fill` | Figma visual container treatment. |
| `htmlType` | `"button" \| "reset" \| "submit"` | no |  |  |
| `size` | `"Medium" \| "Large"` | no | `Large` | Figma size variant. |
| `state` | `"Primary" \| "Secondary" \| "Inverse" \| "Disabled"` | no | `Primary` | Figma state variant. |
| `loading` | `boolean` | no | `false` | Shows progress and prevents activation. |
| `leadingIcon` | `ReactNode` | no |  |  |
| `trailingIcon` | `ReactNode` | no |  |  |
| `style` | `Text Only \| Icon + Text \| Text + Icon \| Underline` | no | `Text Only` | Figma content construct. |

## Variants / sizes / states
- **Variants:** Fill, Outline, Ghost, Text with icon, Underline
- **Sizes:** Medium, Large
- **States:** Primary, Secondary, Inverse, Disabled, Loading

## Usage
**Do**
- Use one primary action per decision area.
- Use verbs that describe the action’s outcome.
- Keep destructive actions visually and spatially distinct.

**Don't**
- Use a button for navigation when a link is semantically correct.
- Use disabled styling to hide permission or validation problems.
- Place several primary buttons next to each other.

## Accessibility
- Uses the native button element and inherits its keyboard behavior.
- Uses the Figma medium and large size contracts.
- Shows a token-backed focus ring only for keyboard focus.
- Loading sets aria-busy and prevents duplicate activation.

## Example
```tsx
import { Button } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Button type="Fill" size="Large" state="Primary">Label</Button>;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=4021-1652&t=2b3pGoo58LPx32e2-4)
