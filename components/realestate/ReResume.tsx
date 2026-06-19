"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Home, Play, Camera, BadgeCheck, TrendingUp } from "lucide-react";
import { realEstate } from "@/lib/realestate";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

const { resume } = realEstate;

const gridTiles = [
  { bg: "#12603f", fg: "#fff", icon: <Home size={16} /> },
  { bg: "#0a1f16", fg: "#fff", icon: <Play size={16} fill="currentColor" /> },
  { bg: "#b6e24a", fg: "#0a1f16", icon: <Camera size={16} /> },
  { bg: "#2f7d5b", fg: "#fff", icon: <Camera size={16} /> },
  { bg: "#e3f0ea", fg: "#0a3d2b", icon: <Home size={16} /> },
  { bg: "#7c5cff", fg: "#fff", icon: <Play size={16} fill="currentColor" /> },
  { bg: "#e8739a", fg: "#fff", icon: <TrendingUp size={16} /> },
  { bg: "#f2f5f3", fg: "#5b6a62", icon: <Home size={16} /> },
  { bg: "#0a3d2b", fg: "#fff", icon: <Play size={16} fill="currentColor" /> },
];

export function ReResume() {
  const reduce = useReducedMotion();

  return (
    <section id="results" className="section-pad">
      <div className="container-page">
        <SectionHeading eyebrow={resume.eyebrow} title={resume.title} subtitle={resume.subtitle} />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          {/* Profile / highlight card */}
          <Reveal>
            <div className="matte mx-auto max-w-md rounded-[2rem] p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-base font-bold text-white">
                  JR
                </span>
                <div className="min-w-0 leading-tight">
                  <div className="flex items-center gap-1.5 font-display text-base font-bold text-fg">
                    {resume.handle}
                    <BadgeCheck size={16} className="text-brand" />
                  </div>
                  <div className="text-xs text-muted">Realtor · GTA &amp; Durham Region</div>
                </div>
              </div>

              {/* mini stat row */}
              <div className="mt-5 grid grid-cols-3 divide-x divide-border rounded-2xl bg-bg-2/50 py-3 text-center">
                <Mini value="142" label="Posts" />
                <Mini value="9.8k" label="Followers" />
                <Mini value="312%" label="Reach ↑" />
              </div>

              {/* this month's grid */}
              <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-wider text-muted">
                This month, under your name
              </p>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {gridTiles.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                    whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: i * 0.05, ease: [0.34, 1.56, 0.64, 1] }}
                    className="grid aspect-square place-items-center rounded-lg"
                    style={{ background: t.bg, color: t.fg }}
                  >
                    {t.icon}
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* The numbers */}
          <Reveal delay={0.08}>
            <div>
              <h3 className="font-display text-xl font-semibold">What lands in the feed</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {resume.output.map((o) => (
                  <div key={o.label} className="rounded-2xl border border-border bg-surface p-4">
                    <div className="font-display text-3xl font-bold tracking-tight text-fg">
                      {o.value}
                    </div>
                    <div className="text-sm text-muted">{o.label}</div>
                  </div>
                ))}
              </div>

              <h3 className="mt-8 font-display text-xl font-semibold">And what it does</h3>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {resume.lift.map((l) => (
                  <div
                    key={l.label}
                    className="rounded-2xl bg-brand-soft p-4 text-center"
                  >
                    <ScrollStat
                      value={l.value}
                      className="font-display text-2xl font-bold tracking-tight text-brand-strong sm:text-3xl"
                    />
                    <div className="mt-1 text-xs text-muted">{l.label}</div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted/70">{resume.liftNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Mini({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-base font-bold text-fg">{value}</div>
      <div className="text-[0.65rem] text-muted">{label}</div>
    </div>
  );
}

/* Counts up once when scrolled into view; SSR / reduced-motion show the real value. */
function parse(value: string) {
  const m = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m) return null;
  const clean = m[2].replace(/,/g, "");
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  return { prefix: m[1], target: parseFloat(clean), suffix: m[3], decimals };
}

function ScrollStat({ value, className }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const parsed = useMemo(() => parse(value), [value]);
  const [n, setN] = useState(parsed ? parsed.target : 0);

  useEffect(() => {
    if (!parsed || reduce || !inView) return;
    let raf = 0;
    let start = 0;
    const dur = 1300;
    // First frame sets progress from 0 — avoids a synchronous setState in the effect body.
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      setN(parsed.target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, reduce]);

  if (!parsed) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }
  const formatted = n.toLocaleString("en-US", {
    minimumFractionDigits: parsed.decimals,
    maximumFractionDigits: parsed.decimals,
  });
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`} aria-label={value}>
      {parsed.prefix}
      {formatted}
      {parsed.suffix}
    </span>
  );
}
