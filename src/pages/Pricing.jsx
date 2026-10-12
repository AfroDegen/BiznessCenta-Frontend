import { useState } from "react";
import { Link } from "react-router-dom";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Create your profile.",
    setup: "Free",
    monthly: "No monthly fee",
    features: ["Business profile on Bizness Centa", "Dashboard access"],
    bestFor: "Anyone who wants to get started",
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Get found online.",
    setup: "N25,000",
    monthly: "One-time setup",
    features: [
      "Google Business Profile optimization",
      "Website setup",
      "Business visibility audit",
      "Review link setup",
      "Basic business assets",
      "30-day support",
    ],
    bestFor: "Small and new businesses, local service providers",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Generate more enquiries.",
    setup: "N50,000",
    monthly: "+ N10,000 per month",
    intro: "Everything in Starter, plus:",
    features: [
      "AI receptionist",
      "Review management system",
      "Monthly visibility report",
      "Business listings management",
      "Beacon visibility analysis",
      "Google profile content support",
      "Priority support",
    ],
    bestFor: "Growing businesses, retail brands, professional services",
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Build visibility infrastructure.",
    setup: "N100,000",
    monthly: "+ N20,000 per month",
    intro: "Everything in Growth, plus:",
    features: [
      "Advanced Beacon intelligence",
      "Competitor monitoring",
      "Multi-location support",
      "Lead capture dashboard",
      "Visibility strategy sessions",
      "Custom integrations",
      "Early access to new features",
    ],
    bestFor: "High-growth businesses, agencies, multi-branch businesses",
  },
];

function whatsappLink(planName) {
  const text = encodeURIComponent(
    `Hello Bizness Centa, I am interested in the ${planName} plan.`
  );
  return `https://wa.me/2349110483989?text=${text}`;
}

export default function Pricing() {
  const [selected, setSelected] = useState("growth");
  const [open, setOpen] = useState(null);

  const plan = PLANS.find((p) => p.id === selected);

  return (
    <div className="pricing-page">
      <Link to="/" className="legal-back">Back</Link>

      <h1 className="pricing-title">Pricing</h1>
      <p className="pricing-intro">
        For the next 90 days, we build to make your business more trustable and
        recommendable.
      </p>

      <div className="plan-list">
        {PLANS.map((p) => {
          const isSelected = selected === p.id;
          const isOpen = open === p.id;

          return (
            <div
              key={p.id}
              className={isSelected ? "plan-card selected" : "plan-card"}
              onClick={() => setSelected(p.id)}
            >
              <div className="plan-body">
                <div>
                  <div className="plan-name">
                    {p.name}
                    <span className="radio" />
                  </div>
                  <div className="plan-tagline">{p.tagline}</div>
                </div>

                <div className="plan-price">
                  <div className="price-main">{p.setup}</div>
                  <div className="price-note">{p.monthly}</div>
                </div>
              </div>

              <button
                className="expand-toggle"
                aria-expanded={isOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(isOpen ? null : p.id);
                }}
              >
                {isOpen ? "Hide details" : "See what is included"}
              </button>

              {isOpen && (
                <div className="plan-details">
                  {p.intro && <p className="details-intro">{p.intro}</p>}
                  <ul>
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <p className="best-for">For: {p.bestFor}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pricing-cta">
        <a
          className="primary-btn pricing-btn"
          href={whatsappLink(plan.name)}
          target="_blank"
          rel="noreferrer"
        >
          Get started with {plan.name}
        </a>
      </div>
    </div>
  );
}
