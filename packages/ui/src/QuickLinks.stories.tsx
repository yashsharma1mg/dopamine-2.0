import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuickLinks, type QuickLinksType } from "./QuickLinks";

const frame: React.CSSProperties = { width: 360, background: "#fff", border: "1px solid #dde2eb", borderRadius: 12, overflow: "hidden", padding: "12px 0" };
const label: React.CSSProperties = { font: "600 12px/1.4 Figtree", color: "#626a7a", margin: "0 0 8px 16px" };

const types: QuickLinksType[] = ["For you", "Labs"];

const meta = {
  title: "Components/QuickLinks",
  component: QuickLinks,
  tags: ["autodocs", "test"],
  args: { type: "For you" },
  argTypes: { type: { control: "inline-radio", options: types } },
  parameters: {
    layout: "centered",
    docs: { description: { component: "Homepage quick links. For you: four icon tiles + a delivery promo card. Labs: four labelled tiles + two outline pills." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  },
  decorators: [(S) => <div style={frame}>{S()}</div>]
} satisfies Meta<typeof QuickLinks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  decorators: [(S) => S()],
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
      {types.map((t) => (
        <div key={t}>
          <div style={{ ...label, marginLeft: 0 }}>{t}</div>
          <div style={frame}><QuickLinks type={t} /></div>
        </div>
      ))}
    </div>
  )
};
