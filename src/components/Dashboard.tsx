import WeatherPanel from "./WeatherPanel";
import FloodRiskCard from "./FloodRiskCard";

export default function Dashboard() {
  const rainfall = 12; // from weather API or mock value

  return (
    <div className="dashboard">
      <WeatherPanel />
      <FloodRiskCard rainfall={rainfall} />
    </div>
  );
}
