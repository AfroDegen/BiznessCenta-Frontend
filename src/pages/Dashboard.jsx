import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        .select("name, category, location, whatsapp")
        .eq("owner_id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
      }

      if (!data) {
        navigate("/create-business", { replace: true });
        return;
      }

      setBusiness(data);
      setLoading(false);
    }

    loadBusiness();
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  }

  if (loading) {
    return (
      <div className="welcome-page">
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="welcome-page">
      <div className="welcome-card dashboard-card">
        <p className="welcome-badge dashboard-badge">Live</p>

        <h1>{business.name}</h1>

        <div className="dashboard-row">
          <span className="dashboard-label">Category</span>
          <span className="dashboard-value">{business.category || "Not set"}</span>
        </div>

        <div className="dashboard-row">
          <span className="dashboard-label">Location</span>
          <span className="dashboard-value">{business.location || "Not set"}</span>
        </div>

        <div className="dashboard-row">
          <span className="dashboard-label">WhatsApp</span>
          <span className="dashboard-value">{business.whatsapp || "Not set"}</span>
        </div>

        <p className="dashboard-note">
          Your visibility work is being set up. We will update you here as it
          progresses.
        </p>

        <button className="primary-btn signout-btn" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
}
