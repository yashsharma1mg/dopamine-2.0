import { type HTMLAttributes } from "react";
import { DsIcon } from "./icons.js";
import { CarePlanBadge } from "./CarePlanBadge.js";
import { benefitDiscount, benefitDelivery } from "./generated/careplan-icons.js";

export type CarePlanCardType = "Added" | "Not Added" | "updated";

export type CarePlanCardProps = HTMLAttributes<HTMLDivElement> & {
  type?: CarePlanCardType;
  onAction?: () => void;
};

const moreBenefits = (
  <span className="ds-careplan__more">
    More benefits
    <span className="ds-careplan__more-chev" aria-hidden="true">
      <DsIcon name="chevron-down" size={9} />
    </span>
  </span>
);

const tickRow = (label: string) => (
  <span className="ds-careplan__benefit" key={label}>
    <DsIcon name="tick" size={18} className="ds-careplan__tick" />
    <span className="ds-careplan__benefit-txt">{label}</span>
  </span>
);

const illoRow = (src: string, label: string) => (
  <span className="ds-careplan__benefit" key={label}>
    <img className="ds-careplan__illo" src={src} alt="" aria-hidden="true" />
    <span className="ds-careplan__benefit-txt ds-careplan__benefit-txt--lg">{label}</span>
  </span>
);

export function CarePlanCard({ type = "Added", onAction, className = "", ...props }: CarePlanCardProps) {
  const notAdded = type === "Not Added";

  const title =
    type === "updated" ? (
      <>Cart updated <span className="ds-careplan__with">with</span></>
    ) : (
      <>
        <b className="ds-careplan__amt">{notAdded ? "Save ₹460" : "Saved ₹460"}</b> extra <span className="ds-careplan__with">with</span>
      </>
    );

  return (
    <div className={`ds-careplan ${className}`.trim()} data-type={type} {...props}>
      <div className="ds-careplan__head">
        <span className="ds-careplan__title">{title}</span>
        <CarePlanBadge height={14} />
      </div>

      <div className="ds-careplan__body">
        {notAdded ? (
          <>
            {illoRow(benefitDiscount, "Extra 7% discount")}
            {illoRow(benefitDelivery, "Free & Faster delivery")}
          </>
        ) : (
          <>
            <span className="ds-careplan__applied">Benefits applied</span>
            {tickRow("Extra discount")}
            {tickRow("Free delivery")}
          </>
        )}
        {moreBenefits}
      </div>

      <div className="ds-careplan__foot">
        <span className="ds-careplan__price">
          3 months at ₹165 <s>₹200</s>
        </span>
        {notAdded ? (
          <button type="button" className="ds-careplan__btn ds-careplan__btn--add" onClick={onAction}>Add Plan</button>
        ) : (
          <button type="button" className="ds-careplan__btn ds-careplan__btn--remove" onClick={onAction}>Remove</button>
        )}
      </div>
    </div>
  );
}
