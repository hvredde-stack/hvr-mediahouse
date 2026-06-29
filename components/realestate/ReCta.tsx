import Link from "next/link";
import { ArrowRight, CalendarClock } from "lucide-react";
import { realEstate } from "@/lib/realestate";
import { Reveal } from "../Reveal";

const { cta } = realEstate;

export function ReCta() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2rem] px-8 py-16 text-center sm:px-12 sm:py-20"
            style={{ background: "linear-gradient(160deg,#16306b 0%,#0e2347 100%)" }}
          >
            {/* warm glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
              style={{ background: "radial-gradient(circle,#38bdf8,transparent 70%)" }}
            />
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur">
                <CalendarClock size={14} /> Free · 30 minutes · no commitment
              </span>
              <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
                {cta.title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                {cta.blurb}
              </p>
              <Link
                href="/#contact"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-ink shadow-xl transition-transform hover:scale-[1.03]"
              >
                {cta.button}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
