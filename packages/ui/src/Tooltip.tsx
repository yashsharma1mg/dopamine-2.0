import { type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";
import { Tag } from "./Tag.js";

export type TooltipVariant = "Top left" | "Top right" | "Bottom left" | "Bottom right";

export type TooltipProps = HTMLAttributes<HTMLDivElement> & {
  /** Tail placement — which edge/side the arrow sits on. */
  variant?: TooltipVariant;
  /** Message text. */
  children?: ReactNode;
  /** Leading circular icon. */
  leadIcon?: boolean;
  /** Show the green NEW pill. */
  newPill?: boolean;
  /** Show the trailing close (✕). */
  closeIcon?: boolean;
  onClose?: () => void;
};

export function Tooltip({
  variant = "Top left",
  children,
  leadIcon = true,
  newPill = true,
  closeIcon = true,
  onClose,
  className = "",
  ...props
}: TooltipProps) {
  return (
    <div className={`ds-tooltip ${className}`.trim()} data-variant={variant} role="tooltip" {...props}>
      <div className="ds-tooltip__bubble">
        {leadIcon && (
          <span className="ds-tooltip__lead" aria-hidden="true">
            <DsIcon name="insights" size={16} />
          </span>
        )}
        {newPill && <Tag type="new" />}
        <p className="ds-tooltip__text">{children ?? "Your order will be delivered here"}</p>
        {closeIcon && (
          <button type="button" className="ds-tooltip__close" aria-label="Dismiss" onClick={onClose}>
            <DsIcon name="cross" size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
