import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { VerticalTabs } from "./VerticalTabs";

const items = [
  { label: "Vitamins & Daily nutrition" },
  { label: "Fitness Supplements" },
  { label: "Sexual Wellness" },
  { label: "Nutritional & Rehydration Drinks" }
];

const meta = {
  id: "components-vertical-tabs",
  title: "Components/VerticalTabs",
  component: VerticalTabs,
  tags: ["autodocs", "test"],
  args: { items, activeIndex: 0 },
  argTypes: { activeIndex: { control: { type: "number", min: 0, max: 3 } } },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 vertical category tabs. Selected item: white background, dark image chip, bold label, and a right-edge indicator bar." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
    layout: "padded"
  }
} satisfies Meta<typeof VerticalTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled({ activeIndex = 0 }: { activeIndex?: number }) {
  const [i, setI] = useState(activeIndex);
  return <VerticalTabs items={items} activeIndex={i} onChange={setI} />;
}

export const Playground: Story = { render: (args) => <Controlled activeIndex={args.activeIndex} /> };

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      {[0, 1, 3].map((sel) => (
        <VerticalTabs key={sel} items={items} activeIndex={sel} />
      ))}
    </div>
  )
};
