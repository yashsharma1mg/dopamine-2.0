import { type CSSProperties } from "react";
import { Navigation, QuickLinks, Sticky } from "../index.js";

/**
 * Pattern: Homepage.
 *
 * The 1mg home screen (Figma 6918-9055): the composite top navigation (location, profile/cart,
 * category tabs, search + upload prescription), the "For you" quick links (shortcut tiles + a
 * delivery promo), and a sticky redirection bar pinned to the bottom.
 */

const shell: CSSProperties = {
  background: "var(--semantic-color-background-primary)",
  border: "1px solid var(--semantic-color-stroke-subtle)",
  borderRadius: 20,
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  height: 780,
  margin: "0 auto",
  overflow: "hidden",
  width: 360
};
const sticky: CSSProperties = { background: "var(--semantic-color-background-primary)", flex: "0 0 auto", position: "sticky", zIndex: 1 };
const body: CSSProperties = { flex: "1 1 auto", minHeight: 0, overflowY: "auto", paddingTop: "var(--space-16)" };

export function Homepage() {
  return (
    <div style={shell}>
      <div style={{ ...sticky, top: 0 }}>
        <Navigation type="for you-no scroll" />
      </div>
      <div style={body}>
        <QuickLinks type="For you" />
      </div>
      <div style={{ ...sticky, bottom: 0, borderTop: "1px solid var(--semantic-color-stroke-subtle)" }}>
        <Sticky type="Redirection" state="Default" />
      </div>
    </div>
  );
}
