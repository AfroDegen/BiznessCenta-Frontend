
import { useState } from "react";
import { Link } from "react-router-dom";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Get started for free.",
    setup: "Free",
    monthly: "No monthly fee",
    features: [
      "Business profile on Bizness Centa",
      "Dashboard access",
    ],
    bestFor: "Anyone who wants to get started",
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Get found online.",
    setup: "₦25,000",
    monthly: "One-time setup fee",
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
    setup: "₦50,000",
    monthly: "+ ₦10,000/month",
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
    tagline: "Build your visibility infrastructure.",
    setup: "₦100,000",
    monthly: "+ ₦20,000/month",
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
    `Hello Bizness Centa, I'm interested in the ${planName} plan. Please share the next steps.`
  );

  return `https://wa.me/2349110483989?text=${text}`;
}

export default function Pricing() {
  const [selected, setSelected] = useState("growth");
  const [open, setOpen] = useState(null);

  const plan = PLANS.find((p) => p.id === selected) ?? PLANS[2];

  return (
    <main className="pricing-page">
      <Link to="/" className="legal-back">
        Back
      </Link>

      <header className="pricing-header">
        <h1 className="pricing-title">Simple, transparent pricing.</h1>
        <p className="pricing-intro">
          Get your business found, build customer trust, and turn
          online visibility into enquiries. Choose the plan that
          fits your business.
        </p>
      </header>

      <div
        className="plan-list"
        role="radiogroup"
        aria-label="Choose a Bizness Centa plan"
      >
        {PLANS.map((p) => {
          const isSelected = selected === p.id;
          const isOpen = open === p.id;
          const detailsId = `plan-details-${p.id}`;

          return (
            <section
              key={p.id}
              className={isSelected ? "plan-card selected" : "plan-card"}
            >
              <button
                type="button"
                className="plan-select"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(p.id)}
              >
                <span className="plan-body">
                  <span className="plan-heading">
                    <span className="plan-name">
                      {p.name}
                      <span className="radio" aria-hidden="true" />
                    </span>
                    <span className="plan-tagline">
                      {p.tagline}
                    </span>
                  </span>

                  <span className="plan-price">
                    <span className="price-main">{p.setup}</span>
                    <span className="price-note">{p.monthly}</span>
                  </span>
                </span>
              </button>

              <button
                type="button"
                className="expand-toggle"
                aria-expanded={isOpen}
                aria-controls={detailsId}
                onClick={() => setOpen(isOpen ? null : p.id)}
              >
                {isOpen ? "Hide details" : "See what's included"}
              </button>

              {isOpen && (
                <div className="plan-details" id={detailsId}>
                  {p.intro && (
                    <p className="details-intro">{p.intro}</p>
                  )}

                  <ul>
                    {p.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <p className="best-for">
                    <strong>Ideal for:</strong> {p.bestFor}
                  </p>
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div className="pricing-cta">
        <a
          className="primary-btn pricing-btn"
          href={whatsappLink(plan.name)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Get started with the ${plan.name} plan on WhatsApp`}
        >
          Get started with {plan.name}
        </a>

        <p className="pricing-note">
          Questions about a plan? Contact us on WhatsApp.
        </p>
      </div>
    </main>
  );
}
