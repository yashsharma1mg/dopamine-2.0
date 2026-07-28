# Checkbox

A square on/off control with a checkmark, for multi-select or single opt-ins. Normal and Small.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Forms
- **Import:** `import { Checkbox } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** checkbox, check box, accept terms checkbox, multi select option, tick box

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `checked` | `boolean` | no | `false` | Checked state (controlled). |
| `onCheckedChange` | `(checked: boolean) => void` | no |  |  |
| `size` | `"Normal" \| "Small"` | no | `Normal` | Figma size variant. |
| `state` | `"Default" \| "Selected" \| "Disable" \| "Disabled selected"` | no | `Default` | Convenience for galleries — sets checked/disabled from a single Figma state. Overrides checked/disabled. |
| `label` | `string` | no |  | Accessible name (a bare box has no visible label). |
| `disabled` | `boolean` | no | `false` | Disables the box. |

## Variants / sizes / states
- **Variants:** Default, Selected, Disable, Disabled selected
- **Sizes:** Normal (24px), Small (20px)
- **States:** Default, Selected, Disable, Disabled selected

## Usage
**Do**
- Use for independent multi-select; each box toggles on its own.
- Keep disabled+selected grey.

**Don't**
- Do not use where exactly one option must be chosen — that is Radio.

## Accessibility
- Renders role=checkbox with aria-checked.
- Needs an accessible name.
- Space toggles the box.

## Example
```tsx
import { Checkbox } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Checkbox size="Normal" state="Default" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1536)
