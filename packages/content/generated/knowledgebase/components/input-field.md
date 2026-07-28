# InputField

A labelled text field with a trailing action (APPLY or icon), plus 4- and 6-digit OTP inputs.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Forms
- **Import:** `import { InputField } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** input field, text field with apply button, text input with cta, otp input, 4 digit otp, 6 digit otp, coupon code field

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"Field with CTA text" \| "Field with CTA logo" \| "4 digit OTP" \| "6 digit OTP"` | no | `Field with CTA text` | Figma type variant. |
| `state` | `"default" \| "typing" \| "error" \| "success" \| "disable"` | no | `default` | Figma state variant. |
| `label` | `string` | no |  | Floating label. |
| `helperText` | `ReactNode` | no |  | Helper / error line. |
| `value` | `string` | no |  |  |
| `placeholder` | `string` | no |  |  |
| `ctaLabel` | `string` | no | `APPLY` | Trailing text CTA. |
| `ctaIcon` | `ReactNode` | no |  |  |
| `onCtaClick` | `() => void` | no |  |  |
| `digits` | `string[]` | no |  | OTP only — per-cell characters. Length is clamped to the type's cell count. |

## Variants / sizes / states
- **Variants:** Field with CTA text, Field with CTA logo, 4 digit OTP, 6 digit OTP
- **Sizes:** Single (328px wide)
- **States:** Default, Typing, Error, Success, Disable

## Usage
**Do**
- Reserve the helper line for errors so layout does not shift.
- Turn the CTA coral only once the field is engaged.

**Don't**
- Do not use for multi-line entry — use a textarea.
- Do not signal state with border colour alone.

## Accessibility
- Uses a real input with an associated label.
- Error state exposes aria-invalid and describes the helper text.
- OTP renders a labelled group of single-character inputs.

## Example
```tsx
import { InputField } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <InputField type="Field with CTA text" state="default" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6586-1340)
