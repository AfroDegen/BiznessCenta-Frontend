import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../services/supabase";
import { getPlan, whatsappLink } from "../data/plans";

export default function Done() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const plan = getPlan(params.get("plan"));

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/", { replace: true });
        return;
      }

      const { data } = await supabase
        .from("orders")
        .select("id, plan, status")
        .eq("owner_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (active) {
        setOrder(data);
        setLoading(false);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [navigate]);

  if (loading) {
    return (
      <main className="flow-page">
        <div className="flow-card">
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  const paid = order && ["paid", "in_progress", "delivered"].includes(order.status);
  const planName = plan?.name || "your";

  return (
    <main className="flow-page">
      <div className="flow-card">
        <h1>{paid ? "Payment confirmed" : "Thank you. We're confirming your payment."}</h1>

        <p className="flow-sub">
          {paid
            ? `Your ${planName} plan is confirmed.`
            : `We'll message you on WhatsApp as soon as we confirm your ${planName} transfer.`}
        </p>

        <h2>What happens next</h2>
        <ol className="flow-steps">
          <li>
            <strong>Send proof of payment</strong>
            <span>
              If you haven't yet, send your transfer receipt on WhatsApp with
              your reference.
            </span>
          </li>
          <li>
            <strong>We confirm your payment</strong>
            <span>You'll get a WhatsApp message from us.</span>
          </li>
          <li>
            <strong>We start your setup</strong>
            <span>{plan?.timeline || "We'll agree the timeline with you."}</span>
          </li>
          <li>
            <strong>Handover</strong>
            <span>We show you what was set up and how to use it.</span>
          </li>
        </ol>

        <a
          className="primary-btn"
          href={whatsappLink("Hello Bizness Centa, I've just made my payment. Here is my proof.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Send proof on WhatsApp
        </a>

        <Link to="/dashboard" className="flow-secondary">
          Go to my dashboard
        </Link>
      </div>
    </main>
  );
}
