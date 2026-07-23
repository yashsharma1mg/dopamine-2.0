import type { CSSProperties, HTMLAttributes } from "react";

export type IconProps = Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
  src: string;
  size?: number;
};

export function Icon({ className = "", size = 20, src, style, ...props }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`ds-icon ${className}`.trim()}
      style={{
        ...style,
        "--ds-icon-size": `${size}px`,
        "--ds-icon-source": `url("${src}")`
      } as CSSProperties}
      {...props}
    />
  );
}
