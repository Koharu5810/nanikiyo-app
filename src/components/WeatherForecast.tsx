// 3日間天気の一覧表示

import type { DailyWeather } from "../types/weather";

type Props = {
  daily: DailyWeather[];
};

export function WeatherForecast({ daily }: Props) {
  return (
    <div className="forecast">
      {daily.slice(0, 3).map((day) => {
        const date = new Date(day.dt * 1000);   // 秒をDateに整形

        return (
          <div key={day.dt} className="forecast-day">
            <p className="date">
              {date.toLocaleDateString("ja-JP", {
                month: "numeric",
                day: "numeric",
                weekday: "short",
              })}
            </p>

            <p className="weather">{day.weather[0].description}</p>

            <p className="temp">
              <span className="max">
                {Math.round(day.temp.min)}
                {"\u00b0"}C
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}