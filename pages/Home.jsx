import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/welcome");
      }
    }

    checkSession();
  }, []);

  return (
    <div>
      <h1>Get Your Business Found.</h1>
    </div>
  );
}

