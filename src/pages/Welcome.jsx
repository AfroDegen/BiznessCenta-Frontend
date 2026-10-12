import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkBusiness() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/");
        return;
      }

      const { data } = await supabase
        .from("businesses")
        .select("id")
        .eq("owner_id", session.user.id)
        .maybeSingle();

      if (data) {
        navigate("/dashboard");
      }
    }

    checkBusiness();
  }, [navigate]);

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <h1>Welcome</h1>

        <p>
          Let's create your business profile.
        </p>

        <button
          className="primary-btn"
          onClick={() =>
            navigate("/create-business")
          }
        >
          Create Business Profile
        </button>
      </div>
    </div>
  );
}
