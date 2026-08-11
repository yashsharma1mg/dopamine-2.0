import { type CSSProperties } from "react";
import { PageHeader, Product, ProductLabel, AddToCartPill, Offer, ProductInformation } from "../index.js";

/**
 * Pattern: Product Detail (PDP).
 *
 * Composes the PDP components into the 1mg product page (Figma 6822-4510): a sticky header, the
 * product hero, the feature label strip, the add-to-cart pill, the offers section, and the
 * product-information accordion — with a sticky compact add-to-cart bar pinned to the bottom.
 * Runs on each component's built-in sample content; this is a layout recipe, not a data page.
 */

const shell: CSSProperties = {
  background: "var(--semantic-color-background-primary)",
  border: "1px solid var(--semantic-color-stroke-subtle)",
  borderRadius: 20,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  height: 780,
  margin: "0 auto",
  overflow: "hidden",
  width: 360
};
const sticky: CSSProperties = { background: "var(--semantic-color-background-primary)", flex: "0 0 auto", position: "sticky", zIndex: 1 };
// Block (not flex) scroller so fixed-height children (the carousel) keep their height and scroll,
// rather than being compressed by flex-shrink.
const body: CSSProperties = { flex: "1 1 auto", minHeight: 0, overflowY: "auto" };
const band: CSSProperties = { background: "var(--base-color-cool-neutral-95)", height: 8, flex: "0 0 auto" };
const hairline: CSSProperties = { background: "var(--semantic-color-divider-subtle)", height: 1, flex: "0 0 auto" };

export function ProductDetail() {
  return (
    <div style={shell}>
      <div style={{ ...sticky, top: 0 }}>
        <PageHeader usage="Cart" locationName="Telma 40 Tablet" locationDetail="La Renon Healthcare" />
      </div>

      <div style={body}>
        <Product />
        <div style={hairline} />
        <ProductLabel />
        <div style={hairline} />
        <AddToCartPill state="default" />
        <div style={band} />
        <Offer banner={<span />} />
        <ProductInformation />
      </div>

      <div style={{ ...sticky, bottom: 0, borderTop: "1px solid var(--semantic-color-stroke-subtle)", boxShadow: "var(--shadow-level-2-inverse-y)" }}>
        <AddToCartPill state="sticky" />
      </div>
    </div>
  );
}
