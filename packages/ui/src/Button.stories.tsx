import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./Button";
import { Icon } from "./Icon";

const icon = (name: string) => <Icon src={`/assets/dopamine/${name}.svg`} />;

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs", "test"],
  args: {
    children: "Button",
    leadingIcon: icon("button-leading"),
    onClick: fn(),
    size: "Large",
    state: "Primary",
    style: "Text Only",
    trailingIcon: icon("button-trailing"),
    type: "Fill"
  },
  argTypes: {
    type: { control: "select", options: ["Fill", "Outline", "Ghost"] },
    state: { control: "select", options: ["Primary", "Secondary", "Inverse", "Disabled"] },
    size: { control: "inline-radio", options: ["Medium", "Large"] },
    style: { control: "select", options: ["Text Only", "Icon + Text", "Text + Icon", "Underline"] },
    loading: { control: "boolean" },
    disabled: { control: "boolean" }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 button component." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button", { name: "Button" });
    await expect(button).toBeEnabled();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  }
};

export const FigmaVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {(["Primary", "Secondary", "Inverse", "Disabled"] as const).map((state) => (
        <Button {...args} key={state} state={state}>{state}</Button>
      ))}
      <Button {...args} type="Outline">Outline</Button>
      <Button {...args} type="Ghost">Ghost</Button>
    </div>
  )
};

export const Sizes: Story = {
  render: (args) => <div style={{ alignItems: "center", display: "flex", gap: 12 }}>{(["Medium", "Large"] as const).map((size) => <Button {...args} key={size} size={size}>{size}</Button>)}</div>
};

export const ContentConstruct: Story = {
  render: (args) => (
    <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Button {...args} style="Text Only">Button</Button>
      <Button {...args} style="Icon + Text">Button</Button>
      <Button {...args} style="Text + Icon">Button</Button>
      <Button {...args} style="Underline" type="Ghost">Button</Button>
    </div>
  )
};

export const Loading: Story = { args: { children: "Button", loading: true } };
export const Disabled: Story = { args: { state: "Disabled" } };
