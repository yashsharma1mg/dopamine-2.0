import { type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";

export type ProductProps = HTMLAttributes<HTMLDivElement> & {
  /** Product image slots (rendered in a horizontal carousel). Defaults to 2 placeholders. */
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
 * PDP product hero: a swipeable image carousel, then title / brand / composition, and an optional
 * green "save with alternative" pill.
 */
export function Product({
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
  const slots = images ?? [<span key="a" />, <span key="b" />];
  return (
    <div className={`ds-product ${className}`.trim()} {...props}>
      <div className="ds-product__carousel">
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
