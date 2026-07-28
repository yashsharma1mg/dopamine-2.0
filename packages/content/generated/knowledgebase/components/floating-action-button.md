# FloatingActionButton

A compact action control for add and added states.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Actions
- **Import:** `import { FloatingActionButton } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** floating action button, fab, add button, floating add button, quick action button

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"FAB" \| "Special button" \| "Added" \| "Add"` | no | `Add` | Figma component variant. |
| `state` | `"Default" \| "Disable" \| "Single Added"` | no | `Default` | Figma state variant. |
| `label` | `string` | no | `variant label` | Accessible or visible action label. |
| `icon` | `ReactNode` | no | `+` | Optional action icon. |

## Variants / sizes / states
- **Variants:** Add, Added, FAB, Special button
- **Sizes:** 32px action, 40px FAB, 56px labelled action
- **States:** Default, Single added, Disabled

## Usage
**Do**
- Use a concise accessible label for icon-only actions.

**Don't**
- Use icon-only actions when the action is ambiguous.

## Accessibility
- Provides an accessible name for icon-only variants.
- Uses a native button and visible focus state.

## Example
```tsx
import { FloatingActionButton } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <FloatingActionButton type="Add" state="Default" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=4023-2838&t=2b3pGoo58LPx32e2-4)
