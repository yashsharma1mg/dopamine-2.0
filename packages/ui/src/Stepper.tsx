import { type HTMLAttributes, type ReactNode, useId } from "react";

export type StepperSize = "Medium" | "Large";
export type StepperType = "Filled" | "Outline";
export type StepperState = "Add" | "Added- Text" | "Added- Number";

export type StepperProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  outOfStock?: boolean;
  size?: StepperSize;
  state?: StepperState;
  type?: StepperType;
  addIcon?: ReactNode;
  disabledAddIcon?: ReactNode;
  decrementIcon?: ReactNode;
  incrementIcon?: ReactNode;
  helperText?: ReactNode;
};

export function Stepper({
  addIcon,
  className = "",
  decrementIcon,
  disabledAddIcon,
  incrementIcon,
  helperText = "Customise",
  max,
  min = 0,
  onQuantityChange,
  outOfStock = false,
  quantity,
  size = "Large",
  state = quantity <= min ? "Add" : "Added- Number",
  type = "Filled",
  ...props
}: StepperProps) {
  const labelId = useId();
  const isAdd = state === "Add";
  const isText = state === "Added- Text";
  const decrement = () => onQuantityChange(Math.max(min, quantity - 1));
  const increment = () => onQuantityChange(max === undefined ? quantity + 1 : Math.min(max, quantity + 1));

  if (isAdd || isText) {
    return (
      <div
        className={`ds-stepper-group ${className}`.trim()}
        data-size={size}
        data-state={state}
        data-type={type}
        {...props}
      >
        <button
          type="button"
          className={`ds-stepper ds-stepper--${isText ? "added-text" : "add"}`}
          disabled={outOfStock}
          onClick={increment}
        >
          <span>{outOfStock ? "OUT OF STOCK" : isText ? "ADDED" : "ADD"}</span>
          {!outOfStock ? addIcon : disabledAddIcon}
        </button>
        <span className="ds-stepper__helper">{helperText}</span>
      </div>
    );
  }

  return (
    <div className={`ds-stepper-group ${className}`.trim()} data-size={size} data-state={state} data-type={type} {...props}>
      <div className="ds-stepper">
        <span id={labelId} className="sr-only">Quantity</span>
        <button type="button" aria-label="Decrease quantity" aria-describedby={labelId} disabled={outOfStock} onClick={decrement}>
          {decrementIcon}
        </button>
        <output aria-live="polite" aria-label={`${quantity} items`}>{quantity}</output>
        <button type="button" aria-label="Increase quantity" aria-describedby={labelId} disabled={outOfStock || (max !== undefined && quantity >= max)} onClick={increment}>
          {incrementIcon}
        </button>
      </div>
      <span className="ds-stepper__helper">{helperText}</span>
    </div>
  );
}
