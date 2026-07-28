# Radio

A single-select control; selected shows a coral donut or a checkmark. Default and Small.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Forms
- **Import:** `import { Radio } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** radio button, radio group, single select option, choose one option

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `checked` | `boolean` | no | `false` | Selected state (controlled). |
| `indicator` | `"dot" \| "check"` | no | `dot` | Selected indicator: a filled dot or a checkmark. |
| `size` | `"Default" \| "Small"` | no | `Default` | Figma size variant. |
| `state` | `"Default" \| "Selected" \| "Disable" \| "Disable+select" \| "Select with icon" \| "Disable+select with icon"` | no |  | Convenience for galleries — maps a single Figma state to checked/disabled/indicator. Overrides those. |
| `label` | `string` | no |  |  |
| `disabled` | `boolean` | no | `false` | Disables the radio. |

## Variants / sizes / states
- **Variants:** Default, Selected, Disable, Disable+select, Select with icon, Disable+select with icon
- **Sizes:** Default (24px), Small (20px)
- **States:** Default, Selected, Disable, Disable+select, Select with icon, Disable+select with icon

## Usage
**Do**
- Use inside a group where exactly one option is selectable.
- Keep disabled-selected grey.

**Don't**
- Do not use a single radio for a yes/no — use Checkbox or Toggle.
- Do not mix dot and check indicators in one group.

## Accessibility
- Renders role=radio; single-select lives in the consuming radiogroup.
- Arrow keys move selection within the group.

## Example
```tsx
import { Radio } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Radio indicator="dot" size="Default" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1573)
