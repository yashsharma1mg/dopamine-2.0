import { useEffect, useRef, useState, type HTMLAttributes, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
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
  /** Allow drag-to-resize via the top handle (default true). */
  draggable?: boolean;
  /** Sheet body. */
  children?: ReactNode;
  onClose?: () => void;
  onBack?: () => void;
};

/**
 * A sheet that slides up from the bottom over a scrim, with floating close (and optional back)
 * controls. Draggable by its top handle to resize between {@link BOTTOMSHEET_MIN_HEIGHT} and
 * {@link BOTTOMSHEET_MAX_HEIGHT}; `height` sets a fixed height. Two Figma states: default (no
 * header) and with subheading.
 */
export function Bottomsheet({
  title,
  subtitle,
  backButton = false,
  height,
  draggable = true,
  children,
  onClose,
  onBack,
  className = "",
  ...props
}: BottomsheetProps) {
  const [h, setH] = useState<number | undefined>(height != null ? clamp(height) : undefined);
  useEffect(() => setH(height != null ? clamp(height) : undefined), [height]);

  const sheet = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startY: 0, startH: 0 });

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable) return;
    const current = h ?? sheet.current?.getBoundingClientRect().height ?? BOTTOMSHEET_MIN_HEIGHT;
    drag.current = { down: true, startY: e.clientY, startH: current };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    // Drag up (clientY decreases) → taller.
    setH(clamp(drag.current.startH + (drag.current.startY - e.clientY)));
  };
  const endDrag = () => (drag.current.down = false);

  const hasHeader = Boolean(title || subtitle);
  return (
    <div className={`ds-bottomsheet ${className}`.trim()} role="dialog" aria-modal="true" {...props}>
      <div className="ds-bottomsheet__controls" data-back={backButton || undefined}>
        {backButton && <BackButton onClick={onBack} />}
        <CloseButton onClick={onClose} />
      </div>
      <div ref={sheet} className="ds-bottomsheet__sheet" style={h != null ? { height: h } : undefined}>
        {draggable && (
          <div
            className="ds-bottomsheet__grip"
            role="separator"
            aria-label="Drag to resize"
            aria-orientation="horizontal"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <span className="ds-bottomsheet__grip-bar" />
          </div>
        )}
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
