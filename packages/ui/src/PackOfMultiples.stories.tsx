import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PackOfMultiples, type PackOption } from "./PackOfMultiples";

const frame: React.CSSProperties = {
  position: "relative",
  width: 360,
  height: 780,
  overflow: "hidden",
  borderRadius: 24,
  border: "1px solid #dde2eb",
  background: "#f7f8fa"
};

const withRec: PackOption[] = [
  { qty: 1, mrp: "₹440", price: "₹186", discount: "55% off" },
  { qty: 2, mrp: "₹440", price: "₹186", discount: "55% off" },
  { qty: 3, mrp: "₹440", price: "₹186", discount: "55% off", recommended: true, extra: "10% extra discount" },
  { qty: 4, mrp: "₹440", price: "₹186", discount: "55% off" }
];
const noRec: PackOption[] = [
  { qty: 1, mrp: "₹440", price: "₹186", discount: "55% off" },
  { qty: 2, mrp: "₹440", price: "₹186", discount: "55% off" },
  { qty: 3, mrp: "₹440", price: "₹186", discount: "55% off" },
  { qty: 4, mrp: "₹440", price: "₹186", discount: "55% off" }
];

const meta = {
  title: "Components/PackOfMultiples",
  component: PackOfMultiples,
  tags: ["autodocs", "test"],
  args: { heading: "Select Quantity", removeButton: true, selectedIndex: 2 },
  argTypes: { removeButton: { control: "boolean" }, selectedIndex: { control: { type: "number", min: 0, max: 3 } } },
  parameters: {
    layout: "centered",
    docs: { description: { component: "A modal 'Select Quantity' picker for buying packs: each row shows the multiple, struck MRP, price and a discount tag; an optional row carries a purple Recommended ribbon + extra-discount line. Three states: selected / not-selected recommendation, and no recommendation." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof PackOfMultiples>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled(props: Parameters<typeof PackOfMultiples>[0]) {
  const [i, setI] = useState(props.selectedIndex ?? 0);
  return <PackOfMultiples {...props} selectedIndex={i} onSelect={setI} />;
}

export const Playground: Story = { decorators: [(S) => <div style={frame}>{S()}</div>], render: (args) => <Controlled {...args} options={withRec} /> };

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      <div style={frame}>
        <PackOfMultiples options={withRec} selectedIndex={2} removeButton />
      </div>
      <div style={frame}>
        <PackOfMultiples options={withRec} selectedIndex={0} removeButton />
      </div>
      <div style={frame}>
        <PackOfMultiples options={noRec} selectedIndex={0} removeButton />
      </div>
    </div>
  )
};
