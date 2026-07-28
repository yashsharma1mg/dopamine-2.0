# SwipeIndicator

A thin progress / pagination bar: line-filling or staggered, in Normal and Small.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Navigation
- **Import:** `import { SwipeIndicator } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** swipe indicator, progress bar, carousel dots, pagination indicator, step progress, onboarding progress

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"line-filling" \| "staggered"` | no | `line-filling` | Fill behaviour. |
| `size` | `"Normal" \| "Small"` | no | `Normal` | 216px or 48px. |
| `total` | `number` | no | `4` | total number of steps/pages. |
| `current` | `number` | no | `1` | current step, 1-based. |

## Variants / sizes / states
- **Variants:** Line Filling, Staggered
- **Sizes:** Normal (216px), Small (48px)
- **States:** current step (1-based)

## Usage
**Do**
- Use line-filling for progress; staggered for carousel position.

**Don't**
- Do not use for more steps than comfortably fit the width.

## Accessibility
- Renders role=progressbar with aria-valuemin/max/now.

## Example
```tsx
import { SwipeIndicator } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <SwipeIndicator type="line-filling" size="Normal" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6401-1174)
