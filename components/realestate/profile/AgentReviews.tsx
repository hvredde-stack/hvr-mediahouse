import { Star, Quote } from "lucide-react";
import { agent } from "@/lib/agent";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export function AgentReviews() {
  return (
    <section id="reviews" className="section-pad bg-bg-2">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow="Client reviews"
          title="What clients say"
          subtitle="4.9★ average across 210 verified reviews."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {agent.reviews.map((r, i) => (
            <Reveal key={r.author} delay={(i % 2) * 0.08}>
              <figure className="matte flex h-full flex-col rounded-[1.5rem] p-7">
                <Quote size={26} className="text-brand/30" fill="currentColor" />
                <div className="mt-2 flex gap-0.5 text-amber">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={15} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-base leading-relaxed text-fg/85">
                  {r.text}
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <span className="font-display font-semibold text-fg">{r.author}</span>
                  <span className="ml-2 text-sm text-muted">{r.detail}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
