import { useState, useEffect } from "react";

const NUMBER = "2349110483989";

function wa(text) {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`;
}

/* Quick questions. Each one opens WhatsApp with the words filled in. */
const QUICK = [
  {
    label: "How e dey work?",
    text: "Hello Captain Nigeria, abeg explain how Bizness Centa dey work.",
  },
  {
    label: "Wetin be the price?",
    text: "Hello Captain Nigeria, abeg wetin be the price for Bizness Centa plans?",
  },
  {
    label: "I wan talk to person",
    text: "Hello Bizness Centa, I wan talk to person abeg.",
  },
];

export default function CaptainNigeria() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {open && (
        <section className="cn-panel" role="dialog" aria-label="Captain Nigeria">
          <div className="cn-head">
            <span className="cn-avatar" aria-hidden="true">CN</span>
            <div className="cn-who">
              <b>Captain Nigeria</b>
              <span>Support, 24/7</span>
            </div>
            <button
              type="button"
              className="cn-x"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <span />
              <span />
            </button>
          </div>

          <div className="cn-body">
            <p className="cn-bubble">
              How far! Na Captain Nigeria be this. Wetin you wan know about
              Bizness Centa?
            </p>

            <div className="cn-quick">
              {QUICK.map((q) => (
                <a
                  key={q.label}
                  className="cn-chip"
                  href={wa(q.text)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {q.label}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <button
        type="button"
        className="cn-fab"
        aria-label={open ? "Close Captain Nigeria" : "Chat with Captain Nigeria"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.6c-.5.4-1.3.1-1.3-.6V16A2.5 2.5 0 0 1 4 13.5v-8Z"
              fill="#fff"
            />
            <circle cx="8.6" cy="9.5" r="1.25" fill="#0d6e3b" />
            <circle cx="12" cy="9.5" r="1.25" fill="#0d6e3b" />
            <circle cx="15.4" cy="9.5" r="1.25" fill="#0d6e3b" />
          </svg>
        )}
        {!open && <i className="cn-live" aria-hidden="true" />}
      </button>
    </>
  );
}
