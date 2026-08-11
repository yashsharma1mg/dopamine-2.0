import { useRef, type HTMLAttributes, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { DsIcon } from "./icons.js";

export type ProductProps = HTMLAttributes<HTMLDivElement> & {
  /** How many placeholder image slots to render when `images` is not provided (Figma 1/2/3). */
  numberOfImages?: 1 | 2 | 3;
  /** Explicit image slots (overrides `numberOfImages`). Rendered in a swipeable carousel. */
  images?: ReactNode[];
  title?: string;
  brand?: string;
  composition?: string;
  compositionValue?: string;
  /** Show the green "generic alternative" CTA pill. */
  alternative?: boolean;
  alternativeText?: ReactNode;
  onAlternative?: () => void;
};

/**
 * PDP product hero: a drag-to-swipe image carousel (1–3 image slots), then title / brand /
 * composition, and an optional green "save with alternative" pill.
 */
export function Product({
  numberOfImages = 2,
  images,
  title = "Telma 40 Tablet",
  brand = "La Renon Healthcare Pvt. Ltd",
  composition = "Composition",
  compositionValue = "Telmisartan (40mg)",
  alternative = true,
  alternativeText = (
    <>
      <b>Save 55% more</b> with alternative
    </>
  ),
  onAlternative,
  className = "",
  ...props
}: ProductProps) {
  const slots = images ?? Array.from({ length: numberOfImages }, (_, i) => <span key={i} />);

  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = track.current!;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.down) return;
    track.current!.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };
  const endDrag = () => (drag.current.down = false);

  return (
    <div className={`ds-product ${className}`.trim()} {...props}>
      <div
        ref={track}
        className="ds-product__carousel"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {slots.map((img, i) => (
          <span key={i} className="ds-product__image">{img}</span>
        ))}
      </div>
      <div className="ds-product__info">
        <p className="ds-product__title">{title}</p>
        <p className="ds-product__brand">{brand}</p>
        <div className="ds-product__composition">
          <p className="ds-product__comp-label">{composition}</p>
          <p className="ds-product__comp-value">{compositionValue}</p>
        </div>
      </div>
      {alternative && (
        <button type="button" className="ds-product__alt" onClick={onAlternative}>
          <span>{alternativeText}</span>
          <DsIcon name="chevron-right" size={12} />
        </button>
      )}
    </div>
  );
}
