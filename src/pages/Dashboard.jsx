import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Dashboard() {
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
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
      if (error) console.error(error);
      if (!data) {
        navigate("/create-business", { replace: true });
        return;
      }
      setBusiness(data);
      setLoading(false);
    }
    loadBusiness();
  }, [navigate]);

  if (loading) {
    return <div className="dashboard-page">Loading your dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h1>Good Morning,</h1>
        <p>{business.name}</p>
      </header>

      <div className="dashboard-content">
        <section className="insight-card">
          <div className="card-image trend-image" />
          <div className="card-content">
            <h2>Trending In Your Niche</h2>
            <p>Search activity is increasing in your category.</p>
          </div>
        </section>

        <section className="insight-card">
          <div className="card-image recommendation-image" />
          <div className="card-content">
            <h2>Recommendations For The Week</h2>
            <p>Add 5 new photos to improve visibility and engagement.</p>
          </div>
        </section>

        <section className="insight-card">
          <div className="card-image reviews-image" />
          <div className="card-content">
            <h2>Customer Reviews</h2>
            <p>You have no reviews yet. Request your first review from existing customers.</p>
          </div>
        </section>
      </div>

      <nav className="bottom-nav">
        <NavLink to="/dashboard" className={({ isActive }) => isActive? "nav-item active" : "nav-item"}>Home</NavLink>
        <NavLink to="/library" className={({ isActive }) => isActive? "nav-item active" : "nav-item"}>Library</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive? "nav-item active" : "nav-item"}>Profile</NavLink>
      </nav>
    </div>
  );
}