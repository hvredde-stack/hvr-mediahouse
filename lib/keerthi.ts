export const keerthi = {
  name: "Keerthi Makeup Artist",
  shortName: "Keerthi",
  route: "/keerthi-makeup-artist",
  eyebrow: "Professional makeup artistry",
  headline: "Makeup that still feels like you.",
  description:
    "Polished, camera-ready makeup for weddings, celebrations and milestone moments. Every look is tailored to your features, outfit and comfort level.",
  currency: "CAD",
  serviceArea: "Greater Toronto Area",
  heroImage:
    "https://images.unsplash.com/photo-1770747874505-67d0a43379d5?auto=format&fit=crop&w=1800&q=88",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1743779622035-c52b3d5267ce?auto=format&fit=crop&w=1200&q=85",
      alt: "Bridal makeup being carefully applied",
    },
    {
      src: "https://images.unsplash.com/photo-1779253688787-7d860ad39fe0?auto=format&fit=crop&w=1200&q=85",
      alt: "Indian bride wearing traditional jewellery and finished makeup",
    },
    {
      src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85",
      alt: "Professional makeup products and brushes",
    },
  ],
  packages: [
    {
      name: "Soft Glam",
      price: 125,
      duration: "75-90 min",
      description:
        "Fresh, luminous makeup with soft definition for daytime events, portraits and intimate celebrations.",
      features: [
        "Skin preparation",
        "Complexion and soft eye look",
        "Natural or strip lashes",
        "Lip touch-up sample",
      ],
      featured: false,
    },
    {
      name: "Full Glam",
      price: 165,
      duration: "90-120 min",
      description:
        "A more defined, long-wear finish for receptions, parties, photoshoots and evening events.",
      features: [
        "Detailed skin preparation",
        "Full-coverage complexion",
        "Defined eyes and lashes",
        "Long-wear finishing",
      ],
      featured: false,
    },
    {
      name: "Bridal Makeup",
      price: 325,
      duration: "2-2.5 hours",
      description:
        "A tailored bridal look designed for photography, ceremony lighting and comfortable all-day wear.",
      features: [
        "Bridal consultation",
        "Premium skin preparation",
        "Custom lashes",
        "Draping and jewellery setting",
      ],
      featured: false,
    },
    {
      name: "Bridal Makeup + Hair",
      price: 475,
      duration: "3-3.5 hours",
      description:
        "A complete wedding-day beauty service with coordinated makeup and hairstyling.",
      features: [
        "Everything in Bridal Makeup",
        "Bridal hairstyling",
        "Hair accessory placement",
        "Veil or dupatta setting",
      ],
      featured: true,
    },
  ],
  addons: [
    { name: "Bridal trial", price: "$150" },
    { name: "Hair styling", price: "from $175" },
    { name: "Draping + jewellery", price: "$60" },
    { name: "Travel", price: "quoted by location" },
  ],
  faqs: [
    {
      question: "Are lashes included?",
      answer:
        "Yes. Natural or fuller strip lashes are included with every makeup service and selected to suit the finished look.",
    },
    {
      question: "Do you offer bridal trials?",
      answer:
        "Yes. Trials are recommended for bridal bookings so we can test the complete look, make adjustments and confirm timing before the wedding day.",
    },
    {
      question: "Can you travel to my location?",
      answer:
        "Mobile appointments are available across the GTA. Travel is quoted separately based on the appointment address, start time and parking requirements.",
    },
    {
      question: "How do I secure my date?",
      answer:
        "Submit an inquiry with your date and preferred service. Availability is confirmed first, then a booking retainer secures the appointment.",
    },
  ],
} as const;
