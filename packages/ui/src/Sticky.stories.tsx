import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sticky, type StickyState, type StickyType } from "./Sticky";

const variants: { type: StickyType; state: StickyState; label: string }[] = [
  { type: "Redirection", state: "Default", label: "Redirection · Default" },
  { type: "Redirection", state: "Error", label: "Redirection · Error" },
  { type: "Redirection", state: "Delivery", label: "Redirection · Delivery" },
  { type: "Redirection", state: "Multiple Delivery", label: "Redirection · Multiple Delivery" },
  { type: "Redirection", state: "2 deliveries", label: "Redirection · 2 deliveries" },
  { type: "Rating", state: "Rating", label: "Rating" },
  { type: "Standard", state: "1 button", label: "Standard · 1 button" },
  { type: "Video", state: "Video", label: "Video" }
];

const meta = {
  title: "Components/Sticky",
  component: Sticky,
  tags: ["autodocs", "test"],
  args: { type: "Redirection", state: "Default" },
  argTypes: {
    type: { control: "select", options: ["Redirection", "Rating", "Standard", "Video"] },
    state: { control: "select", options: ["Default", "Error", "Delivery", "2 deliveries", "Multiple Delivery", "Rating", "1 button", "Video"] }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 sticky bars: Redirection (Default/Error/Delivery/Multiple/2 deliveries), Rating, Standard, and a floating Video pill." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
    layout: "padded"
  }
} satisfies Meta<typeof Sticky>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { render: (args) => <Sticky {...args} /> };

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-start" }}>
      {variants.map(({ type, state, label }) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ font: "600 12px/1.4 Figtree, sans-serif", color: "#626a7a" }}>{label}</span>
          <Sticky type={type} state={state} />
        </div>
      ))}
    </div>
  )
};
