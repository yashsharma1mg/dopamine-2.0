import { type HTMLAttributes, type ReactNode } from "react";
import { CloseButton, BackButton } from "./overlayParts.js";

/** Sheet height bounds — min is the natural compact size, max is the Figma sheet's cap. */
export const BOTTOMSHEET_MIN_HEIGHT = 128;
export const BOTTOMSHEET_MAX_HEIGHT = 600;
const clamp = (n: number) => Math.max(BOTTOMSHEET_MIN_HEIGHT, Math.min(BOTTOMSHEET_MAX_HEIGHT, n));

export type BottomsheetProps = HTMLAttributes<HTMLDivElement> & {
  /** Optional header title (title-16 extrabold). Presence adds the header + divider. */
  title?: string;
  /** Optional subheading under the title (body-14, tertiary). */
  subtitle?: string;
  /** Show the floating back button (top-left). */
  backButton?: boolean;
  /** Fixed sheet height in px (clamped 128–600). Omit for content-driven sizing. */
  height?: number;
  /** Sheet body. */
  children?: ReactNode;
  onClose?: () => void;
  onBack?: () => void;
};

/**
 * A sheet that slides up from the bottom over a scrim, with floating close (and optional back)
 * controls. The sheet is content-driven between {@link BOTTOMSHEET_MIN_HEIGHT} and
 * {@link BOTTOMSHEET_MAX_HEIGHT}; `height` pins it to a fixed height (clamped to that range).
 * Two Figma states: default (no header) and with subheading.
 */
export function Bottomsheet({ title, subtitle, backButton = false, height, children, onClose, onBack, className = "", ...props }: BottomsheetProps) {
  const hasHeader = Boolean(title || subtitle);
  const h = height != null ? clamp(height) : undefined;
  return (
    <div className={`ds-bottomsheet ${className}`.trim()} role="dialog" aria-modal="true" {...props}>
      <div className="ds-bottomsheet__controls" data-back={backButton || undefined}>
        {backButton && <BackButton onClick={onBack} />}
        <CloseButton onClick={onClose} />
      </div>
      <div className="ds-bottomsheet__sheet" style={h != null ? { height: h } : undefined}>
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
