import { type HTMLAttributes } from "react";
import { DsIcon } from "./icons.js";

export type EventBannerItems = "none" | "1" | "2" | "3" | "4" | ">4";
export type EventBannerBottomMessage = "none" | "1" | "2";

export type EventBannerProps = HTMLAttributes<HTMLDivElement> & {
  /** Number of thumbnail items in the strip. ">4" shows 5 (overflowing/clipped). */
  items?: EventBannerItems;
  /** none = no message row · 1 = message · 2 = message + pagination dots. */
  bottomMessage?: EventBannerBottomMessage;
  title?: string;
  text?: string;
  onAction?: () => void;
};

const ITEM_COUNT: Record<EventBannerItems, number> = { none: 0, "1": 1, "2": 2, "3": 3, "4": 4, ">4": 5 };

const imageIcon = (size: number) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
    <path d="M5 17l4.5-4 3 2.5L16 12l3 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const chevron = <DsIcon name="chevron-right" size={14} />;

export function EventBanner({
  items = "none",
  bottomMessage = "2",
  title = "Lorem ispum.",
  text = "Lorem ipsum.",
  onAction,
  className = "",
  ...props
}: EventBannerProps) {
  const count = ITEM_COUNT[items];
  const hasMessage = bottomMessage !== "none";
  const hasPanel = count > 0 || hasMessage;

  return (
    <div className={`ds-event-banner ${className}`.trim()} data-items={items} data-bottom={bottomMessage} {...props}>
      {hasPanel && (
        <div className="ds-event-banner__panel">
          {count > 0 && (
            <div className="ds-event-banner__items">
              {Array.from({ length: count }, (_, i) => (
                <div key={i} className="ds-event-banner__thumb">{imageIcon(12)}</div>
              ))}
            </div>
          )}
          {hasMessage && (
            <div className="ds-event-banner__message-block">
              <div className="ds-event-banner__message">
                <span className="ds-event-banner__msg-icon">{imageIcon(12)}</span>
                <p className="ds-event-banner__msg-text"><strong>{title}</strong> {text}</p>
                <button type="button" className="ds-event-banner__chevron" aria-label="Open event" onClick={onAction}>
                  {chevron}
                </button>
              </div>
              {bottomMessage === "2" && (
                <div className="ds-event-banner__dots" aria-hidden="true">
                  <span data-active="" />
                  <span />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
