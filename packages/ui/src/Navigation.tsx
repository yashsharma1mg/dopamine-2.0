import { type HTMLAttributes } from "react";
import { DsIcon } from "./icons.js";

export type NavigationType = "labs" | "pharmacy" | "for you-no scroll" | "CP-profile icon" | "for you-scroll";

export type NavigationProps = HTMLAttributes<HTMLDivElement> & {
  type?: NavigationType;
  locationName?: string;
  locationDetail?: string;
  cartCount?: number;
  searchHint?: string;
  /** Show the phone status bar (time + signal/wifi/battery) above the header. */
  statusBar?: boolean;
  statusTime?: string;
  batteryLevel?: number;
};

const TABS = ["For you", "Pharmacy", "Labs", "Consults", "Insurance"] as const;

type Config = { active: (typeof TABS)[number]; profile: "default" | "cp"; cta: "upload" | "categories" | "find-best-tests"; scroll: boolean };

const CONFIG: Record<NavigationType, Config> = {
  labs: { active: "Labs", profile: "default", cta: "find-best-tests", scroll: false },
  pharmacy: { active: "Pharmacy", profile: "default", cta: "categories", scroll: false },
  "for you-no scroll": { active: "For you", profile: "default", cta: "upload", scroll: false },
  "CP-profile icon": { active: "For you", profile: "cp", cta: "upload", scroll: false },
  "for you-scroll": { active: "For you", profile: "default", cta: "upload", scroll: true }
};

const icons = {
  location: <DsIcon name="navigation" size={20} />,
  chevronDown: <DsIcon name="chevron-down" size={12} />,
  person: <DsIcon name="profile-user-person" size={20} />,
  bag: <DsIcon name="bag" size={20} />,
  search: <DsIcon name="search" size={20} />,
  upload: <DsIcon name="document-upload" size={20} />,
  // No sparkle asset in the iconography set — kept inline.
  sparkle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" /></svg>
  ),
  categories: <DsIcon name="category" size={16} />,
  // Phone chrome — OS status-bar glyphs, not part of the DS iconography.
  signal: (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
  ),
  wifi: (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor" aria-hidden="true"><path d="M8.5 2.2c2.6 0 5 1 6.8 2.7l1.2-1.4C14.4 1.4 11.6.2 8.5.2 5.4.2 2.6 1.4.5 3.5l1.2 1.4C3.5 3.2 5.9 2.2 8.5 2.2Z" /><path d="M8.5 5.6c1.7 0 3.2.6 4.4 1.7l1.2-1.4C12.6 4.5 10.6 3.7 8.5 3.7S4.4 4.5 2.9 5.9l1.2 1.4C5.3 6.2 6.8 5.6 8.5 5.6Z" /><path d="M8.5 9c.9 0 1.7.3 2.3.9l-2.3 2.1-2.3-2.1C6.8 9.3 7.6 9 8.5 9Z" /></svg>
  )
};

const battery = (pct: number) => (
  <span className="ds-nav__status-battery">
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="21" height="12" rx="3.5" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="2" y="2" width={17 * Math.max(0, Math.min(100, pct)) / 100} height="9" rx="2" fill="currentColor" />
      <path d="M23.5 4.3c.9.4 1.5 1.2 1.5 2.2s-.6 1.8-1.5 2.2V4.3Z" fill="currentColor" fillOpacity="0.4" />
    </svg>
    <span className="ds-nav__status-batt-pct">{pct}</span>
  </span>
);

export function Navigation({
  type = "for you-no scroll",
  locationName = "Office",
  locationDetail = "3rd floor, Motorola...",
  cartCount = 3,
  searchHint = "‘crocin’…",
  statusBar = true,
  statusTime = "5:13",
  batteryLevel = 76,
  className = "",
  ...props
}: NavigationProps) {
  const cfg = CONFIG[type];

  return (
    <div className={`ds-nav ${className}`.trim()} data-type={type} {...props}>
      {statusBar && (
        <div className="ds-nav__statusbar" aria-hidden="true">
          <span className="ds-nav__status-time">{statusTime}</span>
          <span className="ds-nav__status-icons">{icons.signal}{icons.wifi}{battery(batteryLevel)}</span>
        </div>
      )}

      {/* Row 1 — location + profile + cart */}
      <div className="ds-nav__top">
        <button type="button" className="ds-nav__location">
          <span className="ds-nav__location-mark">{icons.location}</span>
          <span className="ds-nav__location-copy"><strong>{locationName}</strong> <span>{locationDetail}</span></span>
          <span className="ds-nav__location-chevron">{icons.chevronDown}</span>
        </button>
        <button type="button" className="ds-nav__avatar" data-variant={cfg.profile} aria-label="Profile">{icons.person}</button>
        <span className="ds-nav__cart-wrap">
          <button type="button" className="ds-nav__cart" aria-label={`Cart, ${cartCount} items`}>{icons.bag}</button>
          {cartCount > 0 && <span className="ds-nav__badge">{cartCount}</span>}
        </span>
      </div>

      {/* Row 2 — category tabs */}
      <div className="ds-nav__tabs" data-scroll={cfg.scroll || undefined} role="tablist" aria-label="Categories">
        {TABS.map((tab, i) => (
          <div key={tab} className="ds-nav__tab-slot">
            <button type="button" role="tab" aria-selected={tab === cfg.active} className="ds-nav__tab" data-active={tab === cfg.active || undefined}>
              <span className="ds-nav__tab-chip" aria-hidden="true" />
              <span className="ds-nav__tab-label">{tab}</span>
              <span className="ds-nav__tab-underline" />
            </button>
            {i === 0 && <span className="ds-nav__tab-divider" aria-hidden="true" />}
          </div>
        ))}
      </div>

      {/* Row 3 — search + trailing action */}
      <div className="ds-nav__search-row">
        <div className="ds-nav__search">
          <span className="ds-nav__search-icon">{icons.search}</span>
          <span className="ds-nav__search-text">Search {searchHint}</span>
        </div>
        {cfg.cta === "upload" && (
          <button type="button" className="ds-nav__cta ds-nav__cta--upload">
            <span className="ds-nav__cta-icon">{icons.upload}</span>
            <span className="ds-nav__cta-copy"><span>Upload</span><strong>Prescription</strong></span>
          </button>
        )}
        {cfg.cta === "categories" && (
          <button type="button" className="ds-nav__cta ds-nav__cta--categories">Categories {icons.categories}</button>
        )}
        {cfg.cta === "find-best-tests" && (
          <button type="button" className="ds-nav__cta ds-nav__cta--find">Find best tests {icons.sparkle}</button>
        )}
      </div>
    </div>
  );
}
