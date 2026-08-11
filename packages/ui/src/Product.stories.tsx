import type { Meta, StoryObj } from "@storybook/react-vite";
import { Product } from "./Product";

const frame: React.CSSProperties = { width: 360, background: "#fff", border: "1px solid #dde2eb", borderRadius: 12, overflow: "hidden" };

const meta = {
  title: "Components/Product",
  component: Product,
  tags: ["autodocs", "test"],
  args: { title: "Telma 40 Tablet", brand: "La Renon Healthcare Pvt. Ltd", alternative: true },
  argTypes: { alternative: { control: "boolean" } },
  parameters: { layout: "centered", docs: { description: { component: "PDP product hero: image carousel, title/brand/composition, and an optional green alternative pill." } }, a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } },
  decorators: [(S) => <div style={frame}>{S()}</div>]
} satisfies Meta<typeof Product>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const FigmaVariants: Story = {
  decorators: [(S) => S()],
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      <div style={frame}><Product /></div>
      <div style={frame}><Product alternative={false} /></div>
    </div>
  )
};
