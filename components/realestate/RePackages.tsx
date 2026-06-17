import Link from "next/link";
import { Check, Sparkles, ArrowUpRight } from "lucide-react";
import { realEstate } from "@/lib/realestate";
import { site } from "@/lib/site";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

const { packages } = realEstate;

function price(low: number, high: number) {
  return `${site.currency}${low.toLocaleString("en-US")}–${high.toLocaleString("en-US")}`;
}

export function RePackages() {
  return (
    <section id="packages" className="section-pad bg-tint-peach">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow={packages.eyebrow}
          title={packages.title}
          subtitle={packages.subtitle}
        />

        {/* Tier cards */}
        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {packages.tiers.map((t, i) => (
            <Reveal key={t.key} delay={i * 0.07} className="h-full">
              <div
                className={
                  t.featured
                    ? "gradient-border relative flex h-full flex-col bg-surface p-8"
                    : "matte matte-hover flex h-full flex-col rounded-[1.5rem] p-8"
                }
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden>
                    {t.glyph}
                  </span>
                  {t.featured ? (
                    <span className="gradient-bg inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white">
                      <Sparkles size={12} /> {t.badge}
                    </span>
                  ) : (
                    <span className="overline">{t.tag}</span>
                  )}
                </div>

                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                  {t.name}
                </h3>
                <p className="mt-2 min-h-[2.5rem] text-sm text-muted">{t.forWho}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-3xl font-bold tracking-tight text-fg">
                    {price(t.priceLow, t.priceHigh)}
                  </span>
                  <span className="text-sm text-muted">/mo</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                          t.featured ? "gradient-bg text-white" : "bg-brand-soft text-brand"
                        }`}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-fg/85">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#contact"
                  className={
                    t.featured
                      ? "gradient-bg mt-7 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-strong/25 transition-transform hover:scale-[1.03]"
                      : "mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-fg/15 bg-white px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-brand/40"
                  }
                >
                  Start with {t.name} <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Full comparison — md+ */}
        <Reveal className="mt-12 hidden md:block">
          <div className="matte overflow-hidden rounded-[1.5rem]">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-bg-2/60">
                  <th className="px-6 py-4 text-left font-display text-base font-semibold">
                    Compare every package
                  </th>
                  {packages.tiers.map((t) => (
                    <th
                      key={t.key}
                      className={`px-4 py-4 text-center font-display text-base font-semibold ${
                        t.featured ? "bg-brand-soft/50 text-brand-strong" : "text-fg"
                      }`}
                    >
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {packages.comparison.map((row, r) => (
                  <tr key={row.feature} className={r % 2 ? "bg-bg-2/30" : ""}>
                    <td className="px-6 py-3.5 text-fg/80">{row.feature}</td>
                    <Cell v={row.spark} />
                    <Cell v={row.signature} highlight />
                    <Cell v={row.authority} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Add-ons */}
        <Reveal className="mt-10">
          <div className="rounded-[1.5rem] border border-border bg-surface p-7 sm:p-8">
            <h3 className="font-display text-lg font-semibold">{packages.addonsTitle}</h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {packages.addons.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-border bg-bg-2/50 px-4 py-2 text-sm text-fg/75"
                >
                  {a}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted">
              Bigger volume or a team?{" "}
              <Link href="/#contact" className="font-semibold text-brand hover:underline">
                Let&apos;s design a custom retainer →
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Cell({
  v,
  highlight = false,
}: {
  v: string | boolean;
  highlight?: boolean;
}) {
  const empty = v === false || v === "" || v === "—";
  return (
    <td
      className={`px-4 py-3.5 text-center ${highlight ? "bg-brand-soft/40" : ""}`}
    >
      {v === true ? (
        <Check size={16} strokeWidth={3} className="mx-auto text-brand" />
      ) : empty ? (
        <span className="text-muted/40">—</span>
      ) : (
        <span className={`font-medium ${highlight ? "text-brand-strong" : "text-fg/80"}`}>
          {v}
        </span>
      )}
    </td>
  );
}
