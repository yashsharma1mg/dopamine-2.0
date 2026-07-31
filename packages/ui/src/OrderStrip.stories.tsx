import type { Meta, StoryObj } from "@storybook/react-vite";
import { OrderStrip, type OrderStripType } from "./OrderStrip";

const types: OrderStripType[] = [
  "Pharma Rx",
  "Pharma non Rx",
  "compact Rx",
  "compact non Rx",
  "Labs Rapid Report",
  "Labs Default"
];

const meta = {
  title: "Components/OrderStrip",
  component: OrderStrip,
  tags: ["autodocs", "test"],
  args: { type: "Pharma Rx" },
  argTypes: { type: { control: "select", options: types } },
  parameters: {
    layout: "padded",
    docs: { description: { component: "Cart order strip. Pharmacy delivery sections (Rx / non-Rx) with SKU rows, compact single rows, and diagnostics/labs cards (Rapid Report / Default)." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof OrderStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
      {types.map((t) => (
        <div key={t}>
          <div style={{ font: "600 12px/1.4 Figtree", color: "#626a7a", marginBottom: 6 }}>{t}</div>
          <div style={{ border: "1px solid #eef1f5", borderRadius: 12, overflow: "hidden" }}>
            <OrderStrip type={t} />
          </div>
        </div>
      ))}
    </div>
  )
};
