import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bottomsheet } from "./Bottomsheet";

const frame: React.CSSProperties = {
  position: "relative",
  width: 360,
  height: 680,
  overflow: "hidden",
  borderRadius: 24,
  border: "1px solid #dde2eb",
  background: "#f7f8fa"
};

const meta = {
  title: "Components/Bottomsheet",
  component: Bottomsheet,
  tags: ["autodocs", "test"],
  args: { title: "Samples required", subtitle: "Samples required", backButton: true },
  argTypes: { backButton: { control: "boolean" } },
  parameters: {
    layout: "centered",
    docs: { description: { component: "A sheet that slides up from the bottom over a scrim, with floating close (and optional back) controls. States: default (no header) and with subheading." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof Bottomsheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { decorators: [(S) => <div style={frame}>{S()}</div>] };

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      <div style={frame}>
        <Bottomsheet />
      </div>
      <div style={frame}>
        <Bottomsheet title="Samples required" subtitle="Samples required" backButton />
      </div>
    </div>
  )
};
