import { useRef, useState } from "react";
import GoogleButton from "../components/GoogleButton";
import Menu from "../components/Menu";
import { signInWithGoogle } from "../services/auth";

/* Change the words here to retarget the page to another kind of business. */
const COPY = {
  title: "Get your travel agency found by travellers.",
  sub: "We set up your Google profile, your website and your WhatsApp enquiries, so people searching near you can find you and message you.",
  searchQuery: "travel agency near me",
  businessName: "Lagos Travel Desk",
  chatQuestion: "Do you have Dubai packages?",
  chatAnswer: "Yes. Send your travel dates and I will confirm today.",
};

const STEPS = [
  {
    n: "01",
    title: "Sign in with Google",
    text: "One tap. No forms, no passwords to remember.",
  },
  {
    n: "02",
    title: "Answer a few quick questions",
    text: "About your business, so we set things up properly.",
  },
  {
    n: "03",
    title: "Choose your plan",
    text: "Google profile, website, reviews and WhatsApp enquiries, set up for you.",
  },
];

/* Sample cards, used for the collage and the grid. Decorative only. */
function Card({ type }) {
  if (type === "search") {
    return (
      <div className="pn-card">
        <div className="pn-q">{COPY.searchQuery}</div>
        <p className="pn-n">{COPY.businessName}</p>
        <p className="pn-m">4.8 rating, 24 reviews, Lagos</p>
        <div className="pn-chips">
          <span>Call</span>
          <span>Directions</span>
        </div>
      </div>
    );
  }

  if (type === "map") {
    return (
      <div className="pn-card">
        <div className="pn-map">
          <span className="pn-pin" />
        </div>
        <p className="pn-n">{COPY.businessName}</p>
        <p className="pn-m">Open now, 1.2 km away</p>
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="pn-card">
        <p className="pn-b pn-in">{COPY.chatQuestion}</p>
        <p className="pn-b pn-out">{COPY.chatAnswer}</p>
      </div>
    );
  }

  if (type === "review") {
    return (
      <div className="pn-card">
        <p className="pn-m">Customer reviews</p>
        <p className="pn-big">4.8</p>
        <span className="pn-bar"><i /></span>
        <p className="pn-m">24 reviews</p>
      </div>
    );
  }

  return (
    <div className="pn-card">
      <div className="pn-site">
        <b />
        <i />
        <i className="short" />
        <u />
      </div>
      <p className="pn-n">Your website</p>
      <p className="pn-m">Ready to share</p>
    </div>
  );
}

export default function Home() {
  const lpRef = useRef(null);
  const [screen, setScreen] = useState(0);

  function onScroll() {
    const el = lpRef.current;
    if (!el) return;
    setScreen(Math.round(el.scrollTop / el.clientHeight));
  }

  function go(i) {
    const el = lpRef.current;
    if (!el) return;
    el.scrollTo({ top: i * el.clientHeight, behavior: "smooth" });
  }

  return (
    <div className="lp" ref={lpRef} onScroll={onScroll}>
      <nav className="pn-dots" aria-label="Page sections">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            className={screen === i ? "pn-dot-btn active" : "pn-dot-btn"}
            aria-label={`Go to section ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </nav>

      {/* Screen 1 */}
      <section className="lp-screen pn-screen">
        <header className="pn-header">
          <div className="pn-lockup">
            <img
              src="/header-icon.WEBP"
              alt=""
              width="40"
              height="40"
              className="pn-logo"
            />
            <span className="pn-brand">
              <span className="pn-brand-w">Bizness</span>{" "}
              <span className="pn-brand-g">Centa</span>
            </span>
          </div>

          <div className="pn-actions">
            <button
              type="button"
              className="pn-signin"
              onClick={() => signInWithGoogle()}
            >
              Sign in
            </button>
            <Menu />
          </div>
        </header>

        <div className="pn-hero">
          <h1 className="pn-title">{COPY.title}</h1>

          <p className="pn-sub">{COPY.sub}</p>

          <div className="lp-cta">
            <GoogleButton />
            <p className="lp-cta-note">Free to start. Takes under a minute.</p>
          </div>
        </div>

        <div className="pn-peek" aria-hidden="true">
          <div className="pn-peek-row">
            {["map", "chat", "search", "review", "site"].map((t) => (
              <Card key={t} type={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Screen 2 */}
      <section className="lp-screen lp-screen-preview">
        <div className="lp-body lp-body-light pn-body2">
          <h2 className="lp-h2 lp-h2-dark">This is how travellers find you.</h2>
          <p className="lp-h2-sub lp-sub-dark">
            On Google Search, on Maps, and on WhatsApp.
          </p>

          <div className="pn-grid" aria-hidden="true">
            {["search", "map", "chat", "review", "site"].map((t) => (
              <Card key={t} type={t} />
            ))}
          </div>

          <p className="pn-sample">Sample business, for illustration.</p>

          <div className="lp-cta">
            <GoogleButton />
          </div>
        </div>
      </section>

      {/* Screen 3 */}
      <section className="lp-screen lp-screen-2">
        <div className="lp-body">
          <h2 className="lp-h2">Travellers are already searching.</h2>
          <p className="lp-h2-sub">Make sure they find you.</p>

          <div className="lp-steps">
            {STEPS.map((s) => (
              <div className="lp-step" key={s.n}>
                <span className="lp-step-n">{s.n}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lp-cta">
            <GoogleButton />
          </div>
        </div>

        <footer className="lp-footer">
          By continuing, you agree to our <a href="/terms">Terms of Service</a>{" "}
          and <a href="/privacy">Privacy Policy</a>.
        </footer>
      </section>
    </div>
  );
}
