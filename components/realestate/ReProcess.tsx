import { realEstate } from "@/lib/realestate";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

const { process } = realEstate;

export function ReProcess() {
  return (
    <section id="process" className="section-pad bg-bg-2">
      <div className="container-page">
        <SectionHeading eyebrow={process.eyebrow} title={process.title} subtitle={process.subtitle} />

        <div className="relative mt-16 grid gap-8 md:grid-cols-4">
          {process.steps.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.1}>
              <div className="relative">
                <div className="gradient-text font-display text-5xl font-bold opacity-30">
                  {p.step}
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
