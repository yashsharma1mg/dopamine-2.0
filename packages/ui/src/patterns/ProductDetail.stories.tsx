import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductDetail } from "./ProductDetail";

const description = `
A composed **pattern**: the 1mg product detail page (PDP), assembled entirely from Dopamine2.0
components (Figma \`6822-4510\`). It shows how the PDP family fits into one scrollable screen.

**When to use** — as the reference layout for a product page: a sticky header, a scrollable stack
of the product hero, feature strip, price, offers and an information accordion, and a sticky
compact add-to-cart bar.

**Components used (top → bottom)**

| Slot | Component | Config |
|---|---|---|
| Sticky header | \`PageHeader\` | \`usage="Cart"\` |
| Product hero | \`Product\` | carousel + title/brand/composition + alternative pill |
| Feature strip | \`ProductLabel\` | trust badges |
| Price + ADD | \`AddToCartPill\` | \`state="default"\` |
| Offers | \`Offer\` | banner + additional-offers list |
| Information | \`ProductInformation\` | collapsible accordion (interactive) |
| Sticky bar | \`AddToCartPill\` | \`state="sticky"\` |

**Do** — reuse the components as-is; keep the accordion interactive and the sticky add-to-cart bar
pinned. **Don't** — rebuild sections by hand or hard-code colours; every component carries the tokens.
`;

const meta = {
  title: "Patterns/PDP",
  component: ProductDetail,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: description } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  },
  globals: { viewport: { value: "phone", isRotated: false } }
} satisfies Meta<typeof ProductDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Screen: Story = {};
