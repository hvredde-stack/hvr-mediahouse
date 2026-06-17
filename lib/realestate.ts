/* ============================================================
   HVR MEDIA HOUSE — REAL ESTATE MARKETING PAGE CONTENT
   ------------------------------------------------------------
   Everything on /realestate is edited here. Change a value,
   save, and the page updates. Prices use the site currency
   (CAD) and are shown as monthly ranges — easy to tune.
   ============================================================ */

export const realEstate = {
  eyebrow: "Real estate marketing · GTA & Durham Region",
  // Hero
  hero: {
    pre: "For real estate agents who want to be remembered",
    titleLead: "Stop selling houses.",
    titleAccent: "Start selling your brand.",
    blurb:
      "Every other agency sells per-listing media — one shoot, one property, then you're forgotten. We build your ongoing presence: an always-on Agent Brand that turns the footage you're already capturing into a month of content people actually follow.",
    primaryCta: "Book a free brand audit",
    secondaryCta: "See the packages",
  },

  /* Why social media matters — especially in real estate. */
  why: {
    eyebrow: "Why it matters",
    title: "Your next client is already scrolling.",
    subtitle:
      "Buyers and sellers research online — and on social — long before they ever call an agent. If you're not visible there, you're not on the shortlist.",
    stats: [
      { value: "97%", label: "of buyers search online during their home hunt" },
      { value: "51%", label: "find the home they buy on the web first" },
      { value: "76%", label: "search from a mobile phone — where social lives" },
      { value: "#1", label: "social media: a top source of new agent leads" },
    ],
    points: [
      {
        icon: "Search",
        title: "Sellers vet you first",
        text: "Before they sign, they look you up. A strong feed is your modern first impression.",
      },
      {
        icon: "Smartphone",
        title: "Attention lives on social",
        text: "Your market scrolls Instagram, TikTok and Facebook every day — be where they already are.",
      },
      {
        icon: "Home",
        title: "Listings travel further",
        text: "Video and social content put your listings in front of far more of the right people.",
      },
      {
        icon: "Trophy",
        title: "Visibility wins listings",
        text: "When you're the agent people see everywhere, you become the obvious choice.",
      },
    ],
    footnote:
      "Directional industry figures (incl. NAR home-buyer research), shown to illustrate the trend.",
  },

  /* The mindset shift — the core idea, shown as a side-by-side. */
  shift: {
    eyebrow: "The shift",
    title: "Listings sell once. A brand compounds.",
    subtitle:
      "The agents who own their market online stopped thinking shoot-by-shoot. Here's the difference between the two approaches.",
    old: {
      label: "Per-listing media",
      tag: "What everyone else sells",
      points: [
        "One shoot, tied to one property",
        "A transaction — it ends when the home sells",
        "You're invisible between listings",
        "You compete on price, every single time",
      ],
    },
    next: {
      label: "The Agent Brand retainer",
      tag: "What we build with you",
      points: [
        "An always-on presence, not a one-off",
        "Footage you already have, repurposed monthly",
        "Top-of-feed between listings — and top-of-mind",
        "You become the agent sellers already know",
      ],
    },
  },

  /* One shoot → a month of content. The signature infographic. */
  multiplier: {
    eyebrow: "The math that makes it work",
    title: "One shoot becomes a month of content.",
    subtitle:
      "Most of what we post isn't a new shoot — it's the listing footage you already paid for, sliced into a steady stream. That's how a small team delivers this much volume profitably.",
    sourceTitle: "1 listing shoot",
    sourceNote: "photo · video · drone",
    outputs: [
      { icon: "Clapperboard", count: 8, label: "Reels" },
      { icon: "LayoutGrid", count: 8, label: "Carousels" },
      { icon: "Camera", count: 12, label: "Story sets" },
      { icon: "Home", count: 4, label: "Just-listed / sold posts" },
    ],
    footnote: "Example output from a single Signature-tier listing shoot.",
  },

  /* How the retainer works: two layers + the flywheel. */
  model: {
    eyebrow: "How it works",
    title: "Two layers, kept deliberately separate.",
    subtitle:
      "Your listing media stays à la carte — that's the part everyone sells. The retainer sits on top and turns it into a brand. Retainer clients get a discount on every listing shoot, which is what makes the two lock together.",
    layers: [
      {
        n: "01",
        name: "Listing media",
        kind: "à la carte",
        text: "Photo, video, drone and tours — booked per property, exactly as you do today.",
        icon: "Camera",
      },
      {
        n: "02",
        name: "Agent Brand retainer",
        kind: "monthly",
        text: "We turn that footage — plus content about you — into a steady, branded social presence.",
        icon: "Sparkles",
      },
    ],
    flywheelTitle: "And it compounds",
    flywheelNote: "Every listing feeds the engine. The loop is the whole point.",
    flywheel: [
      { title: "Show up daily", text: "A steady stream of branded reels, carousels and stories." },
      { title: "Audience grows", text: "You become the agent people in the area actually recognise." },
      { title: "More listings won", text: "Sellers pick the agent who already looks like the market leader." },
      { title: "More footage", text: "Every new listing refills the content engine — and the loop tightens." },
    ],
  },

  /* What we actually make. */
  deliverables: {
    eyebrow: "What we make for you",
    title: "Your whole social presence, handled.",
    subtitle:
      "You never touch a scheduler. We plan it, create it, caption it, post it and report on it.",
    items: [
      {
        icon: "Clapperboard",
        title: "Short-form reels",
        text: "Scroll-stopping vertical video cut from your listings and your day-to-day.",
      },
      {
        icon: "LayoutGrid",
        title: "Carousels",
        text: "Swipeable posts — listings, market updates, tips and neighbourhood guides.",
      },
      {
        icon: "Camera",
        title: "Story sets",
        text: "Daily behind-the-scenes that keeps you top-of-feed and top-of-mind.",
      },
      {
        icon: "UserRound",
        title: "Personal-branding shoots",
        text: "You — not just your listings. The face buyers and sellers remember.",
      },
      {
        icon: "CalendarCheck",
        title: "Calendar, captions & posting",
        text: "Strategy, captions, hashtags and scheduling across your platforms.",
      },
      {
        icon: "BarChart3",
        title: "Strategy & reporting",
        text: "A monthly read on what's working — reach, saves and leads, not vanity metrics.",
      },
    ],
  },

  /* Premium: the agent's own website — a virtual-LinkedIn profile that builds trust. */
  profile: {
    eyebrow: "Premium · Your own website",
    title: "More than a feed — your own site that sells you.",
    subtitle:
      "A polished personal website — your story, your track record, your process — working like a virtual LinkedIn for your real-estate brand. It's what sellers find when they Google your name, built to win their trust.",
    availability: "Included in Authority · available as an add-on on any plan",
    initials: "JR",
    name: "Jordan Reid",
    role: "Realtor® · GTA & Durham Region",
    badge: "Top 1% Producer",
    ctaMock: "Book a valuation",
    stats: [
      { value: "12", label: "Years in the market" },
      { value: "480+", label: "Homes sold" },
      { value: "$320M", label: "In sales volume" },
      { value: "4.9★", label: "From 210 reviews" },
    ],
    aboutLabel: "About",
    bio: "Born and raised in Durham, I've helped 480+ families buy and sell across the GTA over 12 years — straight talk, sharp marketing, and a process that takes the stress out of your move.",
    processLabel: "How I work",
    steps: [
      "Free home valuation + a clear game plan",
      "Pro photo, video & social marketing",
      "Negotiate hard, then close it clean",
    ],
    review: {
      text: "Sold our home in 9 days, over asking. Jordan's marketing was on another level.",
      author: "The Patels · Whitby",
    },
    trustTitle: "Why it wins you listings",
    trust: [
      {
        icon: "Search",
        title: "Owns your name in Google",
        text: "When a seller searches you before listing, this is the first thing they find.",
      },
      {
        icon: "BookUser",
        title: "Your story, not just listings",
        text: "Years in the business, homes sold and the wins that build instant credibility.",
      },
      {
        icon: "ListChecks",
        title: "A clear, confident process",
        text: "Show exactly how you market and sell — so sellers know they're in good hands.",
      },
      {
        icon: "Star",
        title: "Social proof, front and centre",
        text: "Reviews and results that do the convincing before you even meet.",
      },
    ],
    cta: "Get your agent website",
  },

  /* Packages. Prices are monthly ranges in the site currency (CAD). */
  packages: {
    eyebrow: "Retainer packages",
    title: "Pick the presence you want to build.",
    subtitle:
      "Month-to-month, cancel anytime. Most agents start with Signature. Prices are a starting framework — we tailor the final number to your volume.",
    tiers: [
      {
        key: "spark",
        name: "Spark",
        glyph: "🔹",
        tag: "Foundation presence",
        badge: "",
        forWho: "For agents who know they need to post consistently but have no time.",
        priceLow: 650,
        priceHigh: 850,
        featured: false,
        features: [
          "4 reels + 4 carousels / month",
          "6 story sets",
          "1 listing repurposed into content",
          "Calendar, captions & hashtags",
          "Scheduling on Instagram + Facebook",
          "Monthly performance snapshot",
        ],
      },
      {
        key: "signature",
        name: "Signature",
        glyph: "🔸",
        tag: "Growth",
        badge: "Most popular",
        forWho: "For active agents who want to actually grow their audience and pipeline.",
        priceLow: 1300,
        priceHigh: 1600,
        featured: true,
        features: [
          "8 reels + 8 carousels / month",
          "12 story sets",
          "Up to 3 listings repurposed",
          "Quarterly personal-branding shoot",
          "Posting across 3 platforms",
          "Monthly strategy call + analytics",
          "10% off à la carte listing shoots",
        ],
      },
      {
        key: "authority",
        name: "Authority",
        glyph: "🔶",
        tag: "Market leader",
        badge: "",
        forWho: "For top producers and teams who want to own their local market online.",
        priceLow: 2400,
        priceHigh: 3000,
        featured: false,
        features: [
          "12 reels + 10 carousels / month",
          "Daily stories (~20 sets)",
          "Unlimited listings repurposed",
          "Monthly personal-branding shoot",
          "Email newsletter + light ad management",
          "Bi-weekly calls + live dashboard",
          "20% off shoots + priority delivery",
        ],
      },
    ],
    /* Full comparison. Cell values: true → ✓, "" or "—" → not included. */
    comparison: [
      { feature: "Reels (short-form video)", spark: "4", signature: "8", authority: "12" },
      { feature: "Carousels", spark: "4", signature: "8", authority: "10" },
      { feature: "Story sets", spark: "6", signature: "12", authority: "Daily (~20)" },
      { feature: "Listings repurposed into content", spark: "1", signature: "Up to 3", authority: "Unlimited" },
      { feature: "Personal-branding shoot", spark: "—", signature: "Quarterly", authority: "Monthly" },
      { feature: "Platforms scheduled & posted", spark: "2", signature: "3", authority: "3+" },
      { feature: "Captions, hashtags & calendar", spark: true, signature: true, authority: true },
      { feature: "Email newsletter to your database", spark: "—", signature: "—", authority: "1–2 / mo" },
      { feature: "Light paid-ad management", spark: "—", signature: "—", authority: true },
      { feature: "Strategy & reporting", spark: "Monthly snapshot", signature: "Monthly call + report", authority: "Bi-weekly + dashboard" },
      { feature: "Discount on à la carte shoots", spark: "—", signature: "10%", authority: "20%" },
      { feature: "Priority next-morning delivery", spark: "—", signature: "—", authority: true },
    ],
    addonsTitle: "À la carte add-ons (any tier)",
    addons: [
      "Extra reel",
      "Agent headshot / branding shoot",
      "Personal agent website / profile",
      "Listing landing page",
      "Virtual staging",
      "Drone-only add-on",
      "“Just sold” / testimonial video",
      "Neighbourhood feature video",
    ],
  },

  /* The "resume" — what an agent's month of standing out looks like. */
  resume: {
    eyebrow: "Your standout month",
    title: "A highlight reel that builds your reputation.",
    subtitle:
      "This is what a single month on Signature puts into the market under your name — a body of work that makes you look like the obvious choice.",
    handle: "@your.brand",
    output: [
      { value: "8", label: "Branded reels" },
      { value: "8", label: "Carousels" },
      { value: "12", label: "Story sets" },
      { value: "3", label: "Listings amplified" },
    ],
    lift: [
      { value: "+312%", label: "Reach vs. before" },
      { value: "3.4k", label: "Saves & shares" },
      { value: "+1,180", label: "New local followers" },
    ],
    liftNote: "Illustrative of typical first-quarter lift across managed agent accounts.",
  },

  /* Onboarding. */
  process: {
    eyebrow: "Getting started",
    title: "Live in two weeks, not two months.",
    subtitle: "Here's exactly what happens after your first call.",
    steps: [
      { step: "01", title: "Brand audit", text: "A free 30-minute call. We look at your presence today and the quick wins." },
      { step: "02", title: "Engine setup", text: "We lock your pillars, look and voice, then build your first month's calendar." },
      { step: "03", title: "Shoot & repurpose", text: "We capture or pull from your listings and turn one shoot into weeks of content." },
      { step: "04", title: "Post, grow, report", text: "We schedule, post and engage — then report on what moved the needle." },
    ],
  },

  faqs: [
    {
      q: "Do I have to be on camera all the time?",
      a: "No. Much of the content is your listings and your market expertise. We add personal-branding pieces at a pace you're comfortable with — and we make filming painless.",
    },
    {
      q: "Is this a long contract?",
      a: "No lock-in. Retainers are month-to-month. Most agents stay because it works, not because they have to.",
    },
    {
      q: "I already pay for listing photos and video. How is this different?",
      a: "Listing media is a one-time product tied to one property. The Agent Brand retainer turns that footage — plus content about you — into an always-on presence that wins the next listing.",
    },
    {
      q: "What if I'm not tech-savvy?",
      a: "You never touch a scheduler. We plan, create, caption, post and report. You approve from your phone in a couple of taps.",
    },
    {
      q: "Which areas do you cover?",
      a: "Agents across the Greater Toronto Area and Durham Region — Toronto, Pickering, Ajax, Whitby, Oshawa and beyond.",
    },
  ],

  cta: {
    title: "Let's build a brand sellers remember.",
    blurb:
      "Book a free 30-minute Agent Brand audit. We'll show you the quick wins in your current presence — no pressure, no jargon, no commitment.",
    button: "Book your free brand audit",
  },
} as const;
