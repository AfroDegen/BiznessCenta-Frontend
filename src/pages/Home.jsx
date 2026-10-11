import GoogleButton from "../components/GoogleButton";

const STEPS = [
  {
    n: "01",
    title: "Sign in with Google",
    text: "One tap. No forms, no passwords to remember.",
  },
  {
    n: "02",
    title: "Tell us about your business",
    text: "Name, category, location and your WhatsApp number.",
  },
  {
    n: "03",
    title: "We get you found",
    text: "Google profile, website, reviews and WhatsApp enquiries, set up for you.",
  },
];

export default function Home() {
  return (
    <div className="lp">
      <section className="lp-screen lp-screen-1">
        <header className="lp-header">
          <span className="lp-brand">
            <span className="lp-brand-white">Bizness</span>{" "}
            <span className="lp-brand-green">Centa</span>
          </span>
        </header>

        <div className="lp-hero">
          <p className="lp-eyebrow">Business visibility for Nigerian sellers</p>

          <h1 className="lp-title">
            GET YOUR
            <br />
            BIZNESS FOUND.
          </h1>

          <p className="lp-sub">
            When customers search on Google, your business should be the one
            they find. We set up your profile, your website and your listings,
            so buyers can reach you on WhatsApp.
          </p>

          <div className="lp-cta">
            <GoogleButton />
            <p className="lp-cta-note">Free to start. Takes under a minute.</p>
          </div>
        </div>
      </section>

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
