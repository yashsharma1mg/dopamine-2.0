# Pattern: Homepage

The 1mg home screen, composed from Dopamine2.0 components (Figma 6918-9055): the composite top
navigation, the "For you" quick links, and a sticky redirection bar pinned to the bottom.

This is a **layout recipe** — it wires existing components together and lets each render its
built-in content.

## Components used (top → bottom)

| Slot | Component | Config |
|---|---|---|
| Header | `Navigation` | `type="for you-no scroll"` (location, profile/cart, tabs, search + upload) |
| Quick links | `QuickLinks` | `type="For you"` (shortcut tiles + delivery promo) |
| Sticky bar | `Sticky` | `type="Redirection"` |

## Recipe

```tsx
import "@dopamine2.0/ui/styles.css";
import { Navigation, QuickLinks, Sticky } from "@dopamine2.0/ui";

export function Homepage() {
  const shell: React.CSSProperties = {
    width: 360, height: 780, margin: "0 auto", boxSizing: "border-box",
    display: "flex", flexDirection: "column", overflow: "hidden",
    background: "var(--semantic-color-background-primary)",
    border: "1px solid var(--semantic-color-stroke-subtle)", borderRadius: 20
  };
  const sticky: React.CSSProperties = { position: "sticky", zIndex: 1, flex: "0 0 auto", background: "var(--semantic-color-background-primary)" };
  const body: React.CSSProperties = { flex: "1 1 auto", minHeight: 0, overflowY: "auto", paddingTop: "var(--space-16)" };

  return (
    <div style={shell}>
      <div style={{ ...sticky, top: 0 }}><Navigation type="for you-no scroll" /></div>
      <div style={body}><QuickLinks type="For you" /></div>
      <div style={{ ...sticky, bottom: 0, borderTop: "1px solid var(--semantic-color-stroke-subtle)" }}>
        <Sticky type="Redirection" state="Default" />
      </div>
    </div>
  );
}
```

## Do / Don't
- **Do** reuse the components as-is and choose each one's variant.
- **Don't** rebuild sections by hand or hard-code colours — every component carries the tokens.
