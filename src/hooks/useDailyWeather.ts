// 表示用データ生成
import { useMemo } from "react";
import type { ForecastApiResponse } from "@/types/weather";
import { buildDailyWeatherFromForecast } from "@/utils/weatherMapper";

const DISPLAY_DAYS = 5;

export function useDailyWeather(
  forecast: ForecastApiResponse | null
) {
  const dailyWeather = useMemo(() => {
    if (!forecast) return [];
    return buildDailyWeatherFromForecast(forecast, DISPLAY_DAYS);
  }, [forecast]);

  return {
    dailyWeather
  };
}
