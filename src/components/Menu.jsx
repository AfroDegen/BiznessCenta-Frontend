import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const WHATSAPP =
  "https://wa.me/2349110483989?text=Hello%20Bizness%20Centa%2C%20I%20have%20a%20question.";

export default function Menu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        className="menu-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span className={open ? "menu-bar menu-bar-open" : "menu-bar"} />
      </button>

      {open && (
        <nav className="menu-panel">
          <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          <Link to="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            Contact
          </a>
        </nav>
      )}
    </>
  );
}
