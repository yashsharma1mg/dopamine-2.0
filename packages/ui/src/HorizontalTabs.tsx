import { type HTMLAttributes, type ReactNode } from "react";

export type HorizontalTabsType = "underline" | "highlighted";
export type HorizontalTabItem = { label: string; subtext?: string; icon?: ReactNode };

export type HorizontalTabsProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  type?: HorizontalTabsType;
  items: HorizontalTabItem[];
  activeIndex?: number;
  onChange?: (index: number) => void;
  /** underline type only: show 64px image chips above the label. */
  withImages?: boolean;
};

const imageIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
    <path d="M5 17l4.5-4 3 2.5L16 12l3 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function HorizontalTabs({
  type = "underline",
  items,
  activeIndex = 0,
  onChange,
  withImages = false,
  className = "",
  ...props
}: HorizontalTabsProps) {
  if (type === "highlighted") {
    const hasSub = items.some((i) => i.subtext || i.icon);
    return (
      <div className={`ds-htabs ds-htabs--highlighted ${className}`.trim()} role="tablist" data-rich={hasSub || undefined} {...props}>
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === activeIndex}
            className="ds-htabs__seg"
            data-active={i === activeIndex || undefined}
            onClick={() => onChange?.(i)}
          >
            {it.icon && <span className="ds-htabs__seg-icon">{it.icon}</span>}
            <span className="ds-htabs__seg-body">
              <span className="ds-htabs__seg-label">{it.label}</span>
              {it.subtext && <span className="ds-htabs__seg-sub">{it.subtext}</span>}
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`ds-htabs ds-htabs--underline ${className}`.trim()} data-with-images={withImages || undefined} role="tablist" {...props}>
      {items.map((it, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === activeIndex}
          className="ds-htabs__tab"
          data-active={i === activeIndex || undefined}
          onClick={() => onChange?.(i)}
        >
          {withImages && <span className="ds-htabs__chip">{it.icon ?? imageIcon}</span>}
          <span className="ds-htabs__label">{it.label}</span>
          <span className="ds-htabs__underline" />
        </button>
      ))}
    </div>
  );
}
