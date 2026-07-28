import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag, type TagColor } from "./Tag";

const colors: TagColor[] = ["Purple", "Yellow", "Blue", "Red", "Orange", "Green"];

const meta = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs", "test"],
  args: { type: "info", color: "Purple", children: "Label" },
  argTypes: {
    type: { control: "select", options: ["info", "notification", "rating", "new"] },
    color: { control: "select", options: colors }
  },
  parameters: {
    docs: { description: { component: "Figma variants for Dopamine2.0 tags: Info Badge (6 hues), Notification tag, Rating Badge, and New Badge." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
      <Tag type="notification" count={4} />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {colors.map((c) => (
          <Tag key={c} type="info" color={c}>Label</Tag>
        ))}
      </div>
      <Tag type="rating" value="4.2" />
      <Tag type="new" />
    </div>
  )
};
