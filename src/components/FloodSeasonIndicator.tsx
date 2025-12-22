export default function FloodSeasonIndicator() {
  const month = new Date().getMonth(); // 0 = Jan

  const isFloodSeason = month >= 10 || month <= 3; // Nov–Apr
  const isPeak =
    month === 0 || month === 1 || month === 2; // Jan–Mar

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "1rem",
        borderLeft: `6px solid ${
          isPeak ? "#dc2626" : isFloodSeason ? "#f59e0b" : "#16a34a"
        }`,
        marginBottom: "1rem",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      <strong>Flood Season Status:</strong><br />
      {isPeak
        ? "Peak Flood Risk (Jan–Mar)"
        : isFloodSeason
        ? "Flood Season Active (Nov–Apr)"
        : "Low Flood Risk Period"}
    </div>
  );
}
