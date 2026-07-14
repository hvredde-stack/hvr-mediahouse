import { Quote, Star } from "lucide-react";
import { testimonials, clients } from "@/lib/site";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

function Stars({ size = 16 }: { size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} className="text-amber-400" fill="currentColor" />
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  return (
    <span className="gradient-bg grid h-11 w-11 shrink-0 place-items-center rounded-full font-display text-sm font-semibold text-white">
      {name.charAt(0)}
    </span>
  );
}

export function Testimonials() {
  const featured = testimonials[0];
  const supporting = testimonials.slice(1);

  return (
    <section id="testimonials" className="section-pad bg-transparent">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow="Client love"
          title={
            <>
              Brands that <span className="italic text-brand">stake their name</span>{" "}
              on us
            </>
          }
          subtitle="We measure success by the growth — and the trust — of the brands we partner with."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* Featured testimonial */}
          <Reveal className="lg:col-span-2">
            <figure className="matte flex h-full flex-col rounded-[1.75rem] p-9 sm:p-11">
              <Quote
                size={40}
                className="text-brand/25"
                fill="currentColor"
              />
              <blockquote className="mt-6 font-display text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-border pt-6">
                <Avatar name={featured.name} />
                <div className="flex-1">
                  <div className="font-semibold">{featured.name}</div>
                  <div className="text-sm text-muted">{featured.role}</div>
                </div>
                <Stars />
              </figcaption>
            </figure>
          </Reveal>

          {/* First supporting (tall, beside featured) */}
          <Reveal delay={0.08}>
            <SupportingCard t={supporting[0]} />
          </Reveal>

          {/* Remaining supporting */}
          {supporting.slice(1).map((t, i) => (
            <Reveal key={t.name} delay={0.06 * (i + 1)} className="lg:col-span-1">
              <SupportingCard t={t} />
            </Reveal>
          ))}
        </div>

        {/* Client trust strip */}
        <Reveal className="mt-14">
          <p className="overline mb-6 text-center">Brands we&apos;ve grown</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {clients.map((c) => (
              <span
                key={c}
                className="font-display text-lg font-semibold tracking-tight text-fg/35"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SupportingCard({ t }: { t: { quote: string; name: string; role: string } }) {
  return (
    <figure className="matte flex h-full flex-col rounded-[1.75rem] p-7">
      <Stars size={14} />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-fg/90">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <Avatar name={t.name} />
        <div>
          <div className="text-sm font-semibold">{t.name}</div>
          <div className="text-xs text-muted">{t.role}</div>
        </div>
      </figcaption>
    </figure>
  );
}
