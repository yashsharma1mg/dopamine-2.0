import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip, type TooltipVariant } from "./Tooltip";

const variants: TooltipVariant[] = ["Top left", "Top right", "Bottom left", "Bottom right"];

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs", "test"],
  args: { variant: "Top left", leadIcon: true, newPill: true, closeIcon: true, children: "Your order will be delivered here" },
  argTypes: {
    variant: { control: "inline-radio", options: variants },
    leadIcon: { control: "boolean" },
    newPill: { control: "boolean" },
    closeIcon: { control: "boolean" }
  },
  parameters: {
    layout: "padded",
    docs: { description: { component: "Figma variants for the Dopamine2.0 tooltip: a dark bubble (lead icon + NEW pill + message + close) with the tail on any of four corners." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 40, flexWrap: "wrap", padding: 24 }}>
      {variants.map((v) => (
        <Tooltip key={v} variant={v} />
      ))}
    </div>
  )
};
