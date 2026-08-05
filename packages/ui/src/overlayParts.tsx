// Shared chrome for the overlay components (Bottomsheet, Dialog, QuantitySelector,
// PackOfMultiples): the floating close/back circles, the coral-tick select radio, and the
// Remove footer. Internal — not re-exported from the package barrel.
import { type ReactNode } from "react";
import { DsIcon } from "./icons.js";

export function CloseButton({ onClick, label = "Close" }: { onClick?: () => void; label?: string }) {
  return (
    <button type="button" className="ds-overlay-btn" aria-label={label} onClick={onClick}>
      <DsIcon name="cross" size={18} />
    </button>
  );
}

export function BackButton({ onClick, label = "Back" }: { onClick?: () => void; label?: string }) {
  return (
    <button type="button" className="ds-overlay-btn" aria-label={label} onClick={onClick}>
      <DsIcon name="arrow-left" size={18} />
    </button>
  );
}

/** 21.6px select control — coral filled with a white tick when selected, outline otherwise. */
export function SelectRadio({ selected }: { selected?: boolean }) {
  return (
    <span className="ds-select-radio" data-selected={selected || undefined} aria-hidden="true">
      {selected ? <DsIcon name="tick" size={13} /> : null}
    </span>
  );
}

export function RemoveButton({ onClick, children = "Remove" }: { onClick?: () => void; children?: ReactNode }) {
  return (
    <button type="button" className="ds-remove-btn" onClick={onClick}>
      <DsIcon name="delete" size={18} />
      <span>{children}</span>
    </button>
  );
}
