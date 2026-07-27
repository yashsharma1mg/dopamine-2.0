import { useState, type ButtonHTMLAttributes, type MouseEventHandler } from "react";
import { DsIcon } from "./icons.js";

export type CheckboxSize = "Normal" | "Small";
export type CheckboxState = "Default" | "Selected" | "Disable" | "Disabled selected";

export type CheckboxProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type"> & {
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: CheckboxSize;
  /** Convenience for galleries — sets checked/disabled from a single Figma state. Overrides checked/disabled. */
  state?: CheckboxState;
  /** Accessible name (a bare box has no visible label). */
  label?: string;
};

export function Checkbox({
  checked: checkedProp,
  disabled: disabledProp,
  onCheckedChange,
  size = "Normal",
  state,
  label = "Checkbox",
  className = "",
  onClick,
  ...props
}: CheckboxProps) {
  const uncontrolled = checkedProp === undefined && state === undefined;
  const [internal, setInternal] = useState(false);
  const checked = state ? state === "Selected" || state === "Disabled selected" : checkedProp ?? internal;
  const disabled = state ? state === "Disable" || state === "Disabled selected" : !!disabledProp;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (uncontrolled) setInternal(!checked);
    onCheckedChange?.(!checked);
    onClick?.(event);
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      className={`ds-checkbox ${className}`.trim()}
      data-size={size}
      data-checked={checked || undefined}
      data-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {checked ? <DsIcon name="tick" size={size === "Small" ? 12 : 14} className="ds-checkbox__tick" /> : null}
    </button>
  );
}
