import { type HTMLAttributes, type ReactNode } from "react";
import { CloseButton, BackButton } from "./overlayParts.js";

export type BottomsheetProps = HTMLAttributes<HTMLDivElement> & {
  /** Optional header title (title-16 extrabold). Presence adds the header + divider. */
  title?: string;
  /** Optional subheading under the title (body-14, tertiary). */
  subtitle?: string;
  /** Show the floating back button (top-left). */
  backButton?: boolean;
  /** Sheet body. */
  children?: ReactNode;
  onClose?: () => void;
  onBack?: () => void;
};

/**
 * A sheet that slides up from the bottom over a scrim, with floating close (and optional back)
 * controls above it. Two Figma states: default (no header) and with subheading.
 */
export function Bottomsheet({ title, subtitle, backButton = false, children, onClose, onBack, className = "", ...props }: BottomsheetProps) {
  const hasHeader = Boolean(title || subtitle);
  return (
    <div className={`ds-bottomsheet ${className}`.trim()} role="dialog" aria-modal="true" {...props}>
      <div className="ds-bottomsheet__controls" data-back={backButton || undefined}>
        {backButton && <BackButton onClick={onBack} />}
        <CloseButton onClick={onClose} />
      </div>
      <div className="ds-bottomsheet__sheet">
        {hasHeader && (
          <>
            <div className="ds-bottomsheet__header">
              {title && <p className="ds-bottomsheet__title">{title}</p>}
              {subtitle && <p className="ds-bottomsheet__sub">{subtitle}</p>}
            </div>
            <hr className="ds-bottomsheet__divider" />
          </>
        )}
        <div className="ds-bottomsheet__content">{children}</div>
      </div>
    </div>
  );
}
