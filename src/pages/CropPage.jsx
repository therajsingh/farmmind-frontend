import { useState } from "react";

const cropSuggestions = [
  "Wheat",
  "Rice",
  "Maize",
  "Sugarcane",
  "Cotton",
  "Soybean",
  "Potato",
  "Tomato",
  "Mustard",
  "Groundnut",
];

export default function CropPage() {
  const [crop, setCrop] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const runAnalysis = async () => {
    if (!crop.trim()) return alert("Please enter a crop name");

    setLoading(true);
    setAnalysis(null);

    const res = await fetch("http://localhost:3000/api/crop-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crop }),
    });

    const data = await res.json();
    setAnalysis(data);
    setLoading(false);
  };

  const filteredSuggestions = cropSuggestions.filter((c) =>
    c.toLowerCase().includes(crop.toLowerCase())
  );

  return (
    <div style={container}>
      <h2 style={{ marginBottom: "8px" }}>🌾 Crop-Specific AI Analysis</h2>

      <p style={{ marginBottom: "24px", opacity: 0.85 }}>
        Type a crop name and analyze suitability using live soil data.
      </p>

      {/* Crop Input */}
      <div
        style={{
          position: "relative",
          maxWidth: "400px",
          marginBottom: "20px", // ✅ spacing below input
        }}
      >
        <input
          type="text"
          placeholder="Enter crop name (e.g. Wheat)"
          value={crop}
          onChange={(e) => {
            setCrop(e.target.value);
            setShowSuggestions(true);
          }}
          style={input}
        />

        {/* Suggestions */}
        {showSuggestions && crop && (
          <div style={suggestionsBox}>
            {filteredSuggestions.map((c) => (
              <div
                key={c}
                style={suggestion}
                onClick={() => {
                  setCrop(c);
                  setShowSuggestions(false);
                }}
              >
                {c}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Button */}
      <button
        onClick={runAnalysis}
        style={{ ...button, marginBottom: "28px" }} // ✅ space before results
      >
        {loading ? "Analyzing..." : "Analyze for Selected Crop"}
      </button>

      {/* Results */}
      {analysis && (
        <div style={{ marginTop: "16px" }}>
          <h3 style={{ marginBottom: "16px" }}>
            Status: {analysis.suitability}
          </h3>

          <Section title="⚠ Issues">
            <ul>
              {analysis.issues.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </Section>

          <Section title="✅ Recommended Actions">
            <ul>
              {analysis.actions.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>
          </Section>
        </div>
      )}
    </div>
  );
}

/* ---------- UI Helpers ---------- */

function Section({ title, children }) {
  return (
    <div style={section}>
      <h4 style={{ marginBottom: "12px" }}>
        {title}
      </h4>
      {children}
    </div>
  );
}


/* ---------- Styles ---------- */

const container = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "32px 24px", // ✅ added padding
};

const input = {
  width: "100%",
  padding: "12px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "1px solid var(--border)",
};

const button = {
  marginTop: "16px",
  padding: "12px 22px",
  background: "var(--primary)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  fontSize: "15px",
  cursor: "pointer",
};

const section = {
  background: "var(--card)",
  padding: "18px",
  borderRadius: "12px",
  marginTop: "20px",
};

const suggestionsBox = {
  position: "absolute",
  top: "46px",
  width: "100%",
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "8px",
  zIndex: 10,
};

const suggestion = {
  padding: "10px",
  cursor: "pointer",
  borderBottom: "1px solid #eee",
};

