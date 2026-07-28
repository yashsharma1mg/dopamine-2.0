# Toggle

A binary on/off switch for an immediate, self-applying setting.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Forms
- **Import:** `import { Toggle } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** toggle, switch, on off toggle, settings switch, enable disable toggle

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `checked` | `boolean` | no | `false` | On/off state (controlled). |
| `onCheckedChange` | `(checked: boolean) => void` | no |  | Change handler. |
| `state` | `"disabled" \| "Default" \| "selected" \| "disabled+selected"` | no | `Default` | Convenience for galleries — sets checked/disabled from a single Figma state. Overrides checked/disabled. |
| `label` | `string` | no |  | Accessible name (required — a bare switch has no visible label). |
| `disabled` | `boolean` | no | `false` | Disables the switch. |

## Variants / sizes / states
- **Variants:** Default, Selected, Disabled, Disabled+selected
- **Sizes:** Single (40 × 24px)
- **States:** Default, Selected, Disabled, Disabled selected

## Usage
**Do**
- Apply the change immediately on toggle.
- Pair with a label describing the setting.

**Don't**
- Do not use where a Save/Cancel step is expected.
- Do not rely on colour alone — thumb position also encodes state.

## Accessibility
- Renders role=switch with aria-checked.
- Needs an accessible name via label.
- Disabled sets the native disabled attribute.

## Example
```tsx
import { Toggle } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Toggle state="Default" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6356-403)
