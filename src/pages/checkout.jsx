import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import { PAYMENT, getPlan, whatsappLink } from "../data/plans";

function orderReference(id) {
  return `BC-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { planId } = useParams();
  const plan = getPlan(planId);

  const [business, setBusiness] = useState(null);
  const [order, setOrder] = useState(null);
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isPaidPlan = plan && plan.amount > 0;

  useEffect(() => {
    if (!isPaidPlan) {
      navigate("/pricing", { replace: true });
      return;
    }

    let active = true;

    async function load() {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (!session) {
          navigate("/", { replace: true });
          return;
        }

        const { data, error: businessError } = await supabase
          .from("businesses")
          .select("id, name")
          .eq("owner_id", session.user.id)
          .maybeSingle();

        if (businessError) throw businessError;

        if (!data) {
          navigate("/create-business", { replace: true });
          return;
        }

        if (active) setBusiness(data);
      } catch (err) {
        if (active) {
          setError(err?.message || "We couldn't load this page. Please try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [isPaidPlan, navigate]);

  async function continueToPayment() {
    if (saving || !agreed) return;

    setSaving(true);
    setError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        navigate("/", { replace: true });
        return;
      }

      // Reuse an open order for the same plan instead of creating a duplicate.
      const { data: existing, error: lookupError } = await supabase
        .from("orders")
        .select("id, plan, amount_ngn, status")
        .eq("owner_id", user.id)
        .eq("plan", plan.id)
        .eq("status", "awaiting_payment")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (lookupError) throw lookupError;

      if (existing) {
        setOrder(existing);
        setStep(2);
        return;
      }

      const { data: created, error: insertError } = await supabase
        .from("orders")
        .insert({ plan: plan.id, amount_ngn: plan.amount })
        .select("id, plan, amount_ngn, status")
        .single();

      if (insertError) throw insertError;

      setOrder(created);
      setStep(2);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!isPaidPlan) return null;

  if (loading) {
    return (
      <main className="flow-page">
        <div className="flow-card">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  const reference = order ? orderReference(order.id) : "";
  const hasBankDetails =
    PAYMENT.bank && PAYMENT.accountName && PAYMENT.accountNumber;

  return (
    <main className="flow-page">
      <Link
        to="/pricing"
        className="legal-back"
        onClick={(e) => {
          if (step === 2) {
            e.preventDefault();
            setStep(1);
          }
        }}
      >
        Back
      </Link>

      <div className="flow-card">
        {step === 1 && (
          <>
            <h1>Confirm what you get</h1>
            <p className="flow-sub">
              {plan.name} for {business?.name || "your business"}
            </p>

            <p className="flow-price">
              {plan.price} <span>{plan.note}</span>
            </p>

            <h2>Deliverables</h2>
            {plan.intro && <p className="flow-intro">{plan.intro}</p>}
            <ul className="flow-list">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <h2>Timeline</h2>
            <p>{plan.timeline}</p>

            <h2>Not included</h2>
            <p>
              No monthly fee is charged for this plan. Domain names, ad
              spend and any third-party subscriptions are paid separately.
            </p>

            <label className="flow-check">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span>I have read what is included and when it will be delivered.</span>
            </label>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              className="primary-btn"
              disabled={!agreed || saving}
              onClick={continueToPayment}
            >
              {saving ? "Saving..." : "Continue to payment"}
            </button>
          </>
        )}

        {step === 2 && order && (
          <>
            <h1>Pay by bank transfer</h1>
            <p className="flow-sub">
              {plan.name}, {plan.price}
            </p>

            {hasBankDetails ? (
              <dl className="flow-bank">
                <div>
                  <dt>Bank</dt>
                  <dd>{PAYMENT.bank}</dd>
                </div>
                <div>
                  <dt>Account name</dt>
                  <dd>{PAYMENT.accountName}</dd>
                </div>
                <div>
                  <dt>Account number</dt>
                  <dd>{PAYMENT.accountNumber}</dd>
                </div>
                <div>
                  <dt>Amount</dt>
                  <dd>{plan.price}</dd>
                </div>
              </dl>
            ) : (
              <p>
                We'll send our account details on WhatsApp. Tap the button
                below and we'll reply with them.
              </p>
            )}

            <p className="flow-ref">
              Use this reference with your transfer: <strong>{reference}</strong>
            </p>

            <a
              className="primary-btn"
              href={whatsappLink(
                `Hello Bizness Centa, I'm paying for the ${plan.name} plan (${plan.price}) for ${business?.name || "my business"}. Reference: ${reference}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send proof on WhatsApp
            </a>

            <button
              type="button"
              className="flow-secondary"
              onClick={() => navigate(`/done?plan=${plan.id}`)}
            >
              I've sent the payment
            </button>
          </>
        )}
      </div>
    </main>
  );
}
