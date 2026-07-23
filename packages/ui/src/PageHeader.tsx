import { type HTMLAttributes, type ReactNode } from "react";

import { Icon } from "./Icon.js";

export type PageHeaderUsage = "Floating" | "Location" | "Dropdown" | "HIH" | "FamilyHub";
export type PageHeaderType = "Solid" | "Transparent";
export type PageHeaderTextColour = "Black" | "No heading";
export type PageHeaderTab = "You" | "Family";

export type PageHeaderProps = Omit<HTMLAttributes<HTMLDivElement>, "color"> & {
  usage?: PageHeaderUsage;
  type?: PageHeaderType;
  textColour?: PageHeaderTextColour;
  heading?: string;
  subtitle?: string;
  locationName?: string;
  locationDetail?: string;
  cartCount?: number;
  activeTab?: PageHeaderTab;
  onBack?: () => void;
  onLocationClick?: () => void;
  onProfileClick?: () => void;
  onCartClick?: () => void;
  onMoreClick?: () => void;
  onUploadClick?: () => void;
  onTabChange?: (tab: PageHeaderTab) => void;
};

const assets = {
  arrowLeft: "/assets/dopamine/page-header-arrow-left.svg",
  bag: "/assets/dopamine/page-header-bag.svg",
  chevron: "/assets/dopamine/page-header-chevron-down.svg",
  kebab: "/assets/dopamine/page-header-kebab.svg",
  location: "/assets/dopamine/page-header-location.svg",
  locationChevron: "/assets/dopamine/page-header-location-chevron.svg",
  locationInverse: "/assets/dopamine/page-header-location-inverse.svg",
  profile: "/assets/dopamine/page-header-profile.svg",
  statusBattery: "/assets/dopamine/page-header-status-battery-outline.svg",
  statusBatteryEnd: "/assets/dopamine/page-header-status-battery-end.svg",
  statusSignal: "/assets/dopamine/page-header-status-signal.svg",
  statusWifi: "/assets/dopamine/page-header-status-wifi.svg",
  upload: "/assets/dopamine/page-header-upload.svg"
} as const;

type IconButtonProps = {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

function HeaderIconButton({ label, children, className = "", onClick }: IconButtonProps) {
  return (
    <button type="button" className={`ds-page-header__icon-button ${className}`.trim()} aria-label={label} onClick={onClick}>
      {children}
    </button>
  );
}

export function PageHeaderStatusBar() {
  return (
    <div className="ds-page-header__status" aria-hidden="true">
      <span className="ds-page-header__time">5:13</span>
      <span className="ds-page-header__status-icons">
        <img src={assets.statusSignal} alt="" />
        <img src={assets.statusWifi} alt="" />
        <span className="ds-page-header__battery">
          <img src={assets.statusBattery} alt="" />
          <span>76</span>
          <img className="ds-page-header__battery-end" src={assets.statusBatteryEnd} alt="" />
        </span>
      </span>
    </div>
  );
}

function CartButton({ cartCount, onCartClick }: Pick<PageHeaderProps, "cartCount" | "onCartClick">) {
  return (
    <span className="ds-page-header__cart">
      <HeaderIconButton label={`Cart${cartCount ? `, ${cartCount} items` : ""}`} onClick={onCartClick}>
        <Icon src={assets.bag} />
      </HeaderIconButton>
      {cartCount ? <span className="ds-page-header__count">{cartCount}</span> : null}
    </span>
  );
}

function FamilyTabs({ activeTab, onTabChange }: Pick<PageHeaderProps, "activeTab" | "onTabChange">) {
  return (
    <div className="ds-page-header__tabs" role="tablist" aria-label="Family hub view">
      {(["You", "Family"] as const).map((tab) => (
        <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} className="ds-page-header__tab" onClick={() => onTabChange?.(tab)}>
          {tab}
        </button>
      ))}
    </div>
  );
}

export function PageHeader({
  activeTab = "You",
  cartCount = 3,
  className = "",
  heading = "Heading",
  locationDetail = "3rd floor, Motorola building, Gurugram",
  locationName,
  onBack,
  onCartClick,
  onLocationClick,
  onMoreClick,
  onProfileClick,
  onTabChange,
  onUploadClick,
  subtitle = "subtitle",
  textColour = "Black",
  type = "Transparent",
  usage = "Floating",
  ...props
}: PageHeaderProps) {
  const resolvedType = usage === "Location" ? type : "Transparent";
  const resolvedTextColour = usage === "FamilyHub" ? textColour : "Black";
  const hasHeading = resolvedTextColour === "Black";
  const locationTitle = locationName ?? (usage === "Floating" ? "Office" : "To Office");

  if (usage === "Floating") {
    return (
      <div className={`ds-page-header ds-page-header--floating ${className}`.trim()} data-usage={usage} data-type="Transparent" {...props}>
        <div className="ds-page-header__floating-inner">
          <PageHeaderStatusBar />
          <div className="ds-page-header__floating-row">
            <button type="button" className="ds-page-header__floating-location" onClick={onLocationClick}>
              <Icon src={assets.location} />
              <span className="ds-page-header__floating-location-content"><strong>{locationTitle}</strong><span>{locationDetail.replace(" building, Gurugram", "...")}</span></span>
              <Icon className="ds-page-header__location-chevron" src={assets.locationChevron} />
            </button>
            <HeaderIconButton label="Profile" onClick={onProfileClick}><Icon src={assets.profile} /></HeaderIconButton>
            <CartButton cartCount={cartCount} onCartClick={onCartClick} />
          </div>
        </div>
      </div>
    );
  }

  const isLocation = usage === "Location";
  const isFamilyHub = usage === "FamilyHub";
  const isHih = usage === "HIH";
  const hasGlassActions = isHih || isFamilyHub;

  return (
    <div className={`ds-page-header ds-page-header--${usage.toLowerCase()} ds-page-header--${resolvedType.toLowerCase()} ${className}`.trim()} data-usage={usage} data-type={resolvedType} {...props}>
      <PageHeaderStatusBar />
      {isLocation ? (
        <div className="ds-page-header__location-row">
          <div className="ds-page-header__location-content">
            <span className="ds-page-header__location-mark"><Icon src={assets.locationInverse} /></span>
            <button type="button" className="ds-page-header__location-copy" onClick={onLocationClick}>
              <span><strong>{locationTitle}</strong><Icon className="ds-page-header__inline-chevron" src={assets.locationChevron} /></span>
              <small>{locationDetail}</small>
            </button>
          </div>
          <CartButton cartCount={cartCount} onCartClick={onCartClick} />
        </div>
      ) : (
        <div className="ds-page-header__standard-row">
          <HeaderIconButton label="Go back" className={hasGlassActions ? "ds-page-header__glass" : ""} onClick={onBack}><Icon src={assets.arrowLeft} /></HeaderIconButton>
          {hasHeading ? <div className="ds-page-header__copy"><strong>{heading}</strong><span>{subtitle}<span className="ds-page-header__subtitle-chevron" aria-hidden="true"><img src={assets.chevron} alt="" /></span></span></div> : null}
          {isHih ? <HeaderIconButton label="More options" className="ds-page-header__glass" onClick={onMoreClick}><Icon src={assets.kebab} /></HeaderIconButton> : null}
          {isFamilyHub ? (
            <div className="ds-page-header__family-actions">
              <HeaderIconButton label="Upload" className="ds-page-header__glass" onClick={onUploadClick}><Icon src={assets.upload} /></HeaderIconButton>
              <FamilyTabs activeTab={activeTab} onTabChange={onTabChange} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
