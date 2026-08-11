# ProductInformation

PDP information accordion: collapsible sections (title + rotating chevron) with an optional See more / See less read-more.

- **Package:** `@dopamine2.0/ui` · **Status:** ready · **Category:** Display
- **Import:** `import { ProductInformation } from "@dopamine2.0/ui";`
- Load the stylesheet once at your app root: `import "@dopamine2.0/ui/styles.css";`

**Use when the user asks for:** product information, pdp accordion, collapsible sections, dosage key usage faq accordion, expandable content sections, see more see less

## Props
| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `sections` | `ProductInfoSection[]` | no | `7 sample sections` | Sections { title, content, defaultOpen?, readMore? }. |

## Variants / sizes / states
- **Variants:** configurable sections
- **Sizes:** 360px width
- **States:** expanded / collapsed per section; read-more clamped / expanded

## Usage
**Do**
- Use for long PDP content split into named sections.
- Mark long sections `readMore`.

**Don't**
- Do not open every section by default.

## Accessibility
- Headers are buttons with aria-expanded; the chevron rotates on expand.

## Example
```tsx
import { ProductInformation } from "@dopamine2.0/ui";
import "@dopamine2.0/ui/styles.css";

export default function Example() {
  return <ProductInformation />;
}
```

[Figma source](https://www.figma.com/design/BsQQUym4xOYfOs419MpBBX/Components-%7C-Dopamine-2.0?node-id=6933-2425)
