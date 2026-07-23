import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type FloatingActionButtonType = "FAB" | "Special button" | "Added" | "Add";
export type FloatingActionButtonState = "Default" | "Disable" | "Single Added";

export type FloatingActionButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  type?: FloatingActionButtonType;
  state?: FloatingActionButtonState;
  label?: string;
  icon?: ReactNode;
};

export const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(function FloatingActionButton(
  { className = "", disabled, icon, label, state = "Default", type = "Add", ...props },
  ref
) {
  const isLabelled = type === "Added" || type === "Special button";
  const defaultLabel = type === "Added" ? (state === "Disable" ? "12" : "1") : type === "Special button" ? "Order Now" : type === "FAB" ? "Floating action" : "Add";
  return (
    <button
      ref={ref}
      type="button"
      className={`ds-fab ${className}`.trim()}
      data-state={state}
      data-type={type}
      disabled={disabled || state === "Disable"}
      aria-label={isLabelled ? undefined : label ?? defaultLabel}
      {...props}
    >
      {icon && type !== "Special button" && <span className="ds-fab__icon" aria-hidden="true">{icon}</span>}
      {isLabelled && <span className="ds-fab__label">{label ?? defaultLabel}</span>}
    </button>
  );
});
