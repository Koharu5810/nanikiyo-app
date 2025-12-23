import { useMemo } from "react";
import type { DailyWeatherView, ForecastApiResponse } from "@/types/weather";
import { buildDailyWeatherFromForecast } from "@/utils/weatherMapper";

export function useDailyWeather(
  forecast: ForecastApiResponse | null,
  selectedLocationLabel: string
) {
  const dailyWeather = useMemo<DailyWeatherView[]>(() => {
    if (!forecast) return [];
    return buildDailyWeatherFromForecast(forecast, 3);
  }, [forecast]);

  const currentDailyWeather = selectedLocationLabel ? [] : dailyWeather;
  const customDailyWeather = selectedLocationLabel ? dailyWeather : [];

  return {
    currentDailyWeather,
    customDailyWeather,
  };
}
