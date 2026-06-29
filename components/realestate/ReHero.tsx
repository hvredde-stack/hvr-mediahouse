"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Home,
  Play,
  Camera,
  Heart,
  Bookmark,
  TrendingUp,
  Signal,
  Wifi,
  BatteryFull,
} from "lucide-react";
import type { ReactNode } from "react";
import { realEstate } from "@/lib/realestate";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

// Mock feed tiles — content types an agent gets, no images needed.
type Tile = {
  kind: "reel" | "listing" | "story" | "brand";
  bg: string;
  fg: string;
  label: string;
  icon: ReactNode;
};

const tiles: Tile[] = [
  { kind: "listing", bg: "#2b5bb0", fg: "#fff", label: "Just listed", icon: <Home size={18} /> },
  { kind: "reel", bg: "#0e1830", fg: "#fff", label: "Reel", icon: <Play size={18} fill="currentColor" /> },
  { kind: "story", bg: "#38bdf8", fg: "#0e1830", label: "Story", icon: <Camera size={18} /> },
  { kind: "brand", bg: "#3f74c9", fg: "#fff", label: "You", icon: <Camera size={18} /> },
  { kind: "listing", bg: "#e4ecf9", fg: "#16306b", label: "Sold", icon: <Home size={18} /> },
  { kind: "reel", bg: "#6366f1", fg: "#fff", label: "Reel", icon: <Play size={18} fill="currentColor" /> },
  { kind: "story", bg: "#5b9ae6", fg: "#fff", label: "Tips", icon: <TrendingUp size={18} /> },
  { kind: "listing", bg: "#f5f7fa", fg: "#5c6680", label: "Tour", icon: <Home size={18} /> },
  { kind: "reel", bg: "#16306b", fg: "#fff", label: "Reel", icon: <Play size={18} fill="currentColor" /> },
];

export function ReHero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* soft ambient shape */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="animate-float-slow absolute -right-24 top-24 h-[28rem] w-[28rem] rounded-full opacity-70 blur-[2px]"
          style={{ background: "radial-gradient(circle, #8fb8ee 0%, #8fb8ee 50%, transparent 72%)" }}
        />
      </div>

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate="show" className="overline">
            {realEstate.hero.pre}
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 font-display text-[2.4rem] font-bold leading-[1.08] tracking-tight text-fg sm:text-5xl lg:text-[3.6rem]"
          >
            {realEstate.hero.titleLead}
            <br />
            <span className="text-shimmer italic">{realEstate.hero.titleAccent}</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-lg leading-relaxed text-muted"
          >
            {realEstate.hero.blurb}
          </motion.p>
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/#contact"
              className="gradient-bg group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-strong/25"
            >
              {realEstate.hero.primaryCta}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#packages"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-fg/15 bg-white px-7 py-3.5 text-base font-semibold text-fg transition-colors hover:bg-white/60"
            >
              {realEstate.hero.secondaryCta}
            </a>
          </motion.div>
          <motion.p
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 text-sm text-muted"
          >
            <span className="font-semibold text-fg">Month-to-month.</span> No lock-in ·
            for agents across the GTA &amp; Durham Region.
          </motion.p>
        </div>

        {/* Animated feed visual — inside a phone */}
        <div className="relative z-10">
          {/* ambient glow under the phone */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(43,91,176,0.32), rgba(90,140,230,0.18) 50%, transparent 72%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className={`relative mx-auto w-[300px] sm:w-[330px] ${reduce ? "" : "animate-float-slow"}`}
          >
            {/* phone frame — graphite body, bright screen */}
            <div
              className="relative rounded-[3rem] p-[11px] shadow-[0_35px_70px_-20px_rgba(70,40,20,0.55)]"
              style={{ background: "linear-gradient(155deg,#2b3242 0%,#15223f 45%,#0e1830 100%)" }}
            >
              {/* metallic edge highlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[3rem] ring-1 ring-white/10"
              />
              {/* side buttons */}
              <div aria-hidden className="absolute -left-[2.5px] top-[7rem] h-7 w-[3px] rounded-l-sm bg-[#0e1830]" />
              <div aria-hidden className="absolute -left-[2.5px] top-[9.5rem] h-12 w-[3px] rounded-l-sm bg-[#0e1830]" />
              <div aria-hidden className="absolute -right-[2.5px] top-[8.5rem] h-16 w-[3px] rounded-r-sm bg-[#0e1830]" />

              <div className="relative overflow-hidden rounded-[2.3rem] bg-white">
                {/* dynamic island */}
                <div className="absolute left-1/2 top-2.5 z-30 h-[26px] w-[84px] -translate-x-1/2 rounded-full bg-black" />

                {/* status bar */}
                <div className="flex items-center justify-between px-6 pt-3 text-[11px] font-bold text-fg">
                  <span>9:41</span>
                  <span className="flex items-center gap-1.5 text-fg">
                    <Signal size={13} />
                    <Wifi size={13} />
                    <BatteryFull size={18} />
                  </span>
                </div>

                <div className="px-4 pb-5 pt-3">
                  {/* header row */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-base font-bold text-white">
                      JR
                    </span>
                    <div className="leading-tight">
                      <div className="font-display text-sm font-bold text-fg">@your.brand</div>
                      <div className="text-xs text-muted">Realtor · GTA &amp; Durham</div>
                    </div>
                    <span className="ml-auto rounded-full bg-fg px-3 py-1.5 text-xs font-semibold text-white">
                      Follow
                    </span>
                  </div>

                  {/* tile grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {tiles.map((t, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, delay: 0.5 + i * 0.07, ease: [0.34, 1.56, 0.64, 1] }}
                        className="relative grid aspect-square place-items-center overflow-hidden rounded-xl"
                        style={{ background: t.bg, color: t.fg }}
                      >
                        <span
                          className="pointer-events-none absolute inset-0"
                          style={{ background: "linear-gradient(140deg, rgba(255,255,255,0.35), transparent 50%)" }}
                        />
                        <span className="relative z-10 flex flex-col items-center gap-1">
                          {t.icon}
                          <span className="text-[0.62rem] font-semibold opacity-90">{t.label}</span>
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* engagement footer */}
                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-bg-2 px-4 py-3 text-fg ring-1 ring-black/5">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                      <Heart size={15} className="text-coral" fill="currentColor" /> 12.4k
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                      <Bookmark size={15} className="text-brand" fill="currentColor" /> 3.4k
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage">
                      <TrendingUp size={15} /> +312%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* floating chips */}
          <Chip
            className="-left-3 top-12 hidden sm:flex lg:-left-6"
            delay="0.3s"
            tone="bg-brand-soft text-brand"
            value="+1,180"
            label="New followers"
          />
          <Chip
            className="-right-2 bottom-14 hidden sm:flex lg:-right-5"
            delay="1.1s"
            tone="bg-green-100 text-green-600"
            value="8 reels"
            label="This month"
          />
        </div>
      </div>
    </section>
  );
}

function Chip({
  className,
  delay,
  tone,
  value,
  label,
}: {
  className?: string;
  delay: string;
  tone: string;
  value: string;
  label: string;
}) {
  return (
    <div
      className={`glass animate-float absolute z-20 items-center gap-2.5 rounded-2xl px-4 py-2.5 ${className ?? ""}`}
      style={{ animationDelay: delay }}
    >
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${tone}`}>
        <TrendingUp size={15} />
      </span>
      <div className="leading-tight">
        <div className="font-display text-sm font-bold text-fg">{value}</div>
        <div className="text-[11px] text-muted">{label}</div>
      </div>
    </div>
  );
}
