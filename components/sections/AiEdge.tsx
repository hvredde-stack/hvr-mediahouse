"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  PhoneCall,
  FileText,
  Handshake,
  ArrowRight,
  BarChart3,
  Clock,
  ShieldCheck,
  Check,
} from "lucide-react";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

/* The lead → AI call → file → you flow */
const steps = [
  {
    icon: BarChart3,
    label: "A lead comes in",
    text: "Someone taps your Instagram or Facebook ad and drops their name, number and what they're after.",
  },
  {
    icon: PhoneCall,
    label: "AI calls in seconds",
    text: "Our voice agent rings them back almost instantly — day or night — and has a natural, on-brand conversation.",
  },
  {
    icon: FileText,
    label: "It builds the file",
    text: "The AI qualifies them, captures what matters, and writes up a clean profile of the lead.",
  },
  {
    icon: Handshake,
    label: "You close",
    text: "You get a warm, briefed lead — the full picture in hand — instead of a cold name on a list.",
  },
];

/* Rows that "fill in" on the live call card */
const fileRows = [
  { k: "Name", v: "Verified" },
  { k: "Budget", v: "$850k–$1.1M" },
  { k: "Timeline", v: "Next 60 days" },
  { k: "Intent", v: "High — ready to tour" },
];

const chips = [
  { icon: BarChart3, label: "Data-led decisions" },
  { icon: Clock, label: "Replies in seconds" },
  { icon: ShieldCheck, label: "24/7 coverage" },
];

export function AiEdge() {
  const reduce = useReducedMotion();

  return (
    <section id="ai" className="section-pad bg-tint-sky/50">
      <div className="container-page">
        <SectionHeading
          eyebrow="AI + Data analytics · In development"
          title={
            <>
              We act on data — and we&apos;re teaching AI to{" "}
              <span className="italic text-brand">call your leads first</span>.
            </>
          }
          subtitle="Behind every post is analytics, not guesswork. And we're building something bigger: the moment a lead fills out your ad, our AI calls them, has a real conversation, and hands you a ready-made file — before you ever pick up the phone."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          {/* ── The flow ─────────────────────────────────────── */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div className="matte matte-hover relative h-full rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                        <s.icon size={18} />
                      </span>
                      <span className="font-display text-[0.7rem] font-bold uppercase tracking-wider text-muted">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-base font-semibold text-fg">
                      {s.label}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {s.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                {chips.map((c) => (
                  <span
                    key={c.label}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-fg"
                  >
                    <c.icon size={15} className="text-brand" />
                    {c.label}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.38}>
              <a
                href="#contact"
                className="gradient-bg group mt-7 inline-flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-strong/25 transition-transform hover:scale-[1.03]"
              >
                Ask about early access
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </Reveal>
          </div>

          {/* ── Live "AI call" card ──────────────────────────── */}
          <Reveal delay={0.12}>
            <div className="matte mx-auto w-full max-w-md rounded-[2rem] p-6">
              {/* call header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="relative grid h-11 w-11 place-items-center rounded-full bg-brand text-white">
                    <Sparkles size={18} />
                    <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full bg-lime opacity-75 ${
                          reduce ? "" : "animate-ping"
                        }`}
                      />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-lime ring-2 ring-surface" />
                    </span>
                  </span>
                  <div className="leading-tight">
                    <div className="font-display text-sm font-bold text-fg">
                      HVR AI
                    </div>
                    <div className="text-xs text-muted">Calling new lead…</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-[0.7rem] font-semibold text-brand-strong">
                  <PhoneCall size={12} /> Live
                </span>
              </div>

              {/* waveform */}
              <div className="mt-5 flex h-16 items-center justify-center gap-1 rounded-2xl bg-bg-2/70 px-4">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full bg-brand/70 ${
                      reduce ? "" : "animate-eq"
                    }`}
                    style={{
                      height: `${20 + ((i * 7) % 30)}%`,
                      animationDelay: `${(i % 9) * 0.09}s`,
                    }}
                  />
                ))}
              </div>

              {/* file being built */}
              <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
                Building lead file
              </p>
              <div className="mt-2 space-y-1.5">
                {fileRows.map((r, i) => (
                  <motion.div
                    key={r.k}
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.18 }}
                    className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5"
                  >
                    <span className="text-xs text-muted">{r.k}</span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                      {r.v}
                      <Check size={14} className="text-brand" />
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-brand-soft px-4 py-3">
                <span className="text-xs font-medium text-brand-strong">
                  Handed to you, briefed
                </span>
                <span className="font-display text-sm font-bold text-brand-strong">
                  ~2 min
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
