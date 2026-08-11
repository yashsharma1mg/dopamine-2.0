import type { Meta, StoryObj } from "@storybook/react-vite";
import { Offer } from "./Offer";

const frame: React.CSSProperties = { width: 360, background: "#fff", border: "1px solid #dde2eb", borderRadius: 12, overflow: "hidden" };

const meta = {
  title: "Components/Offer",
  component: Offer,
  tags: ["autodocs", "test"],
  parameters: { layout: "centered", docs: { description: { component: "PDP offers section: an optional promo banner and a 'Save more with additional offers' list, closed by a 'See all offers' action." } }, a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } },
  decorators: [(S) => <div style={frame}>{S()}</div>]
} satisfies Meta<typeof Offer>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = { render: () => <Offer banner={<span />} /> };
export const FigmaVariants: Story = { render: () => <Offer banner={<span />} /> };
