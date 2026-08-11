# AddToCartPill

PDP add-to-cart bar: price (effective / struck MRP / discount) and an ADD button; default or compact sticky.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Cart
- **Import:** `import { AddToCartPill } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** add to cart, add to cart pill, pdp price bar, buy bar, sticky add to cart, price and add button

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `state` | `"default" \| "sticky"` | no | `default` | Layout variant. |
| `price` | `string` | no | `₹371` | Effective price, e.g. "₹371". |
| `mrp` | `string` | no | `₹100` | Struck MRP, e.g. "₹100". |
| `discount` | `string` | no | `7% off` | Discount, e.g. "7% off". |
| `unit` | `string` | no |  | Pack unit line, e.g. "30 tablets" (default state only). |
| `taxNote` | `string` | no |  | Tax note, e.g. "(inclusive of all taxes)" (default state only). |
| `addLabel` | `string` | no |  |  |
| `onAdd` | `() => void` | no |  | ADD callback. |

## Variants / sizes / states
- **Variants:** default, sticky
- **Sizes:** 360px width
- **States:** default (with pack/tax note) vs sticky (compact)

## Usage
**Do**
- Use `sticky` for the pinned bottom bar.
- Keep the struck MRP next to the price.

**Don't**
- Do not hide the effective price.

## Accessibility
- ADD is the DS Button.

## Example
```tsx
import { AddToCartPill } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <AddToCartPill state="default" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6825-6198)
