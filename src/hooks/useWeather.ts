// API通信（天気取得）と状態管理
import { useState } from "react";
import { getCurrentWeatherApi } from "@/services/weatherApi";
import { get5DayForecastApi } from "@/services/weatherApi";
import type { WeatherData } from "@/types/weather";
import type {
  ForecastApiResponse,
} from "@/types/weather";

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastApiResponse | null>(null);
  const [locationLabel, setLocationLabel] = useState("現在地");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError("");
      console.log("⛅️天気取得開始", { lat, lon });

      const data = await getCurrentWeatherApi(lat, lon);
      // const data: WeatherData = await getCurrentWeatherApi(lat, lon);
      console.log("⛅️現在の天気取得成功", data);
      setWeather(data);

      setLocationLabel(data.name ?? "現在地");
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
      console.log("📅予報取得開始", { lat, lon });

      const rawData = await get5DayForecastApi(lat, lon);
      console.log("📅5日間予報取得成功", rawData);
      setForecast(rawData);
    } catch (err) {
      console.error(err);
      setError("天気の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const resetWeather = () => {
    setWeather(null);
    setForecast(null);
    setError("");
  };


  return {
    weather,
    forecast,
    locationLabel,
    loading,
    error,
    fetchByCoords,
    fetchForecastByCoords,
    resetWeather,
  };
}
