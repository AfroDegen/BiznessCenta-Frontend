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
      <div className="page">
        Loading...
      </div>
    );
  }

  return (
    <div className="page">

      <h1>
        Welcome to BiznessCenta
      </h1>

      <p>
        Google Account Connected ✅
      </p>

      <h2>
        {
          user.user_metadata?.full_name
        }
      </h2>

      <p>
        {user.email}
      </p>

      <button className="glass-button">
        Create Business Profile
      </button>

    </div>
  );
}
