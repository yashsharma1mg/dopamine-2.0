import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className = "",
    disabled,
    leadingIcon,
    loading = false,
    size = "md",
    trailingIcon,
    type = "button",
    variant = "primary",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`ds-button ${className}`.trim()}
      data-size={size}
      data-variant={variant}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="ds-button__spinner" aria-hidden="true" /> : leadingIcon}
      <span className="ds-button__label">{children}</span>
      {!loading && trailingIcon}
    </button>
  );
});
