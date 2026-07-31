# AmountWidget

Cart billing widget: a collapsed to-be-paid summary or an expanded delivery address + full bill breakdown.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Cart
- **Import:** `import { AmountWidget } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** amount widget, bill summary, cart total, to be paid, payment breakdown, billing widget, order total

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `state` | `"Collapsed" \| "Expanded"` | no | `Expanded` | Collapsed summary or expanded bill breakdown. |

## Variants / sizes / states
- **Variants:** Collapsed, Expanded
- **Sizes:** 360px cart width
- **States:** Collapsed summary / expanded breakdown

## Usage
**Do**
- Show the savings pill next to the payable amount when collapsed.
- Mark discounts and NeuCoins in success green.

**Don't**
- Do not hide the total amount.
- Do not omit the delivery fee strike-through when it is free.

## Accessibility
- Bill rows are label/value pairs; keep reading order label→value.

## Example
```tsx
import { AmountWidget } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <AmountWidget state="Expanded" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6763-4065)
