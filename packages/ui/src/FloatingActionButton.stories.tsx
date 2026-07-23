import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { FloatingActionButton } from "./FloatingActionButton";

const icon = (name: string) => <img alt="" src={`/assets/dopamine/${name}.svg`} />;

const meta = {
  title: "Components/Floating Action Button",
  component: FloatingActionButton,
  tags: ["autodocs", "test"],
  args: { icon: icon("fab-add"), onClick: fn(), state: "Default", type: "Add" },
  argTypes: {
    type: { control: "select", options: ["FAB", "Special button", "Added", "Add"] },
    state: { control: "select", options: ["Default", "Disable", "Single Added"] }
  },
  parameters: { a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } }
} satisfies Meta<typeof FloatingActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button", { name: "Add" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  }
};

export const FigmaVariants: Story = {
  render: (args) => <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 12 }}>
    <FloatingActionButton {...args} icon={icon("fab-add")} type="Add" />
    <FloatingActionButton {...args} icon={icon("fab-tick")} state="Single Added" type="Add" />
    <FloatingActionButton {...args} icon={icon("fab-added")} type="Added" />
    <FloatingActionButton {...args} icon={icon("fab-action")} type="FAB" />
    <FloatingActionButton {...args} type="Special button" />
  </div>
};

export const Disabled: Story = { args: { icon: icon("fab-added-disabled"), state: "Disable", type: "Added" } };
