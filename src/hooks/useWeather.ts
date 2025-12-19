import { useState } from "react";
import { getCurrentWeatherApi } from "../services/weatherApi";

// 天気取得ロジック
export type WeatherData = {
  name: string;
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
};

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError("");

      const data = await getCurrentWeatherApi(lat, lon);

      setWeather(data);
    } catch (err) {
      console.error(err);
      setError("天気の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const resetWeather = () => {
    setWeather(null);
    setError("");
  };

  return {
    weather,
    loading,
    error,
    fetchByCoords,
    resetWeather,
  };
}
