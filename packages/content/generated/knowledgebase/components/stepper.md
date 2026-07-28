# Stepper

Adds, reduces, and displays an item quantity.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Actions
- **Import:** `import { Stepper } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** stepper, quantity stepper, quantity selector, add to cart quantity, increment decrement control

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `quantity` | `number` | yes |  | Current item quantity. |
| `onQuantityChange` | `(quantity: number) => void` | yes |  | Receives quantity changes. |
| `min` | `number` | no |  |  |
| `max` | `number` | no |  |  |
| `outOfStock` | `boolean` | no | `false` | Disables quantity actions. |
| `size` | `"Medium" \| "Large"` | no |  |  |
| `state` | `"Add" \| "Added- Text" \| "Added- Number"` | no | `derived from quantity` | Figma state variant. |
| `type` | `"Filled" \| "Outline"` | no | `Filled` | Figma visual variant. |
| `addIcon` | `ReactNode` | no |  |  |
| `addedTextIcon` | `ReactNode` | no |  |  |
| `disabledAddIcon` | `ReactNode` | no |  |  |
| `disabledAddedTextIcon` | `ReactNode` | no |  |  |
| `decrementIcon` | `ReactNode` | no |  |  |
| `incrementIcon` | `ReactNode` | no |  |  |
| `helperText` | `ReactNode` | no |  |  |

## Variants / sizes / states
- **Variants:** Filled, Outline
- **Sizes:** Medium, Large
- **States:** Add, Added number, Out of stock

## Usage
**Do**
- Use for a bounded item quantity.

**Don't**
- Use for an unbounded numeric input.

## Accessibility
- Uses labelled native buttons.
- Announces quantity changes through a live output.

## Example
```tsx
import { Stepper } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Stepper quantity={1} state="derived from quantity" type="Filled" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=4023-1475&t=2b3pGoo58LPx32e2-4)
