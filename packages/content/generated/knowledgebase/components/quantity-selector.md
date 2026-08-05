# QuantitySelector

A modal single-select quantity picker over a scrim: a heading, a scrollable radio list, and an optional Remove footer.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Selection
- **Import:** `import { QuantitySelector } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** quantity selector, quantity picker, select quantity, number picker, option picker, single select list, radio list sheet

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `heading` | `string` | no | `Heading` | Card heading. |
| `options` | `(string \| number)[]` | no | `[1..6]` | Selectable values. Defaults to 1–6. |
| `selectedIndex` | `number` | no | `0` | Index of the selected option. |
| `removeButton` | `boolean` | no | `false` | Show the Remove footer. |
| `onSelect` | `(index: number) => void` | no |  | Selection callback. |
| `onRemove` | `() => void` | no |  |  |
| `onClose` | `() => void` | no |  |  |

## Variants / sizes / states
- **Variants:** without remove button, with remove button
- **Sizes:** 328px width
- **States:** Selected row; Remove footer optional

## Usage
**Do**
- Use to pick one quantity/option from a bounded list.
- Add the Remove footer when the item can be removed entirely.

**Don't**
- Do not use for multi-select — this is single-select.

## Accessibility
- role=radiogroup with aria-checked rows.
- Remove is a labelled button.

## Example
```tsx
import { QuantitySelector } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <QuantitySelector />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6703-6776)
