import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PLANS, whatsappLink } from "../data/plans";

export default function Pricing() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("basic");
  const [open, setOpen] = useState(null);

  const plan = PLANS.find((item) => item.id === selected);

  return (
    <main className="pricing-page">
      <Link to="/dashboard" className="legal-back">
        Skip for now
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
        <button
          type="button"
          className="primary-btn pricing-btn"
          onClick={() =>
            navigate(plan.id === "basic" ? "/dashboard" : `/checkout/${plan.id}`)
          }
        >
          {plan.id === "basic"
            ? "Start with Basic"
            : `Continue with ${plan.name}`}
        </button>

        <p className="pricing-note">
          Next you'll review exactly what you get and when.
          Questions?{" "}
          <a
            href={whatsappLink("Hello Bizness Centa, I have a question about the plans.")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat with us on WhatsApp
          </a>
          .
        </p>
      </div>
    </main>
  );
}
