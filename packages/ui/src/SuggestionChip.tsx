import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

export type SuggestionChipSize = "Default" | "small" | "Timestamp";
export type SuggestionChipState = "Primary" | "Default" | "disable" | "disable+select" | "default" | "selected";

export type SuggestionChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children?: ReactNode;
  counter?: number;
  date?: string;
  day?: string;
  month?: string;
  showLeadingIcon?: boolean;
  showTrailingCounter?: boolean;
  size?: SuggestionChipSize;
  state?: SuggestionChipState;
};

const arrows = {
  Default: {
    Primary: "/assets/dopamine/suggestion-chip-arrow-primary.svg",
    Default: "/assets/dopamine/suggestion-chip-arrow-default.svg",
    disable: "/assets/dopamine/suggestion-chip-arrow-disabled.svg",
    "disable+select": "/assets/dopamine/suggestion-chip-arrow-disabled-selected.svg"
  },
  small: {
    Primary: "/assets/dopamine/suggestion-chip-arrow-primary.svg",
    Default: "/assets/dopamine/suggestion-chip-arrow-default.svg",
    disable: "/assets/dopamine/suggestion-chip-arrow-disabled-small.svg",
    "disable+select": "/assets/dopamine/suggestion-chip-arrow-disabled-selected.svg"
  }
} as const;

export const SuggestionChip = forwardRef<HTMLButtonElement, SuggestionChipProps>(function SuggestionChip(
  {
    children = "Text here",
    className = "",
    counter = 1,
    date = "31",
    day = "Tue",
    disabled,
    month = "Aug",
    showLeadingIcon = true,
    showTrailingCounter = true,
    size = "Default",
    state = "Primary",
    ...props
  },
  ref
) {
  const isTimestamp = size === "Timestamp";
  const isDisabled = disabled || state === "disable" || state === "disable+select";
  const hasCounter = size === "Default" && showTrailingCounter && ["Primary", "Default", "disable", "disable+select"].includes(state);
  const arrow = !isTimestamp ? arrows[size === "small" ? "small" : "Default"][state as keyof typeof arrows.Default] : undefined;
  const usesSplitContent = size === "Default" && (state === "disable" || state === "disable+select");
  const icon = showLeadingIcon && arrow ? <span className="ds-suggestion-chip__icon" aria-hidden="true"><img src={arrow} alt="" /></span> : null;
  const label = <span className="ds-suggestion-chip__label">{children}</span>;
  const trailingCounter = hasCounter ? <span className="ds-suggestion-chip__counter">{counter}</span> : null;

  return (
    <button
      ref={ref}
      type="button"
      className={`ds-suggestion-chip ${className}`.trim()}
      data-has-leading-icon={!isTimestamp && showLeadingIcon ? "true" : "false"}
      data-size={size}
      data-state={state}
      disabled={isDisabled}
      aria-pressed={isTimestamp ? state === "selected" : undefined}
      {...props}
    >
      {isTimestamp ? (
        <span className="ds-suggestion-chip__timestamp"><span>{day}</span><strong>{date}</strong><span>{month}</span></span>
      ) : (
        <span className="ds-suggestion-chip__content">
          {usesSplitContent ? <>{icon}{label}{trailingCounter}</> : <><span className="ds-suggestion-chip__label-group">{icon}{label}</span>{trailingCounter}</>}
        </span>
      )}
    </button>
  );
});
