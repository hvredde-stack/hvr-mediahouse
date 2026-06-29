import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { services, images } from "@/lib/site";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

export function Services() {
  const flagship = services[0];
  const secondary = services.slice(1, 3);
  const rest = services.slice(3);

  return (
    <section id="services" className="section-pad">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow="What we do · AI-powered"
          title={
            <>
              One team for your entire{" "}
              <span className="italic text-brand">social presence</span>
            </>
          }
          subtitle="From strategy to the final report — content, ads and growth, handled end-to-end and supercharged with AI and data analytics."
        />

        {/* Asymmetric composition: flagship + two secondary */}
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Flagship */}
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <article className="grid h-full gap-8 overflow-hidden rounded-[1.75rem] bg-brand-soft p-8 sm:p-10 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col">
                <span className="overline mb-3">Flagship service</span>
                <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {flagship.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {flagship.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {["Content calendar", "Daily posting", "Community management", "Monthly reporting"].map(
                    (t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-white px-3 py-1.5 text-sm text-fg/70"
                      >
                        {t}
                      </span>
                    ),
                  )}
                </div>
                <a
                  href="#contact"
                  className="mt-7 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-brand"
                >
                  Start with this <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="relative min-h-[15rem] overflow-hidden rounded-2xl">
                <Image
                  src={images.contentCreation}
                  alt="Content creation in action"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
            </article>
          </Reveal>

          {/* Two secondary */}
          {secondary.map((s, i) => (
            <Reveal key={s.title} delay={0.06 * (i + 1)}>
              <article className="matte matte-hover h-full rounded-[1.75rem] p-7">
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Remaining services as a slim, editorial list */}
        <Reveal className="mt-5">
          <div className="matte divide-y divide-border overflow-hidden rounded-[1.75rem]">
            {rest.map((s) => (
              <div
                key={s.title}
                className="group flex items-center gap-5 p-6 transition-colors hover:bg-brand-soft/50 sm:px-8"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-lg font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-0.5 truncate text-sm text-muted">
                    {s.description}
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="hidden shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand sm:block"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
