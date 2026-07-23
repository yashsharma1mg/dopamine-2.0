import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonType = "fill" | "outline" | "ghost";
export type ButtonSize = "medium" | "large";
export type ButtonStyle = "text" | "icon-leading" | "icon-trailing" | "underline";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  type?: ButtonType;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  size?: ButtonSize;
  style?: ButtonStyle;
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
    size = "large",
    style = "text",
    trailingIcon,
    type: buttonType = "fill",
    htmlType = "button",
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={htmlType}
      className={`ds-button ${className}`.trim()}
      data-size={size}
      data-style={style}
      data-type={buttonType}
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
