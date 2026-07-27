import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";

import { SuggestionChip } from "./SuggestionChip";

const meta = {
  id: "components-suggestion-chip",
  title: "Components/SuggestionChip",
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
    await expect(canvasElement.querySelector('[data-size="small"][data-state="Primary"]')?.getBoundingClientRect().width).toBeCloseTo(100.3, 1);
    await expect(canvasElement.querySelector('[data-size="Timestamp"][data-state="selected"]')).toHaveStyle({ height: "76px", width: "56px" });
    await expect(canvasElement.querySelector('[data-size="Default"][data-state="Primary"] img')).toHaveAttribute("src", "/assets/dopamine/suggestion-chip-arrow-primary.svg");
    await expect(canvasElement.querySelector('[data-size="Default"][data-state="Default"] img')).toHaveAttribute("src", "/assets/dopamine/suggestion-chip-arrow-default.svg");
    await expect(canvasElement.querySelector('[data-size="Default"][data-state="disable"] img')).toHaveAttribute("src", "/assets/dopamine/suggestion-chip-arrow-disabled.svg");
    await expect(canvasElement.querySelector('[data-size="small"][data-state="disable"] img')).toHaveAttribute("src", "/assets/dopamine/suggestion-chip-arrow-disabled-small.svg");
    await expect(canvasElement.querySelector('[data-size="Default"][data-state="disable+select"] img')).toHaveAttribute("src", "/assets/dopamine/suggestion-chip-arrow-disabled-selected.svg");
  }
};

export const ContentConstruct: Story = {
  render: (args) => <div className="ds-suggestion-chip-variants">
    <SuggestionChip {...args} showLeadingIcon={false} showTrailingCounter={false} />
    <SuggestionChip {...args} showLeadingIcon={false} showTrailingCounter={false} state="Default" />
    <SuggestionChip {...args} showLeadingIcon={false} size="small" state="Primary" />
    <SuggestionChip {...args} showLeadingIcon={false} size="small" state="Default" />
    <SuggestionChip {...args} showLeadingIcon={false} showTrailingCounter={false} state="disable" />
    <SuggestionChip {...args} showLeadingIcon={false} showTrailingCounter={false} state="disable+select" />
  </div>,
  play: async ({ canvasElement }) => {
    const chips = Array.from(canvasElement.querySelectorAll<HTMLButtonElement>(".ds-suggestion-chip"));
    await expect(chips).toHaveLength(6);
    await expect(chips[2].getBoundingClientRect().width).toBeCloseTo(84.3, 1);
    await expect(chips[4].getBoundingClientRect().width).toBe(108);
    await expect(chips[5].getBoundingClientRect().width).toBe(108);
    await expect(chips.every((chip) => chip.querySelector("img") === null)).toBe(true);
    await expect(getComputedStyle(chips[2]).fontFamily).toContain("Figtree");
    await expect(getComputedStyle(chips[5]).borderWidth).toBe("0px");
  }
};
