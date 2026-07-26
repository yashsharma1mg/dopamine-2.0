import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Checkbox, type CheckboxSize, type CheckboxState } from "./Checkbox";

const states: CheckboxState[] = ["Default", "Selected", "Disable", "Disabled selected"];
const sizes: CheckboxSize[] = ["Normal", "Small"];

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs", "test"],
  args: { label: "Accept terms", size: "Normal" },
  argTypes: {
    size: { control: "inline-radio", options: sizes },
    state: { control: "inline-radio", options: states },
    checked: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 checkbox: Normal/Small × Default, Selected, Disable, Disabled selected." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledCheckbox() {
  const [checked, setChecked] = useState(false);
  return <Checkbox label="Accept terms" checked={checked} onCheckedChange={setChecked} />;
}

// Args-driven: every control (size, state, checked, disabled) live-updates the component.
export const Playground: Story = { render: (args) => <Checkbox {...args} /> };

// Controlled instance for the click-to-toggle interaction test.
export const Interactive: Story = {
  render: () => <ControlledCheckbox />,
  play: async ({ canvasElement }) => {
    const box = within(canvasElement).getByRole("checkbox", { name: "Accept terms" });
    await expect(box).toHaveAttribute("aria-checked", "false");
    await userEvent.click(box);
    await expect(box).toHaveAttribute("aria-checked", "true");
  }
};

export const FigmaVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 32 }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <span style={{ font: "600 12px/1 Figtree, sans-serif" }}>{size}</span>
          {states.map((state) => (
            <Checkbox {...args} key={state} size={size} state={state} label={`${size} ${state}`} />
          ))}
        </div>
      ))}
    </div>
  )
};
