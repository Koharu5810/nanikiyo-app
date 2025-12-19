// APIを叩く関数（ゆくゆくLaravelに移行）

// import type { WeatherData } from "../types/weather";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

// 現在地・任意地点の天気取得
// export async function getCurrentWeatherApi(
//   lat: number,
//   lon: number
// ): Promise<WeatherData> {
//   const res = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`
//   );

//   if (!res.ok) {
//     throw new Error(`天気APIエラー: ${res.status}`);
//   }

//   const json: WeatherData = await res.json();
//   return json;
// }

// 3日間の天気を取得
export async function getDailyForecastApi (
  lat: number,
  lon: number
): Promise < WeatherForecast > {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall` +
      `?lat=${lat}` +
      `&lon=${lon}` +
      `&exclude=minutely,hourly,alerts` + // 使わないデータを削る（通信量・理解コスト削減）
      `&units=metric` +                   // 摂氏
      `&lang=ja` +
      `&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error('天気予報APIエラー');
  }

  return await res.json();
}
