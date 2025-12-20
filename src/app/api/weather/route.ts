export async function GET() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather
     ?lat=-17.788&lon=15.699&appid=${process.env.WEATHER_API_KEY}`
  );

  const data = await res.json();

  return Response.json({
    rainfall: data.rain?.["1h"] || 0,
    condition: data.weather[0].description,
  });
}
