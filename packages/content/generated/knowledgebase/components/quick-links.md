# QuickLinks

Homepage quick links: a row of shortcut tiles plus a delivery promo (For you) or two outline pills (Labs).

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Navigation
- **Import:** `import { QuickLinks } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** quick links, homepage shortcuts, shortcut tiles, quick actions row, home quick links, reorder health plans tiles, labs quick links

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"For you" \| "Labs"` | no | `For you` | Which quick-links layout to render. |
| `items` | `QuickLinkTile[]` | no | `sample tiles` | The four shortcut tiles. |
| `actions` | `QuickLinkAction[]` | no | `Family hub / Insights` | Labs only: the two trailing outline pills. |
| `delivery` | `{ text: ReactNode; count?: string; pages?: number; }` | no | `30-min promo` | For you only: the delivery promo (text + pager count e.g. "1/4"). |
| `onTile` | `(index: number) => void` | no |  |  |
| `onAction` | `(index: number) => void` | no |  |  |
| `onDelivery` | `() => void` | no |  |  |

## Variants / sizes / states
- **Variants:** For you, Labs
- **Sizes:** 360px width
- **States:** For you (icon tiles + delivery) vs Labs (labelled tiles + pills)

## Usage
**Do**
- Use directly under the homepage header.
- Keep to four tiles per row.

**Don't**
- Do not mix For-you and Labs tiles in one strip.

## Accessibility
- Tiles, pills and the delivery card are buttons.

## Example
```tsx
import { QuickLinks } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <QuickLinks type="For you" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6934-4002)
