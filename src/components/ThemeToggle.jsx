import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      style={button}
      title="Toggle theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

const button = {
  border: "1px solid var(--border)",
  background: "var(--card)",
  color: "var(--text)",
  padding: "6px 10px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};
