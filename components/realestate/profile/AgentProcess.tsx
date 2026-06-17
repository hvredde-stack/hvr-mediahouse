import { agent } from "@/lib/agent";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function AgentProcess() {
  return (
    <section id="process" className="section-pad bg-bg-2">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow="My process"
          title="What working with me looks like"
          subtitle={agent.process.intro}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-5">
          {agent.process.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="matte matte-hover flex h-full flex-col rounded-2xl p-6">
                <span className="gradient-text font-display text-4xl font-bold opacity-40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold leading-snug">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
