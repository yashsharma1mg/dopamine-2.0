import { useState, type ButtonHTMLAttributes, type MouseEventHandler } from "react";

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

const tick = (
  <svg className="ds-checkbox__tick" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7.5 5.5 10.5 11.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

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
      {checked ? tick : null}
    </button>
  );
}
