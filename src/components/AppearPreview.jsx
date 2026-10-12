import { useEffect, useState } from "react";

const TABS = [
  { id: "search", label: "Search" },
  { id: "maps", label: "Maps" },
  { id: "whatsapp", label: "WhatsApp" },
];

export default function AppearPreview() {
  const [tab, setTab] = useState("search");

  useEffect(() => {
    const timer = setInterval(() => {
      setTab((current) => {
        const i = TABS.findIndex((t) => t.id === current);
        return TABS[(i + 1) % TABS.length].id;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="ap">
      <div className="ap-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={tab === t.id ? "ap-tab active" : "ap-tab"}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="ap-card">
        {tab === "search" && (
          <>
            <div className="ap-query">tailor near me</div>
            <div className="ap-result">
              <p className="ap-name">Adeyemi Tailoring</p>
              <p className="ap-meta">4.8 rating, 24 reviews, Lagos</p>
              <p className="ap-desc">Custom native and corporate wear. Open today until 7 PM.</p>
              <div className="ap-actions">
                <span>Call</span>
                <span>Website</span>
                <span>Directions</span>
              </div>
            </div>
          </>
        )}

        {tab === "maps" && (
          <>
            <div className="ap-map">
              <span className="ap-pin" />
            </div>
            <div className="ap-result">
              <p className="ap-name">Adeyemi Tailoring</p>
              <p className="ap-meta">Open now, 1.2 km away</p>
            </div>
          </>
        )}

        {tab === "whatsapp" && (
          <div className="ap-chat">
            <p className="ap-bubble in">Hello, do you make agbada? What is the price?</p>
            <p className="ap-bubble out">Yes, we do. Send your measurements and I will confirm today.</p>
          </div>
        )}
      </div>

      <p className="ap-note">Sample business, for illustration.</p>
    </div>
  );
}
