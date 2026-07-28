# SearchBar

A pill search field whose contents change by state, with an optional entry button.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Navigation
- **Import:** `import { SearchBar } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** search bar, search input, search field with voice, search with back button

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `state` | `"Default" \| "selected" \| "typing"` | no | `Default` | Figma state variant. |
| `type` | `"Bar Only" \| "Bar with entry"` | no | `Bar Only` | Adds a trailing entry button. |
| `placeholder` | `string` | no |  | Resting placeholder. |
| `value` | `string` | no |  |  |
| `hint` | `string` | no |  | Rotating-hint text shown after "Search for" in the selected state. |
| `onBack` | `() => void` | no |  |  |
| `onClear` | `() => void` | no |  |  |
| `onMic` | `() => void` | no |  |  |
| `onEntry` | `() => void` | no |  |  |
| `entryIcon` | `ReactNode` | no |  |  |

## Variants / sizes / states
- **Variants:** Bar Only, Bar with entry
- **Sizes:** Single (328 × 52px)
- **States:** Default, selected, typing

## Usage
**Do**
- Show the back arrow only once the bar is engaged.
- Swap the trailing control by state: search → mic → clear.

**Don't**
- Do not show mic and clear at once.

## Accessibility
- Wrap in role=search with a labelled input.
- Every icon button needs an aria-label.

## Example
```tsx
import { SearchBar } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <SearchBar state="Default" type="Bar Only" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6425-2956)
