# SavingStrip

A green cart savings summary bar — one- or two-line, with Care Plan attribution or a Pay Day Sale badge.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Cart
- **Import:** `import { SavingStrip } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** saving strip, savings bar, total savings, cart savings, you're saving, pay day sale strip

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | `"default" \| "careplan-1line" \| "careplan" \| "careplan-chevron" \| "payday" \| "payday-chevron"` | no | `careplan` | Which saving-strip layout to render. |
| `amount` | `string` | no | `₹292` | Total saving, e.g. "₹292". |
| `careplanAmount` | `string` | no | `₹120` | Care Plan contribution, e.g. "₹120" (careplan 2-line variants). |

## Variants / sizes / states
- **Variants:** default, careplan-1line, careplan, careplan-chevron, payday, payday-chevron
- **Sizes:** 360px cart width
- **States:** 1-line vs 2-line; plain / Care Plan / Pay Day

## Usage
**Do**
- Lead with the total saving amount in success green.
- Add the chevron only when the strip is tappable.

**Don't**
- Do not use the Pay Day tag outside a Pay Day sale.
- Do not overflow the strip past two lines.

## Accessibility
- Amounts should be readable by screen readers as part of the sentence.

## Example
```tsx
import { SavingStrip } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <SavingStrip variant="careplan" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6763-3519)
