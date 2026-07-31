# CarePlanCard

Care Plan upsell card (cream gradient) — added / updated benefit summaries or a not-added illustrated pitch.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Cart
- **Import:** `import { CarePlanCard } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** care plan card, careplan, membership upsell, plan card, subscription card, add plan

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"Added" \| "Not Added" \| "updated"` | no | `Added` | Care Plan card state. |
| `onAction` | `() => void` | no |  | Add Plan / Remove handler. |

## Variants / sizes / states
- **Variants:** Added, Not Added, updated
- **Sizes:** 328px card
- **States:** Plan added / updated (Remove) vs not added (Add Plan)

## Usage
**Do**
- Show the extra saving amount in the header for added/not-added.
- Use the dark Add Plan button only in the not-added state.

**Don't**
- Do not show Remove when the plan is not added.

## Accessibility
- Add Plan / Remove are real buttons; wire onAction.
- Benefit ticks are decorative — text carries the meaning.

## Example
```tsx
import { CarePlanCard } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <CarePlanCard type="Added" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6763-4245)
