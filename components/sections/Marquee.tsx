import { platforms } from "@/lib/site";

export function Marquee() {
  const items = [...platforms, ...platforms];
  return (
    <section className="border-y border-border py-10">
      <p className="overline mb-7 text-center">
        We grow brands across every major platform
      </p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12">
          {items.map((p, i) => (
            <span
              key={i}
              className="font-display whitespace-nowrap text-2xl font-bold tracking-tight text-fg/45 sm:text-3xl"
            >
              {p}
            </span>
          ))}
        </div>
        <div
          className="animate-marquee flex shrink-0 items-center gap-12 pr-12"
          aria-hidden
        >
          {items.map((p, i) => (
            <span
              key={i}
              className="font-display whitespace-nowrap text-2xl font-bold tracking-tight text-fg/45 sm:text-3xl"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
