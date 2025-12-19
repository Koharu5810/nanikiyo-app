// Laravel APIを叩く関数

import type { WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

// 現在地・任意地点の天気取得
export async function getCurrentWeatherApi(
  lat: number,
  lon: number
): Promise<WeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`
  );

  if (!res.ok) {
    throw new Error(`天気APIエラー: ${res.status}`);
  }

  return await res.json();
}