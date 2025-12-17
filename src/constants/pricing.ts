export const PRICING_PLANS = [
  {
    name: "Writer",
    price: "$9",
    period: "/month",
    description: "Perfect for screenplay writers and story creators",
    features: [
      "Text-only comic creation",
      "Unlimited script writing",
      "Basic PDF export",
      "Character creation (no illustrations)",
      "5 projects",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Standard",
    price: "$29",
    period: "/month",
    description: "Everything you need to create illustrated comics",
    features: [
      "9 standard art styles",
      "100 AI illustration credits/month",
      "Character illustrations",
      "Full PDF export with illustrations",
      "20 projects",
      "Print service integration",
      "Marketplace listing",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/month",
    description: "For serious creators and professionals",
    features: [
      "All 18 art styles (9 standard + 9 Pro)",
      "500 AI illustration credits/month",
      "Advanced character customization",
      "High-resolution exports",
      "Unlimited projects",
      "Priority marketplace placement",
      "Commercial license",
      "API access (coming soon)",
      "Dedicated support",
      "Early access to new features",
    ],
    cta: "Get Started",
    popular: false,
  },
];

export const ALL_PLANS_FEATURES = [
  { title: "Auto-Save", desc: "Never lose your work with automatic saving" },
  { title: "Cloud Storage", desc: "Access your projects from anywhere" },
  { title: "Regular Updates", desc: "New features and improvements monthly" },
  { title: "Community Access", desc: "Join our creator community" },
];

export const CREDIT_PACKAGES = [
  { credits: "50", price: "$9.99", bestValue: false },
  { credits: "100", price: "$17.99", bestValue: false },
  { credits: "250", price: "$39.99", bestValue: false },
  { credits: "500", price: "$69.99", bestValue: true },
];
