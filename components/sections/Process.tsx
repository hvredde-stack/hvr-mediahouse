import { process } from "@/lib/site";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

export function Process() {
  return (
    <section id="process" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              A simple path to <span className="italic text-brand">growth</span>
            </>
          }
          subtitle="We make working with an agency easy. Here's exactly what happens after you reach out."
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.1}>
              <div className="relative">
                <div className="gradient-text font-display text-5xl font-bold opacity-30">
                  {p.step}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
