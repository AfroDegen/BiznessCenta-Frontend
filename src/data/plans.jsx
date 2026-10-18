export const WHATSAPP_NUMBER = "2349110483989";

// Fill these in. While any value is empty, the payment step tells the
// customer that account details will be sent on WhatsApp instead.
export const PAYMENT = {
  bank: "",
  accountName: "",
  accountNumber: "",
};

export const PLANS = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Start building your online presence.",
    price: "Free",
    amount: 0,
    note: "No payment required",
    features: [
      "Business visibility audit",
      "Free website on a Bizness Centa subdomain",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Get your business ready to be found.",
    price: "₦25,000",
    amount: 25000,
    note: "One-time payment",
    timeline: "Within 5 working days after we confirm your payment.",
    features: [
      "Business visibility audit",
      "Website setup",
      "Google Business Profile optimization",
      "Review link setup",
      "Basic business assets",
      "30-day support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Build a stronger discovery system.",
    price: "₦50,000",
    amount: 50000,
    note: "One-time payment",
    timeline: "Within 7 working days after we confirm your payment.",
    intro: "Everything in Starter, plus:",
    features: [
      "AI receptionist setup",
      "Review management setup",
      "Business listings support",
      "Beacon visibility analysis",
      "Google profile content support",
      "Priority implementation support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "A tailored, hands-on visibility setup.",
    price: "₦100,000",
    amount: 100000,
    note: "One-time payment",
    timeline: "Agreed with you on a scope call, and sent in writing before work starts.",
    intro: "Everything in Growth, plus:",
    features: [
      "Advanced Beacon visibility analysis",
      "Competitor visibility review",
      "Multi-location planning",
      "Lead capture setup",
      "Personalized visibility action plan",
      "Agreed custom implementation scope",
    ],
  },
];

export function getPlan(id) {
  return PLANS.find((plan) => plan.id === id) || null;
}

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
