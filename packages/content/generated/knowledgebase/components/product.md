# Product

PDP product hero: an image carousel, then title / brand / composition, and an optional green alternative pill.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Display
- **Import:** `import { Product } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** product hero, pdp hero, product card, product image carousel, product title brand composition, generic alternative

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `numberOfImages` | `1 \| 2 \| 3` | no |  | How many placeholder image slots to render when `images` is not provided (Figma 1/2/3). |
| `images` | `ReactNode[]` | no | `2 placeholders` | Explicit image slots (overrides `numberOfImages`). Rendered in a swipeable carousel. |
| `brand` | `string` | no |  | Manufacturer. |
| `composition` | `string` | no |  |  |
| `compositionValue` | `string` | no | `Telmisartan (40mg)` | Underlined composition. |
| `alternative` | `boolean` | no | `true` | Show the green "generic alternative" CTA pill. |
| `alternativeText` | `ReactNode` | no |  |  |
| `onAlternative` | `() => void` | no |  |  |
| `title` | `string` | no | `Telma 40 Tablet` | Product name. |

## Variants / sizes / states
- **Variants:** with alternative pill, without
- **Sizes:** 360px width
- **States:** alternative on/off

## Usage
**Do**
- Lead with the product image carousel and title.
- Use the alternative pill to surface a cheaper generic.

**Don't**
- Do not omit the composition on a medicine PDP.

## Accessibility
- Carousel scrolls horizontally.
- The alternative pill is a labelled button.

## Example
```tsx
import { Product } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Product />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6825-4912)
