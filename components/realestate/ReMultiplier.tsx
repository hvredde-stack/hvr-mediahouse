"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Camera } from "lucide-react";
import { realEstate } from "@/lib/realestate";
import { Icon } from "../Icon";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

const { multiplier } = realEstate;

// 4 branch lines from the top-centre source to 4 evenly spaced columns.
const branches = [
  "M50,2 C50,60 12.5,45 12.5,100",
  "M50,2 C50,60 37.5,45 37.5,100",
  "M50,2 C50,60 62.5,45 62.5,100",
  "M50,2 C50,60 87.5,45 87.5,100",
];

export function ReMultiplier() {
  const reduce = useReducedMotion();

  return (
    <section className="section-pad bg-tint-sky">
      <div className="container-page">
        <SectionHeading
          eyebrow={multiplier.eyebrow}
          title={multiplier.title}
          subtitle={multiplier.subtitle}
        />

        <Reveal className="mt-14">
          <div className="mx-auto max-w-4xl">
            {/* Source node */}
            <div className="mx-auto w-fit">
              <div className="gradient-bg flex items-center gap-3 rounded-2xl px-6 py-4 text-white shadow-lg shadow-brand-strong/25">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/20">
                  <Camera size={22} />
                </span>
                <div className="leading-tight">
                  <div className="font-display text-lg font-bold">{multiplier.sourceTitle}</div>
                  <div className="text-xs text-white/80">{multiplier.sourceNote}</div>
                </div>
              </div>
            </div>

            {/* Connector fan — md+ only (aligns to 4 columns) */}
            <div className="relative hidden h-20 md:block">
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
                aria-hidden
              >
                {branches.map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="#c2603f"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="0.1 4"
                    vectorEffect="non-scaling-stroke"
                    initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                    whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: "easeOut" }}
                  />
                ))}
              </svg>
            </div>

            {/* Output nodes */}
            <div className="mt-6 grid grid-cols-2 gap-4 md:mt-0 md:grid-cols-4">
              {multiplier.outputs.map((o, i) => (
                <motion.div
                  key={o.label}
                  initial={reduce ? false : { opacity: 0, scale: 0.7, y: 12 }}
                  whileInView={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: 0.5 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                  className="matte rounded-2xl p-5 text-center"
                >
                  <span
                    className="mx-auto grid h-11 w-11 place-items-center rounded-xl text-white"
                    style={{ background: ["#c2603f", "#dd962f", "#5f8d6a", "#8a5a7d"][i % 4] }}
                  >
                    <Icon name={o.icon} size={20} />
                  </span>
                  <div className="mt-3 font-display text-3xl font-bold tracking-tight text-fg">
                    {o.count}
                  </div>
                  <div className="text-sm text-muted">{o.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-muted/70">{multiplier.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
