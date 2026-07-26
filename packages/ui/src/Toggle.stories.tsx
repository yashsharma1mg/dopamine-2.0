import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Toggle, type ToggleState } from "./Toggle";

const states: ToggleState[] = ["Default", "selected", "disabled", "disabled+selected"];

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs", "test"],
  args: { label: "Notifications" },
  argTypes: {
    state: { control: "inline-radio", options: states },
    checked: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 toggle switch: Default, selected, disabled, and disabled+selected." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledToggle() {
  const [checked, setChecked] = useState(false);
  return <Toggle label="Notifications" checked={checked} onCheckedChange={setChecked} />;
}

// Args-driven: every control (state, checked, disabled) live-updates the component.
export const Playground: Story = { render: (args) => <Toggle {...args} /> };

// Controlled instance for the click-to-toggle interaction test.
export const Interactive: Story = {
  render: () => <ControlledToggle />,
  play: async ({ canvasElement }) => {
    const sw = within(canvasElement).getByRole("switch", { name: "Notifications" });
    await expect(sw).toHaveAttribute("aria-checked", "false");
    await userEvent.click(sw);
    await expect(sw).toHaveAttribute("aria-checked", "true");
  }
};

export const FigmaVariants: Story = {
  render: (args) => (
    <div style={{ alignItems: "center", display: "flex", flexDirection: "column", gap: 20 }}>
      {states.map((state) => (
        <Toggle {...args} key={state} state={state} label={state} />
      ))}
    </div>
  )
};
