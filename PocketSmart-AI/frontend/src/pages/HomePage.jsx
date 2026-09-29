import React from "react";

function HomePage({ onStart }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <nav className="navbar">
        <div
          className="logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="logo-icon">P</span>
          <span>PocketSmart AI</span>
        </div>

        <div className="nav-menu">
          <button
            className="nav-link active"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Home
          </button>

          <button
            className="nav-link"
            onClick={() => scrollToSection("features")}
          >
            Features
          </button>

          <button
            className="nav-link"
            onClick={() => scrollToSection("membership")}
          >
            Membership
          </button>

          <button className="nav-start" onClick={onStart}>
            Get Started <span>→</span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge">
            <span className="badge-dot"></span>
            AI-Powered Smart Budgeting
          </div>

          <h1>
            Plan Smarter.
            <br />
            Spend <span>Better.</span>
          </h1>

          <p>
            PocketSmart AI helps you plan your monthly budget, understand
            your spending, and discover smarter ways to save with
            AI-powered recommendations.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={onStart}>
              Plan My Budget <span>→</span>
            </button>

            <button
              className="secondary-btn"
              onClick={() => scrollToSection("features")}
            >
              Explore Features
            </button>
          </div>

          {/* TRUST POINTS */}
          <div className="hero-trust">
            <div>
              <span>✓</span>
              Smart planning
            </div>

            <div>
              <span>✓</span>
              AI recommendations
            </div>

            <div>
              <span>✓</span>
              Easy to use
            </div>
          </div>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="dashboard-wrapper">
          <div className="dashboard-glow"></div>

          <div className="dashboard-preview">
            <div className="preview-top">
              <div>
                <small>Monthly Budget</small>
                <h2>₹25,000</h2>
              </div>

              <div className="ai-circle">✦</div>
            </div>

            <div className="budget-summary">
              <div>
                <span>Used</span>
                <strong>₹18,000</strong>
              </div>

              <div>
                <span>Remaining</span>
                <strong>₹7,000</strong>
              </div>
            </div>

            <div className="progress-container">
              <div className="progress-bar"></div>
            </div>

            <div className="progress-label">
              <span>72% of budget used</span>
              <span>₹7,000 left</span>
            </div>

            <div className="preview-divider"></div>

            <div className="preview-row">
              <div>
                <span className="category-dot food"></span>
                Food
              </div>
              <strong>₹5,000</strong>
            </div>

            <div className="preview-row">
              <div>
                <span className="category-dot travel"></span>
                Travel
              </div>
              <strong>₹3,000</strong>
            </div>

            <div className="preview-row">
              <div>
                <span className="category-dot savings"></span>
                Savings
              </div>
              <strong>₹7,000</strong>
            </div>

            <div className="ai-message">
              <div className="ai-message-header">
                <span className="ai-small-icon">✦</span>
                <strong>AI Insight</strong>
              </div>

              <p>
                Your spending is on track. Consider reducing unnecessary
                expenses to increase your monthly savings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div>
            <strong>Smart Budgeting</strong>
            <span>Plan your money easily</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✦</div>
          <div>
            <strong>AI Insights</strong>
            <span>Personalized recommendations</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div>
            <strong>Track Spending</strong>
            <span>Understand where money goes</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" id="features">
        <div className="section-heading">
          <div className="section-tag">FEATURES</div>

          <h2>
            Everything you need to manage your <span>money</span>
          </h2>

          <p>
            Simple financial tools combined with AI-powered insights to
            make budgeting easier and smarter.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">💰</div>

            <div className="feature-number">01</div>

            <h3>Smart Budget Planner</h3>

            <p>
              Create a monthly budget based on your income, expenses,
              and financial goals.
            </p>

            <button onClick={onStart}>
              Start Planning <span>→</span>
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✦</div>

            <div className="feature-number">02</div>

            <h3>Gemini AI Planner</h3>

            <p>
              Get intelligent suggestions that help you understand and
              organize your monthly finances.
            </p>

            <button onClick={onStart}>
              Try AI Planner <span>→</span>
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>

            <div className="feature-number">03</div>

            <h3>AI Recommendations</h3>

            <p>
              Receive useful recommendations based on your spending
              patterns and budget.
            </p>

            <button onClick={onStart}>
              Get Insights <span>→</span>
            </button>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏷️</div>

            <div className="feature-number">04</div>

            <h3>Category Discounts</h3>

            <p>
              Discover category-wise opportunities that can help you
              spend more efficiently.
            </p>

            <button onClick={onStart}>
              Explore Savings <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="membership" id="membership">
        <div className="section-heading">
          <div className="section-tag">MEMBERSHIP</div>

          <h2>Choose your membership</h2>

          <p>
            Explore PocketSmart AI membership categories designed for
            different budgeting needs.
          </p>
        </div>

        <div className="membership-grid">
          <div className="membership-card">
            <div className="membership-top">
              <div className="membership-icon">💎</div>
              <span className="membership-label">PREMIUM</span>
            </div>

            <h3>Diamond</h3>

            <p>
              Premium budgeting and advanced AI recommendation
              benefits.
            </p>

            <button onClick={onStart}>
              Explore <span>→</span>
            </button>
          </div>

          <div className="membership-card featured-membership">
            <div className="popular-label">POPULAR</div>

            <div className="membership-top">
              <div className="membership-icon">🏆</div>
              <span className="membership-label">SMART</span>
            </div>

            <h3>Gold</h3>

            <p>
              Smart savings tools and useful AI-powered budget
              features.
            </p>

            <button onClick={onStart}>
              Explore <span>→</span>
            </button>
          </div>

          <div className="membership-card">
            <div className="membership-top">
              <div className="membership-icon">🥈</div>
              <span className="membership-label">BASIC</span>
            </div>

            <h3>Silver</h3>

            <p>
              Simple and useful tools for everyday budgeting and
              spending.
            </p>

            <button onClick={onStart}>
              Explore <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="cta-content">
          <div className="section-tag">START TODAY</div>

          <h2>
            Take control of your
            <span> money.</span>
          </h2>

          <p>
            Build a smarter budget and discover better ways to manage
            your monthly spending.
          </p>

          <button className="primary-btn" onClick={onStart}>
            Create My Budget <span>→</span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-main">
          <div>
            <h3>
              <span className="footer-logo-icon">P</span>
              PocketSmart AI
            </h3>

            <p>Plan smarter. Spend better. Save more.</p>
          </div>

          <div className="footer-links">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Home
            </button>

            <button onClick={() => scrollToSection("features")}>
              Features
            </button>

            <button onClick={() => scrollToSection("membership")}>
              Membership
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <small>© 2026 PocketSmart AI. All rights reserved.</small>

          <small>AI-powered financial planning</small>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;