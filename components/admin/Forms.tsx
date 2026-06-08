"use client";

import type { ReactNode } from "react";

/** A <select> that submits its enclosing form as soon as it changes. */
export function SubmitSelect({
  name,
  defaultValue,
  options,
  className,
}: {
  name: string;
  defaultValue: string;
  options: readonly string[];
  className?: string;
}) {
  return (
    <select
      name={name}
      defaultValue={defaultValue}
      onChange={(e) => e.currentTarget.form?.requestSubmit()}
      className={
        className ??
        "rounded-lg border border-border bg-bg-2 px-2.5 py-1.5 text-sm capitalize focus:border-brand focus:outline-none"
      }
    >
      {options.map((o) => (
        <option key={o} value={o} className="capitalize">
          {o}
        </option>
      ))}
    </select>
  );
}

/** A submit button that asks for confirmation first (for deletes). */
export function ConfirmButton({
  children,
  message,
  className,
  ariaLabel,
}: {
  children: ReactNode;
  message: string;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="submit"
      aria-label={ariaLabel}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
