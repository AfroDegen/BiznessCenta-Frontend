import { useEffect, useState } from "react";
import headerIcon from "../../header-icon.WEBP";

const SHOW_MS = 700;
const FADE_MS = 220;

export default function Splash({ onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setLeaving(true), SHOW_MS);
    const b = setTimeout(() => onDone(), SHOW_MS + FADE_MS);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [onDone]);

  return (
    <div
      className={leaving ? "ld-screen ld-out" : "ld-screen"}
      role="status"
      aria-label="Loading Bizness Centa"
    >
      <div className="ld-center">
        <img
          src={headerIcon}
          alt=""
          width="88"
          height="88"
          className="ld-icon"
        />
        <p className="ld-name">
          Bizness <span>Centa</span>
        </p>
        <div className="ld-bar" aria-hidden="true">
          <i />
        </div>
      </div>
    </div>
  );
}
