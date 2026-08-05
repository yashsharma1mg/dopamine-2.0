import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuantitySelector } from "./QuantitySelector";

const frame: React.CSSProperties = {
  position: "relative",
  width: 360,
  height: 560,
  overflow: "hidden",
  borderRadius: 24,
  border: "1px solid #dde2eb",
  background: "#f7f8fa"
};

const meta = {
  title: "Components/QuantitySelector",
  component: QuantitySelector,
  tags: ["autodocs", "test"],
  args: { heading: "Heading", removeButton: true, selectedIndex: 0 },
  argTypes: { removeButton: { control: "boolean" }, selectedIndex: { control: { type: "number", min: 0, max: 5 } } },
  parameters: {
    layout: "centered",
    docs: { description: { component: "A modal single-select quantity picker over a scrim: a heading, a scrollable radio list (selected row = coral tint + coral tick), and an optional Remove footer." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof QuantitySelector>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled(props: Parameters<typeof QuantitySelector>[0]) {
  const [i, setI] = useState(props.selectedIndex ?? 0);
  return <QuantitySelector {...props} selectedIndex={i} onSelect={setI} />;
}

export const Playground: Story = { decorators: [(S) => <div style={frame}>{S()}</div>], render: (args) => <Controlled {...args} /> };

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      <div style={frame}>
        <QuantitySelector heading="Heading" options={["Option 1", "Option 2", "Option 3", "Option 4"]} />
      </div>
      <div style={frame}>
        <QuantitySelector heading="Heading" removeButton />
      </div>
    </div>
  )
};
