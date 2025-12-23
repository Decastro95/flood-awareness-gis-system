"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  temp: number;
  rain: number;
  description: string;
};

export default function WeatherPanel() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      const lat = -17.78; // Oshakati (Northern Namibia)
      const lon = 15.70;

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );

      const data = await res.json();

      setWeather({
        temp: data.main.temp,
        rain: data.rain?.["1h"] || 0,
        description: data.weather[0].description,
      });
    }

    fetchWeather();
  }, []);

  if (!weather) return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      border: "1px solid #e2e8f0"
    }}>
      <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b", fontSize: "1.25rem" }}>🌦️ Current Weather</h3>
      <p style={{ color: "#64748b" }}>Loading weather data...</p>
    </div>
  );

  return (
    <div style={{
      background: "white",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      border: "1px solid #e2e8f0"
    }}>
      <h3 style={{ margin: "0 0 1rem 0", color: "#1e293b", fontSize: "1.25rem" }}>🌦️ Current Weather</h3>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
        <span style={{ fontSize: "2rem", marginRight: "0.5rem" }}>
          {weather.temp > 25 ? "☀️" : weather.temp > 15 ? "⛅" : "🌧️"}
        </span>
        <div>
          <p style={{ margin: "0", fontSize: "1.5rem", fontWeight: "bold", color: "#1e293b" }}>
            {weather.temp}°C
          </p>
          <p style={{ margin: "0", fontSize: "0.9rem", color: "#64748b", textTransform: "capitalize" }}>
            {weather.description}
          </p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "1rem" }}>
        <p style={{ margin: "0", fontSize: "0.9rem", color: "#64748b" }}>
          <strong>Rain (last hour):</strong> {weather.rain} mm
        </p>
      </div>
    </div>
  );
}
