import type { Meta, StoryObj } from "@storybook/react-vite";
import { AddToCartPill, type AddToCartPillState } from "./AddToCartPill";

const frame: React.CSSProperties = { width: 360, background: "#fff", border: "1px solid #dde2eb", borderRadius: 12, overflow: "hidden" };

const states: AddToCartPillState[] = ["default", "sticky"];
const meta = {
  title: "Components/AddToCartPill",
  component: AddToCartPill,
  tags: ["autodocs", "test"],
  args: { state: "default", price: "₹371", mrp: "₹100", discount: "7% off" },
  argTypes: { state: { control: "inline-radio", options: states } },
  parameters: { layout: "centered", docs: { description: { component: "PDP add-to-cart bar: price (effective / struck MRP / discount) and an ADD button. Default shows the pack + tax note; sticky is the compact bottom bar." } }, a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } },
  decorators: [(S) => <div style={frame}>{S()}</div>]
} satisfies Meta<typeof AddToCartPill>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const FigmaVariants: Story = {
  decorators: [(S) => S()],
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
      <div style={frame}><AddToCartPill state="default" /></div>
      <div style={frame}><AddToCartPill state="sticky" /></div>
    </div>
  )
};
