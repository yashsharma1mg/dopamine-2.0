# OrderStrip — Spec

> **Figma source:** https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6765-5494
> **Component family:** Cart · **Status:** Ready

## Prompt Match

```yaml
prompts:
  - "order strip"
  - "cart item row"
  - "sku row"
  - "product row"
  - "pharmacy order"
  - "lab test card"
  - "diagnostics card"
  - "delivery strip"
```

## Description

OrderStrip renders the cart's ordered items, for pharmacy and diagnostics/labs.

### Pharmacy (`Pharma Rx` / `Pharma non Rx`)
A delivery **section**: a header (36px lightning chip on a white→`#fbe4ff` gradient +
delivery time in `title-22` extrabold `#9d59a8` + optional coral **Change**) followed by
**SKU rows** separated by dashed dividers. An SKU row is a 40px product image (with an
"Rx" tab for prescription items) + name (`body-14` bold) / qty (`body-12`) + a quantity
stepper (`1 ⌄`, coral count, drop-shadowed box) + price (`~~₹407~~` tertiary / **₹371**
`body-16` bold).

### Compact (`compact Rx` / `compact non Rx`)
A single 328px SKU row, no header — for tight list contexts.

### Labs (`Labs Rapid Report` / `Labs Default`)
A diagnostics card: a 40px blood-drop chip (`rgba(240,149,149,.12)`, `radius-4`) + test
name (`#3b3b3b` bold) / "Fasting required" / turnaround line + price row (**₹1300**
`~~₹1800~~` **30% off** in `#208376`) + a patient stepper ("**1 ⌄** / Patient(s)"). The
**Rapid Report** variant adds a "Faster report eligible" strip and a white→`#fceaff`
gradient.

### When to use
- Listing pharmacy SKUs or lab tests inside the cart.

### When NOT to use
- For a product-detail card outside the cart context.

## Tokens
- Surface `background-primary`; borders/dividers `border-subtle`.
- Delivery time & rapid accents `#9d59a8`; stepper count & Change `content-cta`;
  price `content-primary` / `content-tertiary`; labs discount `#208376`.
- Product image and blood-drop are illustration assets (image inlined; drop via `DsIcon`).

## Accessibility
- Quantity / patient steppers must be operable controls in product.
- Product images are decorative; the SKU / test name carries the meaning.
- The struck MRP is kept beside the discounted price for context.
