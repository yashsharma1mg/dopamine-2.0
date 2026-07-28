# PageHeader

A 360px mobile header for location, navigation, and Family Hub contexts.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Navigation
- **Import:** `import { PageHeader } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** page header, app bar, top bar, screen header, navigation header, location header

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `usage` | `"Floating" \| "Location" \| "Dropdown" \| "HIH" \| "FamilyHub"` | no | `Floating` | Figma header composition. |
| `type` | `"Solid" \| "Transparent"` | no | `Transparent` | Surface treatment used by Location. |
| `textColour` | `"Black" \| "No heading"` | no | `Black` | Shows or removes the Family Hub heading. |
| `heading` | `string` | no |  |  |
| `subtitle` | `string` | no |  |  |
| `locationName` | `string` | no |  |  |
| `locationDetail` | `string` | no |  |  |
| `cartCount` | `number` | no |  |  |
| `activeTab` | `"You" \| "Family"` | no | `You` | Current Family Hub tab. |
| `onBack` | `() => void` | no |  |  |
| `onLocationClick` | `() => void` | no |  |  |
| `onProfileClick` | `() => void` | no |  |  |
| `onCartClick` | `() => void` | no |  |  |
| `onMoreClick` | `() => void` | no |  |  |
| `onUploadClick` | `() => void` | no |  |  |
| `onTabChange` | `(tab: PageHeaderTab) => void` | no |  |  |

## Variants / sizes / states
- **Variants:** Floating, Location, Dropdown, HIH, FamilyHub
- **Sizes:** 360px mobile width
- **States:** Solid, Transparent, Black heading, No heading, You, Family

## Usage
**Do**
- Use Floating or Location on the homepage.
- Use Dropdown for transient pages.
- Use the transparent Dropdown over a non-white surface.

**Don't**
- Do not use this desktop-first or beyond its 360px mobile contract.
- Do not replace the supplied icon assets with arbitrary glyphs.

## Accessibility
- All actions are labelled native buttons.
- The Family Hub selector exposes tab semantics.
- Keyboard focus uses the Dopamine focus-ring token.

## Example
```tsx
import { PageHeader } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <PageHeader usage="Floating" type="Transparent" textColour="Black" />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6391-533&t=2b3pGoo58LPx32e2-4)
