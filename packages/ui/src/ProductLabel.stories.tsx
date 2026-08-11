import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductLabel } from "./ProductLabel";

const frame: React.CSSProperties = { width: 360, background: "#fff", border: "1px solid #dde2eb", borderRadius: 12, overflow: "hidden" };

const meta = {
  title: "Components/ProductLabel",
  component: ProductLabel,
  tags: ["autodocs", "test"],
  parameters: { layout: "centered", docs: { description: { component: "PDP feature strip: a row of trust/feature badges (icon + bold title / secondary description), separated by dividers." } }, a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } },
  decorators: [(S) => <div style={frame}>{S()}</div>]
} satisfies Meta<typeof ProductLabel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const FigmaVariants: Story = { render: () => <ProductLabel /> };
