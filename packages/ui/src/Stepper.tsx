import { type HTMLAttributes, useId } from "react";

export type StepperSize = "medium" | "large";
export type StepperType = "filled" | "outline";

export type StepperProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  outOfStock?: boolean;
  size?: StepperSize;
  type?: StepperType;
};

export function Stepper({
  className = "",
  quantity,
  onQuantityChange,
  min = 0,
  max,
  outOfStock = false,
  size = "large",
  type = "filled",
  ...props
}: StepperProps) {
  const labelId = useId();
  const isEmpty = quantity <= min;
  const decrement = () => onQuantityChange(Math.max(min, quantity - 1));
  const increment = () => onQuantityChange(max === undefined ? quantity + 1 : Math.min(max, quantity + 1));

  if (isEmpty) {
    return (
      <button
        type="button"
        className={`ds-stepper ds-stepper--add ${className}`.trim()}
        data-size={size}
        data-type={type}
        disabled={outOfStock}
        onClick={increment}
      >
        {outOfStock ? "Out of stock" : "Add"}
      </button>
    );
  }

  return (
    <div className={`ds-stepper ${className}`.trim()} data-size={size} data-type={type} {...props}>
      <span id={labelId} className="sr-only">Quantity</span>
      <button type="button" aria-label="Decrease quantity" aria-describedby={labelId} disabled={outOfStock} onClick={decrement}>−</button>
      <output aria-live="polite" aria-label={`${quantity} items`}>{quantity}</output>
      <button type="button" aria-label="Increase quantity" aria-describedby={labelId} disabled={outOfStock || (max !== undefined && quantity >= max)} onClick={increment}>+</button>
    </div>
  );
}
