import { type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";
import { CarePlanBadge } from "./CarePlanBadge.js";
import { partyPopper } from "./generated/coupon-icons.js";

export type CouponState =
  | "No Coupon"
  | "Not Available"
  | "Not Applicable"
  | "Applied"
  | "CarePlan Applied"
  | "CarePlan Not Applicable";

export type CouponWidgetProps = HTMLAttributes<HTMLDivElement> & {
  state?: CouponState;
};

type ChipKind = "green" | "grey" | "party";

function Chip({ kind }: { kind: ChipKind }) {
  if (kind === "party") {
    return <span className="ds-coupon__chip ds-coupon__chip--party" aria-hidden="true"><img src={partyPopper} alt="" /></span>;
  }
  return (
    <span className={`ds-coupon__chip ds-coupon__chip--${kind}`} aria-hidden="true">
      <DsIcon name="discount" size={24} />
    </span>
  );
}

function Row({ chip, title, sub, action }: { chip: ChipKind; title: ReactNode; sub?: ReactNode; action?: ReactNode }) {
  return (
    <div className="ds-coupon__row">
      <Chip kind={chip} />
      <span className="ds-coupon__text">
        <span className="ds-coupon__title">{title}</span>
        {sub && <span className="ds-coupon__sub">{sub}</span>}
      </span>
      {action}
    </div>
  );
}

const apply = <span className="ds-coupon__action">Apply</span>;
const applied = <span className="ds-coupon__action">Applied</span>;
const viewAll = (
  <div className="ds-coupon__viewall">
    View all coupons <DsIcon name="chevron-right" size={10} />
  </div>
);

export function CouponWidget({ state = "Not Applicable", className = "", ...props }: CouponWidgetProps) {
  const cls = `ds-coupon ${className}`.trim();

  if (state === "No Coupon") {
    return (
      <div className={cls} data-state={state} {...props}>
        <div className="ds-coupon__row">
          <Chip kind="green" />
          <span className="ds-coupon__title ds-coupon__title--explore">Explore coupons</span>
          <DsIcon name="chevron-right" size={12} className="ds-coupon__explore-chev" />
        </div>
      </div>
    );
  }

  let main: ReactNode;
  let second: ReactNode = null;

  if (state === "Not Available") {
    main = <Row chip="grey" title="1MG ALL | 10% off locked" sub="Add items worth Rs 12 to unlock" />;
  } else if (state === "Not Applicable") {
    main = <Row chip="green" title="1MG ALL | 10% off locked" sub="Add items worth Rs 12 to unlock" action={apply} />;
  } else if (state === "Applied") {
    main = <Row chip="party" title="Saving ₹150 | 1MGALL" sub="Unlock more add worth ₹12 to get 15% slab" action={applied} />;
  } else if (state === "CarePlan Applied") {
    main = <Row chip="party" title={<><CarePlanBadge height={14} /> applied | saving ₹140</>} sub="Add items worth ₹12 to get 5% off" />;
  } else {
    // CarePlan Not Applicable
    main = <Row chip="party" title="Saving ₹150 | 1MGALL" sub="Unlock more add worth ₹12 to get 15% slab" action={applied} />;
    second = (
      <>
        <hr className="ds-coupon__divider" />
        <div className="ds-coupon__row2">
          <span className="ds-coupon__save120">Save 120 with <CarePlanBadge height={14} /></span>
          {apply}
        </div>
      </>
    );
  }

  return (
    <div className={cls} data-state={state} {...props}>
      {main}
      {second}
      <hr className="ds-coupon__divider" />
      {viewAll}
    </div>
  );
}
