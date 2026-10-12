import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Dashboard() {
  const navigate = useNavigate();

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBusiness() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/", { replace: true });
        return;
      }

      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
      }

      if (!data) {
        navigate("/create-business", {
          replace: true,
        });
        return;
      }

      setBusiness(data);
      setLoading(false);
    }

    loadBusiness();
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();

    navigate("/", {
      replace: true,
    });
  }

  if (loading) {
    return (
      <div className="dashboard-page">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Good Morning</h1>

        <p>{business.business_name}</p>
      </header>

      <section className="insight-card">
        <div className="card-image trend-image"></div>

        <div className="card-content">
          <h2>Trending In Your Niche</h2>

          <p>
            Search activity is increasing in your
            category. Customers are actively looking
            for businesses like yours this week.
          </p>
        </div>
      </section>

      <section className="insight-card">
        <div className="card-image recommendation-image"></div>

        <div className="card-content">
          <h2>Recommendations For The Week</h2>

          <p>
            Add at least 5 new business photos.
            Businesses with recent photos are more
            likely to receive profile interactions.
          </p>
        </div>
      </section>

      <section className="insight-card">
        <div className="card-image reviews-image"></div>

        <div className="card-content">
          <h2>Customer Reviews</h2>

          <p>
            You have no reviews yet.
            Click here to get your first review
            from existing customers.
          </p>
        </div>
      </section>

      <button
        className="primary-btn signout-btn"
        onClick={handleSignOut}
      >
        Sign Out
      </button>

      <nav className="bottom-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <span className="nav-label">
            Home
          </span>
        </NavLink>

        <NavLink
          to="/library"
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <span className="nav-label">
            Library
          </span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "nav-item active"
              : "nav-item"
          }
        >
          <span className="nav-label">
            Profile
          </span>
        </NavLink>
      </nav>
    </div>
  );
}
