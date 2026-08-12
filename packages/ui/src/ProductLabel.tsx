import { type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";

export type ProductLabelItem = {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
  /** Dotted underline on the description (a tappable info affordance). */
  underline?: boolean;
};

export type ProductLabelProps = HTMLAttributes<HTMLDivElement> & {
  items?: ProductLabelItem[];
};

// Genuine authenticity seal — exact Figma vector (coral sunburst stamp with sparkles).
const genuineSeal = (
  <svg width="18" height="18" viewBox="0 0 18.0376 17.9814" fill="none" aria-hidden="true" style={{ color: "var(--semantic-color-branding-1mg)" }}>
    <g fill="currentColor">
      <path d="M14.2311 4.5205L14.6398 4.39417C12.8179 2.18431 9.76827 1.16612 6.86239 2.06364C3.95651 2.96116 2.01926 5.51985 1.76953 8.36891L2.17817 8.24258C2.47141 5.61224 4.28569 3.27039 6.97968 2.43886C9.67368 1.60733 12.4982 2.51617 14.233 4.5205H14.2311Z" />
      <path d="M6.72595 1.61966C9.88912 0.642949 13.2018 1.78936 15.1239 4.24623L16.2968 3.8842C16.1757 3.28837 15.699 2.81133 15.0785 2.70385C14.562 2.61523 14.1288 2.26452 13.9358 1.77993C13.6615 1.09359 12.9274 0.708942 12.2047 0.8711C11.6939 0.986118 11.1586 0.827732 10.7934 0.454394C10.277 -0.0754451 9.45022 -0.150867 8.84482 0.275267C8.41727 0.576954 7.86295 0.633521 7.38053 0.427996C6.69947 0.135736 5.90678 0.380857 5.51139 1.00497C5.23139 1.44619 4.7414 1.71205 4.21736 1.70451C3.47576 1.69508 2.8382 2.22304 2.71145 2.95086C2.62253 3.46561 2.27065 3.8974 1.78444 4.08973C1.09581 4.36313 0.709871 5.09473 0.872571 5.815C0.987973 6.3241 0.829058 6.85771 0.454472 7.22162C0.00231999 7.66096 -0.118758 8.32278 0.119615 8.88279L1.29256 8.52077C1.48364 5.4115 3.56656 2.59826 6.72784 1.62155L6.72595 1.61966Z" />
      <path d="M11.1726 15.9136C14.1996 14.9784 16.1766 12.2424 16.2882 9.25195L15.889 9.37451C15.7301 12.15 13.8742 14.6691 11.0572 15.5384C8.24026 16.4076 5.28141 15.3762 3.57496 13.1777L3.17578 13.3002C4.96547 15.7043 8.14756 16.8469 11.1745 15.9117L11.1726 15.9136Z" />
      <path d="M17.7633 8.8158C17.7633 8.8158 17.7557 8.80448 17.7519 8.79883L16.7587 9.10617C16.7095 12.355 14.5925 15.3454 11.3102 16.3599C8.02783 17.3743 4.58466 16.0997 2.70038 13.4486L1.70716 13.7559C1.70716 13.7559 1.70716 13.7691 1.70716 13.7767C1.6977 14.5158 2.22741 15.1512 2.95767 15.2776C3.47414 15.3662 3.90738 15.7169 4.10035 16.2015C4.37466 16.8878 5.1087 17.2725 5.83139 17.1103C6.34219 16.9953 6.87758 17.1537 7.24271 17.527C7.75918 18.0569 8.58592 18.1323 9.19131 17.7062C9.61887 17.4045 10.1732 17.3479 10.6556 17.5534C11.3367 17.8457 12.1294 17.6006 12.5248 16.9764C12.8047 16.5352 13.2947 16.2694 13.8188 16.2769C14.5604 16.2863 15.1979 15.7584 15.3247 15.0306C15.4136 14.5158 15.7655 14.084 16.2517 13.8917C16.9403 13.6183 17.3263 12.8867 17.1636 12.1664C17.0482 11.6573 17.2071 11.1237 17.5817 10.7598C18.1133 10.245 18.1889 9.42106 17.7614 8.81768L17.7633 8.8158Z" />
      <path d="M8.11533 4.48856L7.66696 4.00586L7.57237 4.65637L6.97266 4.93166L7.56481 5.22204L7.64237 5.87444L8.10209 5.40494L8.7491 5.53315L8.44262 4.9524L8.76424 4.3792L8.11533 4.48856Z" />
      <path d="M9.95424 4.19083L9.6383 3.84766L9.5702 4.30962L9.14453 4.50383L9.56452 4.71124L9.61939 5.17508L9.94667 4.84134L10.4045 4.93185L10.1869 4.51891L10.4159 4.11163L9.95424 4.19083Z" />
      <path d="M6.27456 5.32761L5.95673 4.98633L5.89051 5.4464L5.46484 5.6425L5.88483 5.84802L5.9397 6.31187L6.26699 5.97813L6.72482 6.06863L6.50725 5.6557L6.73617 5.24842L6.27456 5.32761Z" />
      <path d="M10.1059 13.2569L10.5543 13.7396L10.6489 13.0891L11.2486 12.8138L10.6565 12.5234L10.5789 11.8691L10.1192 12.3405L9.47216 12.2123L9.77865 12.7931L9.45703 13.3663L10.1059 13.2569Z" />
      <path d="M8.2702 13.5546L8.58614 13.8977L8.65425 13.4358L9.07802 13.2397L8.65993 13.0342L8.60506 12.5703L8.27777 12.9041L7.81994 12.8135L8.03751 13.2265L7.80859 13.6338L8.2702 13.5546Z" />
      <path d="M11.9499 12.4178L12.2658 12.7591L12.3339 12.2991L12.7596 12.103L12.3396 11.8974L12.2847 11.4336L11.9575 11.7673L11.4996 11.6768L11.7172 12.0898L11.4883 12.4952L11.9499 12.4178Z" />
    </g>
  </svg>
);

const DEFAULT_ITEMS: ProductLabelItem[] = [
  { icon: genuineSeal, title: "Genuine", description: "Authenticity assured" },
  { icon: <DsIcon name="prescription" size={16} />, title: "Prescription", description: "required", underline: true },
  { icon: <DsIcon name="trend-up" size={16} />, title: "4,629 people", description: "bought recently" }
];

/**
 * PDP feature strip: a row of trust/feature badges (icon + bold title / secondary description),
 * separated by vertical dividers.
 */
export function ProductLabel({ items = DEFAULT_ITEMS, className = "", ...props }: ProductLabelProps) {
  return (
    <div className={`ds-plabel ${className}`.trim()} {...props}>
      <div className="ds-plabel__row">
        {items.map((it, i) => (
          <div key={i} className="ds-plabel__group">
            {i > 0 && <span className="ds-plabel__divider" aria-hidden="true" />}
            <div className="ds-plabel__item">
              <div className="ds-plabel__head">
                <span className="ds-plabel__icon" aria-hidden="true">{it.icon}</span>
                <span className="ds-plabel__title">{it.title}</span>
              </div>
              <span className="ds-plabel__desc" data-underline={it.underline || undefined}>{it.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
