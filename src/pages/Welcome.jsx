import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkBusiness() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/", { replace: true });
        return;
      }

      const { data } = await supabase
       .from("businesses")
       .select("id")
       .eq("owner_id", session.user.id)
       .maybeSingle();

      if (data) {
        navigate("/dashboard", { replace: true });
        return;
      }

      // No business - it's a new user, show the welcome card
      setLoading(false);
    }

    checkBusiness();
  }, [navigate]);

  if (loading) {
    return (
      <div className="welcome-page">
        <div className="welcome-card">
          <h1>Welcome</h1>
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>Welcome</h1>
        <p>Let's create your business profile.</p>
        <button
          className="primary-btn"
          onClick={() => navigate("/create-business")}
        >
          Create Business Profile
        </button>
      </div>
    </div>
  );
}