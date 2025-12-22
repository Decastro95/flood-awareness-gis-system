import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const lat = req.nextUrl.searchParams.get("lat") || "-17.788"; // Oshakati
    const lon = req.nextUrl.searchParams.get("lon") || "15.699";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );

    const data = await res.json();

    // Return simplified JSON for frontend
    return new Response(
      JSON.stringify({
        location: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        condition: data.weather[0].description,
        rainfall: data.rain?.["1h"] || 0,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch weather data" }), { status: 500 });
  }
}
