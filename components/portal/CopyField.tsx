"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

/** A read-only URL field with a copy button. */
export function CopyField({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked — user can still select + copy manually */
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <input
        readOnly
        value={value}
        onFocus={(e) => e.currentTarget.select()}
        className="w-full flex-1 rounded-xl border border-border bg-bg-2 px-3 py-2.5 text-sm text-fg/90 focus:border-brand focus:outline-none"
      />
      <button
        onClick={copy}
        className="gradient-bg inline-flex shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
