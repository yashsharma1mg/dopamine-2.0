import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductInformation } from "./ProductInformation";

const frame: React.CSSProperties = { width: 360, background: "#fff", border: "1px solid #dde2eb", borderRadius: 12, overflow: "hidden" };

const meta = {
  title: "Components/ProductInformation",
  component: ProductInformation,
  tags: ["autodocs", "test"],
  parameters: { layout: "centered", docs: { description: { component: "PDP information accordion: collapsible sections (title + rotating chevron) separated by divider bands; long sections clamp with a See more / See less toggle. Click a header to expand/collapse." } }, a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } },
  decorators: [(S) => <div style={frame}>{S()}</div>]
} satisfies Meta<typeof ProductInformation>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const FigmaVariants: Story = {};
