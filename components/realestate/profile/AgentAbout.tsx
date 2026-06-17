import { agent } from "@/lib/agent";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function AgentAbout() {
  return (
    <section id="about" className="section-pad">
      <div className="container-page">
        <SectionHeading center={false} eyebrow="About" title="Meet your agent" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_0.6fr] lg:gap-14">
          {/* bio */}
          <Reveal>
            <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-fg">
              {agent.about.lead}
            </p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              {agent.about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* quick facts */}
          <Reveal delay={0.08}>
            <div className="matte rounded-[1.5rem] p-6">
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
                Quick facts
              </h3>
              <dl className="mt-4 divide-y divide-border">
                {agent.about.quickFacts.map((f) => (
                  <div key={f.label} className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-sm text-muted">{f.label}</dt>
                    <dd className="text-right text-sm font-semibold text-fg">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
