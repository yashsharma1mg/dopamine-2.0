# Offer

PDP offers section: an optional promo banner and a 'Save more with additional offers' list, closed by a See-all action.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Display
- **Import:** `import { Offer } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** offers section, additional offers, bank offers, cashback offers list, pdp offers, see all offers

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `banner` | `ReactNode` | no |  | Optional promo banner (a 328×164 media slot). |
| `heading` | `string` | no |  |  |
| `offers` | `OfferRow[]` | no | `3 sample offers` | Offer rows (icon, title, subtitle). |
| `seeAllLabel` | `string` | no |  |  |
| `onSeeAll` | `() => void` | no |  | See-all callback. |

## Variants / sizes / states
- **Variants:** with banner, list only
- **Sizes:** 360px width
- **States:** banner optional

## Usage
**Do**
- Use to surface payment/cashback offers on the PDP.

**Don't**
- Do not bury the primary price below the offers.

## Accessibility
- Offer rows and See-all are buttons.

## Example
```tsx
import { Offer } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Offer />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6825-5309)
