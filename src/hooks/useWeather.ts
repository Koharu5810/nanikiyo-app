import { useState } from "react";

// 天気取得ロジック
export type OpenWeatherResponse = {
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

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;

export function useWeather() {
  const [weather, setWeather] = useState<OpenWeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError("");

      // 緯度経度→天気取得
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`
      );

      if (!res.ok) {
        throw new Error();
      }

      const data: OpenWeatherResponse = await res.json();
      setWeather(data);
      // setSelectedLocationLabel("現在地");
    } catch (err) {
      console.log(err);
      setError("天気の取得中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    loading,
    error,
    fetchByCoords,
    setWeather,
    setError,
  };
}
