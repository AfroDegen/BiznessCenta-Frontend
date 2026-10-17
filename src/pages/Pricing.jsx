
import { useState } from "react";
import { Link } from "react-router-dom";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    tagline: "Start building your online presence.",
    price: "Free",
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
    note: "One-time payment",
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
    note: "One-time payment",
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
    note: "One-time payment",
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

function whatsappLink(planName) {
  const message = encodeURIComponent(
    `Hello Bizness Centa, I'm interested in the ${planName} plan. Please confirm the deliverables and next steps.`
  );

  return `https://wa.me/2349110483989?text=${message}`;
}

export default function Pricing() {
  const [selected, setSelected] = useState("basic");
  const [open, setOpen] = useState(null);

  const plan = PLANS.find((item) => item.id === selected);

  return (
    <main className="pricing-page">
      <Link to="/dashboard" className="legal-back">
        Back to dashboard
      </Link>

      <header className="pricing-header">
        <p>YOUR NEXT STEP</p>
        <h1 className="pricing-title">
          Get your business found.
        </h1>
        <p className="pricing-intro">
          Start free or choose a hands-on setup to improve
          your business's online visibility.
        </p>
        <p>
          Paid plans require one payment. No monthly
          subscription.
        </p>
      </header>

      <div
        className="plan-list"
        role="radiogroup"
        aria-label="Choose a Bizness Centa plan"
      >
        {PLANS.map((item) => {
          const active = selected === item.id;
          const expanded = open === item.id;
          const detailsId = `details-${item.id}`;

          return (
            <section
              key={item.id}
              className={
                active ? "plan-card selected" : "plan-card"
              }
            >
              <button
                type="button"
                className="plan-select"
                role="radio"
                aria-checked={active}
                onClick={() => setSelected(item.id)}
              >
                <span className="plan-body">
                  <span className="plan-heading">
                    <span className="plan-name">
                      {item.name}
                      <span className="radio" aria-hidden="true" />
                    </span>
                    <span className="plan-tagline">
                      {item.tagline}
                    </span>
                  </span>

                  <span className="plan-price">
                    <span className="price-main">
                      {item.price}
                    </span>
                    <span className="price-note">
                      {item.note}
                    </span>
                  </span>
                </span>
              </button>

              <button
                type="button"
                className="expand-toggle"
                aria-expanded={expanded}
                aria-controls={detailsId}
                onClick={() =>
                  setOpen(expanded ? null : item.id)
                }
              >
                {expanded
                  ? "Hide details"
                  : "See what's included"}
              </button>

              {expanded && (
                <div className="plan-details" id={detailsId}>
                  {item.intro && (
                    <p className="details-intro">
                      {item.intro}
                    </p>
                  )}

                  <ul>
                    {item.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
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
        >
          {plan.id === "basic"
            ? "Start with Basic"
            : `Continue with ${plan.name}`}
        </a>

        <p className="pricing-note">
          We'll confirm the exact deliverables before any
          paid work begins. Contact us on WhatsApp.
        </p>
      </div>
    </main>
  );
}
