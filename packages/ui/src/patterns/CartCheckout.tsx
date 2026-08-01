import { type CSSProperties } from "react";
import {
  PageHeader,
  SavingStrip,
  OrderStrip,
  CarePlanCard,
  CouponWidget,
  AmountWidget,
  ActionBar,
  Button
} from "../index.js";

/**
 * Pattern: Cart Checkout.
 *
 * Composes the cart components into the 1mg checkout screen (Figma 6773-8356):
 * a sticky Cart header, the order savings strip, the pharmacy order strip, a Care
 * Plan upsell, a coupon (bracketed by section dividers), the bill summary, and a
 * sticky action bar. Everything runs on each component's built-in sample content —
 * this is a layout recipe, not a data-driven page.
 */

const shell: CSSProperties = {
  background: "var(--semantic-color-background-primary)",
  border: "1px solid var(--semantic-color-stroke-subtle)",
  borderRadius: 20,
  display: "flex",
  flexDirection: "column",
  height: 760,
  maxHeight: "80vh",
  overflow: "hidden",
  width: 360
};
const sticky: CSSProperties = { background: "var(--semantic-color-background-primary)", flex: "0 0 auto", position: "sticky", zIndex: 1 };
const body: CSSProperties = { display: "flex", flexDirection: "column", flex: "1 1 auto", gap: "var(--space-16)", overflowY: "auto", paddingBottom: "var(--space-16)" };
const dividerBand: CSSProperties = { background: "var(--base-color-cool-neutral-95)", height: 8 };

export function CartCheckout() {
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
