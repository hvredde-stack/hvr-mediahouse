import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-xl font-bold tracking-tight text-fg ${className}`}
      aria-label={site.name}
    >
      {site.shortName}{" "}
      <span className="font-medium text-muted">Media House</span>
    </span>
  );
}
