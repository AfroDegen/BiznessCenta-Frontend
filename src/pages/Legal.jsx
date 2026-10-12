export default function Legal({ type }) {
  const page = CONTENT[type];

  return (
    <div className="legal-page">
      <Link to="/" className="legal-back">
        ← Back
      </Link>

      <h1>{page.title}</h1>

      {page.body.map((para, i) => (
        <p key={i}>{para}</p>
      ))}

      <p className="legal-updated">
        Last updated: October 2026
      </p>
    </div>
  );
}