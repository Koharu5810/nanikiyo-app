import { useMemo } from "react";

import type { ForecastApiResponse } from "@/types/weather";
import { buildDailyWeatherFromForecast } from "@/utils/weatherMapper";

export function useDailyWeather(
  currentForecast: ForecastApiResponse | null,
  customForecast: ForecastApiResponse | null
) {
  const currentDailyWeather = useMemo(() => {
    if (!currentForecast) return [];
    return buildDailyWeatherFromForecast(currentForecast, 3);
  }, [currentForecast]);

  const customDailyWeather = useMemo(() => {
    if (!customForecast) return [];
    return buildDailyWeatherFromForecast(customForecast, 3);
  }, [customForecast]);

  return {
    currentDailyWeather,
    customDailyWeather,
  };
}
