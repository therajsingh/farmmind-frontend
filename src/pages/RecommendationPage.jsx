import { useState } from "react";
import PageWrapper from "../components/PageWrapper";

export default function RecommendationPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch("http://localhost:3000/api/crop-recommendation");
      const result = await res.json();

      console.log("RECOMMENDATION API RESPONSE 👉", result);

      setData(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate crop recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper
      title="🌱 Crop Recommendations"
      subtitle="Best crops for current soil conditions"
    >
      {/* BUTTON */}
      <div style={{ marginBottom: "24px" }}>
        <button
          onClick={fetchRecommendations}
          disabled={loading}
          style={button}
        >
          {loading
            ? "Analyzing soil & crops..."
            : "🌾 Generate Crop Recommendations"}
        </button>
      </div>

      {/* ERROR */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* EMPTY STATE */}
      {!data && !loading && !error && (
        <div style={emptyBox}>
          AI-suggested crops will appear here after analysis.
        </div>
      )}

      {/* RESULTS */}
      {data?.recommendedCrops && (
        <div style={grid}>
          {data.recommendedCrops.map((item, idx) => (
            <div key={idx} style={card}>
              <h3 style={{ marginBottom: "6px" }}>{item.crop}</h3>

              <span
                style={{
                  ...badge,
                  background:
                    item.suitability === "High"
                      ? "#22c55e"
                      : item.suitability === "Medium"
                      ? "#f59e0b"
                      : "#ef4444",
                }}
              >
                {item.suitability} Suitability
              </span>

              <p style={{ marginTop: "10px", opacity: 0.85 }}>
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      )}
    </PageWrapper>
  );
}

/* ---------------- STYLES ---------------- */

const button = {
  padding: "14px 26px",
  background: "var(--primary)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
};

const emptyBox = {
  background: "var(--card)",
  padding: "24px",
  borderRadius: "12px",
  border: "1px dashed var(--border)",
  color: "var(--text-muted)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
};

const card = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "20px",
};

const badge = {
  display: "inline-block",
  padding: "4px 10px",
  borderRadius: "999px",
  fontSize: "12px",
  color: "#fff",
  fontWeight: "600",
};
