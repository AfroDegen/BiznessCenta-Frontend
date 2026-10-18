import { useRef, useState } from "react";
import GoogleButton from "../components/GoogleButton";
import Menu from "../components/Menu";
import { signInWithGoogle } from "../services/auth";
import headerIcon from "../../header-icon.WEBP";

/*
  Home: one header, one basic swipe slider, one sign-in button.
  Edit the words below. Nothing else needs to change.
*/
const SLIDES = [
  {
    key: "find",
    title: "Get your business found on Google.",
    text: "We set up your Google profile, your website and your WhatsApp enquiries, so customers near you can find you and message you.",
  },
  {
    key: "how",
    title: "How it works",
    steps: [
      { n: "1", t: "Sign in with Google", d: "One tap. No passwords to remember." },
      { n: "2", t: "Answer a few quick questions", d: "About your business, so we set it up properly." },
      { n: "3", t: "Choose your plan", d: "Then we get to work for you." },
    ],
  },
  {
    key: "get",
    title: "What you get",
    list: [
      "A Google Business Profile customers can find",
      "A simple website you can share",
      "WhatsApp enquiries sent straight to you",
      "A way to collect reviews",
    ],
  },
];

export default function Home() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  }

  function go(i) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className="hs-page">
      <header className="hs-header">
        <div className="hs-lockup">
          <img
            src={headerIcon}
            alt=""
            width="40"
            height="40"
            className="hs-logo"
          />
          <span className="hs-brand">
            Bizness <span className="hs-brand-g">Centa</span>
          </span>
        </div>

        <div className="hs-actions">
          <button
            type="button"
            className="hs-signin"
            onClick={() => signInWithGoogle()}
          >
            Sign in
          </button>
          <Menu />
        </div>
      </header>

      <div
        className="hs-track"
        ref={trackRef}
        onScroll={onScroll}
        role="region"
        aria-label="About Bizness Centa"
      >
        {SLIDES.map((s) => (
          <section className="hs-slide" key={s.key}>
            <div className="hs-slide-inner">
              {s.key === "find" ? (
                <h1 className="hs-h1">{s.title}</h1>
              ) : (
                <h2 className="hs-h2">{s.title}</h2>
              )}

              {s.text && <p className="hs-text">{s.text}</p>}

              {s.steps && (
                <ol className="hs-steps">
                  {s.steps.map((x) => (
                    <li key={x.n}>
                      <span className="hs-step-n">{x.n}</span>
                      <span>
                        <b>{x.t}</b>
                        <em>{x.d}</em>
                      </span>
                    </li>
                  ))}
                </ol>
              )}

              {s.list && (
                <ul className="hs-list">
                  {s.list.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="hs-bottom">
        <div className="hs-dots" role="tablist" aria-label="Slides">
          {SLIDES.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={index === i}
              aria-label={`Slide ${i + 1}`}
              className={index === i ? "hs-dot on" : "hs-dot"}
              onClick={() => go(i)}
            />
          ))}
        </div>

        <GoogleButton />
        <p className="hs-note">Free to start. Takes under a minute.</p>
        <p className="hs-legal">
          By continuing, you agree to our <a href="/terms">Terms</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
