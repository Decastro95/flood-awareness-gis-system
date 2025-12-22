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

  if (!weather) return <div className="panel">Loading weather…</div>;

  return (
    <div className="panel">
      <h3>🌦️ Current Weather</h3>
      <p><strong>Temperature:</strong> {weather.temp} °C</p>
      <p><strong>Rain (last hour):</strong> {weather.rain} mm</p>
      <p><strong>Condition:</strong> {weather.description}</p>
    </div>
  );
}
