import { site } from "@/lib/site";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label={site.name}
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-brand text-xs font-bold text-white">
        {site.shortName.charAt(0)}
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-fg">
        {site.shortName}{" "}
        <span className="font-medium text-muted">Media House</span>
      </span>
    </span>
  );
}
