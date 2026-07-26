import { type HTMLAttributes, type ReactNode } from "react";

export type ActionBarOrientation = "horizontal" | "vertical";

export type ActionBarProps = HTMLAttributes<HTMLDivElement> & {
  /** Optional left-side summary block (price / link / label) shown before the actions. */
  billing?: ReactNode;
  /** Stack the action buttons vertically (full-width) instead of side by side. */
  orientation?: ActionBarOrientation;
};

/**
 * Sticky bottom action bar. A layout container — pass Button(s) as children and an
 * optional `billing` summary node. Buttons stretch to fill unless a billing block is present.
 */
export function ActionBar({ billing, orientation = "horizontal", children, className = "", ...props }: ActionBarProps) {
  return (
    <div className={`ds-action-bar ${className}`.trim()} {...props}>
      <div className="ds-action-bar__content" data-orientation={orientation} data-has-billing={billing ? "" : undefined}>
        {billing && <div className="ds-action-bar__billing">{billing}</div>}
        {children}
      </div>
    </div>
  );
}
