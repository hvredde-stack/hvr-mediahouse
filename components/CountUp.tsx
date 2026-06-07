"use client";

import { useEffect, useMemo, useState } from "react";

function parse(value: string) {
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return null;
  const clean = m[2].replace(/,/g, "");
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  return { prefix: m[1], target: parseFloat(clean), suffix: m[3], decimals };
}

/**
 * Renders a metric (e.g. "120M+", "5.2×", "+312%"). The REAL value is shown by
 * default (SSR / no-JS / screen readers), and counts up as a progressive
 * enhancement once mounted (respecting reduced-motion).
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const parsed = useMemo(() => parse(value), [value]);
  // Start at the real target so the static markup is always correct.
  const [n, setN] = useState(parsed ? parsed.target : 0);

  useEffect(() => {
    if (!parsed) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setN(parsed.target);
      return;
    }

    let raf = 0;
    let startTime = 0;
    const dur = 1300;
    setN(0);
    const tick = (t: number) => {
      if (!startTime) startTime = t;
      const p = Math.min(1, (t - startTime) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(parsed.target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [parsed]);

  if (!parsed) return <span className={className}>{value}</span>;

  const formatted = n.toLocaleString("en-US", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  });

  return (
    <span
      className={`whitespace-nowrap tabular-nums ${className ?? ""}`}
      aria-label={value}
    >
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  );
}
