/* ============================================================
   SAMPLE AGENT PROFILE — the "virtual LinkedIn" realtor page
   ------------------------------------------------------------
   This is the demo agent website shown at /realestate/profile.
   Everything here is ILLUSTRATIVE placeholder content — swap it
   for a real agent's details to build their actual profile.
   ============================================================ */

export const agent = {
  name: "Jordan Reid",
  initials: "JR",
  title: "Realtor® · Sales Representative",
  brokerage: "The Reid Group",
  tagline:
    "Helping families buy and sell across Durham Region & the GTA — with sharp marketing and straight talk.",
  location: "Whitby, ON · Serving the GTA & Durham Region",
  // Placeholder contact details — replace with the agent's real ones.
  phone: "+1 (905) 555-0142",
  email: "jordan@thereidgroup.ca",
  socials: {
    instagram: "https://instagram.com/jordanreid.homes",
    linkedin: "https://linkedin.com/in/jordanreidrealtor",
    facebook: "https://facebook.com/jordanreidhomes",
  },
  primaryCta: "Book a free home valuation",
  secondaryCta: "View recent sales",

  stats: [
    { value: "12", label: "Years in real estate" },
    { value: "480+", label: "Homes sold" },
    { value: "$320M", label: "Career sales volume" },
    { value: "18", label: "Avg. days on market" },
    { value: "99%", label: "List-to-sale price ratio" },
    { value: "4.9★", label: "From 210 client reviews" },
  ],

  about: {
    lead: "I'm Jordan — a Durham-born Realtor who treats your move like it's my own.",
    paragraphs: [
      "Over the past 12 years I've helped more than 480 families buy and sell across Durham Region and the east GTA. From first-time buyers in Oshawa to downsizers in Whitby and investors in Pickering, I've seen just about every kind of move — and I bring that experience to your kitchen table.",
      "My approach is simple: honest advice, relentless marketing, and hard negotiation. I price properties right, present them beautifully with pro photo and video, and put them in front of the right buyers online — which is how my listings sell in an average of 18 days at 99% of asking.",
      "When I'm not showing homes you'll find me coaching my kid's soccer team in Whitby or hunting down the best butter tart in Durham. I'd love to help with your next move.",
    ],
    quickFacts: [
      { label: "Based in", value: "Whitby, ON" },
      { label: "Brokerage", value: "The Reid Group" },
      { label: "Languages", value: "English, French" },
      { label: "Focus", value: "Residential resale & first-time buyers" },
    ],
  },

  timeline: [
    {
      year: "2012",
      title: "Licensed & started in real estate",
      text: "Joined a Durham brokerage and learned the business the hard way — door-knocking, open houses, and a lot of late nights.",
    },
    {
      year: "2015",
      title: "Rookie to Top Producer",
      text: "Ranked in the top 10% of agents at the brokerage within three years by obsessing over client experience.",
    },
    {
      year: "2018",
      title: "Crossed $25M in annual volume",
      text: "Built a referral-driven business and leaned hard into video and social marketing before most local agents did.",
    },
    {
      year: "2021",
      title: "Founded The Reid Group",
      text: "Launched my own team to give clients a full-service experience — staging, marketing and a dedicated client manager.",
    },
    {
      year: "2024",
      title: "Top 1% of GTA agents",
      text: "Recognised among the region's leading agents, with $320M in career sales and a 4.9★ average review.",
    },
  ],

  specialties: [
    {
      icon: "Home",
      title: "Seller representation",
      text: "Full-service listings — pricing, staging, pro marketing and tough negotiation to net you more.",
    },
    {
      icon: "KeyRound",
      title: "First-time buyers",
      text: "Patient, jargon-free guidance through your first purchase, from pre-approval to keys.",
    },
    {
      icon: "ArrowLeftRight",
      title: "Move-up & downsizing",
      text: "Coordinating a sale and a purchase at once, without the stress of two timelines.",
    },
    {
      icon: "Building2",
      title: "Investment properties",
      text: "Cash-flow analysis and neighbourhood data to help you buy the right rental or flip.",
    },
    {
      icon: "MapPinned",
      title: "Relocation",
      text: "Moving into or out of Durham? I make the logistics and the local know-how easy.",
    },
    {
      icon: "HardHat",
      title: "Pre-construction",
      text: "Guidance on new builds and assignments across the GTA's growing communities.",
    },
  ],

  areas: [
    "Whitby",
    "Oshawa",
    "Ajax",
    "Pickering",
    "Clarington",
    "Bowmanville",
    "Courtice",
    "Toronto (East)",
    "Scarborough",
    "Markham",
  ],

  credentials: [
    "Licensed Realtor® (RECO)",
    "Accredited Buyer's Representative (ABR®)",
    "Seniors Real Estate Specialist (SRES®)",
    "Member — Toronto Regional Real Estate Board (TRREB)",
    "Member — Durham Region Association of Realtors",
  ],

  awards: [
    { year: "2024", title: "Top 1% — Greater Toronto Area" },
    { year: "2023", title: "Chairman's Club" },
    { year: "2022", title: "Platinum Sales Award" },
    { year: "2021", title: "Director's Circle" },
  ],

  process: {
    intro: "A clear, proven path — so you always know what's next.",
    steps: [
      {
        title: "Consultation & valuation",
        text: "We meet, I learn your goals, and I give you a data-backed value for your home — no obligation.",
      },
      {
        title: "Prep & staging",
        text: "I advise on the high-ROI fixes and bring in staging so your home shows at its absolute best.",
      },
      {
        title: "Pro marketing",
        text: "Magazine-quality photo, video and a social campaign that puts your home in front of the right buyers.",
      },
      {
        title: "Showings & offers",
        text: "I manage every showing and feedback loop, then bring you qualified offers — clearly explained.",
      },
      {
        title: "Negotiate & close",
        text: "I negotiate hard on your behalf and stay hands-on through closing so nothing slips.",
      },
    ],
  },

  listings: [
    {
      status: "Just Sold",
      price: "$1,180,000",
      address: "42 Lynde Cres, Whitby",
      beds: 4,
      baths: 3,
      sqft: "2,450",
      note: "Sold in 6 days — $80K over asking",
      accent: "#5f8d6a",
    },
    {
      status: "Just Sold",
      price: "$865,000",
      address: "118 Harmony Rd, Oshawa",
      beds: 3,
      baths: 2,
      sqft: "1,720",
      note: "5 offers, sold over asking",
      accent: "#5f8d6a",
    },
    {
      status: "For Sale",
      price: "$1,425,000",
      address: "9 Rossland Rd, Ajax",
      beds: 5,
      baths: 4,
      sqft: "3,100",
      note: "New listing — book a private tour",
      accent: "#c2603f",
    },
    {
      status: "Just Sold",
      price: "$742,000",
      address: "27 Liberty St, Bowmanville",
      beds: 3,
      baths: 2,
      sqft: "1,540",
      note: "First-time buyer — closed in 21 days",
      accent: "#5f8d6a",
    },
    {
      status: "For Sale",
      price: "$999,900",
      address: "55 Glenanna Rd, Pickering",
      beds: 4,
      baths: 3,
      sqft: "2,180",
      note: "Open house this weekend",
      accent: "#c2603f",
    },
    {
      status: "Just Sold",
      price: "$1,050,000",
      address: "73 Taunton Rd, Courtice",
      beds: 4,
      baths: 3,
      sqft: "2,300",
      note: "Sold in 9 days at 101% of asking",
      accent: "#5f8d6a",
    },
  ],

  reviews: [
    {
      text: "Jordan sold our home in 6 days for well over asking. The marketing — the video especially — was on a completely different level from other agents we interviewed.",
      author: "The Patels",
      detail: "Sold in Whitby",
    },
    {
      text: "As first-time buyers we were nervous, but Jordan was patient, honest and never pushy. We got the keys to our first home and felt looked after the whole way.",
      author: "Megan & Chris",
      detail: "Bought in Oshawa",
    },
    {
      text: "We've bought and sold with Jordan three times now. Straight talk, sharp negotiation, and he answers his phone. I send everyone I know to him.",
      author: "David R.",
      detail: "Repeat client · Ajax",
    },
    {
      text: "Downsizing was emotional and Jordan handled it with so much care. He coordinated our sale and purchase perfectly so we never felt rushed.",
      author: "Linda M.",
      detail: "Sold & bought in Pickering",
    },
  ],

  contact: {
    title: "Thinking about a move?",
    blurb:
      "Whether you're ready now or just exploring, let's grab 20 minutes. No pressure, no jargon — just straight answers about your options.",
    button: "Book a free home valuation",
  },
} as const;
