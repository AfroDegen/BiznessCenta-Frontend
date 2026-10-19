import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

const WHATSAPP =
  "https://wa.me/2349110483989?text=Hello%20Bizness%20Centa%2C%20I%20have%20a%20question.";

export default function Menu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className="menu-btn"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span className="menu-bar" />
      </button>

      {open &&
        createPortal(
          <>
            <div className="mc-scrim" onClick={close} aria-hidden="true" />

            <nav className="mc-panel" role="dialog" aria-modal="true" aria-label="Menu">
              <div className="mc-top">
                <span className="mc-title">Menu</span>
                <button
                  type="button"
                  className="mc-close"
                  aria-label="Close menu"
                  onClick={close}
                >
                  <span />
                  <span />
                </button>
              </div>

              <div className="mc-links">
                <Link to="/about" className="mc-link" onClick={close}>
                  About
                </Link>
                <Link to="/pricing" className="mc-link" onClick={close}>
                  Pricing
                </Link>
                <a
                  href={WHATSAPP}
                  className="mc-link"
                  target="_blank"
                  rel="noreferrer"
                  onClick={close}
                >
                  Contact
                </a>
              </div>

              <div className="mc-foot">
                <p className="mc-foot-text">
                  Questions? Message us on WhatsApp and a real person replies.
                </p>
                <p className="mc-foot-legal">
                  <Link to="/terms" onClick={close}>Terms</Link>
                  <span aria-hidden="true"> / </span>
                  <Link to="/privacy" onClick={close}>Privacy</Link>
                </p>
              </div>
            </nav>
          </>,
          document.body
        )}
    </>
  );
}
