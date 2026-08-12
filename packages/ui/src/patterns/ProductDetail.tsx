import { type CSSProperties, useEffect, useRef, useState } from "react";
import { PageHeader, Product, ProductLabel, AddToCartPill, Offer, ProductInformation } from "../index.js";

/**
 * Pattern: Product Detail (PDP).
 *
 * Composes the PDP components into the 1mg product page (Figma 6822-4510): a sticky header, the
 * product hero, the feature label strip, the add-to-cart pill, the offers section, and the
 * product-information accordion. The compact add-to-cart bar isn't pinned from the start — it
 * pops up once the shopper scrolls down to the offers section.
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
  position: "relative",
  width: 360
};
const sticky: CSSProperties = { background: "var(--semantic-color-background-primary)", flex: "0 0 auto", position: "sticky", zIndex: 1 };
// Block (not flex) scroller so fixed-height children (the carousel) keep their height and scroll,
// rather than being compressed by flex-shrink. Extra bottom padding clears the pop-up buy bar.
const body: CSSProperties = { flex: "1 1 auto", minHeight: 0, overflowY: "auto", paddingBottom: 72 };
const band: CSSProperties = { background: "var(--base-color-cool-neutral-95)", height: 8, flex: "0 0 auto" };
const hairline: CSSProperties = { background: "var(--semantic-color-divider-subtle)", height: 1, flex: "0 0 auto" };
const buyBar: CSSProperties = {
  background: "var(--semantic-color-background-primary)",
  borderTop: "1px solid var(--semantic-color-stroke-subtle)",
  bottom: 0,
  boxShadow: "var(--shadow-level-2-inverse-y)",
  left: 0,
  position: "absolute",
  right: 0,
  transition: "transform 0.28s ease, opacity 0.2s ease",
  zIndex: 2
};

export function ProductDetail() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const root = bodyRef.current;
    const target = offersRef.current;
    if (!root || !target) return;
    // Reveal once the offers section has scrolled up to the top of the viewport (i.e. the primary
    // add-to-cart pill above it has scrolled away); hide again when scrolled back above it.
    const io = new IntersectionObserver(
      ([e]) => setShowBar(e.boundingClientRect.top < root.getBoundingClientRect().top),
      { root, threshold: 0 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div style={shell}>
      <div style={{ ...sticky, top: 0 }}>
        <PageHeader usage="Cart" locationName="Telma 40 Tablet" locationDetail="La Renon Healthcare" />
      </div>

      <div ref={bodyRef} style={body}>
        <Product />
        <div style={hairline} />
        <ProductLabel />
        <div style={hairline} />
        <AddToCartPill state="default" />
        <div style={band} />
        <div ref={offersRef} />
        <Offer banner={<span />} />
        <ProductInformation />
      </div>

      <div style={{ ...buyBar, transform: showBar ? "translateY(0)" : "translateY(100%)", opacity: showBar ? 1 : 0, pointerEvents: showBar ? "auto" : "none" }}>
        <AddToCartPill state="sticky" />
      </div>
    </div>
  );
}
