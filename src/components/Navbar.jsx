import ThemeToggle from "./ThemeToggle";
import farmmindLogo from "../assets/farmmind-logo.png";

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header style={header}>
      <nav style={nav}>
        {/* Logo */}
        <div style={logoBox}>
          <div style={logoWrapper}>
            <img src={farmmindLogo} alt="FarmMind Logo" style={logoImg} />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={tabs}>
          <Tab
            label="Home"
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          />

          <Tab
            label="Sensor Data"
            active={activeTab === "sensor"}
            onClick={() => setActiveTab("sensor")}
          />
          <Tab
            label="Soil Analysis"
            active={activeTab === "soil"}
            onClick={() => setActiveTab("soil")}
          />
          <Tab
            label="Crop Analysis"
            active={activeTab === "crop"}
            onClick={() => setActiveTab("crop")}
          />
          <Tab
            label="Recommendations"
            active={activeTab === "recommendation"}
            onClick={() => setActiveTab("recommendation")}
          />
        </div>

        {/* Theme Toggle */}
        <div style={{ marginLeft: "auto" }}>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

/* -----------------------
   TAB COMPONENT
------------------------ */
function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!active) e.target.style.color = "var(--primary)";
      }}
      onMouseLeave={(e) => {
        if (!active) e.target.style.color = "var(--text)";
      }}
      style={{
        ...tab,
        ...(active ? activeTab : {}),
      }}
    >
      {label}
    </button>
  );
}

/* -----------------------
   STYLES
------------------------ */

const header = {
  width: "100%",
  background: "var(--card)",
  borderBottom: "1px solid var(--border)",

  position: "sticky",
  top: 0,
  zIndex: 1000,
};


const nav = {
  maxWidth: "1400px",
  margin: "0 auto",
  padding: "12px 24px",
  display: "flex",
  alignItems: "center",
  gap: "28px",
};

const logoBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontWeight: "700",
  fontSize: "20px",
  color: "var(--primary)",
};

const logoImg = {
  height: "42px",
  width: "84px",
};

const logoText = {
  color: "var(--primary)",
};

const tabs = {
  display: "flex",
  gap: "10px",
};

const tab = {
  padding: "10px 18px",
  borderRadius: "12px",
  border: "none", // 🔴 NO BORDER BY DEFAULT
  background: "transparent",
  color: "var(--text)",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "500",
  transition: "color 0.2s ease, background 0.2s ease, border 0.2s ease",
};

const activeTab = {
  background: "var(--primary-soft)",
  border: "1.5px solid var(--primary)", // ✅ ONLY ACTIVE HAS BORDER
  color: "var(--primary)",
  fontWeight: "600",
};

const logoWrapper = {
  background: "#ffffff", // white background
  border: "2px solid var(--primary)", // green border
  borderRadius: "10px",
  padding: "6px 8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
