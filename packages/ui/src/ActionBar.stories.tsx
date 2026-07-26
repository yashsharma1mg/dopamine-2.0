import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionBar } from "./ActionBar";
import { Button } from "./Button";
import { PageHeader } from "./PageHeader";

const pharmaBilling = (
  <>
    <span className="ds-action-bar__price">₹69,420</span>
    <span className="ds-action-bar__link">see bill summary</span>
  </>
);

const diagnoBilling = (
  <>
    <span className="ds-action-bar__label">Test added</span>
    <span className="ds-action-bar__count">
      69
      <span className="ds-action-bar__badge" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path d="M3.5 8.5 7 5l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  </>
);

const meta = {
  title: "Components/Action Bar",
  component: ActionBar,
  tags: ["autodocs", "test"],
  args: { orientation: "horizontal" },
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 action bar — a sticky bottom bar composing the Button component, with optional billing summary. Types: CTA with Billing (Pharma / Diagno) and Buttons Only (One / 2 / 2 Vertical)." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
    layout: "padded"
  }
} satisfies Meta<typeof ActionBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <ActionBar {...args}>
      <Button size="Medium" type="Outline">Button</Button>
      <Button size="Medium" type="Fill">Button</Button>
    </ActionBar>
  )
};

const label = (t: string) => <span style={{ font: "600 12px/1.4 Figtree, sans-serif", color: "#626a7a" }}>{t}</span>;

function PhoneFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {label(title)}
      <div
        style={{
          width: 377, // 361px PageHeader/ActionBar width + 2×8px frame border
          height: 640,
          border: "8px solid #181a1f",
          borderRadius: 40,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff"
        }}
      >
        {/* real design-system header — Location variant (status bar + "To Office" + cart) */}
        <PageHeader usage="Location" type="Solid" />
        {/* body spacer pushes the action bar to the bottom */}
        <div style={{ flex: 1 }} />
        {children}
      </div>
    </div>
  );
}

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-start" }}>
      {label("CTA with Billing · Pharma")}
      <ActionBar billing={pharmaBilling}><Button size="Medium" type="Fill">Button</Button></ActionBar>

      {label("CTA with Billing · Diagno")}
      <ActionBar billing={diagnoBilling}><Button size="Medium" type="Fill">Button</Button></ActionBar>

      {label("Buttons Only · One Button")}
      <ActionBar><Button size="Medium" type="Fill">Button</Button></ActionBar>

      {label("Buttons Only · 2 Buttons")}
      <ActionBar>
        <Button size="Medium" type="Outline">Button</Button>
        <Button size="Medium" type="Fill">Button</Button>
      </ActionBar>

      {label("Buttons Only · 2 Buttons Vertical")}
      <ActionBar orientation="vertical">
        <Button size="Medium" type="Fill">Button</Button>
        <Button size="Medium" type="Outline">Button</Button>
      </ActionBar>
    </div>
  )
};

// Mirrors the Figma "Action Bar usage" section (node 6628-4691):
// the bar pinned to the bottom of a screen, one per variant.
export const UseCases: Story = {
  parameters: { layout: "fullscreen" },
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap", padding: 24, background: "#f7f8fa" }}>
      <PhoneFrame title="CTA with Billing · Pharma">
        <ActionBar billing={pharmaBilling}><Button size="Medium" type="Fill">Button</Button></ActionBar>
      </PhoneFrame>
      <PhoneFrame title="CTA with Billing · Diagno">
        <ActionBar billing={diagnoBilling}><Button size="Medium" type="Fill">Button</Button></ActionBar>
      </PhoneFrame>
      <PhoneFrame title="Buttons Only · One Button">
        <ActionBar><Button size="Medium" type="Fill">Button</Button></ActionBar>
      </PhoneFrame>
      <PhoneFrame title="Buttons Only · 2 Buttons Vertical">
        <ActionBar orientation="vertical">
          <Button size="Medium" type="Fill">Button</Button>
          <Button size="Medium" type="Outline">Button</Button>
        </ActionBar>
      </PhoneFrame>
      <PhoneFrame title="Buttons Only · 2 Buttons">
        <ActionBar>
          <Button size="Medium" type="Outline">Button</Button>
          <Button size="Medium" type="Fill">Button</Button>
        </ActionBar>
      </PhoneFrame>
    </div>
  )
};
