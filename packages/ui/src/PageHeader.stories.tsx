import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageHeader } from "./PageHeader";

const meta = {
  id: "components-page-header",
  title: "Components/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    usage: "Floating",
    type: "Transparent",
    textColour: "Black",
    heading: "Heading",
    subtitle: "subtitle",
    locationDetail: "3rd floor, Motorola building, Gurugram",
    cartCount: 3
  },
  argTypes: {
    usage: { control: "select", options: ["Floating", "Location", "Cart", "Dropdown", "HIH", "FamilyHub"] },
    type: { control: "select", options: ["Solid", "Transparent"] },
    textColour: { control: "select", options: ["Black", "No heading"] },
    activeTab: { control: "inline-radio", options: ["You", "Family"] }
  },
  decorators: [(Story, context) => <div className="ds-page-header-story" data-surface={["HIH", "FamilyHub"].includes(context.args.usage) ? "filled" : "plain"}><Story /></div>]
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: () => (
    <div className="ds-page-header-variants">
      <div className="ds-page-header-variants__surface"><PageHeader usage="Floating" /></div>
      <div className="ds-page-header-variants__surface"><PageHeader usage="Location" type="Transparent" /></div>
      <div className="ds-page-header-variants__surface"><PageHeader usage="Location" type="Solid" /></div>
      <div className="ds-page-header-variants__surface"><PageHeader usage="Cart" /></div>
      <div className="ds-page-header-variants__surface"><PageHeader usage="Dropdown" /></div>
      <div className="ds-page-header-variants__surface ds-page-header-variants__surface--glass"><PageHeader usage="HIH" /></div>
      <div className="ds-page-header-variants__surface ds-page-header-variants__surface--glass"><PageHeader usage="FamilyHub" textColour="Black" /></div>
      <div className="ds-page-header-variants__surface ds-page-header-variants__surface--glass"><PageHeader usage="FamilyHub" textColour="No heading" /></div>
    </div>
  )
};

export const Usage: Story = {
  render: () => (
    <div className="ds-page-header-usage">
      <section><h2>Homepage</h2><div className="ds-page-header-phone ds-page-header-phone--mint"><PageHeader usage="Floating" /></div></section>
      <section><h2>Homepage</h2><div className="ds-page-header-phone"><PageHeader usage="Location" type="Solid" /></div></section>
      <section><h2>Transient</h2><div className="ds-page-header-phone"><PageHeader usage="Dropdown" /></div></section>
      <section><h2>Transient / Transparent</h2><div className="ds-page-header-phone ds-page-header-phone--mint"><PageHeader usage="Dropdown" /></div></section>
    </div>
  )
};
