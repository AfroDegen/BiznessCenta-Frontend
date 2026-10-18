import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import { getPlan, whatsappLink } from "../data/plans";

// status "team" = our team sets this up for you. status "soon" = not live yet.
const CARDS = [
  {
    title: "Manage your online identity",
    text: "Keep your business name, address and contact details the same everywhere customers look.",
    status: "team",
  },
  {
    title: "Maintain a healthy website",
    text: "Keep your website fast, working and up to date.",
    status: "soon",
  },
  {
    title: "Google Business Profile",
    text: "Google Business Profile, Merchant account, Places and Maps, managed in one place.",
    status: "team",
  },
  {
    title: "Search intelligence",
    text: "See what your customers are searching for.",
    status: "soon",
  },
  {
    title: "Find opportunities",
    text: "Spot gaps in your market that your business can win.",
    status: "soon",
  },
  {
    title: "Watch your competitors",
    text: "See what is working for businesses like yours.",
    status: "soon",
  },
  {
    title: "Social media and ads",
    text: "Manage social media and ad campaigns from one app.",
    status: "soon",
  },
  {
    title: "24/7 support",
    text: "Captain Nigeria, your support agent, answers your questions any time.",
    status: "soon",
  },
];

const STATUS_LABEL = {
  team: "Set up by our team",
  soon: "Coming soon",
};

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning,";
  if (hour < 17) return "Good afternoon,";
  return "Good evening,";
}

function orderMessage(order) {
  const plan = getPlan(order.plan);
  const name = plan ? plan.name : "your";

  if (order.status === "awaiting_payment") {
    return `Your ${name} plan is waiting for payment.`;
  }
  if (order.status === "paid") return `Your ${name} plan is paid. We'll start your setup.`;
  if (order.status === "in_progress") return `We're setting up your ${name} plan.`;
  if (order.status === "delivered") return `Your ${name} plan is delivered.`;
  return "";
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBusiness() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/", { replace: true });
        return;
      }

      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("owner_id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        navigate("/create-business", { replace: true });
        return;
      }

      const { data: latestOrder } = await supabase
        .from("orders")
        .select("id, plan, status")
        .eq("owner_id", session.user.id)
        .neq("status", "cancelled")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      setBusiness(data);
      setOrder(latestOrder || null);
      setLoading(false);
    }
    loadBusiness();
  }, [navigate]);

  if (loading || !business) {
    return <div className="dashboard-page">Loading your dashboard...</div>;
  }

  const message = order ? orderMessage(order) : "";

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>{greeting()}</h1>
        <p>{business.name}</p>
      </header>

      <div className="dashboard-content">
        {order ? (
          <section className="order-banner">
            <p>{message}</p>
            {order.status === "awaiting_payment" && (
              <Link to={`/checkout/${order.plan}`}>See payment details</Link>
            )}
          </section>
        ) : (
          <section className="order-banner">
            <p>Your free plan is active. Want us to do more of the setup for you?</p>
            <Link to="/pricing">See plans</Link>
          </section>
        )}

        {CARDS.map((card) => (
          <section className="bc-card" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <span className={`bc-chip bc-chip-${card.status}`}>
              {STATUS_LABEL[card.status]}
            </span>
          </section>
        ))}

        <a
          className="bc-help"
          href={whatsappLink("Hello Bizness Centa, I need help.")}
          target="_blank"
          rel="noopener noreferrer"
        >
          Need help now? Chat with us on WhatsApp
        </a>
      </div>

      <nav className="bottom-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink>
        <NavLink to="/library" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Library</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Profile</NavLink>
      </nav>
    </div>
  );
}
