import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SwipeIndicator, type SwipeIndicatorSize, type SwipeIndicatorType } from "./SwipeIndicator";
import { EventBanner } from "./EventBanner";

const meta = {
  id: "components-swipe-indicator",
  title: "Components/SwipeIndicator",
  component: SwipeIndicator,
  tags: ["autodocs", "test"],
  args: { type: "line-filling", size: "Normal", total: 4, current: 1 },
  argTypes: {
    type: { control: "inline-radio", options: ["line-filling", "staggered"] },
    size: { control: "inline-radio", options: ["Normal", "Small"] },
    total: { control: { type: "number", min: 2, max: 8 } },
    current: { control: { type: "number", min: 1, max: 8 } }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 swipe/progress indicator: Line Filling (cumulative fill) and Staggered (sliding segment), in Normal (216px) and Small (48px)." } },
    layout: "padded"
  }
} satisfies Meta<typeof SwipeIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const row = (type: SwipeIndicatorType, size: SwipeIndicatorSize, label: string) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <span style={{ font: "600 12px/1.4 Figtree", color: "#626a7a" }}>{label}</span>
    {[1, 2, 3, 4].map((c) => (
      <SwipeIndicator key={c} type={type} size={size} total={4} current={c} />
    ))}
  </div>
);

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
      {row("line-filling", "Normal", "Normal · Line Filling")}
      {row("staggered", "Normal", "Normal · Staggered")}
      {row("staggered", "Small", "Small · Default")}
    </div>
  )
};

const SLIDES = [
  { title: "Monsoon health sale", text: "Up to 40% off" },
  { title: "Free lab tests", text: "On orders above ₹999" },
  { title: "Care Plan launch", text: "Doctor consults included" },
  { title: "Vitamins restock", text: "New arrivals inside" }
];

// Real carousel: drag / swipe the Event Banners and the indicator tracks the active slide.
function SwipeableBanners({ type }: { type: SwipeIndicatorType }) {
  const [current, setCurrent] = useState(1);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });

  const onScroll = () => {
    const el = track.current;
    if (el) setCurrent(Math.round(el.scrollLeft / el.clientWidth) + 1);
  };
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = track.current!;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    track.current!.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const end = () => (drag.current.down = false);

  return (
    <div style={{ width: 328, userSelect: "none" }}>
      <style>{`.swipe-demo-track::-webkit-scrollbar{display:none}`}</style>
      <div
        ref={track}
        className="swipe-demo-track"
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={end}
        onPointerCancel={end}
        style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", borderRadius: 16, cursor: "grab", scrollbarWidth: "none" }}
      >
        {SLIDES.map((s, i) => (
          <div key={i} style={{ flex: "0 0 100%", scrollSnapAlign: "start" }}>
            <EventBanner items="3" bottomMessage="1" title={s.title} text={s.text} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
        <SwipeIndicator type={type} total={SLIDES.length} current={current} />
      </div>
    </div>
  );
}

export const Swipeable: Story = {
  name: "Swipeable (Event Banner carousel)",
  args: { type: "line-filling" },
  argTypes: { size: { table: { disable: true } }, total: { table: { disable: true } }, current: { table: { disable: true } } },
  render: (args) => <SwipeableBanners type={args.type ?? "line-filling"} />,
  parameters: {
    docs: { description: { story: "Drag or swipe the Event Banners left/right — the swipe indicator tracks the active slide. Switch the `type` control between line-filling and staggered." } }
  }
};
