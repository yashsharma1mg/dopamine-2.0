import type { Meta, StoryObj } from "@storybook/react-vite";
import { CartCheckout } from "./CartCheckout";

const description = `
A composed **pattern**: the 1mg cart checkout screen, assembled entirely from Dopamine2.0
components (Figma \`6773-8356\`). It shows how the cart family fits together into one task flow.

**When to use** — as the reference layout for a cart/checkout screen: a sticky header, a
scrollable stack of order + savings + upsell + coupon + bill sections, and a sticky primary CTA.

**Components used (top → bottom)**

| Slot | Component | Config |
|---|---|---|
| Sticky header | \`PageHeader\` | \`usage="Cart"\` |
| Order savings | \`SavingStrip\` | \`variant="default"\` |
| Pharmacy order | \`OrderStrip\` | \`type="Pharma Rx"\` |
| Membership upsell | \`CarePlanCard\` | \`type="Added"\` (16px side margin) |
| Coupon | \`CouponWidget\` | \`state="Applied"\`, bracketed by 8px \`cool-neutral-95\` dividers |
| Bill summary | \`AmountWidget\` | \`state="Expanded"\` |
| Sticky CTA | \`ActionBar\` + \`Button\` | full-width "Continue to select address" |

**Do** — reuse the components as-is and only pick each one's variant/state; keep the 16px
section rhythm and the sticky header + action bar.
**Don't** — rebuild any section by hand or hard-code colours; the components already carry the
tokens. For real cart data, thread it through the components' content props (a future enhancement).
`;

const meta = {
  title: "Patterns/Cart checkout",
  component: CartCheckout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: description } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  },
  // Render the pattern's canvas at a phone viewport so it reads as a real device.
  globals: { viewport: { value: "phone", isRotated: false } }
} satisfies Meta<typeof CartCheckout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Screen: Story = {};
