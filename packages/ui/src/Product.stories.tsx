import type { Meta, StoryObj } from "@storybook/react-vite";
import { Product } from "./Product";

const frame: React.CSSProperties = { width: 360, background: "#fff", border: "1px solid #dde2eb", borderRadius: 12, overflow: "hidden" };
const label: React.CSSProperties = { font: "600 12px/1.4 Figtree", color: "#626a7a", marginBottom: 8 };

const meta = {
  title: "Components/Product",
  component: Product,
  tags: ["autodocs", "test"],
  args: { title: "Telma 40 Tablet", brand: "La Renon Healthcare Pvt. Ltd", numberOfImages: 2, alternative: true },
  argTypes: {
    numberOfImages: { control: "inline-radio", options: [1, 2, 3] },
    alternative: { control: "boolean" }
  },
  parameters: { layout: "centered", docs: { description: { component: "PDP product hero: a drag-to-swipe image carousel (1–3 slots), title/brand/composition, and an optional green alternative pill." } }, a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } },
  decorators: [(S) => <div style={frame}>{S()}</div>]
} satisfies Meta<typeof Product>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  decorators: [(S) => S()],
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
      {([1, 2, 3] as const).map((n) => (
        <div key={n}>
          <div style={label}>{n} image{n > 1 ? "s" : ""}</div>
          <div style={frame}><Product numberOfImages={n} /></div>
        </div>
      ))}
      <div>
        <div style={label}>Without alternative pill</div>
        <div style={frame}><Product alternative={false} /></div>
      </div>
    </div>
  )
};
