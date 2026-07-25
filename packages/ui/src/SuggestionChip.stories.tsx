import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";

import { SuggestionChip } from "./SuggestionChip";

const meta = {
  title: "Components/Suggestion Chip",
  component: SuggestionChip,
  tags: ["autodocs", "test"],
  args: { children: "Text here", counter: 1, onClick: fn(), showLeadingIcon: true, showTrailingCounter: true, size: "Default", state: "Primary" },
  argTypes: {
    size: { control: "select", options: ["Default", "small", "Timestamp"] },
    state: { control: "select", options: ["Primary", "Default", "disable", "disable+select", "default", "selected"] }
  },
  parameters: { a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } }
} satisfies Meta<typeof SuggestionChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: (args) => <div className="ds-suggestion-chip-variants">
    <SuggestionChip {...args} state="Primary" />
    <SuggestionChip {...args} state="Default" />
    <SuggestionChip {...args} state="disable" />
    <SuggestionChip {...args} state="disable+select" />
    <SuggestionChip {...args} size="small" state="Primary" />
    <SuggestionChip {...args} size="small" state="Default" />
    <SuggestionChip {...args} size="small" state="disable" />
    <SuggestionChip {...args} size="small" state="disable+select" />
    <SuggestionChip {...args} size="Timestamp" state="default" />
    <SuggestionChip {...args} size="Timestamp" state="selected" />
  </div>,
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll(".ds-suggestion-chip")).toHaveLength(10);
    await expect(canvasElement.querySelector('[data-size="Timestamp"][data-state="selected"]')).toHaveStyle({ height: "76px", width: "56px" });
  }
};
