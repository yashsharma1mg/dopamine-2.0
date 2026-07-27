import { Icon } from "./Icon.js";

/**
 * Renders a Dopamine iconography asset (packages served from /assets/dopamine/icons).
 * The asset is masked and painted with `currentColor`, so colour is inherited from
 * the surrounding text just like the old inline SVGs were.
 */
export function DsIcon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  return <Icon src={`/assets/dopamine/icons/${name}.svg`} size={size} className={className} />;
}
