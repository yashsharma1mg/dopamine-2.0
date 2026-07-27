import { useRef, type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";

export type InputFieldType = "Field with CTA text" | "Field with CTA logo" | "4 digit OTP" | "6 digit OTP";
export type InputFieldState = "default" | "typing" | "error" | "success" | "disable";

export type InputFieldProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  type?: InputFieldType;
  state?: InputFieldState;
  label?: string;
  helperText?: ReactNode;
  value?: string;
  placeholder?: string;
  ctaLabel?: string;
  ctaIcon?: ReactNode;
  onCtaClick?: () => void;
  /** OTP only — per-cell characters. Length is clamped to the type's cell count. */
  digits?: string[];
};

const clearIcon = <DsIcon name="cross" size={20} />;

const isOtpType = (type: InputFieldType) => type === "4 digit OTP" || type === "6 digit OTP";

export function InputField({
  type = "Field with CTA text",
  state = "default",
  label = "House number / Flat number",
  helperText = "Helping text or error message goes here",
  value = "1582/ 5, Patel nagar, sector 15",
  placeholder,
  ctaLabel = "APPLY",
  ctaIcon = clearIcon,
  onCtaClick,
  digits,
  className = "",
  ...props
}: InputFieldProps) {
  const disabled = state === "disable";
  const inputRef = useRef<HTMLInputElement>(null);

  // The logo CTA is a clear button — it always empties the field — then any caller
  // handler runs. The text (APPLY) CTA just fires the caller handler.
  const handleCta = () => {
    if (type === "Field with CTA logo" && inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
    onCtaClick?.();
  };

  if (isOtpType(type)) {
    const cells = type === "6 digit OTP" ? 6 : 4;
    return (
      <div
        className={`ds-otp ${className}`.trim()}
        data-state={state}
        role="group"
        aria-label="Verification code"
        {...props}
      >
        {Array.from({ length: cells }, (_, i) => (
          <input
            key={i}
            className="ds-otp__cell"
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${i + 1}`}
            defaultValue={digits?.[i] ?? ""}
            disabled={disabled}
          />
        ))}
      </div>
    );
  }

  const isLogo = type === "Field with CTA logo";

  return (
    <div className={`ds-input ${className}`.trim()} data-state={state} {...props}>
      <span className="ds-input__label">{label}</span>
      <div className="ds-input__box">
        <input
          ref={inputRef}
          className="ds-input__value"
          defaultValue={value}
          placeholder={placeholder}
          disabled={disabled}
        />
        <button
          type="button"
          className="ds-input__cta"
          onClick={handleCta}
          disabled={disabled}
          aria-label={isLogo ? "Clear" : undefined}
        >
          {isLogo ? ctaIcon : ctaLabel}
        </button>
      </div>
      {helperText && <span className="ds-input__helper">{helperText}</span>}
    </div>
  );
}
