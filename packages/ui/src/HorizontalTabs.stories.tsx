import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { HorizontalTabs } from "./HorizontalTabs";

const items = [{ label: "For you" }, { label: "Pharmacy" }, { label: "Labs" }, { label: "Consults" }];

const meta = {
  id: "components-horizontal-tabs",
  title: "Components/HorizontalTabs",
  component: HorizontalTabs,
  tags: ["autodocs", "test"],
  args: { type: "underline", items, activeIndex: 0, withImages: false },
  argTypes: {
    type: { control: "inline-radio", options: ["underline", "highlighted"] },
    withImages: { control: "boolean" },
    activeIndex: { control: { type: "number", min: 0, max: 3 } }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 horizontal tabs: underline tabs (text or with 64px image chips, single/multiple) and highlighted segmented pills (2 tabs, optional icon + subtext)." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
    layout: "padded"
  }
} satisfies Meta<typeof HorizontalTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled(props: Parameters<typeof HorizontalTabs>[0]) {
  const [i, setI] = useState(props.activeIndex ?? 0);
  return <HorizontalTabs {...props} activeIndex={i} onChange={setI} />;
}

export const Playground: Story = { render: (args) => <Controlled {...args} /> };

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
      <span style={{ font: "600 12px/1.4 Figtree", color: "#626a7a" }}>Underline · text only</span>
      <HorizontalTabs type="underline" items={items} activeIndex={0} />
      <span style={{ font: "600 12px/1.4 Figtree", color: "#626a7a" }}>Underline · with images</span>
      <HorizontalTabs type="underline" withImages items={items} activeIndex={0} />
      <span style={{ font: "600 12px/1.4 Figtree", color: "#626a7a" }}>Highlighted · 2 tabs</span>
      <HorizontalTabs type="highlighted" items={[{ label: "Text" }, { label: "Text" }]} activeIndex={0} />
      <span style={{ font: "600 12px/1.4 Figtree", color: "#626a7a" }}>Highlighted · 2 tabs with icon</span>
      <HorizontalTabs
        type="highlighted"
        items={[
          { label: "Text", subtext: "Subtext of max 1 line", icon: <span style={{ width: 24, height: 24, display: "inline-block", borderRadius: 6, background: "currentColor", opacity: 0.25 }} /> },
          { label: "Text", subtext: "Subtext of max 1 line", icon: <span style={{ width: 24, height: 24, display: "inline-block", borderRadius: 6, background: "currentColor", opacity: 0.25 }} /> }
        ]}
        activeIndex={1}
      />
    </div>
  )
};
