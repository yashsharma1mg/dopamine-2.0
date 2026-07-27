import type { Meta, StoryObj } from "@storybook/react-vite";
import { SwipeIndicator, type SwipeIndicatorSize, type SwipeIndicatorType } from "./SwipeIndicator";

const meta = {
  id: "components-swipe-indicator",
  title: "Components/SwipeIndicator",
  component: SwipeIndicator,
  tags: ["autodocs", "test"],
  args: { type: "line-filling", size: "Normal", total: 4, current: 1 },
  argTypes: {
    type: { control: "inline-radio", options: ["line-filling", "staggered"] },
    size: { control: "inline-radio", options: ["Normal", "Small"] },
    total: { control: { type: "number", min: 2, max: 8 } },
    current: { control: { type: "number", min: 1, max: 8 } }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 swipe/progress indicator: Line Filling (cumulative fill) and Staggered (sliding segment), in Normal (216px) and Small (48px)." } },
    layout: "padded"
  }
} satisfies Meta<typeof SwipeIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const row = (type: SwipeIndicatorType, size: SwipeIndicatorSize, label: string) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <span style={{ font: "600 12px/1.4 Figtree", color: "#626a7a" }}>{label}</span>
    {[1, 2, 3, 4].map((c) => (
      <SwipeIndicator key={c} type={type} size={size} total={4} current={c} />
    ))}
  </div>
);

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
      {row("line-filling", "Normal", "Normal · Line Filling")}
      {row("staggered", "Normal", "Normal · Staggered")}
      {row("staggered", "Small", "Small · Default")}
    </div>
  )
};
