# Tag

Compact labels and badges: coloured info badges, a notification count, a rating badge, and a NEW badge.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Display
- **Import:** `import { Tag } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** tag, badge, info badge, coloured label, status badge, notification count, notification dot, rating badge, new badge, chip label

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"info" \| "notification" \| "rating" \| "new"` | no | `info` | Which tag family to render. |
| `color` | `"Purple" \| "Yellow" \| "Blue" \| "Red" \| "Orange" \| "Green"` | no | `Purple` | Info-badge hue (info type only). |
| `count` | `number` | no | `1` | Notification count (notification type only). |
| `value` | `string \| number` | no | `4.2` | Rating value shown before the star (rating type only). |

## Variants / sizes / states
- **Variants:** Info Badge (Purple / Yellow / Blue / Red / Orange / Green), Notification tag, Rating Badge, New Badge
- **Sizes:** Tag (11px)
- **States:** Content variants (not interaction states)

## Usage
**Do**
- Use info badges to label status/category with a colour that carries meaning.
- Keep the label to one or two short words.
- Use the rating badge for a numeric score with the star.

**Don't**
- Do not use a tag as a button — it is non-interactive.
- Do not put long text in a badge.

## Accessibility
- Renders inline text; ensure the colour is not the only signal of meaning.
- The notification count should be mirrored in an accessible label on its owning control.

## Example
```tsx
import { Tag } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Tag type="info" color="Purple" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6394-1107)
