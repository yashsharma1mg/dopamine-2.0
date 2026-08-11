import type { Meta, StoryObj } from "@storybook/react-vite";
import { Homepage } from "./Homepage";

const description = `
A composed **pattern**: the 1mg home screen (Figma \`6918-9055\`), assembled from Dopamine2.0
components.

**Components used (top → bottom)**

| Slot | Component | Config |
|---|---|---|
| Header | \`Navigation\` | \`type="for you-no scroll"\` |
| Quick links | \`QuickLinks\` | \`type="For you"\` (shortcut tiles + delivery promo) |
| Sticky bar | \`Sticky\` | \`type="Redirection"\` |

**Do** — reuse the components as-is and choose each one's variant. **Don't** — rebuild sections by
hand or hard-code colours; every component carries the tokens.
`;

const meta = {
  title: "Patterns/Homepage",
  component: Homepage,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: description } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  },
  globals: { viewport: { value: "phone", isRotated: false } }
} satisfies Meta<typeof Homepage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Screen: Story = {};
