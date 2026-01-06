import { useEffect, useState } from "react";

export default function SoilPage() {
  const [sensorData, setSensorData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* --------------------------------
     FETCH ONLY RAW SENSOR DATA FIRST
  ---------------------------------- */
  useEffect(() => {
    fetch("http://localhost:3000/api/sensor-data/latest")
      .then((res) => res.json())
      .then((data) => setSensorData(data))
      .catch(() => setError("Failed to load sensor data"));
  }, []);

  /* --------------------------------
     CALL CHATGPT ONLY ON BUTTON CLICK
  ---------------------------------- */
  const runAIAnalysis = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/sensor-data/analysis");
      const result = await res.json();
      setAnalysis(result.analysis);
    } catch {
      setError("AI analysis failed");
    } finally {
      setLoading(false);
    }
  };

  if (!sensorData) return <p>Loading sensor data...</p>;

  return (
    <div style={container}>
      <div
        style={{ marginBottom: "32px" }} // 👈 spacing added
      >
        <h2>🌱 Soil Sensor Dashboard</h2>
      </div>

      {/* SENSOR VALUES */}

      <Section title="📊 Current Sensor Readings">
        <Grid>
          <Value label="Soil Moisture" value={`${sensorData.soilMoisture}%`} />
          <Value label="Soil pH" value={sensorData.soilPH} />
          <Value label="Nitrogen (N)" value={`${sensorData.nitrogen} mg/kg`} />
          <Value
            label="Phosphorus (P)"
            value={`${sensorData.phosphorus} mg/kg`}
          />
          <Value
            label="Potassium (K)"
            value={`${sensorData.potassium} mg/kg`}
          />
          <Value label="Temperature" value={`${sensorData.temperature} °C`} />
          <Value label="Humidity" value={`${sensorData.humidity}%`} />
        </Grid>
      </Section>

      {/* AI BUTTON */}
      <button style={aiButton} onClick={runAIAnalysis} disabled={loading}>
        {loading ? "Running AI Analysis..." : "🧠 Run AI Soil Analysis"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* AI RESULT */}
      {analysis && (
        <>
          <StatusBadge status={analysis.healthStatus} />

          <Section title="⚠️ Detected Issues">
            <ul>
              {analysis.issues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </Section>

          <Section title="✅ Recommended Actions">
            <ul>
              {analysis.actions.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          </Section>
        </>
      )}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatusBadge({ status }) {
  const colors = {
    Healthy: "#22c55e",
    Moderate: "#f59e0b",
    Poor: "#ef4444",
  };

  return (
    <div
      style={{
        margin: "20px 0",
        fontWeight: "600",
        color: colors[status] || "#333",
      }}
    >
      Soil Health Status: <strong>{status}</strong>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={section}>
      <h3 style={{ marginBottom: "20px" }}>
        {title}
      </h3>
      {children}
    </div>
  );
}


function Grid({ children }) {
  return <div style={grid}>{children}</div>;
}

function Value({ label, value }) {
  return (
    <div style={card}>
      <span style={{ opacity: 0.7 }}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const container = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "30px",
};

const section = {
  background: "var(--card)",
  padding: "20px",
  borderRadius: "12px",
  marginBottom: "20px",
  border: "1px solid var(--border)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "15px",
};

const card = {
  background: "var(--background)",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const aiButton = {
  padding: "14px 24px",
  background: "var(--primary)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  marginBottom: "20px",
};
