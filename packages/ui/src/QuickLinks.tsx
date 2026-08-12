import { type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";

export type QuickLinksType = "For you" | "Labs";

export type QuickLinkTile = {
  icon: ReactNode;
  label: ReactNode;
  /** For you: render the tile on the Care Plan maroon surface with a light icon. */
  careplan?: boolean;
};

export type QuickLinkAction = { icon: ReactNode; label: ReactNode };

export type QuickLinksProps = Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> & {
  type?: QuickLinksType;
  /** The four shortcut tiles. */
  items?: QuickLinkTile[];
  /** Labs only: the two trailing outline pills. */
  actions?: QuickLinkAction[];
  /** For you only: the delivery promo (text + pager count e.g. "1/4"). */
  delivery?: { text: ReactNode; count?: string; pages?: number };
  onTile?: (index: number) => void;
  onAction?: (index: number) => void;
  onDelivery?: () => void;
};

// Bespoke tile illustrations exported from Figma (served from public/assets).
const ILLUS = "/assets/dopamine/illustrations";
const illus = (name: string) => <img className="ds-qlinks__illus" src={`${ILLUS}/${name}.png`} alt="" />;

// Quick-commerce bolt tile — exact Figma vector (gradient #EBB5F5→#AE66BA, bolt #F9D4FF).
const deliveryBolt = (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="url(#ql-bolt-grad)" />
    <path d="M25.1624 8.09368C25.5224 8.09 25.7507 8.47895 25.5725 8.79193L20.8899 17.0156L21.8342 16.9579L28.4583 16.5566C28.8569 16.5324 29.0997 16.9879 28.8577 17.3056L17.4885 32.2285C17.1691 32.6478 16.5079 32.2988 16.6741 31.7988L19.9641 21.9199L11.6428 22.2978C11.271 22.3145 11.0303 21.9109 11.2219 21.5917L13.7024 17.4609L13.7034 17.4599L19.1467 8.38372C19.2301 8.24473 19.3792 8.15904 19.5413 8.15716L25.1624 8.09368Z" fill="#F9D4FF" />
    <defs>
      <linearGradient id="ql-bolt-grad" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EBB5F5" />
        <stop offset="1" stopColor="#AE66BA" />
      </linearGradient>
    </defs>
  </svg>
);

const FORYOU_ITEMS: QuickLinkTile[] = [
  { icon: illus("reorder"), label: "Re-order medicines" },
  { icon: illus("health-plans"), label: "Health plans" },
  { icon: illus("health-insights"), label: "Health insights" },
  {
    icon: (
      <>
        <span className="ds-qlinks__careplan-tag">Care Plan</span>
        <img className="ds-qlinks__illus ds-qlinks__illus--disc" src={`${ILLUS}/more-discounts.png`} alt="" />
      </>
    ),
    label: "More discounts",
    careplan: true
  }
];
const LABS_ITEMS: QuickLinkTile[] = [
  { icon: <DsIcon name="lab-test" size={28} />, label: <>Full body <b>Packages</b></> },
  { icon: <DsIcon name="call-ringing" size={28} />, label: <>Book via <b>Call</b></> },
  { icon: <DsIcon name="phone" size={28} />, label: <>Book via <b>Whatsapp</b></> },
  { icon: <DsIcon name="prescription" size={28} />, label: <>Upload <b>Prescription</b></> }
];
const LABS_ACTIONS: QuickLinkAction[] = [
  { icon: <DsIcon name="profile-user-person" size={20} />, label: "Family hub" },
  { icon: <DsIcon name="insights" size={20} />, label: "Insights" }
];
const DEFAULT_DELIVERY = {
  text: (
    <>
      Get medicines in under <b>30mins</b>. <span className="ds-qlinks__delivery-sub">Now in your locality</span>
    </>
  ),
  count: "1/4",
  pages: 4
};

/**
 * Homepage quick links. **For you**: four icon tiles + a delivery promo card + divider. **Labs**:
 * four labelled tiles + two outline pills. Tiles/actions are data-driven — pass real illustrations
 * via `items`.
 */
export function QuickLinks({
  type = "For you",
  items,
  actions = LABS_ACTIONS,
  delivery = DEFAULT_DELIVERY,
  onTile,
  onAction,
  onDelivery,
  className = "",
  ...props
}: QuickLinksProps) {
  if (type === "Labs") {
    const tiles = items ?? LABS_ITEMS;
    return (
      <div className={`ds-qlinks ds-qlinks--labs ${className}`.trim()} {...props}>
        <div className="ds-qlinks__tiles">
          {tiles.map((t, i) => (
            <button key={i} type="button" className="ds-qlinks__labs-tile" onClick={() => onTile?.(i)}>
              <span className="ds-qlinks__labs-icon" aria-hidden="true">{t.icon}</span>
              <span className="ds-qlinks__labs-label">{t.label}</span>
            </button>
          ))}
        </div>
        <div className="ds-qlinks__pills">
          {actions.map((a, i) => (
            <button key={i} type="button" className="ds-qlinks__pill" onClick={() => onAction?.(i)}>
              <span className="ds-qlinks__pill-icon" aria-hidden="true">{a.icon}</span>
              <span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const tiles = items ?? FORYOU_ITEMS;
  return (
    <div className={`ds-qlinks ds-qlinks--foryou ${className}`.trim()} {...props}>
      <div className="ds-qlinks__tiles">
        {tiles.map((t, i) => (
          <button key={i} type="button" className="ds-qlinks__col" onClick={() => onTile?.(i)}>
            <span className="ds-qlinks__tile" data-careplan={t.careplan || undefined} aria-hidden="true">{t.icon}</span>
            <span className="ds-qlinks__label">{t.label}</span>
          </button>
        ))}
      </div>
      <div className="ds-qlinks__delivery-wrap">
        <button type="button" className="ds-qlinks__delivery" onClick={onDelivery}>
          <span className="ds-qlinks__bolt" aria-hidden="true">{deliveryBolt}</span>
          <span className="ds-qlinks__delivery-text">{delivery.text}</span>
          <span className="ds-qlinks__delivery-cta" aria-hidden="true"><DsIcon name="chevron-right" size={11} /></span>
          {delivery.count && (
            <span className="ds-qlinks__pager" aria-hidden="true">
              <span className="ds-qlinks__pager-count">{delivery.count}</span>
              <span className="ds-qlinks__dots">
                {Array.from({ length: Math.min(delivery.pages ?? 3, 3) }, (_, d) => (
                  <span key={d} data-active={d === 0 || undefined} />
                ))}
              </span>
            </span>
          )}
        </button>
      </div>
      <div className="ds-qlinks__divider" aria-hidden="true" />
    </div>
  );
}
