export default function SensorCard({ label, value, unit, status, color, icon }) {
  return (
    <div style={{ ...card, borderLeft: `6px solid ${color}` }}>
      <div style={top}>
        <span style={iconStyle}>{icon}</span>
        <span style={{ ...statusStyle, color }}>{status}</span>
      </div>

      <p style={labelStyle}>{label}</p>

      <h2 style={{ ...valueStyle, color }}>
        {value} <span style={unitStyle}>{unit}</span>
      </h2>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const card = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "14px",
  padding: "18px",
  minHeight: "140px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const top = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconStyle = {
  fontSize: "22px",
};

const labelStyle = {
  fontSize: "14px",
  color: "var(--muted)",
};

const valueStyle = {
  fontSize: "28px",
  fontWeight: "600",
};

const unitStyle = {
  fontSize: "14px",
  color: "var(--muted)",
};

const statusStyle = {
  fontSize: "13px",
  fontWeight: "600",
};
