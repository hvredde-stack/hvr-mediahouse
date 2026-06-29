import { CheckCircle2 } from "lucide-react";
import { Reveal } from "../Reveal";

const values = [
  {
    title: "ROI-first, always",
    text: "Every post and every dollar of ad spend is tied to a goal — leads, sales or reach that matters.",
  },
  {
    title: "Content that's on-brand",
    text: "A dedicated creative team makes scroll-stopping content that actually sounds and looks like you.",
  },
  {
    title: "AI-powered reporting",
    text: "AI surfaces what's working — no vanity metrics. Clear monthly reports you can actually understand and act on.",
  },
  {
    title: "Fast, human support",
    text: "A real person who knows your account, replying in hours — not days.",
  },
];

export function About() {
  return (
    <section id="about" className="section-pad bg-tint-mint">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="overline mb-4">Why HVR</p>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            One team for content, ads &amp; strategy — stop juggling vendors
          </h2>
          <p className="mt-5 text-lg text-muted">
            We&apos;re a team of strategists, creators and ad specialists who pair
            real human judgment with AI and data analytics at every step — turning
            your social media into a growth channel that pays for itself.
            Big-agency results, with the care and speed of a partner who actually
            picks up the phone.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "Senior specialists + AI on every account",
              "AI and data analytics behind every decision",
              "Month-to-month — we earn your business",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3">
                <CheckCircle2
                  size={22}
                  className="mt-0.5 shrink-0 text-brand-purple"
                />
                <span className="text-fg">{point}</span>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-white/10"
          >
            Let&apos;s talk about your brand
          </a>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 0.08}>
              <div className="matte matte-hover h-full rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {v.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
