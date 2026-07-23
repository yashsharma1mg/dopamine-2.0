import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs", "test"],
  args: {
    children: "Continue",
    onClick: fn()
  },
  argTypes: {
    type: {
      control: "select",
      options: ["fill", "outline", "ghost"],
      description: "Sets the Figma container treatment."
    },
    size: {
      control: "inline-radio",
      options: ["medium", "large"],
      description: "Sets the Figma size variant."
    },
    loading: {
      control: "boolean",
      description: "Prevents duplicate activation and announces busy state."
    },
    disabled: {
      control: "boolean",
      description: "Prevents interaction with the action."
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "Buttons trigger immediate actions. Use one primary button per decision area and choose labels that describe the outcome."
      }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Continue" });
    await expect(button).toBeEnabled();
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  }
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      {(["fill", "outline", "ghost"] as const).map((type) => (
        <Button {...args} key={type} type={type}>
          {type[0].toUpperCase() + type.slice(1)}
        </Button>
      ))}
    </div>
  )
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 12 }}>
      {(["medium", "large"] as const).map((size) => (
        <Button {...args} key={size} size={size}>
          Size {size}
        </Button>
      ))}
    </div>
  )
};

export const Loading: Story = {
  args: {
    children: "Saving changes",
    loading: true
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  }
};
