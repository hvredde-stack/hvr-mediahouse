import { Check, Award, MapPin } from "lucide-react";
import { agent } from "@/lib/agent";
import { accents } from "@/lib/site";
import { Icon } from "@/components/Icon";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function AgentExpertise() {
  return (
    <section id="expertise" className="section-pad">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow="Expertise"
          title="How I can help"
          subtitle="Whatever your move looks like, there's a good chance I've done it many times before."
        />

        {/* specialties */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {agent.specialties.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.06}>
              <article className="matte matte-hover h-full rounded-2xl p-6">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl text-white"
                  style={{ background: accents[i % accents.length] }}
                >
                  <Icon name={s.icon} size={20} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* areas + credentials + awards */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <div className="matte h-full rounded-2xl p-6">
              <h3 className="inline-flex items-center gap-2 font-display text-base font-semibold">
                <MapPin size={17} className="text-brand" /> Areas I serve
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {agent.areas.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-border bg-bg-2/50 px-3 py-1.5 text-sm text-fg/75"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="matte h-full rounded-2xl p-6">
              <h3 className="font-display text-base font-semibold">Credentials & memberships</h3>
              <ul className="mt-4 space-y-3">
                {agent.credentials.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm text-fg/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="matte h-full rounded-2xl p-6">
              <h3 className="inline-flex items-center gap-2 font-display text-base font-semibold">
                <Award size={17} className="text-amber" /> Awards & recognition
              </h3>
              <ul className="mt-4 space-y-3">
                {agent.awards.map((a) => (
                  <li key={a.title} className="flex items-baseline gap-3 text-sm">
                    <span className="font-display font-bold text-brand">{a.year}</span>
                    <span className="text-fg/80">{a.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
