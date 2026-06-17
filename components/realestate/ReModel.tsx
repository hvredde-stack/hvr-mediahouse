"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, RotateCw, Plus } from "lucide-react";
import { realEstate } from "@/lib/realestate";
import { Icon } from "../Icon";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

const { model } = realEstate;

export function ReModel() {
  const reduce = useReducedMotion();

  return (
    <section id="how" className="section-pad">
      <div className="container-page">
        <SectionHeading eyebrow={model.eyebrow} title={model.title} subtitle={model.subtitle} />

        {/* Two-layer stack */}
        <Reveal className="mt-14">
          <div className="mx-auto max-w-3xl space-y-3">
            {/* Top layer — the retainer */}
            <Layer layer={model.layers[1]} elevated />
            <div className="flex items-center justify-center">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-brand shadow-sm">
                <Plus size={16} strokeWidth={3} />
              </span>
            </div>
            {/* Base layer — listing media */}
            <Layer layer={model.layers[0]} />
          </div>
        </Reveal>

        {/* Flywheel */}
        <div className="mt-20">
          <Reveal className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-sm font-semibold text-brand-strong">
              <motion.span
                animate={reduce ? undefined : { rotate: 360 }}
                transition={{ duration: 6, ease: "linear", repeat: Infinity }}
                className="inline-flex"
              >
                <RotateCw size={15} />
              </motion.span>
              {model.flywheelTitle}
            </div>
            <p className="mx-auto mt-3 max-w-md text-muted">{model.flywheelNote}</p>
          </Reveal>

          <Reveal className="mt-10" delay={0.05}>
            <div className="flex flex-col items-stretch gap-3 lg:flex-row">
              {model.flywheel.map((f, i) => (
                <Fragment key={f.title}>
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                    className="matte matte-hover flex-1 rounded-2xl p-6"
                  >
                    <span className="font-display text-sm font-bold text-brand">
                      0{i + 1}
                    </span>
                    <h4 className="mt-1 font-display text-lg font-semibold">{f.title}</h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
                  </motion.div>
                  {i < model.flywheel.length - 1 && (
                    <div className="flex shrink-0 items-center justify-center text-brand/60">
                      <ArrowDown size={20} className="lg:hidden" />
                      <ArrowRight size={20} className="hidden lg:block" />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm font-medium text-brand">
              <RotateCw size={15} /> …and the loop repeats — tighter each cycle.
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Layer({
  layer,
  elevated = false,
}: {
  layer: (typeof model.layers)[number];
  elevated?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-5 rounded-[1.5rem] p-6 sm:p-7 ${
        elevated
          ? "gradient-bg text-white shadow-lg shadow-brand-strong/20"
          : "border border-border bg-surface text-fg"
      }`}
    >
      <span
        className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${
          elevated ? "bg-white/20 text-white" : "bg-brand-soft text-brand"
        }`}
      >
        <Icon name={layer.icon} size={26} />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-display text-xs font-bold ${elevated ? "text-white/70" : "text-muted"}`}>
            {layer.n}
          </span>
          <h3 className="font-display text-xl font-semibold">{layer.name}</h3>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              elevated ? "bg-white/20 text-white" : "bg-bg-2 text-muted"
            }`}
          >
            {layer.kind}
          </span>
        </div>
        <p className={`mt-1.5 text-sm leading-relaxed ${elevated ? "text-white/85" : "text-muted"}`}>
          {layer.text}
        </p>
      </div>
    </div>
  );
}
