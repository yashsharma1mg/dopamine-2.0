import { type HTMLAttributes } from "react";
import { DsIcon } from "./icons.js";

export type NavigationType = "labs" | "pharmacy" | "for you-no scroll" | "CP-profile icon" | "for you-scroll";

export type NavigationProps = HTMLAttributes<HTMLDivElement> & {
  type?: NavigationType;
  locationName?: string;
  locationDetail?: string;
  cartCount?: number;
  searchHint?: string;
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
  categories: <DsIcon name="category" size={16} />
};

export function Navigation({
  type = "for you-no scroll",
  locationName = "Office",
  locationDetail = "3rd floor, Motorola...",
  cartCount = 3,
  searchHint = "‘crocin’…",
  className = "",
  ...props
}: NavigationProps) {
  const cfg = CONFIG[type];

  return (
    <div className={`ds-nav ${className}`.trim()} data-type={type} {...props}>
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
