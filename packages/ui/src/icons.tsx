import { Icon } from "./Icon.js";
import { iconData } from "./generated/icon-data.js";

/**
 * Renders a Dopamine iconography asset. The SVG is inlined as a data-URI at
 * build time (see scripts/generate-icon-data.mjs), so the package is fully
 * self-contained — no runtime dependency on external asset URLs. The glyph is
 * masked and painted with `currentColor`, inheriting colour from surrounding
 * text just like the old inline SVGs.
 */
export function DsIcon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  return <Icon src={iconData[`icons/${name}`] ?? ""} size={size} className={className} />;
}
