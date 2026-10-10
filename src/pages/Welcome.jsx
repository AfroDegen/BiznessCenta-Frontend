import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Welcome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="welcome-page">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="welcome-page">
        <div className="welcome-card">
          <h1>Not Signed In</h1>
          <p>Please return to the homepage and sign in with Google.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <div className="welcome-badge">
          ✅ Google Account Connected
        </div>

        {user.user_metadata?.avatar_url && (
          <img
            src={user.user_metadata.avatar_url}
            alt="Profile"
            className="welcome-avatar"
          />
        )}

        <h1>Welcome to BiznessCenta</h1>

        <h2>
          {user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "Business Owner"}
        </h2>

        <p>{user.email}</p>

        <button
          className="primary-btn"
          onClick={() => navigate("/create-business")}
        >
          Create Business Profile →
        </button>
      </div>
    </div>
  );
}
