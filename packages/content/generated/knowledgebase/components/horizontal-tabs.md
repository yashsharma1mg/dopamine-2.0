# HorizontalTabs

Horizontal tabs: underline (text or image chips) and highlighted segmented pills.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Navigation
- **Import:** `import { HorizontalTabs } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** horizontal tabs, tab bar, underline tabs, segmented control, tab navigation, category tabs

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"underline" \| "highlighted"` | no | `underline` | Tab style. |
| `items` | `HorizontalTabItem[]` | yes |  | Tabs (label, subtext?, icon?). |
| `activeIndex` | `number` | no | `0` | Selected tab (controlled). |
| `onChange` | `(index: number) => void` | no |  |  |
| `withImages` | `boolean` | no | `false` | underline type only: show 64px image chips above the label. |

## Variants / sizes / states
- **Variants:** underline (text / with images), highlighted (2 tabs, optional icon + subtext)
- **Sizes:** Underline: 80px tabs · Highlighted: 328px
- **States:** Active per index

## Usage
**Do**
- Use underline tabs for content sections; highlighted for a compact toggle.
- Keep exactly one active tab.

**Don't**
- Do not use highlighted for more than a few short segments.

## Accessibility
- Renders a tablist of tabs with aria-selected.
- Add arrow-key roving tabindex and a tabpanel in the consumer.

## Example
```tsx
import { HorizontalTabs } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <HorizontalTabs items="…" type="underline" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6428-2280)
