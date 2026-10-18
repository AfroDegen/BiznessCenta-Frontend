import { useEffect, useRef, useState } from "react";
import GoogleButton from "../components/GoogleButton";
import Menu from "../components/Menu";

const WORDS = ["ideas", "product", "business", "brand"];

const STEPS = [
  {
    n: "01",
    title: "Sign in with Google",
    text: "One tap. No forms, no passwords to remember.",
  },
  {
    n: "02",
    title: "Tell us about your business",
    text: "Name, category, location and contact.",
  },
  {
    n: "03",
    title: "Make your brand easier for buyers to find on Google.",
    text: "Google profile, website, reviews and WhatsApp enquiries, all set up for you.",
  },
];

/* Sample cards, used for the collage and the grid. Decorative only. */
function Card({ type }) {
  if (type === "search") {
    return (
      <div className="pn-card">
        <div className="pn-q">tailor near me</div>
        <p className="pn-n">Adeyemi Tailoring</p>
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
        <p className="pn-n">Adeyemi Tailoring</p>
        <p className="pn-m">Open now, 1.2 km away</p>
      </div>
    );
  }

  if (type === "chat") {
    return (
      <div className="pn-card">
        <p className="pn-b pn-in">Do you make agbada?</p>
        <p className="pn-b pn-out">Yes. Send your measurements and I will confirm today.</p>
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

  if (type === "site") {
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

  return (
    <div className="pn-card">
      <p className="pn-open"><span className="pn-dot" />Open now</p>
      <p className="pn-m">Closes 7 PM</p>
      <div className="pn-chips">
        <span>WhatsApp</span>
      </div>
    </div>
  );
}

export default function Home() {
  const lpRef = useRef(null);
  const [word, setWord] = useState(0);
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWord((w) => (w + 1) % WORDS.length);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

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

      {/* Screen 1 - NEW HEADLINE */}
      <section className="lp-screen pn-screen">
        <header className="pn-header">
          <span className="pn-brand">
            <span className="pn-brand-w">Bizness</span>{" "}
            <span className="pn-brand-g">Centa</span>
          </span>
          <Menu />
        </header>

        <div className="pn-hero">
          <h1 className="pn-title">
            make your{" "}
            <span className="pn-word" key={word}>
              {WORDS[word]}
            </span>{" "}
            visible on the internet
          </h1>

          <p className="pn-sub">position your business for growth.</p>

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

      {/* Screen 2 - KEPT AS IS */}
      <section className="lp-screen lp-screen-preview">
        <div className="lp-body lp-body-light pn-body2">
          <h2 className="lp-h2 lp-h2-dark">This is how customers find you.</h2>
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
          <h2 className="lp-h2">Your customers are already searching.</h2>
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