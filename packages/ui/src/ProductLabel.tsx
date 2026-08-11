import { type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";

export type ProductLabelItem = {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  /** Dotted underline on the description (a tappable info affordance). */
  underline?: boolean;
};

export type ProductLabelProps = HTMLAttributes<HTMLDivElement> & {
  items?: ProductLabelItem[];
};

const DEFAULT_ITEMS: ProductLabelItem[] = [
  { icon: <DsIcon name="tick" size={16} />, title: "Genuine", description: "Authenticity assured" },
  { icon: <DsIcon name="prescription" size={16} />, title: "Prescription", description: "required", underline: true },
  { icon: <DsIcon name="trend-up" size={16} />, title: "4,629 people", description: "bought recently" }
];

/**
 * PDP feature strip: a row of trust/feature badges (icon + bold title / secondary description),
 * separated by vertical dividers.
 */
export function ProductLabel({ items = DEFAULT_ITEMS, className = "", ...props }: ProductLabelProps) {
  return (
    <div className={`ds-plabel ${className}`.trim()} {...props}>
      <div className="ds-plabel__row">
        {items.map((it, i) => (
          <div key={i} className="ds-plabel__group">
            {i > 0 && <span className="ds-plabel__divider" aria-hidden="true" />}
            <div className="ds-plabel__item">
              <div className="ds-plabel__head">
                <span className="ds-plabel__icon" aria-hidden="true">{it.icon}</span>
                <span className="ds-plabel__title">{it.title}</span>
              </div>
              <span className="ds-plabel__desc" data-underline={it.underline || undefined}>{it.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
