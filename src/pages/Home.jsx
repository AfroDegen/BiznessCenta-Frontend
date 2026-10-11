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
    text: "Your profile goes live and customers can start reaching you.",
  },
];

const FEATURES = [
  {
    title: "Google Business Profile",
    text: "Show up on Google Search and Maps when buyers look for what you sell.",
  },
  {
    title: "A professional website",
    text: "A clean page for your business that Google can read and customers trust.",
  },
  {
    title: "Reviews that build trust",
    text: "A simple link that makes it easy for happy customers to rate you.",
  },
  {
    title: "Enquiries on WhatsApp",
    text: "Customers who find you reach you where you already do business.",
  },
];

export default function Home() {
  return (
    <div className="lp">
      <header className="lp-header">
        <span className="lp-brand">
          <span className="lp-brand-white">Bizness</span>{" "}
          <span className="lp-brand-green">Centa</span>
        </span>
      </header>

      <main>
        <section className="lp-hero">
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
        </section>

        <section className="lp-section">
          <h2 className="lp-h2">How it works</h2>
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
        </section>

        <section className="lp-section lp-section-alt">
          <h2 className="lp-h2">What your business gets</h2>
          <div className="lp-features">
            {FEATURES.map((f) => (
              <div className="lp-feature" key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="lp-final">
          <h2>Your customers are already searching.</h2>
          <p>Make sure they find you.</p>
          <div className="lp-cta">
            <GoogleButton />
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <p>
          By continuing, you agree to our{" "}
          <a href="/terms">Terms of Service</a> and{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
        <p className="lp-copy">Bizness Centa</p>
      </footer>
    </div>
  );
}
