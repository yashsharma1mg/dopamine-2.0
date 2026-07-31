# CouponWidget

Cart coupon widget covering the coupon lifecycle: explore, locked, applyable, applied, and the Care Plan stacks.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Cart
- **Import:** `import { CouponWidget } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** coupon, coupon widget, promo code, discount code, apply coupon, cart coupon, offer widget, explore coupons

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `state` | `"No Coupon" \| "Not Available" \| "Not Applicable" \| "Applied" \| "CarePlan Applied" \| "CarePlan Not Applicable"` | no | `Not Applicable` | Which coupon lifecycle state to render. |

## Variants / sizes / states
- **Variants:** No Coupon, Not Available, Not Applicable, Applied, CarePlan Applied, CarePlan Not Applicable
- **Sizes:** 360px cart width
- **States:** Locked / applyable / applied; Non-CP vs Care Plan user

## Usage
**Do**
- Show the unlock threshold in the subtitle when a coupon is not yet applicable.
- Use the party icon only for applied savings.

**Don't**
- Do not hide the View-all-coupons entry point.
- Do not mix Care Plan and Non-CP messaging in one row.

## Accessibility
- Apply / Applied are text actions — wire them to real buttons in product.
- Care Plan badge carries an accessible label.

## Example
```tsx
import { CouponWidget } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <CouponWidget state="Not Applicable" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6757-2345)
