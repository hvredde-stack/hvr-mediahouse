"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, X } from "lucide-react";
import { realEstate } from "@/lib/realestate";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

const { shift } = realEstate;

export function ReShift() {
  return (
    <section className="section-pad bg-bg-2">
      <div className="container-page">
        <SectionHeading eyebrow={shift.eyebrow} title={shift.title} subtitle={shift.subtitle} />

        <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:items-stretch">
          {/* Old way — subdued */}
          <Reveal>
            <div className="flex h-full flex-col rounded-[1.75rem] border border-border bg-surface p-8 sm:p-9">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-muted">{shift.old.label}</h3>
                <span className="rounded-full bg-bg-2 px-3 py-1 text-xs font-medium text-muted">
                  {shift.old.tag}
                </span>
              </div>
              <TrendLine variant="flat" />
              <ul className="mt-7 space-y-3.5">
                {shift.old.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-muted">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-bg-2 text-muted">
                      <X size={12} strokeWidth={3} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* New way — elevated */}
          <Reveal delay={0.08}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-brand-soft p-8 sm:p-9">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-50 blur-2xl"
                style={{ background: "radial-gradient(circle,#5b9ae6,transparent 70%)" }}
              />
              <div className="relative flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold text-fg">{shift.next.label}</h3>
                <span className="gradient-bg rounded-full px-3 py-1 text-xs font-semibold text-white">
                  {shift.next.tag}
                </span>
              </div>
              <TrendLine variant="rising" />
              <ul className="relative mt-7 space-y-3.5">
                {shift.next.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-fg/90">
                    <span className="gradient-bg mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {p}
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

function TrendLine({ variant }: { variant: "flat" | "rising" }) {
  const reduce = useReducedMotion();
  const rising = variant === "rising";
  // Rising = compounding curve; flat = a spike that fades back to nothing.
  const d = rising
    ? "M4,86 C40,84 70,74 110,62 C150,50 180,40 220,26 C250,16 280,10 312,6"
    : "M4,52 C30,52 44,30 64,30 C84,30 96,52 120,52 L312,52";
  const stroke = rising ? "#2b5bb0" : "#b8ab9a";

  return (
    <div className="mt-6 rounded-2xl bg-white/70 p-4 ring-1 ring-black/5">
      <svg viewBox="0 0 316 92" className="h-24 w-full" preserveAspectRatio="none">
        {rising && (
          <defs>
            <linearGradient id="shift-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5b9ae6" stopOpacity="0.28" />
              <stop offset="1" stopColor="#5b9ae6" stopOpacity="0" />
            </linearGradient>
          </defs>
        )}
        {rising && <path d={`${d} L312,92 L4,92 Z`} fill="url(#shift-area)" />}
        <motion.path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        {/* endpoint dot */}
        <circle cx={rising ? 312 : 312} cy={rising ? 6 : 52} r="4" fill={stroke} />
      </svg>
      <p className="mt-1 text-center text-xs font-medium text-muted">
        {rising ? "Presence + reputation, compounding" : "One spike, then silence"}
      </p>
    </div>
  );
}
