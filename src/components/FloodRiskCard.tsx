"use client";

type Props = {
  rainfall: number;
};

export default function FloodRiskCard({ rainfall }: Props) {
  let risk = "LOW";
  let color = "green";

  if (rainfall > 10) {
    risk = "MODERATE";
    color = "orange";
  }

  if (rainfall > 25) {
    risk = "HIGH";
    color = "red";
  }

  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      border: "1px solid #e2e8f0"
    }}>
      <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b", fontSize: "1.25rem" }}>🚦 Flood Risk Level</h3>
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: color === "green" ? "#dcfce7" : color === "orange" ? "#fef3c7" : "#fee2e2",
        border: `2px solid ${color === "green" ? "#16a34a" : color === "orange" ? "#d97706" : "#dc2626"}`
      }}>
        <span style={{
          fontSize: "1.5rem",
          marginRight: "0.75rem",
          color: color === "green" ? "#16a34a" : color === "orange" ? "#d97706" : "#dc2626"
        }}>
          {risk === "LOW" ? "🟢" : risk === "MODERATE" ? "🟡" : "🔴"}
        </span>
        <div>
          <p style={{
            margin: "0",
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: color === "green" ? "#16a34a" : color === "orange" ? "#d97706" : "#dc2626"
          }}>
            {risk} RISK
          </p>
          <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.9rem", color: "#64748b" }}>
            Based on recent rainfall: {rainfall}mm
          </p>
        </div>
      </div>
      <p style={{ margin: "1rem 0 0 0", fontSize: "0.9rem", color: "#64748b" }}>
        Monitor weather conditions and stay informed about flood alerts.
      </p>
    </div>
  );
}
