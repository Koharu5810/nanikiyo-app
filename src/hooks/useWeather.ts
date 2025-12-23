// 天気取得

import { useState } from "react";
import { getCurrentWeatherApi } from "../services/weatherApi";
import { get5DayForecastApi } from "../services/weatherApi";
import type { WeatherData } from "../types/weather";
import type {
  ForecastApiResponse,
  // DailyForecast,
} from "../types/weather";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError("");

      const data: WeatherData = await getCurrentWeatherApi(lat, lon);

      setWeather(data);
    } catch (err) {
      console.error(err);
      setError("天気の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
};

  const fetchForecastByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError("");

      const rawData = await get5DayForecastApi(lat, lon);
      // const daily = extract3DaysForecast(rawData);

      // setForecast(daily);
      setForecast(rawData);
    } catch (err) {
      console.error(err);
      setError("天気の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  // 5日間3時間毎の天気の加工
  // const extract3DaysForecast = (
  //   apiData: ForecastApiResponse
  // ): DailyForecast[] => {
  //   const dailyMap = new Map<string, DailyForecast>();

  //   apiData.list.forEach((item) => {
  //     const date = item.dt_txt.split(" ")[0];
  //     const hour = item.dt_txt.split(" ")[1];

  //     // 12:00のデータを優先
  //     if (hour === "12:00:00" && !dailyMap.has(date)) {
  //       dailyMap.set(date, {
  //         date,
  //         temp: item.main.temp,
  //         icon: item.weather[0].icon,
  //         description: item.weather[0].description,
  //       });
  //     }
  //   });

  //   return Array.from(dailyMap.values()).slice(0, 2);
  // };

  const resetWeather = () => {
    setWeather(null);
    setForecast(null);
    setError("");
  };


  return {
    weather,
    forecast,
    loading,
    error,
    fetchByCoords,
    fetchForecastByCoords,
    resetWeather,
  };
}
