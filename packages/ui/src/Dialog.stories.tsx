import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog, type DialogVariant } from "./Dialog";

const frame: React.CSSProperties = {
  position: "relative",
  width: 360,
  height: 780,
  overflow: "hidden",
  borderRadius: 24,
  border: "1px solid #dde2eb",
  background: "#f7f8fa"
};

const variants: DialogVariant[] = ["cta", "image-cta", "image-2cta"];

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs", "test"],
  args: { variant: "image-2cta", heading: "Heading", primaryLabel: "Button", secondaryLabel: "Button" },
  argTypes: { variant: { control: "inline-radio", options: variants } },
  parameters: {
    layout: "centered",
    docs: { description: { component: "A centred modal card over a scrim with a floating close. States: CTA only, image + CTA, and image + 2 CTA (a Fill and an Outline Button)." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { decorators: [(S) => <div style={frame}>{S()}</div>] };

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
      {variants.map((v) => (
        <div key={v} style={frame}>
          <Dialog variant={v} />
        </div>
      ))}
    </div>
  )
};
