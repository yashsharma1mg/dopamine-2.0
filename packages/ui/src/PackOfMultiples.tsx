import { type HTMLAttributes } from "react";
import { CloseButton, SelectRadio, RemoveButton } from "./overlayParts.js";

export type PackOption = {
  /** Multiple, e.g. 2 → "x 2". */
  qty: number;
  /** Struck original price, e.g. "₹440". */
  mrp: string;
  /** Effective price, e.g. "₹186". */
  price: string;
  /** Discount tag, e.g. "55% off". */
  discount: string;
  /** Marks the row with the purple "Recommended" ribbon + tint. */
  recommended?: boolean;
  /** Extra-discount line shown on the recommended row, e.g. "10% extra discount". */
  extra?: string;
};

export type PackOfMultiplesProps = Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  heading?: string;
  options?: PackOption[];
  selectedIndex?: number;
  removeButton?: boolean;
  onSelect?: (index: number) => void;
  onRemove?: () => void;
  onClose?: () => void;
};

const DEFAULT_OPTIONS: PackOption[] = [
  { qty: 1, mrp: "₹440", price: "₹186", discount: "55% off" },
  { qty: 2, mrp: "₹440", price: "₹186", discount: "55% off" },
  { qty: 3, mrp: "₹440", price: "₹186", discount: "55% off", recommended: true, extra: "10% extra discount" },
  { qty: 4, mrp: "₹440", price: "₹186", discount: "55% off" }
];

/**
 * A modal "Select Quantity" picker for buying packs of an item. Each row shows the multiple,
 * struck MRP, effective price and a discount tag; an optional row carries a purple "Recommended"
 * ribbon + an extra-discount line. Selected row gets a coral tint + coral tick. Optional Remove.
 */
export function PackOfMultiples({
  heading = "Select Quantity",
  options = DEFAULT_OPTIONS,
  selectedIndex = 0,
  removeButton = false,
  onSelect,
  onRemove,
  onClose,
  className = "",
  ...props
}: PackOfMultiplesProps) {
  return (
    <div className={`ds-pack ${className}`.trim()} role="dialog" aria-modal="true" {...props}>
      <div className="ds-pack__stage">
        <CloseButton onClick={onClose} />
        <div className="ds-pack__card">
          <div className="ds-pack__header">{heading}</div>
          <div className="ds-pack__list" role="radiogroup" aria-label={heading}>
            {options.map((o, i) => (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={i === selectedIndex}
                className="ds-pack__row"
                data-selected={i === selectedIndex || undefined}
                data-recommended={o.recommended || undefined}
                onClick={() => onSelect?.(i)}
              >
                {o.recommended && <span className="ds-pack__ribbon">Recommended</span>}
                <span className="ds-pack__chip"><span className="ds-pack__chip-box" aria-hidden="true" />x&nbsp;{o.qty}</span>
                <span className="ds-pack__mid">
                  <span className="ds-pack__info">
                    <span className="ds-pack__prices">
                      <s>{o.mrp}</s>
                      <b>{o.price}</b>
                      <span className="ds-pack__off">{o.discount}</span>
                    </span>
                    {o.extra && <span className="ds-pack__extra">{o.extra}&nbsp;›</span>}
                  </span>
                  <SelectRadio selected={i === selectedIndex} />
                </span>
              </button>
            ))}
          </div>
          {removeButton && <RemoveButton onClick={onRemove} />}
        </div>
      </div>
    </div>
  );
}
