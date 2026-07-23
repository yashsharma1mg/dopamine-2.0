import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type FloatingActionButtonType = "add" | "added" | "fab" | "special";

export type FloatingActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: FloatingActionButtonType;
  label?: string;
  icon?: ReactNode;
};

export const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(function FloatingActionButton(
  { className = "", disabled, icon, label, type = "add", ...props },
  ref
) {
  const isLabelled = type === "added" || type === "special";
  const defaultLabel = type === "added" ? "Added" : type === "special" ? "Special" : type === "fab" ? "Floating action" : "Add";
  return (
    <button
      ref={ref}
      type="button"
      className={`ds-fab ${className}`.trim()}
      data-type={type}
      disabled={disabled}
      aria-label={isLabelled ? undefined : label ?? defaultLabel}
      {...props}
    >
      <span className="ds-fab__icon" aria-hidden="true">{icon ?? "+"}</span>
      {isLabelled && <span>{label ?? defaultLabel}</span>}
    </button>
  );
});
