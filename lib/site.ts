/* ============================================================
   HVR MEDIA HOUSE — EDIT YOUR WEBSITE CONTENT HERE
   ------------------------------------------------------------
   This is the single place to change almost all the text on the
   site: company info, services, prices, case studies, reviews.
   Change a value, save, and the website updates automatically.
   ============================================================ */

export const site = {
  name: "HVR Media House",
  shortName: "HVR",
  // The big line under the company name in the hero.
  tagline: "We turn followers into customers.",
  // One or two sentences describing what you do (used on the site + Google).
  description:
    "HVR Media House is a Greater Toronto Area social media marketing agency. We grow brands across Toronto and the GTA on Instagram, Facebook, TikTok and YouTube with scroll-stopping content, smart paid ads, and strategy that drives real results.",

  // Used for links and the contact section. EDIT THESE.
  email: "hvrmediahouse@gmail.com",
  phone: "+1 (647) 571-3324",
  location: "Greater Toronto Area · Toronto, ON",
  // The website address (used for SEO/social previews). Matches the live host.
  url: "https://www.hvrmediahouse.com",

  // Currency symbol shown on pricing (CAD). Change to ₹, €, £, etc.
  currency: "$",
  currencyCode: "CAD",

  // Optional: a Cal.com / Calendly link for the "Book a call" buttons.
  // Leave "" and those buttons fall back to the contact form.
  bookingUrl: "",

  // Optional: Meta (Facebook) Pixel ID for ad retargeting. Leave "" to keep
  // the pixel — and the cookie-consent banner — completely off.
  metaPixelId: "",

  socials: {
    // Real profile URLs. Leave a platform as "" until its account exists —
    // empty values are hidden from the footer and SEO rather than linking a
    // dead homepage. Just paste a URL here to make that icon appear.
    instagram: "https://www.instagram.com/hvrmediahouse/",
    facebook: "",
    tiktok: "",
    youtube: "",
  },
} as const;

/* ── Headline stats shown under the hero ─────────────────────── */
export const stats = [
  { value: "120M+", label: "Views generated" },
  { value: "300+", label: "Campaigns launched" },
  { value: "5x", label: "Average return on ad spend" },
  { value: "98%", label: "Client retention" },
];

/* ── Platforms you work on (shown in the scrolling strip) ────── */
export const platforms = [
  "Instagram",
  "Facebook",
  "TikTok",
  "YouTube",
  "X / Twitter",
  "LinkedIn",
];

/* ── Areas you serve across the Greater Toronto Area ─────────── */
export const serviceAreas = [
  "Toronto",
  "Mississauga",
  "Brampton",
  "Markham",
  "Vaughan",
  "Scarborough",
  "Richmond Hill",
  "Oakville",
  "Pickering",
  "Ajax",
  "Whitby",
  "Oshawa",
];

/* ── Accent colours used across the site (icon tiles, shapes) ── */
export const accents = ["#12603f", "#b6e24a", "#2bb39a", "#e8739a", "#7c5cff"];

/* ── Photos (swap these URLs for your own images any time) ───── */
export const images = {
  toronto:
    "https://images.unsplash.com/photo-1543962226-818f4301073f?auto=format&fit=crop&w=1600&q=80",
  caseFeatured:
    "https://images.unsplash.com/photo-1683721003111-070bcc053d8b?auto=format&fit=crop&w=1000&q=80",
  contentCreation:
    "https://images.unsplash.com/photo-1630797160666-38e8c5ba44c1?auto=format&fit=crop&w=1000&q=80",
};

/* ── Services ────────────────────────────────────────────────
   icon = a name from lucide-react (https://lucide.dev/icons).
   Pick any icon name and the site will render it.            */
export const services = [
  {
    icon: "Megaphone",
    emoji: "📣",
    title: "Social Media Management",
    description:
      "We run your Instagram, Facebook, TikTok and YouTube end-to-end — content calendars, daily posting, captions, hashtags and community management.",
  },
  {
    icon: "Clapperboard",
    emoji: "🎬",
    title: "Content Creation",
    description:
      "Scroll-stopping short-form video, reels, photography and graphics designed to stop the thumb and build your brand.",
  },
  {
    icon: "Target",
    emoji: "🎯",
    title: "Paid Ads & Performance",
    description:
      "Meta, TikTok and YouTube ad campaigns engineered for ROI — from creative to targeting to daily optimization.",
  },
  {
    icon: "Users",
    emoji: "🤝",
    title: "Influencer Marketing",
    description:
      "We find, vet and manage the right creators to put your brand in front of the audiences that matter.",
  },
  {
    icon: "Sparkles",
    emoji: "🚀",
    title: "Brand Strategy & Growth",
    description:
      "Positioning, content pillars and a 90-day growth roadmap so every post moves you toward your goals.",
  },
  {
    icon: "BarChart3",
    emoji: "📊",
    title: "Analytics & Reporting",
    description:
      "Clear monthly reports that show what's working — reach, engagement, leads and revenue, not vanity metrics.",
  },
];

/* ── How we work (process) ───────────────────────────────────── */
export const process = [
  {
    step: "01",
    title: "Discover",
    description:
      "We learn your brand, goals and audience, then audit your current social presence.",
  },
  {
    step: "02",
    title: "Strategy",
    description:
      "We build a content + ads plan tailored to your platforms and growth targets.",
  },
  {
    step: "03",
    title: "Create & Launch",
    description:
      "Our team produces the content and launches campaigns — you approve, we ship.",
  },
  {
    step: "04",
    title: "Optimize & Grow",
    description:
      "We track results weekly, double down on what works and report monthly.",
  },
];

/* ── Portfolio / case studies ────────────────────────────────── */
export const caseStudies = [
  {
    client: "Bloom Skincare",
    category: "Beauty · Toronto · Instagram & TikTok",
    summary:
      "Built an organic + paid engine that turned a new skincare brand into a sell-out launch.",
    challenge:
      "A new skincare brand with a great product but no audience and zero presence on social.",
    solution:
      "We built a distinct content identity, a daily reel engine, and a tightly-optimised paid funnel across Instagram & TikTok.",
    result:
      "A sell-out launch and a brand people now recognise — profitably scaled in under six months.",
    results: [
      { metric: "8.2×", label: "Return on ad spend" },
      { metric: "240k", label: "New followers / 6 mo" },
      { metric: "3.1M", label: "Organic views / mo" },
    ],
    accent: "from-[#cf6a44] to-[#9a3f24]",
  },
  {
    client: "Urban Eats",
    category: "Restaurant · GTA · Instagram & Facebook",
    summary:
      "A local restaurant group filled tables with short-form video and geo-targeted ads.",
    results: [
      { metric: "3.1M", label: "Video views" },
      { metric: "+62%", label: "Weekend bookings" },
    ],
    accent: "from-[#cf6a44] to-[#9a3f24]",
  },
  {
    client: "FitForge App",
    category: "Fitness · Mississauga · TikTok & YouTube",
    summary:
      "Creator-led campaign that drove installs at a fraction of the usual cost-per-install.",
    results: [
      { metric: "180k", label: "App installs" },
      { metric: "-47%", label: "Cost per install" },
    ],
    accent: "from-[#d98a5f] to-[#a8482b]",
  },
  {
    client: "Nova Fashion",
    category: "Fashion · Toronto · Instagram & YouTube",
    summary:
      "Full-funnel content and shopping ads that scaled an online clothing store profitably.",
    results: [
      { metric: "$1.4M", label: "Revenue influenced" },
      { metric: "4.7x", label: "Return on ad spend" },
    ],
    accent: "from-[#c97b3f] to-[#9a3f24]",
  },
] as const;

/* ── Client names (shown as a trust strip) ───────────────────── */
export const clients = [
  "Bloom Skincare",
  "Urban Eats",
  "FitForge",
  "Nova Fashion",
  "Lumen Studio",
  "Vela Coffee",
];

/* ── Testimonials ────────────────────────────────────────────── */
export const testimonials = [
  {
    quote:
      "HVR completely changed how our brand shows up online. Our engagement tripled in three months and the leads are actually converting.",
    name: "Sarah Mitchell",
    role: "Founder, Bloom Skincare",
  },
  {
    quote:
      "The team gets social media. Their reels put us on the map locally — we've never been busier on weekends.",
    name: "Marco Rossi",
    role: "Owner, Urban Eats",
  },
  {
    quote:
      "Professional, creative and data-driven. They treat our ad budget like it's their own money.",
    name: "Priya Sharma",
    role: "CMO, Nova Fashion",
  },
  {
    quote:
      "We tried agencies before — none came close. HVR delivered installs below target from month one.",
    name: "James Carter",
    role: "Growth Lead, FitForge",
  },
];

/* ── Pricing packages ────────────────────────────────────────
   Prices use the `currency` symbol set above. Set `featured: true`
   on the package you want highlighted. Set price to "Custom" for
   quote-based tiers.                                            */
export const pricing = [
  {
    name: "Starter",
    price: "499",
    period: "/month",
    description: "For small brands getting serious about social.",
    features: [
      "2 platforms managed",
      "12 posts / month",
      "4 short-form videos",
      "Monthly report",
      "Community management",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "999",
    period: "/month",
    description: "Our most popular plan for scaling brands.",
    features: [
      "3 platforms managed",
      "20 posts / month",
      "10 short-form videos",
      "Paid ads management (up to $5k spend)",
      "Bi-weekly strategy calls",
      "Detailed analytics",
    ],
    featured: true,
  },
  {
    name: "Scale",
    price: "1,999",
    period: "/month",
    description: "Full-service marketing for ambitious brands.",
    features: [
      "All major platforms",
      "Unlimited posts",
      "20+ short-form videos",
      "Paid ads management (unlimited spend)",
      "Influencer campaigns",
      "Weekly calls + dedicated manager",
    ],
    featured: false,
  },
];

/* ── Services list for the contact form dropdown ─────────────── */
export const serviceOptions = [
  "Social Media Management",
  "Content Creation",
  "Paid Ads & Performance",
  "Influencer Marketing",
  "Brand Strategy & Growth",
  "Analytics & Reporting",
  "Not sure yet — let's talk",
];

export const budgetOptions = [
  "Under $499 / month",
  "$499 – $999 / month",
  "$999 – $1,999 / month",
  "$1,999+ / month",
  "Not sure yet — let's talk",
];
