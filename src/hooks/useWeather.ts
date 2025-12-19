// 天気取得

import { useState } from "react";
// import { getCurrentWeatherApi } from "../services/weatherApi";
import { get5DayForecastApi } from "../services/weatherApi";
// import type { WeatherData } from "../types/weather";
import type { ForecastResponce } from "../types/weather";

export function useWeather() {
  // const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const fetchByCoords = async (lat: number, lon: number) => {
  //   try {
  //     setLoading(true);
  //     setError("");

  //     const data: WeatherData = await getCurrentWeatherApi(lat, lon);

  //     setWeather(data);
  //   } catch (err) {
  //     console.error(err);
  //     setError("天気の取得中にエラーが発生しました");
  //   } finally {
  //     setLoading(false);
  //   }
// };

  const fetchForecastByCoords = async (lat: number, lon: number) => {
    console.log("🌤 fetchForecastByCoords", lat, lon);

    try {
      setLoading(true);
      setError("");

      const data: ForecastResponce = await get5DayForecastApi(lat, lon);

      setForecast(data);
    } catch (err) {
      console.error(err);
      setError("天気の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const resetWeather = () => {
    // setWeather(null);
    setForecast(null);
    setError("");
  };

  return {
    // weather,
    forecast,
    loading,
    error,
    // fetchByCoords,
    fetchForecastByCoords,
    resetWeather,
  };
}
