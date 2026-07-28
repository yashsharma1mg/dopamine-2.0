# ActionBar

A sticky bottom bar that composes Button(s) with an optional billing summary.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Actions
- **Import:** `import { ActionBar } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** action bar, sticky bottom bar, bottom cta bar, checkout action bar, bill summary with button

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `billing` | `ReactNode` | no |  | Optional left-side summary block (price / link / label) shown before the actions. |
| `orientation` | `"horizontal" \| "vertical"` | no | `horizontal` | Stack the action buttons vertically (full-width) instead of side by side. |
| `children` | `ReactNode` | no |  | The Button(s). |

## Variants / sizes / states
- **Variants:** CTA with Billing (Pharma), CTA with Billing (Diagno), One Button, 2 Buttons, 2 Buttons Vertical
- **Sizes:** Single (360px wide)
- **States:** Layout presets (not interaction states)

## Usage
**Do**
- Keep the primary (Fill) action visually dominant; secondary is Outline.
- Stack vertically when both labels are long.

**Don't**
- Do not place more than two buttons.
- Do not recolour the composed buttons.

## Accessibility
- Render as a labelled region or footer.
- Primary action last (right / bottom) matching Figma.

## Example
```tsx
import { ActionBar } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <ActionBar orientation="horizontal" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6383-870)
