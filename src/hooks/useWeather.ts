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

      // 緯度経度→天気取得
      // const res = await fetch(
      //   `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`
      // );

      // if (!res.ok) {
      //   throw new Error();
      // }

      const data = await getCurrentWeatherApi(lat, lon);

      // const data: OpenWeatherResponse = await res.json();
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
    // setWeather,
    // setError,
    resetWeather,
  };
}
