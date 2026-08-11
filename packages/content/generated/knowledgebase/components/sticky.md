# Sticky

Sticky bottom bars: Redirection (status), Rating, Standard, and a floating Video pill.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Feedback
- **Import:** `import { Sticky } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** sticky bar, bottom notification bar, delivery tracker sticky, rating prompt bar, floating video pill

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"Redirection" \| "Rating" \| "Standard" \| "Video"` | no | `Redirection` | Figma type. |
| `state` | `"Rating" \| "Video" \| "Default" \| "Error" \| "Delivery" \| "2 deliveries" \| "Multiple Delivery" \| "1 button"` | no | `Default` | Redirection state. |
| `subtitle` | `string` | no |  |  |
| `image` | `ReactNode` | no |  | Redirection thumbnail; defaults to the Figma prescription tile. |
| `onClose` | `() => void` | no |  |  |
| `onAction` | `() => void` | no |  |  |

## Variants / sizes / states
- **Variants:** Redirection, Rating, Standard, Video
- **Sizes:** 360px wide (Video 160 × 320px)
- **States:** Redirection: Default / Error / Delivery / 2 deliveries / Multiple Delivery

## Usage
**Do**
- Use Redirection for actionable status; Rating/Standard for a single dismissible prompt.
- Show “+N more” / dots only when deliveries stack.

**Don't**
- Do not stack multiple sticky bars.
- Do not omit the dismiss on promo bars.

## Accessibility
- Close/Track/Rate are labelled buttons; the star row is a radiogroup.
- Check text-on-colour contrast for Rating/Standard.

## Example
```tsx
import { Sticky } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Sticky type="Redirection" state="Default" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6525-593)
