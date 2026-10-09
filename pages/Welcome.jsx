import { useEffect, useState } from "react";
import { supabase } from "../services/supabase";

export default function Welcome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Welcome to BiznessCenta</h1>

      <p>{user.user_metadata?.full_name}</p>

      <p>{user.email}</p>

      <button>
        Create Business Profile
      </button>
    </div>
  );
}
