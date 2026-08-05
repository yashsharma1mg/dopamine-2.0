import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bottomsheet } from "./Bottomsheet";

const frame: React.CSSProperties = {
  position: "relative",
  width: 360,
  height: 780,
  overflow: "hidden",
  borderRadius: 24,
  border: "1px solid #dde2eb",
  background: "#f7f8fa"
};

const meta = {
  title: "Components/Bottomsheet",
  component: Bottomsheet,
  tags: ["autodocs", "test"],
  args: { title: "Samples required", subtitle: "Samples required", backButton: true, height: 320 },
  argTypes: {
    backButton: { control: "boolean" },
    height: { control: { type: "range", min: 128, max: 600, step: 4 }, description: "Fixed sheet height (px). 128 = min, 600 = max." }
  },
  parameters: {
    layout: "centered",
    docs: { description: { component: "A sheet that slides up from the bottom over a scrim, with floating close (and optional back) controls. States: default (no header) and with subheading." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof Bottomsheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { decorators: [(S) => <div style={frame}>{S()}</div>] };

const label: React.CSSProperties = { font: "600 12px/1.4 Figtree", color: "#626a7a", marginBottom: 8 };

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
      <div>
        <div style={label}>Default</div>
        <div style={frame}><Bottomsheet /></div>
      </div>
      <div>
        <div style={label}>With subheading</div>
        <div style={frame}><Bottomsheet title="Samples required" subtitle="Samples required" backButton /></div>
      </div>
      <div>
        <div style={label}>Min height · 128px</div>
        <div style={frame}><Bottomsheet height={128} title="Samples required" subtitle="Samples required" /></div>
      </div>
      <div>
        <div style={label}>Max height · 600px</div>
        <div style={frame}><Bottomsheet height={600} title="Samples required" subtitle="Samples required" /></div>
      </div>
    </div>
  )
};
