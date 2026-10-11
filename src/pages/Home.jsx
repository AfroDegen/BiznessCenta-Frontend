import GoogleButton from "../components/GoogleButton";

export default function Home() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1 className="brand">
          <span className="brand-white">Bizness</span>{" "}
          <span className="brand-green">Centa</span>
        </h1>

        <h2 className="headline">
          GET YOUR
          <br />
          BIZNESS FOUND.
        </h2>

        <p className="subheadline">Convert 3X more sales on Google.</p>

        <GoogleButton />
      </div>

      <p className="legal">
        By continuing, you agree to our{" "}
        <a href="/terms">Terms of Service</a> and{" "}
        <a href="/privacy">Privacy Policy</a>.
      </p>
    </div>
  );
}
