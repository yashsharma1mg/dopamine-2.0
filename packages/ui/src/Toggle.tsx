import { useState, type ButtonHTMLAttributes, type MouseEventHandler } from "react";
import { DsIcon } from "./icons.js";

export type ToggleState = "Default" | "selected" | "disabled" | "disabled+selected";

export type ToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "type"> & {
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Convenience for galleries — sets checked/disabled from a single Figma state. Overrides checked/disabled. */
  state?: ToggleState;
  /** Accessible name (required — a bare switch has no visible label). */
  label?: string;
};

export function Toggle({
  checked: checkedProp,
  disabled: disabledProp,
  onCheckedChange,
  state,
  label = "Toggle",
  className = "",
  onClick,
  ...props
}: ToggleProps) {
  const uncontrolled = checkedProp === undefined && state === undefined;
  const [internal, setInternal] = useState(false);
  const checked = state ? state === "selected" || state === "disabled+selected" : checkedProp ?? internal;
  const disabled = state ? state === "disabled" || state === "disabled+selected" : !!disabledProp;

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (uncontrolled) setInternal(!checked);
    onCheckedChange?.(!checked);
    onClick?.(event);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`ds-toggle ${className}`.trim()}
      data-checked={checked || undefined}
      data-disabled={disabled || undefined}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      <span className="ds-toggle__thumb">{checked ? <DsIcon name="tick" size={12} className="ds-toggle__tick" /> : null}</span>
    </button>
  );
}
