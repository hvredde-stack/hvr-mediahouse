import { agent } from "@/lib/agent";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function AgentTimeline() {
  return (
    <section id="experience" className="section-pad bg-bg-2">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow="Experience"
          title="A track record, not a tagline"
          subtitle="Twelve years, one obsession: getting clients the best possible result."
        />

        <div className="mt-14 max-w-3xl">
          <ol className="relative border-l border-border pl-8">
            {agent.timeline.map((t, i) => (
              <li key={t.year} className="relative pb-10 last:pb-0">
                {/* node */}
                <span className="gradient-bg absolute -left-[2.15rem] top-1 grid h-5 w-5 place-items-center rounded-full ring-4 ring-bg-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                <Reveal delay={i * 0.05}>
                  <span className="font-display text-sm font-bold text-brand">{t.year}</span>
                  <h3 className="mt-1 font-display text-xl font-semibold">{t.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-muted">{t.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
