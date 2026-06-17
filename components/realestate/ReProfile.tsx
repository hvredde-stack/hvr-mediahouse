import Link from "next/link";
import { BadgeCheck, Star, ArrowUpRight } from "lucide-react";
import { realEstate } from "@/lib/realestate";
import { Icon } from "../Icon";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

const { profile } = realEstate;

export function ReProfile() {
  return (
    <section id="website" className="section-pad">
      <div className="container-page">
        <SectionHeading
          center={false}
          eyebrow={profile.eyebrow}
          title={profile.title}
          subtitle={profile.subtitle}
        />
        <Reveal className="mt-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-sm font-semibold text-brand-strong">
            <Star size={14} fill="currentColor" /> {profile.availability}
          </span>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          {/* The website / profile mockup */}
          <Reveal>
            <div className="matte overflow-hidden rounded-[2rem]">
              {/* cover */}
              <div className="gradient-bg relative h-24">
                <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  <BadgeCheck size={13} /> Verified agent
                </span>
              </div>

              <div className="-mt-10 px-6 pb-7 sm:px-7">
                <div className="flex items-end justify-between gap-4">
                  <span className="grid h-20 w-20 place-items-center rounded-2xl bg-brand text-2xl font-bold text-white ring-4 ring-surface">
                    {profile.initials}
                  </span>
                  <span className="gradient-bg mb-1 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white">
                    {profile.ctaMock} <ArrowUpRight size={13} />
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-bold tracking-tight">{profile.name}</h3>
                  <span className="rounded-full bg-amber/15 px-2.5 py-0.5 text-xs font-semibold text-amber">
                    {profile.badge}
                  </span>
                </div>
                <p className="text-sm text-muted">{profile.role}</p>

                {/* stats */}
                <div className="mt-5 grid grid-cols-4 divide-x divide-border rounded-2xl bg-bg-2/50 py-3 text-center">
                  {profile.stats.map((s) => (
                    <div key={s.label} className="px-1">
                      <div className="font-display text-lg font-bold tracking-tight text-fg">
                        {s.value}
                      </div>
                      <div className="mt-0.5 text-[0.6rem] leading-tight text-muted">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* about */}
                <h4 className="mt-6 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
                  {profile.aboutLabel}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-fg/80">{profile.bio}</p>

                {/* process */}
                <h4 className="mt-5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
                  {profile.processLabel}
                </h4>
                <ol className="mt-2 space-y-2">
                  {profile.steps.map((s, i) => (
                    <li key={s} className="flex items-center gap-3 text-sm text-fg/80">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>

                {/* review */}
                <div className="mt-5 rounded-2xl bg-tint-peach p-4">
                  <div className="flex gap-0.5 text-amber">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <p className="mt-1.5 text-sm italic text-fg/85">“{profile.review.text}”</p>
                  <p className="mt-1 text-xs font-semibold text-muted">— {profile.review.author}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Trust copy */}
          <Reveal delay={0.08}>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">
                {profile.trustTitle}
              </h3>
              <ul className="mt-6 space-y-5">
                {profile.trust.map((t) => (
                  <li key={t.title} className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-soft text-brand">
                      <Icon name={t.icon} size={20} />
                    </span>
                    <div>
                      <h4 className="font-display text-base font-semibold">{t.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{t.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/#contact"
                className="gradient-bg group mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-strong/25 transition-transform hover:scale-[1.03]"
              >
                {profile.cta}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
