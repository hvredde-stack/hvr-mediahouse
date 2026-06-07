import { Check, Sparkles, ArrowUpRight } from "lucide-react";
import { pricing, site } from "@/lib/site";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

export function Pricing() {
  const featured = pricing.find((p) => p.featured) ?? pricing[0];
  const others = pricing.filter((p) => p !== featured);

  return (
    <section id="pricing" className="section-pad bg-tint-peach">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow="Engagements"
          title={
            <>
              A partnership, <span className="italic text-brand">not a checkout</span>
            </>
          }
          subtitle="Most brands start with Growth — our flagship engagement. Two leaner options sit alongside it. No long contracts, cancel anytime."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-5">
          {/* Featured engagement */}
          <Reveal className="lg:col-span-3">
            <div className="gradient-border relative flex h-full flex-col bg-surface p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <span className="gradient-bg inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold text-white">
                  <Sparkles size={13} /> Recommended
                </span>
                <span className="overline">Flagship</span>
              </div>

              <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">
                {featured.name}
              </h3>
              <p className="mt-2 max-w-sm text-muted">{featured.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-muted">
                  {site.currency}
                </span>
                <span className="font-display text-6xl font-bold tracking-tight">
                  {featured.price}
                </span>
                <span className="text-muted">{featured.period}</span>
              </div>

              <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
                {featured.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="gradient-bg mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="text-fg/90">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="gradient-bg mt-9 inline-flex w-fit items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-purple/25 transition-transform hover:scale-[1.03]"
              >
                Start with {featured.name}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </Reveal>

          {/* Leaner alternatives */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            {others.map((plan, i) => (
              <Reveal key={plan.name} delay={0.07 * (i + 1)} className="h-full">
                <div className="matte matte-hover flex h-full flex-col rounded-[1.5rem] p-7">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-xl font-semibold">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-sm font-semibold text-muted">
                        {site.currency}
                      </span>
                      <span className="font-display text-2xl font-bold">
                        {plan.price}
                      </span>
                      <span className="text-xs text-muted">{plan.period}</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-muted">{plan.description}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {plan.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-brand"
                          strokeWidth={3}
                        />
                        <span className="text-fg/85">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
                  >
                    Choose {plan.name} <ArrowUpRight size={15} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-muted">
          Bigger budget or something bespoke?{" "}
          <a href="#contact" className="font-semibold text-brand">
            Let&apos;s design a custom engagement →
          </a>
        </p>
      </div>
    </section>
  );
}
