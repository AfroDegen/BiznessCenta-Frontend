
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function checkBusiness() {
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

        const {
          data,
          error: businessError,
        } = await supabase
          .from("businesses")
          .select("id")
          .eq("owner_id", session.user.id)
          .maybeSingle();

        if (businessError) throw businessError;

        if (!active) return;

        if (data) {
          navigate("/pricing", { replace: true });
          return;
        }

        setLoading(false);
      } catch (err) {
        if (!active) return;

        setError(
          err?.message ||
            "We couldn't load your profile. Please try again."
        );
        setLoading(false);
      }
    }

    checkBusiness();

    return () => {
      active = false;
    };
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

  if (error) {
    return (
      <div className="welcome-page">
        <div className="welcome-card">
          <h1>Welcome</h1>
          <p className="form-error" role="alert">
            {error}
          </p>
          <button
            className="primary-btn"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
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
