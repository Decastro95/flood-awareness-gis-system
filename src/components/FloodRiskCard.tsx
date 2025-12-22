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
    <div className="panel">
      <h3>🚦 Flood Risk Level</h3>
      <p>
        Status:{" "}
        <span style={{ color, fontWeight: "bold" }}>
          {risk}
        </span>
      </p>
      <p>Rainfall indicator based on recent precipitation.</p>
    </div>
  );
}
