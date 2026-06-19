import {
  ArrowUpRight,
  Home,
  LayoutGrid,
  BarChart3,
  MessageCircle,
} from "lucide-react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

const platformRows = [
  { name: "Instagram", handle: "@bloom.skincare", growth: "+12.4k", Icon: FaInstagram, color: "#E1306C" },
  { name: "TikTok", handle: "@bloomskincare", growth: "+9.1k", Icon: FaTiktok, color: "#0b0b0f" },
  { name: "YouTube", handle: "Bloom Skincare", growth: "+3.7k", Icon: FaYoutube, color: "#FF0000" },
];

/** A glassy phone showing a real social-growth dashboard. */
export function PhoneMockup() {
  return (
    <div className="animate-float relative mx-auto w-[268px] sm:w-[296px]">
      {/* soft ambient glow under the phone */}
      <div
        className="absolute -inset-10 -z-10 rounded-[5rem] opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(18,96,63,0.34), rgba(60,160,90,0.2) 50%, transparent 72%)",
        }}
      />

      {/* glass frame */}
      <div className="glass relative rounded-[2.9rem] p-2.5 shadow-2xl">
        <div
          className="relative overflow-hidden rounded-[2.4rem]"
          style={{
            aspectRatio: "9 / 19",
            background: "linear-gradient(168deg,#0a3d2b 0%,#06251a 100%)",
          }}
        >
          {/* CN Tower skyline — proudly local to the GTA, with a softly pulsing beacon */}
          <CnTower className="pointer-events-none absolute left-1/2 top-[15%] z-0 h-[56%] -translate-x-1/2 text-white/[0.13]" />

          {/* dynamic island */}
          <div className="absolute left-1/2 top-3 z-30 h-6 w-24 -translate-x-1/2 rounded-full bg-black/90" />

          <div className="relative z-10 flex h-full flex-col px-4 pb-3 pt-11 text-white">
            {/* location */}
            <div className="mb-2.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/75 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Toronto · GTA
            </div>
            {/* header */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] font-medium text-white/55">
                  Follower growth · 30 days
                </p>
                <p className="font-display text-[1.85rem] font-bold leading-none">
                  48.2k
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-lime/25 px-2.5 py-1 text-xs font-bold text-lime">
                <ArrowUpRight size={12} /> +18%
              </span>
            </div>

            {/* growth chart */}
            <GrowthChart />

            {/* per-platform breakdown */}
            <p className="mb-2 mt-4 text-[10px] font-semibold uppercase tracking-wider text-white/40">
              By platform
            </p>
            <div className="space-y-2.5">
              {platformRows.map((r) => (
                <div key={r.name} className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white">
                    <r.Icon size={15} style={{ color: r.color }} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-semibold leading-tight">
                      {r.name}
                    </div>
                    <div className="truncate text-[9px] text-white/45">
                      {r.handle}
                    </div>
                  </div>
                  <div className="text-[12px] font-bold text-lime">
                    {r.growth}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex-1" />

            {/* app tab bar */}
            <div className="flex items-center justify-around rounded-2xl bg-white/10 px-2 py-2.5 ring-1 ring-white/10 backdrop-blur">
              <Home size={17} className="text-white" />
              <LayoutGrid size={17} className="text-white/45" />
              <span
                className="grid h-9 w-9 place-items-center rounded-full text-white shadow-lg"
                style={{ background: "linear-gradient(135deg,#15734a,#0a3d2b)" }}
              >
                <BarChart3 size={16} />
              </span>
              <MessageCircle size={17} className="text-white/45" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GrowthChart() {
  const line =
    "M0,86 C30,80 55,70 85,66 C120,60 145,48 175,40 C205,32 235,20 262,13 C288,8 305,6 320,4";
  return (
    <svg
      viewBox="0 0 320 100"
      className="relative z-10 mt-4 h-24 w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="ph-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7fd4a0" stopOpacity="0.4" />
          <stop offset="1" stopColor="#7fd4a0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L320,100 L0,100 Z`} fill="url(#ph-area)" />
      <path
        d={line}
        fill="none"
        stroke="#b6e24a"
        strokeWidth="2.5"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="animate-draw"
      />
    </svg>
  );
}

/** CN Tower silhouette with lit pod windows and a softly pulsing aviation beacon. */
function CnTower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 240" aria-hidden className={className}>
      {/* tower body (inherits faint colour from text-* class) */}
      <g fill="currentColor">
        {/* antenna spire */}
        <rect x="28.6" y="16" width="2.8" height="52" rx="1.4" />
        {/* sky pod */}
        <rect x="25.5" y="62" width="9" height="7" rx="2.5" />
        {/* main observation pod */}
        <path d="M18 76 Q30 66 42 76 L40 88 Q30 95 20 88 Z" />
        {/* tapering shaft */}
        <path d="M27 88 C25 132 23 182 22.4 232 L37.6 232 C37 182 35 132 33 88 Z" />
        {/* base */}
        <path d="M15 232 Q30 217 45 232 L45 240 L15 240 Z" />
      </g>

      {/* lit pod windows */}
      <g fill="#d2e9a0">
        <circle cx="24" cy="82" r="1" />
        <circle cx="30" cy="83" r="1" />
        <circle cx="36" cy="82" r="1" />
      </g>

      {/* pulsing aviation beacon at the antenna tip */}
      <circle cx="30" cy="14.5" r="4.5" fill="#ff5a4d" opacity="0.35" className="animate-ping" />
      <circle cx="30" cy="14.5" r="2.4" fill="#ff6a52" className="animate-pulse" />
    </svg>
  );
}
