# SuggestionChip

A compact choice, filter, or timestamp control with a clear selected and disabled state.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Selection
- **Import:** `import { SuggestionChip } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** suggestion chip, chip, filter chip, quick reply chip, tag chip

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `counter` | `number` | no | `1` | Standard-chip counter value. |
| `date` | `string` | no |  |  |
| `day` | `string` | no |  |  |
| `month` | `string` | no |  |  |
| `showLeadingIcon` | `boolean` | no | `true` | Shows the Figma left-arrow asset. |
| `showTrailingCounter` | `boolean` | no | `true` | Shows the 16px counter on standard chips. |
| `size` | `"Default" \| "small" \| "Timestamp"` | no | `Default` | Figma size variant. |
| `state` | `"Default" \| "Primary" \| "disable" \| "disable+select" \| "default" \| "selected"` | no | `Primary` | Figma state variant. |

## Variants / sizes / states
- **Variants:** Primary, Default, disable, disable+select, default timestamp, selected timestamp
- **Sizes:** Default (108 × 32px), small (99 × 28px), Timestamp (56 × 76px)
- **States:** Primary, Default, Disabled, Disabled selected, Timestamp selected

## Usage
**Do**
- Use a concise label that names a category, filter, or option.
- Use timestamp chips only for date selection.

**Don't**
- Do not use a suggestion chip for a primary page action.
- Do not use the selected treatment when the option cannot be changed.

## Accessibility
- Uses a native button with a visible keyboard focus ring.
- Disabled variants set the native disabled state.
- Timestamp chips expose their selection through aria-pressed.

## Example
```tsx
import { SuggestionChip } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <SuggestionChip size="Default" state="Primary">Label</SuggestionChip>;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6353-389&t=2b3pGoo58LPx32e2-4)
