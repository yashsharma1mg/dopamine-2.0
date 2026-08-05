# Bottomsheet

A sheet that slides up from the bottom over a scrim, with floating close (and optional back) controls.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Feedback
- **Import:** `import { Bottomsheet } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** bottom sheet, bottomsheet, slide up sheet, action sheet, drawer, modal sheet, half sheet

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `subtitle` | `string` | no |  | Optional subheading under the title (body-14, tertiary). |
| `backButton` | `boolean` | no | `false` | Show the floating back button (top-left). |
| `onClose` | `() => void` | no |  |  |
| `onBack` | `() => void` | no |  |  |
| `title` | `string` | no |  | Header title (adds the header + divider). |
| `children` | `ReactNode` | no |  | Sheet body. |

## Variants / sizes / states
- **Variants:** default, with subheading
- **Sizes:** 360px width
- **States:** No header vs title + subtitle; back button optional

## Usage
**Do**
- Use for contextual content/actions without leaving the screen.
- Keep the sheet body scrollable when content overflows.

**Don't**
- Do not stack multiple bottom sheets.
- Do not use for a simple confirmation — use Dialog.

## Accessibility
- role=dialog, aria-modal.
- The close and back controls are labelled buttons.

## Example
```tsx
import { Bottomsheet } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <Bottomsheet />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6703-6222)
