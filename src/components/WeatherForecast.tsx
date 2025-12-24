'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // If using Shadcn, otherwise use MUI/Box
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type DailyForecast = {
  date: string;
  rainfall_mm: number;
  temp_max: number;
  temp_min: number;
};

export default function WeatherForecast() {
  const [current, setCurrent] = useState<any>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Coordinates for Oshakati (central northern Namibia – adjust if needed)
  const LAT = -17.78;
  const LON = 15.7;

  const fetchWeather = async () => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code&daily=precipitation_sum,temperature_2m_max,temperature_2m_min&timezone=Africa%2FWindhoek`;

      const res = await fetch(url);
      const data = await res.json();

      // Current weather
      setCurrent({
        temp: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        rain: data.current.precipitation,
        time: new Date(data.current.time).toLocaleString('en-NA'),
      });

      // 7-day forecast
      const daily = data.daily.time.map((date: string, i: number) => ({
        date: new Date(date).toLocaleDateString('en-NA', { weekday: 'short', day: 'numeric' }),
        rainfall_mm: data.daily.precipitation_sum[i],
        temp_max: data.daily.temperature_2m_max[i],
        temp_min: data.daily.temperature_2m_min[i],
        isHighRisk: data.daily.precipitation_sum[i] > 30, // >30mm = flood risk
      }));

      setForecast(daily);
      setError(null);
    } catch (err) {
      setError('Failed to load weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000); // Every 30 mins
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Card><CardContent><p>Loading weather...</p></CardContent></Card>;
  if (error) return <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>🌧️ Weather Forecast – Oshakati Area</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600">Current ({current.time})</p>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-3xl font-bold">{current.temp}°C</p>
              <p className="text-sm">Humidity: {current.humidity}%</p>
              <p className="text-sm">Rain: {current.rain} mm/h</p>
            </div>
            <div className="text-right">
              {current.rain > 5 && (
                <Alert variant="destructive" className="text-sm">
                  <AlertDescription>Heavy rain ongoing</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>

        {/* 7-Day Forecast Chart */}
        <Typography variant="subtitle1" className="mb-2">7-Day Rainfall Forecast</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={forecast}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value: number) => `${value} mm`} />
            <Line
              type="monotone"
              dataKey="rainfall_mm"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#ef4444' }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* High Risk Days */}
        {forecast.some(d => d.isHighRisk) && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>
              <strong>Flood Risk:</strong> Heavy rainfall (>30mm/day) forecast on:{' '}
              {forecast.filter(d => d.isHighRisk).map(d => d.date).join(', ')}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
