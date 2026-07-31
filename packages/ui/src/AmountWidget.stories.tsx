import type { Meta, StoryObj } from "@storybook/react-vite";
import { AmountWidget } from "./AmountWidget";

const meta = {
  title: "Components/AmountWidget",
  component: AmountWidget,
  tags: ["autodocs", "test"],
  args: { state: "Expanded" },
  argTypes: { state: { control: "inline-radio", options: ["Collapsed", "Expanded"] } },
  parameters: {
    layout: "padded",
    docs: { description: { component: "Cart billing amount widget. Collapsed: to-be-paid summary with savings pill. Expanded: delivery address + full bill summary (item total, discounts, delivery fee, NeuCoins, total)." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof AmountWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ font: "600 12px/1.4 Figtree", color: "#626a7a", marginBottom: 6 }}>Collapsed</div>
        <div style={{ border: "1px solid #eef1f5", borderRadius: 12 }}><AmountWidget state="Collapsed" /></div>
      </div>
      <div>
        <div style={{ font: "600 12px/1.4 Figtree", color: "#626a7a", marginBottom: 6 }}>Expanded</div>
        <div style={{ border: "1px solid #eef1f5", borderRadius: 12 }}><AmountWidget state="Expanded" /></div>
      </div>
    </div>
  )
};
