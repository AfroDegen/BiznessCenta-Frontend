import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="legal-page">
      <Link to="/" className="legal-back">Back</Link>
      <h1>About Bizness Centa</h1>
      <p>
        Bizness Centa helps Nigerian businesses get found online. We set up
        your Google profile, your website and your listings, so customers who
        search can find you and reach you on WhatsApp.
      </p>
      <p>
        Creating a business profile is free. Built in Lagos by Reedstar Royal Ltd.
      </p>
    </div>
  );
}
