# ProductLabel

PDP feature strip: a row of trust/feature badges (icon + bold title / secondary description), separated by dividers.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Display
- **Import:** `import { ProductLabel } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** product label, feature strip, trust badges, genuine prescription badge, pdp feature row, highlight strip

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | `ProductLabelItem[]` | no | `Genuine / Prescription / popularity` | Feature badges (icon, title, description, underline?). |

## Variants / sizes / states
- **Variants:** configurable items
- **Sizes:** 360px width
- **States:** optional dotted underline per item

## Usage
**Do**
- Use for trust/feature signals (Genuine, Prescription, popularity).

**Don't**
- Do not overload with more than 3–4 items.

## Accessibility
- Icons are decorative; titles carry meaning.

## Example
```tsx
import { ProductLabel } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <ProductLabel />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6825-4914)
