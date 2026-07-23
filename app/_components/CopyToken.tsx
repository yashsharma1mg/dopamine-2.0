"use client";

import { useState } from "react";

export function CopyToken({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(name);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button className="copy-token" onClick={copy} type="button">
      {copied ? "Copied" : name}
    </button>
  );
}
