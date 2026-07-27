import { useState, type ButtonHTMLAttributes, type MouseEventHandler } from "react";
import { DsIcon } from "./icons.js";

export type RadioSize = "Default" | "Small";
export type RadioState =
  | "Default"
  | "Selected"
  | "Disable"
  | "Disable+select"
  | "Select with icon"
  | "Disable+select with icon";

export type RadioProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type"> & {
  checked?: boolean;
  disabled?: boolean;
  /** Selected indicator: a filled dot or a checkmark. */
  indicator?: "dot" | "check";
  size?: RadioSize;
  /** Convenience for galleries — maps a single Figma state to checked/disabled/indicator. Overrides those. */
  state?: RadioState;
  label?: string;
};

export function Radio({
  checked: checkedProp,
  disabled: disabledProp,
  indicator = "dot",
  size = "Default",
  state,
  label = "Option",
  className = "",
  onClick,
  ...props
}: RadioProps) {
  const uncontrolled = checkedProp === undefined && state === undefined;
  const [internal, setInternal] = useState(false);
  const checked = state ? /select/i.test(state) : checkedProp ?? internal;
  const disabled = state ? /disable/i.test(state) : !!disabledProp;
  const ind = state ? (/icon/i.test(state) ? "check" : "dot") : indicator;

  // Radios select on click; unselecting is the parent radiogroup's job.
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (uncontrolled) setInternal(true);
    onClick?.(event);
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      aria-label={label}
      className={`ds-radio ${className}`.trim()}
      data-size={size}
      data-checked={checked || undefined}
      data-disabled={disabled || undefined}
      data-indicator={ind}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {checked
        ? ind === "check"
          ? <DsIcon name="tick" size={size === "Small" ? 12 : 14} className="ds-radio__check" />
          : <span className="ds-radio__hole" />
        : null}
    </button>
  );
}
