import API_BASE_URL from "../utils/api";

const BASE_URL = `${API_BASE_URL}/api`;

export const getLatestSensorData = async () => {
  const res = await fetch(`${BASE_URL}/sensor-data/latest`);
  return res.json();
};

export const getSensorDataHistory = async () => {
  const res = await fetch(`${BASE_URL}/sensor-data/history`);
  return res.json();
};

export const getSoilAnalysis = async () => {
  const res = await fetch(`${BASE_URL}/sensor-data/analysis`);
  return res.json();
};

export const analyzeCrop = async (crop) => {
  const res = await fetch(`${BASE_URL}/crop-analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ crop }),
  });
  return res.json();
};

export const getCropRecommendations = async () => {
  const res = await fetch(`${BASE_URL}/crop-recommendation`);
  return res.json();
};
