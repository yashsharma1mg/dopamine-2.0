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

// Circular 32px image placeholder, matching the Figma highlighted-tab variant.
const imagePlaceholder = (
  <span
    style={{ alignItems: "center", background: "#f0f2f5", borderRadius: "50%", color: "#9aa2b1", display: "inline-flex", flex: "0 0 auto", height: 32, justifyContent: "center", width: 32 }}
    aria-hidden="true"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
      <path d="M5 17l4.5-4 3 2.5L16 12l3 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

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
          { label: "Text", subtext: "Subtext of max 1 line", icon: imagePlaceholder },
          { label: "Text", subtext: "Subtext of max 1 line", icon: imagePlaceholder }
        ]}
        activeIndex={1}
      />
    </div>
  )
};
