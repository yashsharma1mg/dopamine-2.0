import type { Meta, StoryObj } from "@storybook/react-vite";
import { CouponWidget, type CouponState } from "./CouponWidget";

const states: CouponState[] = [
  "No Coupon",
  "Not Available",
  "Not Applicable",
  "Applied",
  "CarePlan Applied",
  "CarePlan Not Applicable"
];

const meta = {
  title: "Components/CouponWidget",
  component: CouponWidget,
  tags: ["autodocs", "test"],
  args: { state: "Not Applicable" },
  argTypes: { state: { control: "select", options: states } },
  parameters: {
    layout: "padded",
    docs: { description: { component: "Cart coupon widget. Six Figma states across Non-CP and Care Plan users: No Coupon (explore), locked (Not Available), applyable (Not Applicable), Applied, and the Care Plan applied / not-applicable stacks." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof CouponWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
      {states.map((s) => (
        <div key={s}>
          <div style={{ font: "600 12px/1.4 Figtree", color: "#626a7a", marginBottom: 6 }}>{s}</div>
          <div style={{ border: "1px solid #eef1f5", borderRadius: 12 }}>
            <CouponWidget state={s} />
          </div>
        </div>
      ))}
    </div>
  )
};
