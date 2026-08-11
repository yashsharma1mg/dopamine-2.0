import { type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";

export type OfferRow = {
  icon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
};

export type OfferProps = HTMLAttributes<HTMLDivElement> & {
  /** Optional promo banner (a 328×164 media slot). */
  banner?: ReactNode;
  heading?: string;
  offers?: OfferRow[];
  seeAllLabel?: string;
  onSeeAll?: () => void;
};

const DEFAULT_OFFERS: OfferRow[] = [
  { icon: <DsIcon name="payment-card" size={18} />, title: "Get an instant 10% discount on medicine & health products", subtitle: "Get an instant 10% discount on medicine & health products" },
  { icon: <DsIcon name="payment-card" size={18} />, title: "Earn cashback up to Rs. 250", subtitle: "Earn cashback up to Rs. 250" },
  { icon: <DsIcon name="payment-card" size={18} />, title: "Earn cashback up to Rs. 100 with Amazon Pay Balance", subtitle: "Earn cashback up to Rs. 100 with Amazon Pay Balance" }
];

/**
 * PDP offers section: an optional promo banner and a "Save more with additional offers" list,
 * each row tappable, closed by a "See all offers" action.
 */
export function Offer({
  banner,
  heading = "Save more with additional offers",
  offers = DEFAULT_OFFERS,
  seeAllLabel = "See all offers",
  onSeeAll,
  className = "",
  ...props
}: OfferProps) {
  return (
    <div className={`ds-offer ${className}`.trim()} {...props}>
      {banner !== undefined && (
        <>
          <div className="ds-offer__banner">{banner}</div>
          <div className="ds-offer__band" aria-hidden="true" />
        </>
      )}
      <div className="ds-offer__card">
        <p className="ds-offer__heading">{heading}</p>
        <div className="ds-offer__list">
          {offers.map((o, i) => (
            <button key={i} type="button" className="ds-offer__row">
              {o.icon && <span className="ds-offer__row-icon" aria-hidden="true">{o.icon}</span>}
              <span className="ds-offer__row-text">
                <span className="ds-offer__row-title">{o.title}</span>
                {o.subtitle && <span className="ds-offer__row-sub">{o.subtitle}</span>}
              </span>
              <DsIcon name="chevron-right" size={12} className="ds-offer__row-chev" />
            </button>
          ))}
        </div>
        <button type="button" className="ds-offer__seeall" onClick={onSeeAll}>{seeAllLabel}</button>
      </div>
    </div>
  );
}
