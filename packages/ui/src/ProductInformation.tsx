import { useState, type HTMLAttributes, type ReactNode } from "react";
import { DsIcon } from "./icons.js";

export type ProductInfoSection = {
  title: string;
  content: ReactNode;
  /** Expanded on first render. */
  defaultOpen?: boolean;
  /** Clamp the body and add a See more / See less toggle. */
  readMore?: boolean;
};

export type ProductInformationProps = HTMLAttributes<HTMLDivElement> & {
  sections?: ProductInfoSection[];
};

const bullets = (items: string[]) => (
  <ul className="ds-pinfo__bullets">
    {items.map((t, i) => (
      <li key={i}>{t}</li>
    ))}
  </ul>
);

const DEFAULT_SECTIONS: ProductInfoSection[] = [
  {
    title: "Product Highlights",
    defaultOpen: true,
    content: bullets([
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Non bibendum risus consectetur sit amet.",
      "Integer mattis nunc quam, sit amet pulvinar sapien volutpat vel.",
      "Donec nec ipsum nibh. Suspendisse rhoncus nulla diam.",
      "Massa magna. Fusce nisi massa, pellentesque."
    ])
  },
  {
    title: "Key Usage",
    readMore: true,
    content: (
      <>
        <p>Treatment and prevention of nutritional deficiencies: it addresses vitamin/mineral deficiencies caused by a poor diet and malnutrition, and during periods of increased requirement such as growth, post-surgery recovery, pregnancy and lactation (if prescribed).</p>
        <p>To strengthen the immune system: it supports immune function, promotes recovery, and helps the body fight infections.</p>
        <p>As an antioxidant: it neutralises damage caused by free radicals, supporting cellular health and slowing the ageing process.</p>
        <p>To support cardiovascular and nerve health, and blood health: it helps form red blood cells and enhances iron absorption, countering fatigue.</p>
      </>
    )
  },
  {
    title: "Dosage",
    readMore: true,
    content: (
      <>
        <p>The dose depends on your age, body weight and overall health. The recommended dose is 1 tablet per day. Your doctor will decide the right dose and duration of treatment for you.</p>
        <p>If you miss a dose, take it as soon as possible. If it is almost time for the next dose, skip the missed dose — do not double the dose.</p>
      </>
    )
  },
  {
    title: "Directions For Use",
    content: bullets([
      "Use as directed by a healthcare professional.",
      "Swallow it as a whole. Do not chew, crush, or break it.",
      "Take it with food to reduce the chances of stomach discomfort."
    ])
  },
  {
    title: "Quick Tips",
    content: bullets([
      "Take it at the same time every day to help you remember.",
      "It is usually taken once daily or as directed by your doctor.",
      "Do not use if you are allergic to it or any of its ingredients.",
      "Tell your doctor about all the medicines you are taking."
    ])
  },
  {
    title: "FAQ’s",
    content: (
      <div className="ds-pinfo__faqs">
        {[1, 2, 3].map((n) => (
          <div key={n} className="ds-pinfo__faq">
            <p className="ds-pinfo__q">Question {n}</p>
            <p className="ds-pinfo__a">Regular answer coming for this question</p>
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Additional Information",
    readMore: true,
    content: (
      <div className="ds-pinfo__faqs">
        <div className="ds-pinfo__faq">
          <p className="ds-pinfo__q">Storage and Handling</p>
          <p className="ds-pinfo__a">Store below 30°C in a dry place. Keep away from direct sunlight. Keep out of reach of children.</p>
        </div>
        <div className="ds-pinfo__faq">
          <p className="ds-pinfo__q">Written and Reviewed By</p>
          <p className="ds-pinfo__a">Written by: Dr. Lipika Khurana · Reviewed by: Dr. Sakshi Jain</p>
        </div>
      </div>
    )
  }
];

/**
 * PDP information accordion: a stack of collapsible sections (title + rotating chevron) separated
 * by 8px divider bands. Long sections can be clamped with a See more / See less toggle.
 */
export function ProductInformation({ sections = DEFAULT_SECTIONS, className = "", ...props }: ProductInformationProps) {
  const [open, setOpen] = useState<Record<number, boolean>>(() => Object.fromEntries(sections.map((s, i) => [i, Boolean(s.defaultOpen)])));
  const [more, setMore] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setOpen((o) => ({ ...o, [i]: !o[i] }));
  const toggleMore = (i: number) => setMore((m) => ({ ...m, [i]: !m[i] }));

  return (
    <div className={`ds-pinfo ${className}`.trim()} {...props}>
      {sections.map((s, i) => (
        <div key={i} className="ds-pinfo__section">
          {i > 0 && <div className="ds-pinfo__band" aria-hidden="true" />}
          <div className="ds-pinfo__inner">
            <button type="button" className="ds-pinfo__header" aria-expanded={open[i]} onClick={() => toggle(i)}>
              <span className="ds-pinfo__title">{s.title}</span>
              <span className="ds-pinfo__chev" data-open={open[i] || undefined} aria-hidden="true">
                <DsIcon name="chevron-right" size={14} />
              </span>
            </button>
            {open[i] && (
              <div className="ds-pinfo__body">
                <div className="ds-pinfo__content" data-clamped={(s.readMore && !more[i]) || undefined}>{s.content}</div>
                {s.readMore && (
                  <button type="button" className="ds-pinfo__more" onClick={() => toggleMore(i)}>
                    {more[i] ? "See less" : "See more"}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
