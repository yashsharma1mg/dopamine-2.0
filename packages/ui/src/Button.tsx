import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type ButtonType = "Fill" | "Outline" | "Ghost";
export type ButtonSize = "Medium" | "Large";
export type ButtonState = "Primary" | "Secondary" | "Inverse" | "Disabled";
export type ButtonStyle = "Text Only" | "Icon + Text" | "Text + Icon" | "Underline";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  type?: ButtonType;
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  size?: ButtonSize;
  state?: ButtonState;
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
    size = "Large",
    state = "Primary",
    style = "Text Only",
    trailingIcon,
    type: buttonType = "Fill",
    htmlType = "button",
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading || state === "Disabled";
  const showLeadingIcon = style === "Icon + Text";
  const showTrailingIcon = style === "Text + Icon";

  return (
    <button
      ref={ref}
      type={htmlType}
      className={`ds-button ${className}`.trim()}
      data-size={size}
      data-state={state}
      data-style={style}
      data-type={buttonType}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="ds-button__spinner" aria-hidden="true" /> : showLeadingIcon ? leadingIcon : null}
      <span className="ds-button__label">{children}</span>
      {!loading && showTrailingIcon ? trailingIcon : null}
    </button>
  );
});
