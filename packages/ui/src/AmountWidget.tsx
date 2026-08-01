import { type HTMLAttributes } from "react";
import { DsIcon } from "./icons.js";
import { CarePlanBadge } from "./CarePlanBadge.js";

export type AmountWidgetState = "Collapsed" | "Expanded";

export type AmountWidgetProps = HTMLAttributes<HTMLDivElement> & {
  state?: AmountWidgetState;
};

// Grey receipt glyph that sits in the collapsed circle (multi-fill → inlined).
function ReceiptGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 7.63397 12.6472" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <path d="M7.57675 0.914524C7.61342 0.951914 7.63397 1.0022 7.63397 1.05457V12.6384L2.86274 12.6472H0V1.05457C0 1.0022 0.0205446 0.951914 0.0572194 0.914524L0.740075 0.218349C0.857683 0.0984463 1.05081 0.0984462 1.16842 0.218348L1.90849 0.972859L2.64857 0.218349C2.76618 0.0984463 2.9593 0.0984462 3.07691 0.218348L3.81698 0.972859L4.55706 0.218349C4.67467 0.0984463 4.86779 0.0984462 4.9854 0.218348L5.72548 0.972859L6.46555 0.218349C6.58316 0.0984464 6.77629 0.0984463 6.89389 0.218348L7.57675 0.914524Z" fill="url(#ds-receipt-grad)" />
      <path d="M3.99745 3.95063C3.82167 3.95063 3.67886 3.80782 3.67886 3.63204C3.67886 3.45625 3.82167 3.31344 3.99745 3.31344C4.17324 3.31344 4.31605 3.45625 4.31605 3.63204H4.95324C4.95324 3.21723 4.6861 2.86689 4.31605 2.73493V2.03906H3.67886V2.73493C3.30881 2.86689 3.04167 3.21723 3.04167 3.63204C3.04167 4.1591 3.4704 4.58783 3.99745 4.58783C4.17324 4.58783 4.31605 4.73064 4.31605 4.90642C4.31605 5.08221 4.17324 5.22502 3.99745 5.22502C3.82167 5.22502 3.67886 5.08221 3.67886 4.90642H3.04167C3.04167 5.32123 3.30881 5.67157 3.67886 5.80353V6.4994H4.31605V5.80353C4.6861 5.67157 4.95324 5.32123 4.95324 4.90642C4.95324 4.37936 4.52451 3.95063 3.99745 3.95063Z" fill="#fff" />
      <path d="M6.62207 10.276L3.264 10.276C3.05858 10.271 2.88823 10.1006 2.88823 9.89519C2.88823 9.68977 3.05858 9.51942 3.264 9.51942L6.62207 9.51942C6.82749 9.52443 6.99785 9.69478 6.99785 9.9002C6.99785 10.1056 6.82749 10.276 6.62207 10.276Z" fill="#fff" />
      <path d="M6.62207 8.55723L3.264 8.55723C3.05858 8.55221 2.88823 8.38187 2.88823 8.17644C2.88823 7.97102 3.05858 7.80067 3.264 7.80067L6.62207 7.80067C6.82749 7.80568 6.99785 7.97603 6.99785 8.18145C6.99785 8.38688 6.82749 8.55723 6.62207 8.55723Z" fill="#fff" />
      <circle cx="1.51767" cy="9.889" r="0.383" fill="#fff" />
      <circle cx="1.51762" cy="8.159" r="0.383" fill="#fff" />
      <defs>
        <linearGradient id="ds-receipt-grad" x1="3.05" y1="15.09" x2="3.33" y2="-2.43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#868E9E" />
          <stop offset="0.36" stopColor="#A2A9B8" />
          <stop offset="1" stopColor="#BEC5D1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Filled grey house glyph for the expanded delivery header (multi-fill → inlined).
function HomeGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 13.4608 13.2504" fill="none" aria-hidden="true" style={{ display: "block" }}>
      <path d="M6.36629 0.128302C6.57921 -0.042745 6.88192 -0.0427898 7.09481 0.128302L13.2188 5.0492C13.4985 5.27392 13.5411 5.68688 13.3184 5.96815C13.0938 6.25184 12.6782 6.30261 12.3956 6.07654L11.9991 5.76014V12.5482C11.999 12.936 11.6848 13.2504 11.297 13.2504H2.16512C1.77732 13.2504 1.46307 12.936 1.46297 12.5482V7.79432L1.462 7.7699V5.76014L1.06551 6.07654C0.783001 6.30266 0.367375 6.25173 0.142661 5.96815C-0.0799717 5.68692 -0.0382269 5.27394 0.241294 5.0492L6.36629 0.128302Z" fill="url(#ds-home-grad)" />
      <circle cx="6.7588" cy="4.9967" r="1.4718" fill="#fff" />
      <defs>
        <linearGradient id="ds-home-grad" x1="6.82" y1="14.88" x2="6.63" y2="1.29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#868E9E" />
          <stop offset="0.36" stopColor="#A2A9B8" />
          <stop offset="1" stopColor="#BEC5D1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Row({ label, value, valueClass, labelClass, dotted }: { label: React.ReactNode; value: React.ReactNode; valueClass?: string; labelClass?: string; dotted?: boolean }) {
  return (
    <div className="ds-amount-widget__row">
      <span className={`ds-amount-widget__label ${labelClass ?? ""}`.trim()} data-dotted={dotted || undefined}>{label}</span>
      <span className={`ds-amount-widget__value ${valueClass ?? ""}`.trim()}>{value}</span>
    </div>
  );
}

export function AmountWidget({ state = "Expanded", className = "", ...props }: AmountWidgetProps) {
  if (state === "Collapsed") {
    return (
      <div className={`ds-amount-widget ds-amount-widget--collapsed ${className}`.trim()} {...props}>
        <div className="ds-amount-widget__collapsed-row">
          <span className="ds-amount-widget__circle" aria-hidden="true"><ReceiptGlyph /></span>
          <span className="ds-amount-widget__topay">
            To be paid: <b>₹42700</b>
            <span className="ds-amount-widget__savings">Savings: ₹4000</span>
          </span>
          <DsIcon name="chevron-right" size={16} className="ds-amount-widget__chev-cta" />
        </div>
      </div>
    );
  }

  return (
    <div className={`ds-amount-widget ${className}`.trim()} {...props}>
      <div className="ds-amount-widget__loc">
        <span className="ds-amount-widget__circle ds-amount-widget__circle--lg" aria-hidden="true">
          <HomeGlyph />
        </span>
        <span className="ds-amount-widget__addr">
          <span className="ds-amount-widget__addr-1">Delivering to <b>DLF Colony</b></span>
          <span className="ds-amount-widget__addr-2">Sector 14, Gurugram</span>
        </span>
        <DsIcon name="chevron-right" size={16} className="ds-amount-widget__chev-cta" />
      </div>
      <div className="ds-amount-widget__bill">
        <p className="ds-amount-widget__title">Bill summary</p>
        <div className="ds-amount-widget__group">
          <Row label="Item total(MRP)" value="₹160" />
          <Row label="Total discount" value="-₹188" valueClass="ds-amount-widget__value--green" labelClass="ds-amount-widget__label--green" dotted />
        </div>
        <hr className="ds-amount-widget__divider" />
        <div className="ds-amount-widget__group">
          <Row
            label={<>Delivery fee <CarePlanBadge height={14} /></>}
            value={<><s>₹5</s> <span className="ds-amount-widget__free">FREE</span></>}
          />
          <Row label="Green packaging charge" value="₹160" dotted />
          <Row label="NeuCoins" value="-₹188" valueClass="ds-amount-widget__value--green" />
        </div>
        <hr className="ds-amount-widget__divider" />
        <div className="ds-amount-widget__row ds-amount-widget__row--total">
          <span>Total Amount</span>
          <span>₹188</span>
        </div>
      </div>
    </div>
  );
}
