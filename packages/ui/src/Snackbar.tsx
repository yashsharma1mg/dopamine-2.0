import { type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";

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

const helpIcon = <DsIcon name="help" size={20} />;
const crossIcon = <DsIcon name="cross" size={20} />;

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
