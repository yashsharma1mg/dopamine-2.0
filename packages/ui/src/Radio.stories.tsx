import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Radio, type RadioSize, type RadioState } from "./Radio";

const states: RadioState[] = ["Default", "Selected", "Disable", "Disable+select", "Select with icon", "Disable+select with icon"];
const sizes: RadioSize[] = ["Default", "Small"];

const meta = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs", "test"],
  args: { label: "Option A", size: "Default", indicator: "dot" },
  argTypes: {
    size: { control: "inline-radio", options: sizes },
    state: { control: "select", options: states },
    indicator: { control: "inline-radio", options: ["dot", "check"] },
    checked: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 radio: Default/Small × 6 states. Selected indicator is a dot or a checkmark." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Args-driven: every control live-updates the component.
export const Playground: Story = { render: (args) => <Radio {...args} /> };

function RadioGroup() {
  const [value, setValue] = useState("a");
  return (
    <div role="radiogroup" aria-label="Choose one" style={{ display: "flex", gap: 16 }}>
      {["a", "b", "c"].map((v) => (
        <Radio key={v} label={`Option ${v}`} checked={value === v} onClick={() => setValue(v)} />
      ))}
    </div>
  );
}

export const Interactive: Story = {
  render: () => <RadioGroup />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const b = canvas.getByRole("radio", { name: "Option b" });
    await expect(b).toHaveAttribute("aria-checked", "false");
    await userEvent.click(b);
    await expect(b).toHaveAttribute("aria-checked", "true");
    await expect(canvas.getByRole("radio", { name: "Option a" })).toHaveAttribute("aria-checked", "false");
  }
};

export const FigmaVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 32 }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          <span style={{ font: "600 12px/1 Figtree, sans-serif" }}>{size}</span>
          {states.map((state) => (
            <Radio {...args} key={state} size={size} state={state} label={`${size} ${state}`} />
          ))}
        </div>
      ))}
    </div>
  )
};
