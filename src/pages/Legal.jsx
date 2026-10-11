import { useLocation, Link } from "react-router-dom";

const CONTENT = {
  terms: {
    title: "Terms of Service",
    body: [
      "These terms govern your use of Bizness Centa, including the website and any services we provide to your business.",
      "You must provide accurate information when creating a business profile and keep your sign-in details secure.",
      "We provide visibility services, including website setup, listings management, and reporting. Results depend on many factors outside our control, and we do not guarantee specific sales.",
      "Fees are shown on our pricing page. Setup fees are one-time, and monthly fees apply where stated.",
      "You may stop using the service at any time. We may suspend accounts that misuse the platform or break these terms.",
      "For questions about these terms, contact us on WhatsApp at +234 911 048 3989.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "We collect the information you give us: your name and email from Google sign-in, and the business details you enter, such as name, category, location, and WhatsApp number.",
      "We use this information to create and run your business profile, provide support, and improve the service.",
      "We do not sell your personal information. We share data only with service providers needed to run Bizness Centa, such as hosting and authentication providers.",
      "Each user can only access their own business record. You can ask us to update or delete your information at any time.",
      "For privacy questions, contact us on WhatsApp at +234 911 048 3989.",
    ],
  },
};

export default function Legal() {
  const { pathname } = useLocation();
  const key = pathname.includes("privacy") ? "privacy" : "terms";
  const page = CONTENT[key];

  return (
    <div className="legal-page">
      <Link to="/" className="legal-back">← Back</Link>
      <h1>{page.title}</h1>
      {page.body.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
      <p className="legal-updated">Last updated: October 2026</p>
    </div>
  );
}
