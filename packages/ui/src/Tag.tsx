import { type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";

export type TagType = "info" | "notification" | "rating" | "new";
export type TagColor = "Purple" | "Yellow" | "Blue" | "Red" | "Orange" | "Green";

export type TagProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> & {
  type?: TagType;
  /** Info-badge hue (info type only). */
  color?: TagColor;
  /** Notification count (notification type only). */
  count?: number;
  /** Rating value shown before the star (rating type only). */
  value?: number | string;
  /** Label — info badge text, or the New badge word (defaults to "NEW"). */
  children?: ReactNode;
};

export function Tag({
  type = "info",
  color = "Purple",
  count = 1,
  value = "4.2",
  children,
  className = "",
  ...props
}: TagProps) {
  const cls = (m: string) => `ds-tag ds-tag--${m} ${className}`.trim();

  if (type === "notification") return <span className={cls("notification")} {...props}>{count}</span>;
  if (type === "rating")
    return (
      <span className={cls("rating")} {...props}>
        {value}
        <DsIcon name="rating-star" size={9} />
      </span>
    );
  if (type === "new") return <span className={cls("new")} {...props}>{children ?? "NEW"}</span>;
  return <span className={cls("info")} data-color={color} {...props}>{children ?? "Label"}</span>;
}
