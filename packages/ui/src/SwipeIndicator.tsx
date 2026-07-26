import { type HTMLAttributes } from "react";

export type SwipeIndicatorType = "line-filling" | "staggered";
export type SwipeIndicatorSize = "Normal" | "Small";

export type SwipeIndicatorProps = HTMLAttributes<HTMLDivElement> & {
  type?: SwipeIndicatorType;
  size?: SwipeIndicatorSize;
  /** total number of steps/pages. */
  total?: number;
  /** current step, 1-based. */
  current?: number;
};

export function SwipeIndicator({
  type = "line-filling",
  size = "Normal",
  total = 4,
  current = 1,
  className = "",
  style,
  ...props
}: SwipeIndicatorProps) {
  const width = size === "Small" ? 48 : 216;
  const step = width / total;
  const clamped = Math.min(Math.max(current, 1), total);
  const fillWidth = type === "line-filling" ? step * clamped : step;
  const fillLeft = type === "line-filling" ? 0 : step * (clamped - 1);

  return (
    <div
      className={`ds-swipe ${className}`.trim()}
      data-type={type}
      data-size={size}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={clamped}
      style={{ width, ...style }}
      {...props}
    >
      <span className="ds-swipe__fill" style={{ left: fillLeft, width: fillWidth }} />
    </div>
  );
}
