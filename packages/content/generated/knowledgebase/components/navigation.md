# Navigation

A composite top header: location pill, profile/cart, a category tab strip, and a search row.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Navigation
- **Import:** `import { Navigation } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** navigation header, top nav bar, app header with tabs, location search nav, category tab strip

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `type` | `"labs" \| "pharmacy" \| "for you-no scroll" \| "CP-profile icon" \| "for you-scroll"` | no | `for you-no scroll` | Sets active tab + profile + trailing CTA. |
| `locationName` | `string` | no |  |  |
| `locationDetail` | `string` | no |  |  |
| `cartCount` | `number` | no | `3` | Cart badge count. |
| `searchHint` | `string` | no |  |  |
| `statusBar` | `boolean` | no |  | Show the phone status bar (time + signal/wifi/battery) above the header. |
| `statusTime` | `string` | no |  |  |
| `batteryLevel` | `number` | no |  |  |

## Variants / sizes / states
- **Variants:** labs, pharmacy, for you-no scroll, CP-profile icon, for you-scroll
- **Sizes:** 361px wide
- **States:** Per type: active tab, profile variant, trailing CTA

## Usage
**Do**
- Match the trailing CTA to the active surface.
- Keep exactly one active tab.

**Don't**
- Do not show more than one primary trailing CTA.
- Do not recolour the CP avatar.

## Accessibility
- Tab strip is a tablist with roving arrow-key navigation.
- Location, profile, cart, search and CTA are all labelled buttons.

## Example
```tsx
import { Navigation } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Navigation type="for you-no scroll" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6466-4967)
