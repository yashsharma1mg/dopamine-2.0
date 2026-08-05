import { type HTMLAttributes } from "react";
import { CloseButton, SelectRadio, RemoveButton } from "./overlayParts.js";

export type QuantitySelectorProps = Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  heading?: string;
  /** Selectable values. Defaults to 1–6. */
  options?: Array<string | number>;
  selectedIndex?: number;
  /** Show the Remove footer. */
  removeButton?: boolean;
  onSelect?: (index: number) => void;
  onRemove?: () => void;
  onClose?: () => void;
};

/**
 * A modal single-select quantity picker over a scrim: a heading, a scrollable radio list (the
 * selected row gets a coral tint + coral tick), and an optional Remove footer.
 */
export function QuantitySelector({
  heading = "Heading",
  options = [1, 2, 3, 4, 5, 6],
  selectedIndex = 0,
  removeButton = false,
  onSelect,
  onRemove,
  onClose,
  className = "",
  ...props
}: QuantitySelectorProps) {
  return (
    <div className={`ds-qsel ${className}`.trim()} role="dialog" aria-modal="true" {...props}>
      <div className="ds-qsel__stage">
        <CloseButton onClick={onClose} />
        <div className="ds-qsel__card">
          <div className="ds-qsel__header">{heading}</div>
          <div className="ds-qsel__list" role="radiogroup" aria-label={heading}>
            {options.map((o, i) => (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={i === selectedIndex}
                className="ds-qsel__row"
                data-selected={i === selectedIndex || undefined}
                onClick={() => onSelect?.(i)}
              >
                <span className="ds-qsel__val">{o}</span>
                <SelectRadio selected={i === selectedIndex} />
              </button>
            ))}
          </div>
          {removeButton && <RemoveButton onClick={onRemove} />}
        </div>
      </div>
    </div>
  );
}
