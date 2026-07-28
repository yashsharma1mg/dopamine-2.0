# VerticalTabs

An 88px vertical category rail; the selected item gets a dark chip, bold label and a right indicator bar.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Navigation
- **Import:** `import { VerticalTabs } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** vertical tabs, side tabs, category rail, vertical navigation rail, left tab menu

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | `VerticalTabItem[]` | yes |  | Items (label, icon?). |
| `activeIndex` | `number` | no | `0` | Selected item (controlled). |
| `onChange` | `(index: number) => void` | no |  | Change handler. |

## Variants / sizes / states
- **Variants:** Selected item (any index)
- **Sizes:** 88px wide
- **States:** Active per index

## Usage
**Do**
- Use for a category rail beside a content panel.
- Keep exactly one active item.

**Don't**
- Do not use for a long flat list — it is a category switcher.

## Accessibility
- Renders a vertical tablist; add arrow-key navigation and panel association in the consumer.

## Example
```tsx
import { VerticalTabs } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <VerticalTabs items="…" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6429-2319)
