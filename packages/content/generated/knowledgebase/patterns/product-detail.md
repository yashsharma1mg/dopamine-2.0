# Pattern: Product Detail (PDP)

The 1mg product detail page, composed entirely from Dopamine2.0 components (Figma 6822-4510):
a sticky header, the product hero, a feature strip, the price + ADD bar, an offers section, and an
interactive information accordion — with a sticky compact add-to-cart bar pinned to the bottom.

This is a **layout recipe** — it wires existing components together and lets each render its
built-in content. Thread real product data through the components' own props.

## Components used (top → bottom)

| Slot | Component | Config |
|---|---|---|
| Sticky header | `PageHeader` | `usage="Cart"` (product name in the location slot) |
| Product hero | `Product` | carousel + title/brand/composition + alternative pill |
| Feature strip | `ProductLabel` | trust badges |
| Price + ADD | `AddToCartPill` | `state="default"` |
| Offers | `Offer` | `banner` + additional-offers list |
| Information | `ProductInformation` | collapsible accordion (interactive) |
| Sticky bar | `AddToCartPill` | `state="sticky"` |

## Recipe

```tsx
import "@dopamine2.0/ui/styles.css";
import { PageHeader, Product, ProductLabel, AddToCartPill, Offer, ProductInformation } from "@dopamine2.0/ui";

export function ProductDetail() {
  const shell: React.CSSProperties = {
    width: 360, height: 780, margin: "0 auto", boxSizing: "border-box",
    display: "flex", flexDirection: "column", overflow: "hidden",
    background: "var(--semantic-color-background-primary)",
    border: "1px solid var(--semantic-color-stroke-subtle)", borderRadius: 20
  };
  const sticky: React.CSSProperties = { position: "sticky", zIndex: 1, flex: "0 0 auto", background: "var(--semantic-color-background-primary)" };
  // Block (not flex) scroller so the fixed-height carousel keeps its height and scrolls.
  const body: React.CSSProperties = { flex: "1 1 auto", minHeight: 0, overflowY: "auto" };
  const band: React.CSSProperties = { height: 8, background: "var(--base-color-cool-neutral-95)" };
  const hairline: React.CSSProperties = { height: 1, background: "var(--semantic-color-divider-subtle)" };

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
      <div style={{ ...sticky, bottom: 0, borderTop: "1px solid var(--semantic-color-stroke-subtle)" }}>
        <AddToCartPill state="sticky" />
      </div>
    </div>
  );
}
```

## Do / Don't
- **Do** keep the accordion interactive and the sticky add-to-cart bar pinned; use a block scroller
  so the carousel keeps its height.
- **Don't** rebuild sections by hand or hard-code colours — every component carries the tokens.
