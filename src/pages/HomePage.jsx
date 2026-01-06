import "./HomePage.css";

export default function HomePage({ setActiveTab }) {
  return (
    <div
      className="home-wrapper"

    >
      {/* Overlay */}
      <div className="home-overlay">
        {/* Hero Section */}
        <div className="home-hero">
          <h1 className="home-title">FarmMind</h1>

          <p className="home-subtitle">Farmer mind to the device</p>

          {/* Action Buttons */}
          <div className="home-actions">
            <button
              className="primary-btn"
              onClick={() => setActiveTab("soil")}
            >
              Soil Analysis
            </button>

            <button
              className="secondary-btn"
              onClick={() => setActiveTab("sensor")}
            >
              Sensor Data
            </button>

            <button
              className="secondary-btn"
              onClick={() => setActiveTab("crop")}
            >
              Crop Analysis
            </button>

            <button
              className="secondary-btn"
              onClick={() => setActiveTab("recommendation")}
            >
              Recommendations
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="feature-grid">
          <div className="feature-card">
            <span className="icon">📡</span>
            <h3>Real-time Soil Monitoring</h3>
            <p>Collects live soil and environmental data using IoT sensors.</p>
          </div>

          <div className="feature-card">
            <span className="icon">🧠</span>
            <h3>AI Soil Health Analysis</h3>
            <p>
              Uses AI to interpret soil conditions and detect fertility issues.
            </p>
          </div>

          <div className="feature-card">
            <span className="icon">🌾</span>
            <h3>Crop-Specific Intelligence</h3>
            <p>Analyzes soil suitability and fertilizer needs for each crop.</p>
          </div>

          <div className="feature-card">
            <span className="icon">📊</span>
            <h3>Sensor Data History</h3>
            <p>
              Visualize historical trends using tables and interactive graphs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
