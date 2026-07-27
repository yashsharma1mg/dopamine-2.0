import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField, type InputFieldState, type InputFieldType } from "./InputField";

const states: InputFieldState[] = ["default", "typing", "error", "success", "disable"];

const meta = {
  id: "components-input-field",
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs", "test"],
  args: {
    type: "Field with CTA text",
    state: "default",
    label: "House number / Flat number",
    value: "1582/ 5, Patel nagar, sector 15",
    helperText: "Helping text or error message goes here",
    ctaLabel: "APPLY"
  },
  argTypes: {
    type: { control: "select", options: ["Field with CTA text", "Field with CTA logo", "4 digit OTP", "6 digit OTP"] },
    state: { control: "select", options: states }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 Input Field: field-with-CTA (text/logo) and 4/6-digit OTP, across default, typing, error, success, and disable states." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } }
  }
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const column = (type: InputFieldType, extra: Partial<Parameters<typeof InputField>[0]> = {}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
    {states.map((state) => (
      <InputField key={state} {...meta.args} type={type} state={state} {...extra} />
    ))}
  </div>
);

export const FieldWithCtaText: Story = { render: () => column("Field with CTA text") };
export const FieldWithCtaLogo: Story = { render: () => column("Field with CTA logo") };

export const Otp4: Story = {
  render: () => column("4 digit OTP", { digits: ["6", "6", "6", "6"] })
};
export const Otp6: Story = {
  render: () => column("6 digit OTP", { digits: ["6", "6", "6", "6", "6", "6"] })
};

export const AllVariants: Story = {
  name: "All 20 variants",
  render: () => (
    <div style={{ display: "flex", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
      {(["Field with CTA text", "Field with CTA logo", "4 digit OTP", "6 digit OTP"] as InputFieldType[]).map((type) => (
        <div key={type}>
          <h4 style={{ font: "600 13px/1.4 Figtree, sans-serif", margin: "0 0 12px" }}>{type}</h4>
          {column(type, type.includes("OTP") ? { digits: ["6", "6", "6", "6", "6", "6"] } : {})}
        </div>
      ))}
    </div>
  )
};
