import { type HTMLAttributes } from "react";
import { DsIcon } from "./icons.js";
import { CarePlanBadge } from "./CarePlanBadge.js";

export type SavingStripVariant =
  | "default"
  | "careplan-1line"
  | "careplan"
  | "careplan-chevron"
  | "payday"
  | "payday-chevron";

export type SavingStripProps = HTMLAttributes<HTMLDivElement> & {
  variant?: SavingStripVariant;
  /** Total saving, e.g. "₹292". */
  amount?: string;
  /** Care Plan contribution, e.g. "₹120" (careplan 2-line variants). */
  careplanAmount?: string;
};

const chevron = <DsIcon name="chevron-right" size={14} className="ds-saving-strip__chev" />;

// Decorative Pay Day Sale gift-tag (gradient + dashed inner border, tilted).
function PayDayTag() {
  return (
    <span className="ds-saving-strip__payday" aria-hidden="true">
      <span className="ds-saving-strip__payday-tag">Pay Day Sale</span>
    </span>
  );
}

export function SavingStrip({
  variant = "careplan",
  amount = "₹292",
  careplanAmount = "₹120",
  className = "",
  ...props
}: SavingStripProps) {
  const isPayday = variant === "payday" || variant === "payday-chevron";

  let body;
  if (variant === "default" || variant === "careplan-1line") {
    // Single compact row.
    body = (
      <>
        <span className="ds-saving-strip__line1">
          <b className="ds-saving-strip__amt">{amount}</b> saved on this order
          {variant === "careplan-1line" && (
            <>
              {" including "}
              <CarePlanBadge height={14} />
            </>
          )}
        </span>
        {chevron}
      </>
    );
  } else if (isPayday) {
    body = (
      <div className="ds-saving-strip__stack">
        <span className="ds-saving-strip__line1">
          You’re saving <b className="ds-saving-strip__amt">{amount}</b> on this order
        </span>
        <span className="ds-saving-strip__line2">
          <b>2x higher</b> than usual!
          {variant === "payday-chevron" && chevron}
        </span>
      </div>
    );
  } else {
    // Careplan two-line, centred.
    body = (
      <div className="ds-saving-strip__stack">
        <span className="ds-saving-strip__line1">
          Total Savings of <b className="ds-saving-strip__amt">{amount}</b>
          {variant === "careplan-chevron" && chevron}
        </span>
        <span className="ds-saving-strip__line2">
          Including <b className="ds-saving-strip__amt">{careplanAmount}</b> saved with <CarePlanBadge height={14} />
        </span>
      </div>
    );
  }

  const oneLine = variant === "default" || variant === "careplan-1line";
  return (
    <div className={`ds-saving-strip ${className}`.trim()} data-variant={variant} {...props}>
      <div
        className="ds-saving-strip__inner"
        data-oneline={oneLine || undefined}
        data-payday={isPayday || undefined}
      >
        {body}
        {isPayday && <PayDayTag />}
      </div>
    </div>
  );
}
