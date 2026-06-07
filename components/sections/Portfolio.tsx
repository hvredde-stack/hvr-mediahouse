import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { caseStudies, images } from "@/lib/site";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";
import { CountUp } from "../CountUp";

export function Portfolio() {
  const featured = caseStudies[0];
  const others = caseStudies.slice(1);

  const story = [
    { label: "Challenge", text: featured.challenge },
    { label: "Solution", text: featured.solution },
    { label: "Result", text: featured.result },
  ];

  return (
    <section id="work" className="section-pad bg-tint-sky">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow="Selected work"
          title={
            <>
              Brands we made{" "}
              <span className="italic text-brand">impossible to ignore</span>
            </>
          }
          subtitle="Real campaigns, real numbers. Here's one in depth — and a few more."
        />

        {/* Featured case study */}
        <Reveal className="mt-14">
          <article className="matte grid overflow-hidden rounded-[2rem] lg:grid-cols-2">
            {/* visual */}
            <div className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden p-9 text-white sm:p-11">
              <Image
                src={images.caseFeatured}
                alt={`${featured.client} — featured case study`}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div
                className={`absolute inset-0 bg-linear-to-br ${featured.accent}`}
                style={{ opacity: 0.82 }}
              />
              <div className="relative">
                <span className="overline text-white/80">
                  Featured case study
                </span>
                <h3 className="mt-4 font-display text-4xl font-bold tracking-tight">
                  {featured.client}
                </h3>
                <p className="mt-2 text-white/85">{featured.category}</p>
              </div>
              <div className="relative mt-10 flex flex-wrap gap-x-10 gap-y-6">
                {featured.results.map((r) => (
                  <div key={r.label}>
                    <div className="font-display text-4xl font-bold">
                      <CountUp value={r.metric} />
                    </div>
                    <div className="mt-1 text-sm text-white/80">{r.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* story */}
            <div className="flex flex-col justify-center gap-7 p-9 sm:p-11">
              {story.map((s) => (
                <div key={s.label}>
                  <p className="overline mb-2 text-brand">{s.label}</p>
                  <p className="text-lg leading-relaxed text-fg/90">{s.text}</p>
                </div>
              ))}
              <a
                href="#contact"
                className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand"
              >
                Get results like these <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
        </Reveal>

        {/* Supporting case studies */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {others.map((c, i) => (
            <Reveal key={c.client} delay={(i % 3) * 0.07}>
              <article className="matte matte-hover group relative h-full overflow-hidden rounded-2xl p-7">
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${c.accent}`}
                />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">
                      {c.client}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{c.category}</p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand"
                  />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {c.summary}
                </p>
                <div className="mt-6 flex gap-8 border-t border-border pt-5">
                  {c.results.slice(0, 2).map((r) => (
                    <div key={r.label}>
                      <div className="font-display text-2xl font-bold tracking-tight">
                        <CountUp value={r.metric} />
                      </div>
                      <div className="mt-0.5 text-xs text-muted">{r.label}</div>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
