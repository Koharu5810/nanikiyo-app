// APIを叩く関数（ゆくゆくLaravelに移行）

import type { WeatherData } from "@/types/weather";
import type { ForecastApiResponse } from "@/types/weather";

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

  const json: WeatherData = await res.json();
  return json;
}

// 5日間（3時間ごと）予報を取得
export async function get5DayForecastApi (
  lat: number,
  lon: number
): Promise<ForecastApiResponse> {
    console.log("🔥 get5DayForecastApi called", lat, lon);

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast` +
      `?lat=${lat}` +
      `&lon=${lon}` +
      `&units=metric` + // 摂氏
      `&lang=ja` +
      `&appid=${API_KEY}`
  );

  console.log("🔥 fetch done", res.status);

  if (!res.ok) {
    throw new Error("forecast api error");
  }

  return await res.json();
}
