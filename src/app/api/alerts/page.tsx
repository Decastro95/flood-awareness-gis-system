"use client";

import { useEffect, useState } from "react";

interface Weather {
  location: string;
  temperature: number;
  humidity: number;
  condition: string;
  rainfall: number;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch("/api/weather");
      const data = await res.json();
      setWeather(data);
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 60000); // update every 1 min

    return () => clearInterval(interval);
  }, []);

  if (!weather) return <p>Loading weather data...</p>;

  return (
    <div
      style={{
        background: "#ffffff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        marginBottom: "1rem",
      }}
    >
      <h3>Live Weather – {weather.location}</h3>
      <p><strong>Condition:</strong> {weather.condition}</p>
      <p><strong>Temperature:</strong> {weather.temperature} °C</p>
      <p><strong>Humidity:</strong> {weather.humidity}%</p>
      <p><strong>Rainfall (last 1h):</strong> {weather.rainfall} mm</p>
    </div>
  );
}
