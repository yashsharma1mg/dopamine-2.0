import type { Meta, StoryObj } from "@storybook/react-vite";
import { CarePlanCard, type CarePlanCardType } from "./CarePlanCard";

const types: CarePlanCardType[] = ["Added", "Not Added", "updated"];

const meta = {
  title: "Components/CarePlanCard",
  component: CarePlanCard,
  tags: ["autodocs", "test"],
  args: { type: "Added" },
  argTypes: { type: { control: "inline-radio", options: types } },
  parameters: {
    layout: "padded",
    docs: { description: { component: "Care Plan upsell card (cream gradient). Three Figma variants: Added and updated (benefits applied + Remove), Not Added (illustrated benefits + Add Plan)." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof CarePlanCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {types.map((t) => (
        <div key={t}>
          <div style={{ font: "600 12px/1.4 Figtree", color: "#626a7a", marginBottom: 6 }}>{t}</div>
          <CarePlanCard type={t} />
        </div>
      ))}
    </div>
  )
};
