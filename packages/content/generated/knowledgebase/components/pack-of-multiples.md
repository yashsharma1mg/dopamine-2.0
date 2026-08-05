# PackOfMultiples

A modal 'Select Quantity' picker for buying packs — each row shows the multiple, MRP, price and discount, with an optional Recommended row.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Cart
- **Import:** `import { PackOfMultiples } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** pack of multiples, select quantity packs, buy in bulk, multi pack selector, bulk pricing picker, pack size selector, quantity discount sheet

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `heading` | `string` | no | `Select Quantity` | Card heading. |
| `options` | `PackOption[]` | no | `sample packs` | Pack rows (qty, mrp, price, discount, recommended?, extra?). |
| `selectedIndex` | `number` | no | `0` | Index of the selected pack. |
| `removeButton` | `boolean` | no | `false` | Show the Remove footer. |
| `onSelect` | `(index: number) => void` | no |  | Selection callback. |
| `onRemove` | `() => void` | no |  |  |
| `onClose` | `() => void` | no |  |  |

## Variants / sizes / states
- **Variants:** selected recommendation, not selected recommendation, no recommendation
- **Sizes:** 328px width
- **States:** Recommended row (selected = coral tint, not selected = green tint); plain rows

## Usage
**Do**
- Use to sell packs/multiples with per-pack pricing.
- Mark at most one row Recommended.

**Don't**
- Do not omit the struck MRP beside the pack price.

## Accessibility
- role=radiogroup with aria-checked rows.
- Prices read in order MRP → price → discount.

## Example
```tsx
import { PackOfMultiples } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <PackOfMultiples />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6703-6807)
