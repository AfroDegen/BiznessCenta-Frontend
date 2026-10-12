import { NavLink } from "react-router-dom";

<nav className="bottom-nav">
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
