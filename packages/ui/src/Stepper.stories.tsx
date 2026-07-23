import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Stepper } from "./Stepper";

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs", "test"],
  args: { quantity: 0, onQuantityChange: () => {} },
  argTypes: { type: { control: "inline-radio", options: ["filled", "outline"] }, size: { control: "inline-radio", options: ["medium", "large"] } }
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledStepper() {
  const [quantity, setQuantity] = useState(0);
  return <Stepper quantity={quantity} onQuantityChange={setQuantity} />;
}

export const Playground: Story = {
  render: () => <ControlledStepper />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Add" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("1");
    await userEvent.click(canvas.getByRole("button", { name: "Increase quantity" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("2");
  }
};

export const Variants: Story = { render: () => <div style={{ display: "flex", gap: 12 }}><Stepper quantity={2} onQuantityChange={() => {}} type="filled" /><Stepper quantity={2} onQuantityChange={() => {}} type="outline" /></div> };
export const OutOfStock: Story = { args: { quantity: 0, outOfStock: true } };
