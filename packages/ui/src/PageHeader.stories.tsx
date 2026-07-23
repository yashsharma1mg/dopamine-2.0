import type { Meta, StoryObj } from "@storybook/react-vite";

import { PageHeader, PageHeaderStatusBar } from "./PageHeader";

const meta = {
  title: "Components/Page Header",
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
    usage: { control: "select", options: ["Floating", "Location", "Dropdown", "HIH", "FamilyHub"] },
    type: { control: "select", options: ["Solid", "Transparent"] },
    textColour: { control: "select", options: ["Black", "No heading"] },
    activeTab: { control: "inline-radio", options: ["You", "Family"] }
  },
  decorators: [(Story) => <div className="ds-page-header-story"><Story /></div>]
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: () => (
    <div className="ds-page-header-variants">
      <div><PageHeaderStatusBar /><PageHeader usage="Floating" /></div>
      <PageHeader usage="Location" type="Transparent" />
      <PageHeader usage="Location" type="Solid" />
      <PageHeader usage="Dropdown" />
      <PageHeader usage="HIH" />
      <PageHeader usage="FamilyHub" textColour="Black" />
      <PageHeader usage="FamilyHub" textColour="No heading" />
    </div>
  )
};

export const Usage: Story = {
  render: () => (
    <div className="ds-page-header-usage">
      <section><h2>Homepage</h2><div className="ds-page-header-phone ds-page-header-phone--mint"><PageHeaderStatusBar /><PageHeader usage="Floating" /></div></section>
      <section><h2>Homepage</h2><div className="ds-page-header-phone"><PageHeader usage="Location" type="Solid" /></div></section>
      <section><h2>Transient</h2><div className="ds-page-header-phone"><PageHeader usage="Dropdown" /></div></section>
      <section><h2>Transient / Transparent</h2><div className="ds-page-header-phone ds-page-header-phone--mint"><PageHeader usage="Dropdown" /></div></section>
    </div>
  )
};
