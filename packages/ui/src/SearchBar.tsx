import { type HTMLAttributes, type ReactNode } from "react";

export type SearchState = "Default" | "selected" | "typing";
export type SearchType = "Bar Only" | "Bar with entry";

export type SearchBarProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  state?: SearchState;
  type?: SearchType;
  placeholder?: string;
  value?: string;
  /** Rotating-hint text shown after "Search for" in the selected state. */
  hint?: string;
  onBack?: () => void;
  onClear?: () => void;
  onMic?: () => void;
  onEntry?: () => void;
  entryIcon?: ReactNode;
};

const svg = (d: string, extra?: ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {extra}
  </svg>
);

const icons = {
  search: svg("M21 21l-4.3-4.3", <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />),
  back: svg("M19 12H5M12 19l-7-7 7-7"),
  close: svg("M18 6L6 18M6 6l12 12"),
  mic: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  category: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
};

export function SearchBar({
  state = "Default",
  type = "Bar Only",
  placeholder = "Text goes here ‘scroll animation’",
  value = "Whe",
  hint = "‘crocin’…",
  onBack,
  onClear,
  onMic,
  onEntry,
  entryIcon = icons.category,
  className = "",
  ...props
}: SearchBarProps) {
  const compact = state !== "Default";

  const bar = (
    <div className="ds-search__bar" data-state={state} data-compact={compact || undefined}>
      {state !== "Default" && (
        <button type="button" className="ds-search__icon-btn" aria-label="Back" onClick={onBack}>
          {icons.back}
        </button>
      )}

      {state === "selected" ? (
        <span className="ds-search__text">Search for {hint}</span>
      ) : state === "typing" ? (
        <input className="ds-search__input" defaultValue={value} aria-label="Search" />
      ) : (
        <input className="ds-search__input" placeholder={placeholder} aria-label="Search" />
      )}

      {state === "Default" && <span className="ds-search__icon">{icons.search}</span>}
      {state === "selected" && (
        <button type="button" className="ds-search__icon-btn" data-variant="mic" aria-label="Voice search" onClick={onMic}>
          {icons.mic}
        </button>
      )}
      {state === "typing" && (
        <button type="button" className="ds-search__icon-btn" data-variant="clear" aria-label="Clear" onClick={onClear}>
          {icons.close}
        </button>
      )}
    </div>
  );

  return (
    <div className={`ds-search ${className}`.trim()} data-type={type} {...props}>
      {bar}
      {type === "Bar with entry" && (
        <button type="button" className="ds-search__entry" aria-label="Categories" onClick={onEntry}>
          {entryIcon}
        </button>
      )}
    </div>
  );
}
