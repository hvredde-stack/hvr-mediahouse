"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { realEstate } from "@/lib/realestate";
import { SectionHeading } from "../SectionHeading";
import { Reveal } from "../Reveal";

export function ReFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="section-pad">
      <div className="container-page">
        <SectionHeading
          eyebrow="Questions"
          title={
            <>
              Honest answers, <span className="italic text-brand">no jargon</span>
            </>
          }
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="matte divide-y divide-border overflow-hidden rounded-[1.5rem]">
            {realEstate.faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-brand-soft/30 sm:px-8"
                  >
                    <span className="font-display text-base font-semibold text-fg sm:text-lg">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-bg-2 text-brand transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <Plus size={16} strokeWidth={2.5} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-muted sm:px-8">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
