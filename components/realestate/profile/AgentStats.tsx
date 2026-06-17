import { agent } from "@/lib/agent";
import { accents } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function AgentStats() {
  return (
    <section className="bg-bg-2 py-12">
      <div className="container-page">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-border sm:grid-cols-3 lg:grid-cols-6">
            {agent.stats.map((s, i) => (
              <div key={s.label} className="bg-surface px-3 py-6 text-center">
                <div
                  className="font-display text-3xl font-bold tracking-tight sm:text-[2.1rem]"
                  style={{ color: accents[i % accents.length] }}
                >
                  {s.value}
                </div>
                <p className="mx-auto mt-1.5 max-w-[10rem] text-xs leading-snug text-muted">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
