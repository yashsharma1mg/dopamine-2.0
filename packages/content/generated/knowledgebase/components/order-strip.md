# OrderStrip

Cart order strip: pharmacy delivery sections with SKU rows (Rx / non-Rx), compact rows, and diagnostics/labs cards.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Cart
- **Import:** `import { OrderStrip } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** order strip, cart item row, sku row, product row, pharmacy order, lab test card, diagnostics card, delivery strip

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"Pharma Rx" \| "Pharma non Rx" \| "compact Rx" \| "compact non Rx" \| "Labs Rapid Report" \| "Labs Default"` | no | `Pharma Rx` | Which order-strip variant to render. |

## Variants / sizes / states
- **Variants:** Pharma Rx, Pharma non Rx, compact Rx, compact non Rx, Labs Rapid Report, Labs Default
- **Sizes:** 360px (pharma/labs), 328px (compact)
- **States:** Rx vs non-Rx; rapid-report vs default labs

## Usage
**Do**
- Show the Rx tab only on prescription products.
- Group products under their delivery-time header.

**Don't**
- Do not omit the strike-through MRP next to the discounted price.

## Accessibility
- Quantity/patient steppers must be operable controls in product.
- Product images are decorative; the name carries meaning.

## Example
```tsx
import { OrderStrip } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <OrderStrip type="Pharma Rx" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6765-5494)
