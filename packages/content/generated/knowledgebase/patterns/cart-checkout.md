# Pattern: Cart Checkout

The 1mg cart / checkout screen, composed entirely from Dopamine2.0 components. Use it as the
reference layout for a cart review step: a sticky header, a scrollable stack of order + savings +
upsell + coupon + bill sections, and a sticky primary CTA.

This is a **layout recipe** — it wires existing components together and lets each render its
built-in content. To show real cart data, thread it through the components' own props
(`PageHeader`, `SavingStrip` and `Button` already take content today; the order/coupon/bill/careplan
widgets currently render fixed sample content).

## Components used (top → bottom)

| Slot | Component | Config |
|---|---|---|
| Sticky header | `PageHeader` | `usage="Cart"` |
| Order savings | `SavingStrip` | `variant="default"` |
| Pharmacy order | `OrderStrip` | `type="Pharma Rx"` |
| Membership upsell | `CarePlanCard` | `type="Added"` — inset 16px on each side |
| Coupon | `CouponWidget` | `state="Applied"` — bracketed by two 8px `--base-color-cool-neutral-95` divider bands |
| Bill summary | `AmountWidget` | `state="Expanded"` |
| Sticky CTA | `ActionBar` + `Button` | full-width `Fill` / `Primary` / `Large`, "Continue to select address" |

## Recipe

```tsx
import "@dopamine2.0/ui/styles.css";
import {
  PageHeader, SavingStrip, OrderStrip, CarePlanCard,
  CouponWidget, AmountWidget, ActionBar, Button
} from "@dopamine2.0/ui";

export function CartCheckout() {
  // 360×780 phone frame (a "basic mobile phone" height). In Storybook the story
  // uses layout:"fullscreen" + a `phone` viewport global so the canvas is a device.
  const shell: React.CSSProperties = {
    width: 360, height: 780, margin: "0 auto", boxSizing: "border-box",
    display: "flex", flexDirection: "column", overflow: "hidden",
    background: "var(--semantic-color-background-primary)",
    border: "1px solid var(--semantic-color-stroke-subtle)", borderRadius: 20
  };
  const sticky: React.CSSProperties = {
    position: "sticky", zIndex: 1, flex: "0 0 auto",
    background: "var(--semantic-color-background-primary)"
  };
  const body: React.CSSProperties = {
    flex: "1 1 auto", overflowY: "auto", display: "flex", flexDirection: "column",
    gap: "var(--space-16)", paddingBottom: "var(--space-16)"
  };
  const dividerBand: React.CSSProperties = { height: 8, background: "var(--base-color-cool-neutral-95)" };

  return (
    <div style={shell}>
      <div style={{ ...sticky, top: 0 }}>
        <PageHeader usage="Cart" locationName="Office" locationDetail="3rd floor, Motorola building, Gurugram" />
      </div>

      <div style={body}>
        <SavingStrip variant="default" amount="₹292" />
        <OrderStrip type="Pharma Rx" />
        <div style={{ padding: "0 var(--space-16)" }}>
          <CarePlanCard type="Added" />
        </div>
        <div>
          <div style={dividerBand} />
          <CouponWidget state="Applied" />
          <div style={dividerBand} />
        </div>
        <AmountWidget state="Expanded" />
      </div>

      <div style={{ ...sticky, bottom: 0 }}>
        <ActionBar>
          <Button type="Fill" state="Primary" size="Large">Continue to select address</Button>
        </ActionBar>
      </div>
    </div>
  );
}
```

## Do / Don't

- **Do** compose the components as-is and only choose each one's `variant`/`state`/`type`.
- **Do** keep the 16px section rhythm, the two 8px divider bands around the coupon, and the
  sticky header + sticky action bar.
- **Don't** rebuild any section by hand or hard-code colours — every component already carries the
  design tokens (`--semantic-color-*`, `--base-color-*`, `--space-*`).
- **Don't** put essential actions off-screen; the primary CTA stays pinned in the `ActionBar`.
