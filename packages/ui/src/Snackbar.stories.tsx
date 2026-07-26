import type { Meta, StoryObj } from "@storybook/react-vite";
import { Snackbar, type SnackbarType } from "./Snackbar";

const types: SnackbarType[] = ["White", "Warning", "Success", "Error", "Default"];

const meta = {
  title: "Components/Snackbar",
  component: Snackbar,
  tags: ["autodocs", "test"],
  args: { type: "Default", message: "Short message displayed here", leadingIcon: true, dismissible: true },
  argTypes: {
    type: { control: "select", options: types },
    leadingIcon: { control: "boolean" },
    dismissible: { control: "boolean" },
    action: { control: "text" }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 snackbar: White, Warning, Success, Error, Default, and Default + Action (coral action replaces the close button)." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
    layout: "padded"
  }
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {types.map((type) => (
        <Snackbar key={type} type={type} message="Short message displayed here" />
      ))}
      <Snackbar type="Default" message="Short message displayed here" action="Undo" />
    </div>
  )
};
