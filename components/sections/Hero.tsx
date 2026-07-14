"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight, PhoneCall, Sparkles, Star } from "lucide-react";
import { site, stats } from "@/lib/site";

/* ── Deterministic scatter-dot cluster (identical on server & client) ───
   A tiny seeded PRNG so the "audience" dot-cloud graphic renders the same
   markup during SSR and hydration — no Math.random() drift. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeCluster(seed: number, cx: number, cy: number, count: number, spread: number) {
  const rand = mulberry32(seed);
  const dots: { x: number; y: number; r: number; o: number }[] = [];
  for (let i = 0; i < count; i++) {
    // Gaussian-ish jitter via sum of uniforms, denser toward the center.
    const a = rand() + rand() + rand() + rand() - 2;
    const b = rand() + rand() + rand() + rand() - 2;
    const x = cx + a * spread;
    const y = cy + b * spread * 0.72;
    const r = 1 + rand() * 2.1;
    const o = 0.18 + rand() * 0.75;
    dots.push({ x, y, r, o });
  }
  return dots;
}

const clusterA = makeCluster(7, 240, 230, 260, 150);
const clusterB = makeCluster(23, 1160, 150, 220, 130);

function ScatterField() {
  return (
    <svg
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
    >
      {[...clusterA, ...clusterB].map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          opacity={d.o}
          className={`fill-lime ${i % 17 === 0 ? "animate-dot-pulse" : ""}`}
        />
      ))}
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [statA, statB] = stats;

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-bg pb-24 pt-32 sm:pt-36"
    >
      <ScatterField />

      {/* soft vignette so text stays legible over the dots */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 18% 55%, var(--color-bg) 0%, rgba(249,249,246,0.55) 55%, transparent 80%)",
        }}
      />

      {/* Floating proof cards — top right */}
      <div className="absolute right-4 top-28 z-20 hidden flex-col gap-3 sm:right-8 sm:top-32 lg:flex">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 20 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="matte flex w-[300px] items-center justify-between gap-3 rounded-2xl p-3 pr-4 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white">
              <PhoneCall size={17} />
            </div>
            <div>
              <div className="text-sm font-bold text-fg">Book a call</div>
              <div className="text-xs text-muted">Free 30-min strategy chat</div>
            </div>
          </div>
          <a
            href="#contact"
            className="rounded-full bg-black/5 px-3 py-1.5 text-[10px] font-bold tracking-wide text-fg transition-colors hover:bg-black/10"
          >
            BOOK
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, x: 20 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="matte flex w-[300px] items-center justify-between gap-3 rounded-2xl p-3 pr-4 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-strong">
              <Sparkles size={17} />
            </div>
            <div>
              <div className="text-sm font-bold text-fg">
                {statA?.value} {statA?.label.toLowerCase()}
              </div>
              <div className="text-xs text-muted">Across every client account</div>
            </div>
          </div>
          <a
            href="#work"
            className="rounded-full bg-black/5 px-3 py-1.5 text-[10px] font-bold tracking-wide text-fg transition-colors hover:bg-black/10"
          >
            VIEW
          </a>
        </motion.div>
      </div>

      {/* Main copy block */}
      <div className="container-page relative z-10 mt-auto max-w-3xl">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wide text-fg/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          AI-powered growth studio · Toronto &amp; the GTA
        </motion.span>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
          className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl"
        >
          We turn followers
          <br />
          into customers.
        </motion.h1>

        <div className="mt-7 flex gap-5 border-l-2 border-lime pl-5">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: "easeOut" }}
            className="max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {site.description.split(" — ")[0]}.
          </motion.p>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a href="#contact" className="btn-pill btn-pill-solid shadow-lg">
            Book a call
            <ArrowUpRight size={16} />
          </a>
          <a href="#process" className="btn-pill btn-pill-ghost">
            See how it works
            <ArrowRight size={15} />
          </a>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="text-amber-400" fill="currentColor" />
              ))}
            </span>
            98% client retention
          </span>
          <span>{statB?.value} {statB?.label.toLowerCase()}</span>
        </motion.div>
      </div>

      {/* Floating bottom-right toolbar widget */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="absolute bottom-8 right-4 z-20 hidden items-center gap-1.5 rounded-full bg-[#111111] p-1.5 pr-1.5 shadow-2xl sm:right-8 sm:flex"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold text-white">
          HVR
        </span>
        <a
          href="#testimonials"
          className="rounded-full px-3.5 py-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          Reviews
        </a>
        <a
          href="#work"
          className="rounded-full px-3.5 py-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          Portfolio
        </a>
        <a
          href="#contact"
          className="rounded-full bg-lime px-4 py-2 text-xs font-bold text-[#1f2e05] transition-transform hover:scale-[1.04]"
        >
          Book a call
        </a>
      </motion.div>
    </section>
  );
}
