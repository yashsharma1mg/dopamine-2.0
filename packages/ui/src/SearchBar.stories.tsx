import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchBar, type SearchState, type SearchType } from "./SearchBar";

const states: SearchState[] = ["Default", "selected", "typing"];
const types: SearchType[] = ["Bar Only", "Bar with entry"];

const meta = {
  title: "Components/Search Bar",
  component: SearchBar,
  tags: ["autodocs", "test"],
  args: { state: "Default", type: "Bar Only" },
  argTypes: {
    state: { control: "inline-radio", options: states },
    type: { control: "inline-radio", options: types }
  },
  parameters: {
    docs: { description: { component: "Figma variants for the Dopamine2.0 search bar: Default / selected / typing × Bar Only / Bar with entry." } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: false }] } },
    layout: "padded"
  }
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FigmaVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
      {types.map((type) => (
        <div key={type} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ font: "600 13px/1.4 Figtree, sans-serif" }}>{type}</span>
          {states.map((state) => (
            <SearchBar key={state} state={state} type={type} />
          ))}
        </div>
      ))}
    </div>
  )
};
