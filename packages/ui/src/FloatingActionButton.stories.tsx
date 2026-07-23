import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { FloatingActionButton } from "./FloatingActionButton";

const meta = {
  title: "Components/Floating Action Button",
  component: FloatingActionButton,
  tags: ["autodocs", "test"],
  args: { onClick: fn() },
  argTypes: { type: { control: "select", options: ["add", "added", "fab", "special"] } }
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

export const Variants: Story = { render: (args) => <div style={{ display: "flex", gap: 12 }}>{(["add", "added", "fab", "special"] as const).map((type) => <FloatingActionButton {...args} key={type} type={type} />)}</div> };
export const Disabled: Story = { args: { disabled: true } };
