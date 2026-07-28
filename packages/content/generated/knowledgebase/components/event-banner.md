# EventBanner

A promotional card with a hero image, an optional item strip, and an optional message with dots.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Display
- **Import:** `import { EventBanner } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** event banner, promo card, event promotion section, banner with thumbnails, carousel promo banner

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | `"none" \| "1" \| "2" \| "3" \| "4" \| ">4"` | no | `none` | Number of thumbnail items in the strip. ">4" shows 5 (overflowing/clipped). |
| `bottomMessage` | `"none" \| "1" \| "2"` | no | `2` | none = no message row · 1 = message · 2 = message + pagination dots. |
| `text` | `string` | no |  |  |
| `onAction` | `() => void` | no |  |  |
| `title` | `string` | no |  | Bold message title. |

## Variants / sizes / states
- **Variants:** items: none / 1 / 2 / 3 / 4 / >4, bottom message: none / 1 / 2
- **Sizes:** 328px wide; 248 / 211 / 281px tall
- **States:** Content configurations (not interaction states)

## Usage
**Do**
- Use the dots when the banner is one of a swipeable set.
- Keep the message to a single line.

**Don't**
- Do not stuff more than 5 thumbnails — use “>4”.

## Accessibility
- Expose the action via the chevron button.
- Real images must carry meaningful alt text.

## Example
```tsx
import { EventBanner } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <EventBanner items="none" bottomMessage="2" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6453-598)
