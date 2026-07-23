import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Stepper } from "./Stepper";

const assets = {
  addIcon: <img alt="" src="/assets/dopamine/stepper-add.svg" />,
  disabledAddIcon: <img alt="" src="/assets/dopamine/stepper-add-disabled.svg" />,
  decrementIcon: <img alt="" src="/assets/dopamine/stepper-decrement.svg" />,
  incrementIcon: <img alt="" src="/assets/dopamine/stepper-increment.svg" />
};

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs", "test"],
  args: { ...assets, onQuantityChange: () => {}, quantity: 0, size: "Large", state: "Add", type: "Filled" },
  argTypes: {
    type: { control: "inline-radio", options: ["Filled", "Outline"] },
    size: { control: "inline-radio", options: ["Medium", "Large"] },
    state: { control: "select", options: ["Add", "Added- Text", "Added- Number"] },
    outOfStock: { control: "boolean" }
  },
  parameters: { a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } } }
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledStepper() {
  const [quantity, setQuantity] = useState(0);
  return <Stepper {...assets} onQuantityChange={setQuantity} quantity={quantity} />;
}

export const Playground: Story = {
  render: () => <ControlledStepper />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "ADD" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("1");
    await userEvent.click(canvas.getByRole("button", { name: "Increase quantity" }));
    await expect(canvas.getByRole("status")).toHaveTextContent("2");
  }
};

export const FigmaVariants: Story = {
  render: () => <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 12 }}>
    <Stepper {...assets} onQuantityChange={() => {}} quantity={0} state="Add" type="Filled" />
    <Stepper {...assets} onQuantityChange={() => {}} quantity={0} state="Add" type="Outline" />
    <Stepper {...assets} onQuantityChange={() => {}} quantity={2} state="Added- Number" type="Filled" />
    <Stepper {...assets} onQuantityChange={() => {}} quantity={2} state="Added- Number" type="Outline" />
    <Stepper {...assets} onQuantityChange={() => {}} quantity={2} state="Added- Text" type="Filled" />
  </div>
};

export const OutOfStock: Story = { args: { outOfStock: true } };
