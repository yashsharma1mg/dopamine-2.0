import { type HTMLAttributes, type ReactNode } from "react";

export type SnackbarType = "White" | "Warning" | "Success" | "Error" | "Default";

export type SnackbarProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  type?: SnackbarType;
  message: ReactNode;
  /** Leading help/info icon. */
  leadingIcon?: boolean;
  /** Trailing action label (e.g. "Undo") — replaces the close button when set. */
  action?: string;
  onAction?: () => void;
  onClose?: () => void;
  /** Show the trailing close (✕). Ignored when `action` is set. */
  dismissible?: boolean;
};

const helpIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
    <path d="M9.6 9.3a2.5 2.5 0 0 1 4.7 1.2c0 1.7-2.3 1.9-2.3 3.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1.1" fill="currentColor" />
  </svg>
);

const crossIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export function Snackbar({
  type = "Default",
  message,
  leadingIcon = true,
  action,
  onAction,
  onClose,
  dismissible = true,
  className = "",
  ...props
}: SnackbarProps) {
  return (
    <div className={`ds-snackbar ds-snackbar--${type.toLowerCase()} ${className}`.trim()} role="status" {...props}>
      <div className="ds-snackbar__body">
        {leadingIcon && <span className="ds-snackbar__icon" aria-hidden="true">{helpIcon}</span>}
        <p className="ds-snackbar__message">{message}</p>
      </div>
      {action ? (
        <button type="button" className="ds-snackbar__action" onClick={onAction}>{action}</button>
      ) : dismissible ? (
        <button type="button" className="ds-snackbar__close" aria-label="Dismiss" onClick={onClose}>{crossIcon}</button>
      ) : null}
    </div>
  );
}
