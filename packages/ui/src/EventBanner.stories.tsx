import type { Meta, StoryObj } from "@storybook/react-vite";
import { EventBanner, type EventBannerBottomMessage, type EventBannerItems } from "./EventBanner";

const itemsOptions: EventBannerItems[] = ["none", "1", "2", "3", "4", ">4"];
const bottomOptions: EventBannerBottomMessage[] = ["2", "1", "none"];

const meta = {
  id: "components-event-banner",
  title: "Components/EventBanner",
  component: EventBanner,
  tags: ["autodocs", "test"],
  args: { items: "none", bottomMessage: "2", title: "Lorem ispum.", text: "Lorem ipsum." },
  argTypes: {
    items: { control: "select", options: itemsOptions },
    bottomMessage: { control: "inline-radio", options: bottomOptions }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 event banner (Event Promotion Section): Items (none/1/2/3/4/>4) × Bottom message (none/1/2). Bottom message 2 = message + pagination dots, 1 = message only, none = no message." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
    layout: "padded"
  }
} satisfies Meta<typeof EventBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = { render: (args) => <EventBanner {...args} /> };

export const FigmaVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 328px)", gap: 24 }}>
      {itemsOptions.map((items) =>
        bottomOptions.map((bottomMessage) => (
          <EventBanner {...args} key={`${items}-${bottomMessage}`} items={items} bottomMessage={bottomMessage} />
        ))
      )}
    </div>
  )
};
