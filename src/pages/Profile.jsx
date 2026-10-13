import { useCallback, useEffect, useState } from “react”;
import { NavLink, useNavigate } from “react-router-dom”;
import { supabase } from “../services/supabase”;

export default function Profile() {
const navigate = useNavigate();

const [loading, setLoading] = useState(true);
const [signingOut, setSigningOut] = useState(false);
const [business, setBusiness] = useState(null);
const [email, setEmail] = useState(””);
const [error, setError] = useState(””);
const [signOutError, setSignOutError] = useState(””);

const loadProfile = useCallback(async () => {
setLoading(true);
setError(””);

const {
  data: { session },
  error: sessionError,
} = await supabase.auth.getSession();
if (sessionError) {
  setError("Your session could not be loaded. Please try again.");
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
  console.error("Could not load business profile:", businessError);
  setError("We couldn't load your business details. Please try again.");
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
setSignOutError(””);

const { error: authError } = await supabase.auth.signOut();
if (authError) {
  console.error("Sign out failed:", authError);
  setSignOutError("Sign out failed. Please try again.");
  setSigningOut(false);
  return;
}
navigate("/", { replace: true });

}

if (loading) {
return (
Loading your profile…
);
}

return (
BIZNESS CENTA
Your Profile
Manage your account and business information.
  {error && (
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
  )}
  {!error && (
    <>
      <section className="bc-panel">
        <h2>Account</h2>
        <p className="bc-label">Signed in as</p>
        <p className="bc-value">{email || "Email unavailable"}</p>
      </section>
      <section className="bc-panel">
        <h2>Business information</h2>
        {business ? (
          <dl className="bc-details">
            <div>
              <dt>Business name</dt>
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
            <p>You haven't added a business profile yet.</p>
            <NavLink className="bc-text-link" to="/create-business">
              Create your business profile
            </NavLink>
          </>
        )}
      </section>
      <section className="bc-panel">
        <h2>Visibility tools</h2>
        <p>
          Google Business Profile integrations and automated visibility
          reporting are not connected here yet.
        </p>
        <span className="bc-resource-status">Not connected</span>
      </section>
    </>
  )}
  <section className="bc-panel">
    <h2>Legal</h2>
    <p><NavLink className="bc-text-link" to="/terms">Terms of service</NavLink></p>
    <p><NavLink className="bc-text-link" to="/privacy">Privacy policy</NavLink></p>
  </section>
  {signOutError && <p className="form-error" role="alert">{signOutError}</p>}
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