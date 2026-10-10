import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Welcome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();
  }, []);

  if (!user) {
    return (
      <div className="welcome-page">
        <h1>Loading...</h1>
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
          {user.user_metadata.avatar_url}
        )}

        <h1>Welcome to BiznessCenta</h1>

        <h2>
          {user.user_metadata?.full_name ||
            user.user_metadata?.name}
        </h2>

        <p>{user.email}</p>

        <button className="primary-btn">
          Create Business Profile →
        </button>

      </div>
    </div>
  );
}
