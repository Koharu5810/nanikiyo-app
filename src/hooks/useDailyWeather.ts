// 表示用データ生成
import { useMemo } from "react";

import type { ForecastApiResponse } from "@/types/weather";
import { buildDailyWeatherFromForecast } from "@/utils/weatherMapper";

const DISPLAY_DAYS = 5;

export function useDailyWeather(
  currentForecast: ForecastApiResponse | null,
  customForecast: ForecastApiResponse | null
) {
  const currentDailyWeather = useMemo(() => {
    if (!currentForecast) return [];
    return buildDailyWeatherFromForecast(currentForecast, DISPLAY_DAYS);
  }, [currentForecast]);

  const customDailyWeather = useMemo(() => {
    if (!customForecast) return [];
    return buildDailyWeatherFromForecast(customForecast, DISPLAY_DAYS);
  }, [customForecast]);

  return {
    currentDailyWeather,
    customDailyWeather,
  };
}
