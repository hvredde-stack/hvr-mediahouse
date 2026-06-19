"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
  type Transition,
} from "framer-motion";
import { ArrowRight, TrendingUp, Zap, Heart } from "lucide-react";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaSnapchat,
  FaPinterestP,
  FaThreads,
} from "react-icons/fa6";
import { clients, stats, accents } from "@/lib/site";
import { PhoneMockup } from "@/components/PhoneMockup";
import { CountUp } from "@/components/CountUp";

const POP: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const headlineWords = ["Your", "gateway", "to", "social", "media"];

const wordContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const wordItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const IG =
  "linear-gradient(135deg,#feda75,#fa7e1e 30%,#d62976 60%,#962fbf 80%,#4f5bd5)";

type App = {
  key: string;
  Icon: IconType;
  bg: string;
  dark?: boolean;
  size: number;
  icon: number;
  rot: number;
  dur: number;
  delay: number;
  dy: number;
  cls: string;
};

// Flowing around the centered phone. 4 corners on mobile, more on larger screens.
const apps: App[] = [
  { key: "ig", Icon: FaInstagram, bg: IG, size: 56, icon: 26, rot: -8, dur: 7, delay: 0, dy: 14, cls: "left-[6%] top-[10%] hidden sm:grid" },
  { key: "yt", Icon: FaYoutube, bg: "#FF0000", size: 56, icon: 26, rot: 7, dur: 8, delay: 0.6, dy: 16, cls: "right-[6%] top-[12%] hidden sm:grid" },
  { key: "tt", Icon: FaTiktok, bg: "#0b0b0f", size: 50, icon: 23, rot: 6, dur: 7.5, delay: 1.1, dy: 13, cls: "left-[8%] bottom-[12%] hidden sm:grid" },
  { key: "wa", Icon: FaWhatsapp, bg: "#25D366", size: 50, icon: 24, rot: -6, dur: 8.5, delay: 0.3, dy: 15, cls: "right-[8%] bottom-[10%] hidden sm:grid" },
  // sides — sm+
  { key: "fb", Icon: FaFacebookF, bg: "#1877F2", size: 48, icon: 22, rot: -7, dur: 8.2, delay: 0.8, dy: 13, cls: "left-[2%] top-[44%] hidden sm:grid" },
  { key: "x", Icon: FaXTwitter, bg: "#0b0b0f", size: 46, icon: 21, rot: 6, dur: 7.8, delay: 1.3, dy: 14, cls: "right-[2%] top-[46%] hidden sm:grid" },
  // top & bottom strip — md+
  { key: "li", Icon: FaLinkedinIn, bg: "#0A66C2", size: 46, icon: 21, rot: 8, dur: 7.2, delay: 0.5, dy: 12, cls: "left-[26%] top-[1%] hidden md:grid" },
  { key: "snap", Icon: FaSnapchat, bg: "#FFFC00", dark: true, size: 46, icon: 24, rot: -7, dur: 8, delay: 1.5, dy: 14, cls: "right-[27%] top-[2%] hidden md:grid" },
  { key: "pin", Icon: FaPinterestP, bg: "#E60023", size: 44, icon: 22, rot: -9, dur: 7.6, delay: 0.4, dy: 13, cls: "left-[28%] bottom-[1%] hidden md:grid" },
  { key: "th", Icon: FaThreads, bg: "#0b0b0f", size: 44, icon: 21, rot: 7, dur: 8.4, delay: 1, dy: 12, cls: "right-[26%] bottom-[2%] hidden md:grid" },
];

export function Hero() {
  return (
    <section id="top" className="relative pt-24 pb-14 sm:pt-32 sm:pb-20">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative text-center"
        >
          <Shapes />

          {/* headline */}
          <div className="relative z-10 mx-auto max-w-2xl">
            <motion.p custom={0} variants={fadeUp} initial="hidden" animate="show" className="overline">
              Social media marketing for Toronto &amp; the GTA
            </motion.p>
            <motion.h1
              variants={wordContainer}
              initial="hidden"
              animate="show"
              className="mt-5 font-display text-[2.2rem] font-bold leading-[1.2] tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-[4.2rem]"
            >
              {headlineWords.map((w) => (
                <motion.span
                  key={w}
                  variants={wordItem}
                  className="mr-[0.26em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
              <span className="inline-block whitespace-nowrap">
                <motion.span
                  variants={wordItem}
                  className="text-shimmer inline-block px-[0.14em] pb-[0.16em] italic"
                >
                  growth
                </motion.span>
                <span>.</span>
              </span>
            </motion.h1>
            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted"
            >
              We grow Toronto &amp; GTA brands on Instagram, TikTok, YouTube and
              beyond — content, ads and strategy that turn attention into
              customers.
            </motion.p>
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a
                href="#contact"
                className="gradient-bg group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-strong/25"
              >
                Book a strategy call
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-fg/15 bg-white px-7 py-3.5 text-base font-semibold text-fg transition-colors hover:bg-white/60"
              >
                See our work
              </a>
            </motion.div>

            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-4 text-sm text-muted"
            >
              <span className="font-semibold text-fg">
                Free 30-min strategy call
              </span>{" "}
              · no commitment · month-to-month, cancel anytime.
            </motion.p>
          </div>

          {/* centered phone with flowing social apps + result chips */}
          <div className="relative mx-auto mt-12 flex min-h-[640px] w-full max-w-6xl items-center justify-center sm:mt-14">
            {apps.map((app, i) => (
              <FloatingApp key={app.key} app={app} index={i} />
            ))}

            {/* result chips fill the side space */}
            <Chip
              className="left-[8%] top-[34%] hidden lg:flex"
              delay="0.4s"
              tone="bg-green-100 text-green-600"
              icon={<TrendingUp size={15} />}
              label="Reach"
              value="+248%"
            />
            <Chip
              className="left-[12%] bottom-[24%] hidden xl:flex"
              delay="1.5s"
              tone="bg-rose-100 text-rose-500"
              icon={<Heart size={14} fill="currentColor" />}
              label="Engagement"
              value="12.4k"
            />
            <Chip
              className="right-[8%] top-[36%] hidden lg:flex"
              delay="1s"
              tone="bg-brand-soft text-brand"
              icon={<Zap size={15} fill="currentColor" />}
              label="Avg. ROAS"
              value="5.2×"
            />
            <Chip
              className="right-[11%] bottom-[22%] hidden xl:flex"
              delay="0.7s"
              tone="bg-blue-100 text-blue-600"
              icon={<TrendingUp size={15} />}
              label="Followers"
              value="+1,204"
            />

            <div className="relative z-10">
              <PhoneMockup />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="relative z-10 mt-12 text-sm text-muted"
          >
            Trusted by{" "}
            <span className="font-semibold text-fg">{clients[0]}</span>,{" "}
            <span className="font-semibold text-fg">{clients[1]}</span> &{" "}
            <span className="font-semibold text-fg">{clients[3]}</span>.
          </motion.p>
        </motion.div>

        {/* animated, colourful stats */}
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="matte-hover rounded-2xl border border-border bg-white p-5 text-center"
            >
              <div
                className="font-display text-3xl font-bold tracking-tight"
                style={{ color: accents[i % accents.length] }}
              >
                <CountUp value={s.value} />
              </div>
              <div className="mt-1 text-xs text-muted">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-3 max-w-4xl text-center text-xs text-muted/70">
          Aggregate results across HVR client accounts since 2022.
        </p>
      </div>
    </section>
  );
}

function FloatingApp({ app, index }: { app: App; index: number }) {
  const reduce = useReducedMotion();
  const anim = reduce
    ? { rotate: app.rot }
    : { y: [0, -app.dy, 0], rotate: [app.rot, app.rot + 3, app.rot] };
  const transition: Transition | undefined = reduce
    ? undefined
    : { duration: app.dur, delay: app.delay, repeat: Infinity, ease: "easeInOut" };
  const glow = app.bg.startsWith("#")
    ? `${app.bg}66`
    : "rgba(214,41,118,0.5)";

  return (
    <motion.div
      className={`pointer-events-none absolute z-20 ${app.cls}`}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5 + index * 0.06, ease: POP }}
    >
      <motion.div animate={anim} transition={transition}>
        <motion.div
          className="group pointer-events-auto relative cursor-pointer"
          whileHover={reduce ? undefined : { scale: 1.16 }}
          transition={{ type: "spring", stiffness: 320, damping: 15 }}
        >
          {/* colored glow halo */}
          <div
            className="absolute -inset-1.5 -z-10 rounded-[22px] blur-lg opacity-60 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glow }}
          />
          {/* tile */}
          <div
            className="relative grid place-items-center overflow-hidden rounded-[18px] ring-1 ring-black/5"
            style={{
              width: app.size,
              height: app.size,
              background: app.bg,
              color: app.dark ? "#0b0b0f" : "#fff",
              boxShadow:
                "0 14px 26px rgba(40,25,90,0.22), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            {/* glassy sheen */}
            <span
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(140deg, rgba(255,255,255,0.5), transparent 45%)",
              }}
            />
            <span className="relative z-10">
              <app.Icon size={app.icon} />
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Chip({
  className,
  delay,
  tone,
  icon,
  label,
  value,
}: {
  className?: string;
  delay: string;
  tone: string;
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`glass animate-float absolute z-20 items-center gap-2.5 rounded-2xl px-4 py-2.5 ${className ?? ""}`}
      style={{ animationDelay: delay }}
    >
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${tone}`}>
        {icon}
      </span>
      <div className="leading-tight">
        <div className="text-[11px] text-muted">{label}</div>
        <div className="font-display text-sm font-bold text-fg">{value}</div>
      </div>
    </div>
  );
}

// Soft organic decorative shapes behind the hero content.
function Shapes() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="animate-float-slow absolute left-1/2 top-[58%] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full opacity-90 blur-[2px] sm:h-[30rem] sm:w-[30rem]"
        style={{ background: "radial-gradient(circle, #7fd4a0 0%, #7fd4a0 55%, transparent 72%)" }}
      />
    </div>
  );
}
