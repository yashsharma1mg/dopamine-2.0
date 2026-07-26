import { type HTMLAttributes, type ReactNode } from "react";

export type VerticalTabItem = { label: string; icon?: ReactNode };

export type VerticalTabsProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  items: VerticalTabItem[];
  activeIndex?: number;
  onChange?: (index: number) => void;
};

const imageIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
    <path d="M5 17l4.5-4 3 2.5L16 12l3 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function VerticalTabs({ items, activeIndex = 0, onChange, className = "", ...props }: VerticalTabsProps) {
  return (
    <div className={`ds-vtabs ${className}`.trim()} role="tablist" aria-orientation="vertical" {...props}>
      {items.map((it, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === activeIndex}
          className="ds-vtabs__item"
          data-active={i === activeIndex || undefined}
          onClick={() => onChange?.(i)}
        >
          <span className="ds-vtabs__chip">{it.icon ?? imageIcon}</span>
          <span className="ds-vtabs__label">{it.label}</span>
          {i === activeIndex && <span className="ds-vtabs__bar" aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}
