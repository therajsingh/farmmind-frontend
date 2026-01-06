import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SensorPage from "./pages/SensorPage";
import SoilPage from "./pages/SoilPage";
import CropPage from "./pages/CropPage";
import RecommendationPage from "./pages/RecommendationPage";

import "./styles/global.css";
import "./styles/App.css";

export default function App() {
  // ✅ Load last active tab from localStorage
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "home";
  });
  // ✅ Dynamic page titles
  useEffect(() => {
    switch (activeTab) {
      case "home":
        document.title = "FarmMind | Farmer mind to the device";
        break;
      case "sensor":
        document.title = "FarmMind | Sensor Data";
        break;
      case "soil":
        document.title = "FarmMind | Soil Analysis";
        break;
      case "crop":
        document.title = "FarmMind | Crop Analysis";
        break;
      case "recommendation":
        document.title = "FarmMind | Crop Recommendations";
        break;
      default:
        document.title = "FarmMind";
    }
  }, [activeTab]);

  // ✅ Save active tab whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);

    const path = TAB_TO_PATH[activeTab];
    if (path && window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }
  }, [activeTab]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const tab = PATH_TO_TAB[path];
      if (tab) {
        setActiveTab(tab);
      }
    };

    handlePopState(); // run once on load
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage setActiveTab={setActiveTab} />;
      case "sensor":
        return <SensorPage />;
      case "soil":
        return <SoilPage />;
      case "crop":
        return <CropPage />;
      case "recommendation":
        return <RecommendationPage />;
      default:
        return <SensorPage />;
    }
  };
  const TAB_TO_PATH = {
    home: "/",
    sensor: "/sensor",
    soil: "/soil",
    crop: "/crop",
    recommendation: "/recommendations",
  };

  const PATH_TO_TAB = {
    "/": "home",
    "/sensor": "sensor",
    "/soil": "soil",
    "/crop": "crop",
    "/recommendations": "recommendation",
  };

  return (
    <div className="app-root">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="app-content">{renderPage()}</main>
      <Footer />
    </div>
  );
}
