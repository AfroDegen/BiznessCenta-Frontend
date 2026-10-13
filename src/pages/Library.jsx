import { NavLink } from "react-router-dom";

const resources = [
{
number: "01",
title: "Business visibility",
description:
"Understand how customers discover businesses online and what helps them find yours.",
status: "Guidance",
},
{
number: "02",
title: "Google Business Profile",
description:
"Learn how to prepare your business information for local discovery on Google.",
status: "Coming soon",
},
{
number: "03",
title: "Content and photos",
description:
"Build a useful collection of business photos, service descriptions, and customer-facing information.",
status: "Guidance",
},
{
number: "04",
title: "Customer reviews",
description:
"Learn how to request honest feedback and respond professionally to customers.",
status: "Guidance",
},
{
number: "05",
title: "AI and search visibility",
description:
"Explore how clear, consistent business information can support discovery across search and AI tools.",
status: "Coming soon",
},
];

export default function Library() {
return (
<main>
BIZNESS CENTA
Your Library
Practical resources for making your business easier to find.
  <section className="bc-resource-list" aria-label="Business resources">
    {resources.map((resource) => (
      <article className="bc-resource-card" key={resource.number}>
        <span className="bc-resource-number">{resource.number}</span>
        <div className="bc-resource-content">
          <h2>{resource.title}</h2>
          <p>{resource.description}</p>
          <span className="bc-resource-status">{resource.status}</span>
        </div>
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