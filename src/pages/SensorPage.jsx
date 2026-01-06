import { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function SensorPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 UI controls
  const [order, setOrder] = useState("newest"); // newest | oldest
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/sensor-data/history?limit=50")
      .then((res) => res.json())
      .then((res) => {
        setData(res); // backend order preserved
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ---------------- FILTERED DATA ---------------- */

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const t = new Date(row.createdAt).getTime();

      if (fromDate && t < new Date(fromDate).getTime()) return false;
      if (toDate && t > new Date(toDate).getTime()) return false;

      return true;
    });
  }, [data, fromDate, toDate]);

  /* ---------------- TABLE DATA ---------------- */

  const tableData = useMemo(() => {
    if (order === "newest") return filteredData;
    return [...filteredData].reverse();
  }, [filteredData, order]);

  /* ---------------- GRAPH DATA (ALWAYS CHRONO) ---------------- */

  const graphData = useMemo(() => {
    return [...filteredData].reverse(); // oldest → newest
  }, [filteredData]);

  /* ---------------- CSV EXPORT ---------------- */

  const exportCSV = () => {
    if (!tableData.length) {
      alert("No data available");
      return;
    }

    const headers = [
      "Date & Time",
      "Soil Moisture (%)",
      "pH",
      "Nitrogen",
      "Phosphorus",
      "Potassium",
      "Temperature (°C)",
      "Humidity (%)",
    ];

    const rows = tableData.map((row) => [
      new Date(row.createdAt).toLocaleString("en-IN"),
      row.soilMoisture,
      row.soilPH,
      row.nitrogen,
      row.phosphorus,
      row.potassium,
      row.temperature,
      row.humidity,
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sensor_data_history.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) return <p>Loading sensor history...</p>;

  return (
    <div style={page}>
      <h2>📊 Sensor Data History</h2>

      {/* 🔹 CONTROLS */}
      <div style={controlsRow}>
        {/* LEFT CONTROLS */}
        <div style={filtersGrid}>
          <div style={controlBox}>
            <label>From</label>
            <input type="date" />
          </div>

          <div style={controlBox}>
            <label>To</label>
            <input type="date" />
          </div>

          <div style={controlBox}>
            <label>Order</label>
            <select>
              <option>Newest → Oldest</option>
              <option>Oldest → Newest</option>
            </select>
          </div>
        </div>

        {/* RIGHT BUTTON */}
        <button style={exportBtn}>📊 Export CSV</button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper" style={{ marginBottom: "32px" }}>
        <table className="sensor-table">
          <thead>
            <tr>
              <th style={{ minWidth: "160px" }}>Date & Time</th>
              <th>Moisture</th>
              <th>pH</th>
              <th>N</th>
              <th>P</th>
              <th>K</th>
              <th>Temp</th>
              <th>Humidity</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx}>
                <td>{new Date(row.createdAt).toLocaleString("en-IN")}</td>
                <td>{row.soilMoisture}</td>
                <td>{Number(row.soilPH).toFixed(1)}</td>
                {/* <td>{row.soilPH}</td> */}
                <td>{row.nitrogen}</td>
                <td>{row.phosphorus}</td>
                <td>{row.potassium}</td>
                <td>{Number(row.temperature).toFixed(1)}</td>
                {/* <td>{row.temperature}</td> */}
                <td>{Number(row.humidity).toFixed(1)}</td>
                {/* <td>{row.humidity}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GRAPHS */}
      <div style={grid}>
        <Chart title="Nitrogen" data={graphData} dataKey="nitrogen" />
        <Chart title="Phosphorus" data={graphData} dataKey="phosphorus" />
        <Chart title="Potassium" data={graphData} dataKey="potassium" />
        <Chart title="Soil Moisture" data={graphData} dataKey="soilMoisture" />
        <Chart title="pH" data={graphData} dataKey="soilPH" />
        <Chart title="Temperature" data={graphData} dataKey="temperature" />
        <Chart title="Humidity" data={graphData} dataKey="humidity" />
      </div>
    </div>
  );
}

/* -------------------- CHART -------------------- */

function Chart({ title, data, dataKey }) {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      {/* Overlay (only when zoomed) */}
      {isZoomed && <div onClick={() => setIsZoomed(false)} style={overlay} />}

      <div
        style={{
          ...card,
          ...(isZoomed ? zoomedCard : {}),
        }}
      >
        {/* Header */}
        <div style={chartHeader}>
          <h4>{title}</h4>
          <button onClick={() => setIsZoomed((z) => !z)} style={zoomBtn}>
            {isZoomed ? "Close" : "Zoom"}
          </button>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={isZoomed ? 420 : 250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="createdAt" tick={false} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#2f855a"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

/* -------------------- STYLES -------------------- */
const page = { padding: "24px" };

const controls = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  marginBottom: "16px",
  flexWrap: "wrap",
};

const card = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  padding: "16px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
  gap: "20px",
};

const chartHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "8px",
};

const zoomBtn = {
  background: "white",
  border: "1px solid var(--border)",
  borderRadius: "8px",
  padding: "4px 12px",
  fontSize: "13px",
  cursor: "pointer",
};

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.4)",
  zIndex: 999,
};

const zoomedCard = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  maxWidth: "1100px",
  zIndex: 1000,
};

const controlsRow = {
  display: "grid",
  gridTemplateColumns: "1fr auto",
  alignItems: "end",
  gap: "20px",
  marginBottom: "16px",
};

const filtersGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
};

const controlBox = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const exportBtn = {
  padding: "12px 18px",
  borderRadius: "14px",
  border: "2px solid var(--primary)",
  background: "var(--primary-soft)",
  color: "var(--primary)",
  fontWeight: "600",
  cursor: "pointer",
  whiteSpace: "nowrap",
};
