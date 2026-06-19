"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { MapPin, Star, BadgeCheck, ArrowRight } from "lucide-react";
import { FaInstagram, FaLinkedinIn, FaFacebookF } from "react-icons/fa6";
import { agent } from "@/lib/agent";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const social = [
  { href: agent.socials.instagram, Icon: FaInstagram, label: "Instagram" },
  { href: agent.socials.linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
  { href: agent.socials.facebook, Icon: FaFacebookF, label: "Facebook" },
];

export function AgentHero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-24 top-20 h-[26rem] w-[26rem] rounded-full opacity-60 blur-[2px]"
          style={{ background: "radial-gradient(circle,#7fd4a0 0%,#7fd4a0 50%,transparent 72%)" }}
        />
      </div>

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* Copy */}
        <div className="max-w-xl">
          <motion.p custom={0} variants={fadeUp} initial="hidden" animate="show" className="overline">
            {agent.title} · {agent.brokerage}
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl"
          >
            {agent.name}
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 text-lg leading-relaxed text-muted"
          >
            {agent.tagline}
          </motion.p>
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-fg"
          >
            <MapPin size={16} className="text-brand" /> {agent.location}
          </motion.p>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#contact"
              className="gradient-bg group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-strong/25"
            >
              {agent.primaryCta}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#listings"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-fg/15 bg-white px-7 py-3.5 text-base font-semibold text-fg transition-colors hover:bg-white/60"
            >
              {agent.secondaryCta}
            </a>
          </motion.div>

          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-7 flex items-center gap-4"
          >
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
              <Star size={16} className="text-amber" fill="currentColor" /> 4.9 · 210 reviews
            </span>
            <span className="h-4 w-px bg-border" />
            <div className="flex gap-2.5">
              {social.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted transition-all hover:border-brand/50 hover:text-brand"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Portrait card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`relative mx-auto w-full max-w-sm ${reduce ? "" : "animate-float-slow"}`}
        >
          <div className="matte overflow-hidden rounded-[2rem]">
            {/* avatar area */}
            <div className="gradient-bg relative grid h-64 place-items-center">
              <span className="font-display text-7xl font-bold text-white/95">{agent.initials}</span>
              <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                <BadgeCheck size={13} /> Top 1% Producer
              </span>
            </div>
            {/* mini stat strip */}
            <div className="grid grid-cols-3 divide-x divide-border">
              {agent.stats.slice(0, 3).map((s) => (
                <div key={s.label} className="px-2 py-4 text-center">
                  <div className="font-display text-xl font-bold tracking-tight text-fg">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-[0.65rem] leading-tight text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
