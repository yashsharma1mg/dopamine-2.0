import { type HTMLAttributes, type ReactNode } from "react";
import { CloseButton } from "./overlayParts.js";
import { Button } from "./Button.js";

export type DialogVariant = "cta" | "image-cta" | "image-2cta";

export type DialogProps = HTMLAttributes<HTMLDivElement> & {
  variant?: DialogVariant;
  heading?: string;
  description?: ReactNode;
  /** Optional 64px media slot (image variants). Defaults to a placeholder box. */
  image?: ReactNode;
  primaryLabel?: string;
  secondaryLabel?: string;
  onClose?: () => void;
  onPrimary?: () => void;
  onSecondary?: () => void;
};

/**
 * A centred modal card over a scrim, with a floating close above it. Three Figma states:
 * CTA only, image + CTA, and image + 2 CTA (a Fill and an Outline Button).
 */
export function Dialog({
  variant = "image-2cta",
  heading = "Heading",
  description = "Lorem ipsum description. Can contain text going to multiple lines",
  image,
  primaryLabel = "Button",
  secondaryLabel = "Button",
  onClose,
  onPrimary,
  onSecondary,
  className = "",
  ...props
}: DialogProps) {
  const showImage = variant !== "cta";
  const twoCta = variant === "image-2cta";
  return (
    <div className={`ds-dialog ${className}`.trim()} role="dialog" aria-modal="true" {...props}>
      <div className="ds-dialog__stage">
        <CloseButton onClick={onClose} />
        <div className="ds-dialog__card">
          {showImage && <span className="ds-dialog__image">{image}</span>}
          <div className="ds-dialog__body">
            <div className="ds-dialog__text">
              <p className="ds-dialog__heading">{heading}</p>
              <p className="ds-dialog__desc">{description}</p>
            </div>
            <div className="ds-dialog__actions">
              <hr className="ds-dialog__divider" />
              <div className="ds-dialog__btns">
                <Button type="Fill" state="Primary" size="Large" onClick={onPrimary}>{primaryLabel}</Button>
                {twoCta && <Button type="Outline" state="Primary" size="Large" onClick={onSecondary}>{secondaryLabel}</Button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
