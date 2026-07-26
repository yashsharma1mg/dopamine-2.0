import { type ButtonHTMLAttributes } from "react";

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

const tick = (
  <svg className="ds-toggle__tick" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7.5 5.5 10.5 11.5 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Toggle({
  checked: checkedProp,
  disabled: disabledProp,
  onCheckedChange,
  state,
  label = "Toggle",
  className = "",
  ...props
}: ToggleProps) {
  const checked = state ? state === "selected" || state === "disabled+selected" : !!checkedProp;
  const disabled = state ? state === "disabled" || state === "disabled+selected" : !!disabledProp;

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
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span className="ds-toggle__thumb">{checked ? tick : null}</span>
    </button>
  );
}
