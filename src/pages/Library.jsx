
import { NavLink } from "react-router-dom";

const resources = [
  { title: "Business visibility", status: "Available" },
  { title: "Google Business Profile", status: "Coming soon" },
  { title: "Content and photos", status: "Available" },
  { title: "Customer reviews", status: "Available" },
  { title: "AI and search visibility", status: "Coming soon" },
];

export default function Library() {
  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <p className="bc-eyebrow">BIZNESS CENTA</p>
        <h1>Your Library</h1>
        <p>Tools and resources to help your business get found.</p>
      </header>

      <section className="bc-resource-list" aria-label="Resources">
        {resources.map((resource) => (
          <article className="bc-resource-card" key={resource.title}>
            <h2>{resource.title}</h2>
            <span className="bc-resource-status">
              {resource.status}
            </span>
          </article>
        ))}
      </section>

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
