import { realEstate } from "@/lib/realestate";
import { accents } from "@/lib/site";
import { Icon } from "../Icon";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

const { why } = realEstate;

export function ReWhy() {
  return (
    <section id="why" className="section-pad bg-bg-2">
      <div className="container-page">
        <SectionHeading eyebrow={why.eyebrow} title={why.title} subtitle={why.subtitle} />

        {/* Stat band */}
        <Reveal className="mt-14">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-border lg:grid-cols-4">
            {why.stats.map((s, i) => (
              <div key={s.label} className="bg-surface p-7 text-center">
                <div
                  className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
                  style={{ color: accents[i % accents.length] }}
                >
                  {s.value}
                </div>
                <p className="mx-auto mt-2 max-w-[14rem] text-sm leading-snug text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* What it means for the agent */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.points.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 0.06}>
              <div className="matte matte-hover flex h-full flex-col rounded-2xl p-6">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl text-white"
                  style={{ background: accents[i % accents.length] }}
                >
                  <Icon name={p.icon} size={20} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted/70">{why.footnote}</p>
      </div>
    </section>
  );
}
