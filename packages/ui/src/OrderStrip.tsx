import { type HTMLAttributes } from "react";
import { DsIcon } from "./icons.js";
import { productImage } from "./generated/orderstrip-icons.js";

export type OrderStripType =
  | "Pharma Rx"
  | "Pharma non Rx"
  | "compact Rx"
  | "compact non Rx"
  | "Labs Rapid Report"
  | "Labs Default";

export type OrderStripProps = HTMLAttributes<HTMLDivElement> & {
  type?: OrderStripType;
};

// Quantity stepper box: "1 ⌄" with a coral count.
function QtyBox() {
  return (
    <span className="ds-order__qty">
      <span className="ds-order__qty-n">1</span>
      <DsIcon name="chevron-down" size={10} className="ds-order__qty-chev" />
    </span>
  );
}

// A pharmacy SKU line: image (± Rx tab), name/qty, stepper, price.
function SkuRow({ rx }: { rx: boolean }) {
  return (
    <div className="ds-order__sku">
      <span className="ds-order__thumb">
        <img src={productImage} alt="" aria-hidden="true" />
        {rx && <span className="ds-order__rx">Rx</span>}
      </span>
      <span className="ds-order__sku-txt">
        <span className="ds-order__sku-name">Montair LC Tablet</span>
        <span className="ds-order__sku-sub">30 tablets</span>
      </span>
      <QtyBox />
      <span className="ds-order__price">
        <s>₹407</s>
        <b>₹371</b>
      </span>
    </div>
  );
}

function DeliveryHeader({ time, change }: { time: string; change?: boolean }) {
  return (
    <div className="ds-order__delivery">
      <span className="ds-order__bolt" aria-hidden="true"><DsIcon name="rapid" size={22} /></span>
      <span className="ds-order__time">{time}</span>
      {change && (
        <span className="ds-order__change">
          Change <DsIcon name="chevron-right" size={11} />
        </span>
      )}
    </div>
  );
}

// A diagnostics/labs test line.
function LabsRow({ rapid }: { rapid: boolean }) {
  return (
    <div className="ds-order__labs-row">
      <span className="ds-order__labs-icon" aria-hidden="true"><DsIcon name="blood-health" size={32} /></span>
      <span className="ds-order__labs-txt">
        <span className="ds-order__labs-name">
          {rapid ? "Comprehensive gold full body checkup" : "Fever Package Extensive (includes Dengue, Malaria, Typh…)"}
        </span>
        <span className="ds-order__labs-sub">Fasting required</span>
        {rapid ? (
          <span className="ds-order__labs-rapid">Rapid report: <b>2hrs</b></span>
        ) : (
          <span className="ds-order__labs-sub">Get report within: <b>12 hrs</b></span>
        )}
        <span className="ds-order__labs-price">
          <b>{rapid ? "₹1300" : "₹599"}</b>
          <s>{rapid ? "₹1800" : "₹789"}</s>
          <em>{rapid ? "30% off" : "18% off"}</em>
        </span>
      </span>
      <span className="ds-order__patient">
        <QtyBox />
        <span className="ds-order__patient-lbl">Patient(s)</span>
      </span>
    </div>
  );
}

export function OrderStrip({ type = "Pharma Rx", className = "", ...props }: OrderStripProps) {
  const cls = `ds-order ${className}`.trim();

  if (type === "compact Rx" || type === "compact non Rx") {
    return (
      <div className={cls} data-type={type} {...props}>
        <SkuRow rx={type === "compact Rx"} />
      </div>
    );
  }

  if (type === "Labs Rapid Report" || type === "Labs Default") {
    const rapid = type === "Labs Rapid Report";
    return (
      <div className={cls} data-type={type} {...props}>
        <div className="ds-order__labs" data-rapid={rapid || undefined}>
          {rapid && (
            <div className="ds-order__labs-elig">
              Faster report eligible
              <span className="ds-order__labs-elig-line" />
            </div>
          )}
          <LabsRow rapid={rapid} />
        </div>
      </div>
    );
  }

  // Pharma section: delivery header + two SKU rows.
  // Two delivery slots (Figma 6765-5327/5333) separated by a thick section divider.
  const rx = type === "Pharma Rx";
  return (
    <div className={cls} data-type={type} {...props}>
      <div className="ds-order__section">
        <DeliveryHeader time="30 Minutes" change />
        <hr className="ds-order__dotted" />
        <SkuRow rx={rx} />
        <hr className="ds-order__dotted" />
        <SkuRow rx={rx} />
      </div>
      <div className="ds-order__thick" />
      <div className="ds-order__section">
        <DeliveryHeader time="10 PM, Today" />
        <hr className="ds-order__dotted" />
        <SkuRow rx={rx} />
        <hr className="ds-order__dotted" />
        <SkuRow rx={rx} />
      </div>
    </div>
  );
}
