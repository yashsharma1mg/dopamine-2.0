import type { Meta, StoryObj } from "@storybook/react-vite";
import { SavingStrip, type SavingStripVariant } from "./SavingStrip";

const variants: SavingStripVariant[] = [
  "default",
  "careplan-1line",
  "careplan",
  "careplan-chevron",
  "payday",
  "payday-chevron"
];

const meta = {
  title: "Components/SavingStrip",
  component: SavingStrip,
  tags: ["autodocs", "test"],
  args: { variant: "careplan", amount: "₹292", careplanAmount: "₹120" },
  argTypes: { variant: { control: "select", options: variants } },
  parameters: {
    layout: "padded",
    docs: { description: { component: "Cart savings strip — a green summary bar. Six Figma variants: 1-line (plain / Care Plan), 2-line Care Plan (± chevron) and Pay Day Sale (± chevron)." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof SavingStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {variants.map((v) => (
        <div key={v}>
          <div style={{ font: "600 12px/1.4 Figtree", color: "#626a7a", marginBottom: 6, paddingLeft: 16 }}>{v}</div>
          <SavingStrip variant={v} />
        </div>
      ))}
    </div>
  )
};
