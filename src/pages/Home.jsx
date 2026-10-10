import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import GoogleButton from "../components/GoogleButton";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        navigate("/welcome");
      }
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          navigate("/welcome");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="home-page">
      <h1 className="brand">
        BiznessCenta
      </h1>

      <h2>
        Get Your Business Found.
      </h2>

      <p>
        Free website. AI receptionist.
        Built for business visibility.
      </p>

      <GoogleButton />
    </div>
  );
}
