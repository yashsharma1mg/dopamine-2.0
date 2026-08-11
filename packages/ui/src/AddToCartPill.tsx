import { type HTMLAttributes } from "react";
import { Button } from "./Button.js";

export type AddToCartPillState = "default" | "sticky";

export type AddToCartPillProps = HTMLAttributes<HTMLDivElement> & {
  state?: AddToCartPillState;
  /** Effective price, e.g. "₹371". */
  price?: string;
  /** Struck MRP, e.g. "₹100". */
  mrp?: string;
  /** Discount, e.g. "7% off". */
  discount?: string;
  /** Pack unit line, e.g. "30 tablets" (default state only). */
  unit?: string;
  /** Tax note, e.g. "(inclusive of all taxes)" (default state only). */
  taxNote?: string;
  addLabel?: string;
  onAdd?: () => void;
};

/**
 * PDP add-to-cart bar: price (effective / struck MRP / discount) and an ADD button. `default`
 * shows the pack + tax note; `sticky` is the compact bottom-bar variant.
 */
export function AddToCartPill({
  state = "default",
  price = "₹371",
  mrp = "₹100",
  discount = "7% off",
  unit = "30 tablets",
  taxNote = "(inclusive of all taxes)",
  addLabel = "ADD",
  onAdd,
  className = "",
  ...props
}: AddToCartPillProps) {
  const prices = (
    <span className="ds-atc__prices">
      <b className="ds-atc__price">{price}</b>
      <s className="ds-atc__mrp">{mrp}</s>
      <span className="ds-atc__off">{discount}</span>
    </span>
  );
  const add = (
    <Button type="Fill" state="Primary" size="Large" className="ds-atc__btn" onClick={onAdd}>
      {addLabel}
    </Button>
  );

  if (state === "sticky") {
    return (
      <div className={`ds-atc ds-atc--sticky ${className}`.trim()} {...props}>
        {prices}
        {add}
      </div>
    );
  }

  return (
    <div className={`ds-atc ${className}`.trim()} {...props}>
      {prices}
      <div className="ds-atc__row">
        <span className="ds-atc__unit">
          <span>{unit}</span>
          <span>{taxNote}</span>
        </span>
        {add}
      </div>
    </div>
  );
}
