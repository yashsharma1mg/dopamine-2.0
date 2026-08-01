import { type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";

export type StickyType = "Redirection" | "Rating" | "Standard" | "Video";
export type StickyState =
  | "Default"
  | "Error"
  | "Delivery"
  | "2 deliveries"
  | "Multiple Delivery"
  | "Rating"
  | "1 button"
  | "Video";

export type StickyProps = HTMLAttributes<HTMLDivElement> & {
  type?: StickyType;
  state?: StickyState;
  title?: string;
  subtitle?: string;
  onClose?: () => void;
  onAction?: () => void;
};

const icons = {
  chevron: <DsIcon name="chevron-right" size={12} />,
  cross: <DsIcon name="cross" size={16} />,
  bolt: <DsIcon name="rapid" size={14} />,
  star: <DsIcon name="rating-star" size={28} />,
  caretUp: <DsIcon name="chevron-up" size={12} />,
  // Product/prescription thumbnail placeholder — a content image, not a DS icon.
  image: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" /><circle cx="8.5" cy="10" r="1.5" fill="currentColor" /><path d="M5 17l4.5-4 3 2.5L16 12l3 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  )
};

const closeButton = (onClose?: () => void) => (
  <button type="button" className="ds-sticky__close" aria-label="Dismiss" onClick={onClose}>{icons.cross}</button>
);

export function Sticky({ type = "Redirection", state = "Default", title, subtitle, onClose, onAction, className = "", ...props }: StickyProps) {
  const root = (extra: string, children: ReactNode) => (
    <div className={`ds-sticky ds-sticky--${extra} ${className}`.trim()} data-type={type} data-state={state} {...props}>{children}</div>
  );

  if (type === "Video") {
    return root("video", (
      <>
        {closeButton(onClose)}
        <span className="ds-sticky__video-time">1:2</span>
      </>
    ));
  }

  if (type === "Rating") {
    return root("rating", (
      <>
        <div className="ds-sticky__row">
          <span className="ds-sticky__thumb" aria-hidden="true">{icons.image}</span>
          <div className="ds-sticky__copy">
            <strong>{title ?? "Rate your recent purchase"}</strong>
            <span>{subtitle ?? "Optimum Nutrition (ON) Gold Standard Whey protein 24g casei…"}</span>
          </div>
          {closeButton(onClose)}
        </div>
        <div className="ds-sticky__stars" role="radiogroup" aria-label="Rating">
          {Array.from({ length: 5 }, (_, i) => (
            <button key={i} type="button" className="ds-sticky__star" aria-label={`${i + 1} star`}>{icons.star}</button>
          ))}
        </div>
      </>
    ));
  }

  if (type === "Standard") {
    return root("standard", (
      <>
        <div className="ds-sticky__row">
          <span className="ds-sticky__thumb ds-sticky__thumb--blank" aria-hidden="true" />
          <div className="ds-sticky__copy">
            <strong>{title ?? "Rate us on Playstore"}</strong>
            <span>{subtitle ?? "Your rating helps us strive to be better"}</span>
          </div>
          {closeButton(onClose)}
        </div>
        <button type="button" className="ds-sticky__button" onClick={onAction}>Rate Tata 1mg</button>
      </>
    ));
  }

  // Redirection
  const isDelivery = state === "Delivery" || state === "2 deliveries" || state === "Multiple Delivery";
  const isError = state === "Error";
  const defaults = isDelivery
    ? { t: "Arriving in 8 min", s: "Telma 40mg +5 items" }
    : isError
      ? { t: "Last request not processed", s: "You were not reachable to our pharmacist" }
      : { t: "Your prescription is being processed", s: "We are working on getting your medicines ready at the earliest" };

  return root("redirection", (
    <>
      {state === "Multiple Delivery" && (
        <span className="ds-sticky__more">+ 3 more {icons.caretUp}</span>
      )}
      <div className="ds-sticky__row">
        <span className={`ds-sticky__lead ${isDelivery ? "ds-sticky__lead--delivery" : "ds-sticky__lead--rx"}`} aria-hidden="true">{icons.image}</span>
        <div className="ds-sticky__copy">
          <strong className={isDelivery ? "ds-sticky__title--success" : isError ? "ds-sticky__title--error" : ""}>
            {title ?? defaults.t}
            {isDelivery && <span className="ds-sticky__bolt">{icons.bolt}</span>}
          </strong>
          <span>{subtitle ?? defaults.s}</span>
        </div>
        {isDelivery ? (
          <button type="button" className="ds-sticky__track" onClick={onAction}>Track</button>
        ) : (
          <button type="button" className="ds-sticky__chevron" aria-label="Open" onClick={onAction}>{icons.chevron}</button>
        )}
      </div>
      {state === "2 deliveries" && (
        <div className="ds-sticky__dots" aria-hidden="true"><span data-active="" /><span /></div>
      )}
    </>
  ));
}
