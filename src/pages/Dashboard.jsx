return (
  <div className="dashboard-page">
    <header className="dashboard-header">
      <h1>Good Morning 👋</h1>
      <p>{business.name}</p>
    </header>

    <section className="insight-card trending-card">
      <div className="card-image"></div>

      <div className="card-content">
        <h2>🔥 Trending In Your Niche</h2>

        <p>
          More customers are searching for businesses like yours this week.
        </p>

        <button className="card-link">
          Learn More →
        </button>
      </div>
    </section>

    <section className="insight-card recommendations-card">
      <div className="card-image"></div>

      <div className="card-content">
        <h2>💡 Recommendations For The Week</h2>

        <p>
          Add 5 business photos to improve visibility and engagement.
        </p>

        <button className="card-link">
          Do This →
        </button>
      </div>
    </section>

    <section className="insight-card reviews-card">
      <div className="card-image"></div>

      <div className="card-content">
        <h2>⭐ What Customers Are Saying</h2>

        <p>
          You have no reviews yet. Click here to get your first review from existing customers.
        </p>

        <button className="card-link">
          Get Reviews →
        </button>
      </div>
    </section>

    <nav className="bottom-nav">
      <button>🏠</button>
      <button>📚</button>
      <button>👤</button>
    </nav>
  </div>
);
