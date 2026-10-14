
import { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [business, setBusiness] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [signOutError, setSignOutError] = useState("");

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError("");

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      setError("Unable to load your profile. Please try again.");
      setLoading(false);
      return;
    }

    if (!session) {
      navigate("/", { replace: true });
      return;
    }

    setEmail(session.user.email || "");

    const { data, error: businessError } = await supabase
      .from("businesses")
      .select("id, name, category, location, whatsapp")
      .eq("owner_id", session.user.id)
      .maybeSingle();

    if (businessError) {
      console.error("Profile loading failed:", businessError);
      setError("Unable to load your business details.");
    } else {
      setBusiness(data);
    }

    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  async function handleSignOut() {
    setSigningOut(true);
    setSignOutError("");

    const { error: authError } = await supabase.auth.signOut();

    if (authError) {
      console.error("Sign out failed:", authError);
      setSignOutError("Unable to sign out. Please try again.");
      setSigningOut(false);
      return;
    }

    navigate("/", { replace: true });
  }

  if (loading) {
    return (
      <main className="dashboard-page">
        <p>Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <p className="bc-eyebrow">BIZNESS CENTA</p>
        <h1>Profile</h1>
      </header>

      {error ? (
        <section className="bc-panel" role="alert">
          <p>{error}</p>
          <button
            className="primary-btn"
            type="button"
            onClick={loadProfile}
          >
            Try again
          </button>
        </section>
      ) : (
        <>
          <section className="bc-panel">
            <h2>Account</h2>
            <p className="bc-label">Email</p>
            <p className="bc-value">
              {email || "Email unavailable"}
            </p>
          </section>

          <section className="bc-panel">
            <h2>Business</h2>

            {business ? (
              <dl className="bc-details">
                <div>
                  <dt>Name</dt>
                  <dd>{business.name || "Not provided"}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{business.category || "Not provided"}</dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{business.location || "Not provided"}</dd>
                </div>
                <div>
                  <dt>WhatsApp</dt>
                  <dd>{business.whatsapp || "Not provided"}</dd>
                </div>
              </dl>
            ) : (
              <>
                <p>No business profile yet.</p>
                <NavLink
                  className="bc-text-link"
                  to="/create-business"
                >
                  Create business profile
                </NavLink>
              </>
            )}
          </section>
        </>
      )}

      {signOutError && (
        <p className="form-error" role="alert">
          {signOutError}
        </p>
      )}

      <button
        className="primary-btn signout-btn"
        type="button"
        onClick={handleSignOut}
        disabled={signingOut}
      >
        {signingOut ? "Signing out..." : "Sign Out"}
      </button>

      <nav className="bottom-nav" aria-label="Main navigation">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Library
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          Profile
        </NavLink>
      </nav>
    </main>
  );
}
