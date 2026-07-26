import type { Meta, StoryObj } from "@storybook/react-vite";
import { Navigation, type NavigationType } from "./Navigation";

const types: NavigationType[] = ["labs", "pharmacy", "for you-no scroll", "CP-profile icon", "for you-scroll"];

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  tags: ["autodocs", "test"],
  args: { type: "for you-no scroll" },
  argTypes: { type: { control: "select", options: types } },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 top navigation header: location + profile/cart, category tab strip, and a search row whose trailing action changes by type (labs → Find best tests, pharmacy → Categories, for you/CP → Upload Prescription)." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
    layout: "padded"
  }
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { render: (args) => <Navigation {...args} /> };

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
      {types.map((type) => (
        <div key={type} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span style={{ font: "600 12px/1.4 Figtree, sans-serif", color: "#626a7a" }}>{type}</span>
          <Navigation type={type} />
        </div>
      ))}
    </div>
  )
};
