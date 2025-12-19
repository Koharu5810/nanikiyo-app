// 3日間天気の一覧表示

import type { DailyForecast } from "../types/weather";

type Props = {
  daily: DailyForecast[];
};

export const WeatherForecast = ({ daily }: Props) => {
  return (
    <div className="forecast">
      {daily.map((day) => (
        <div key={day.date} className="forecast-day">
          <p >{day.date}</p>

          <img
            src="https://openweathermap.org/img/wn/${day.icon}.png`"
            alt="{day.description"
          />

          <p>{Math.round(day.temp)}
            {"\u00b0"}C
          </p>
          <p>{day.description}</p>
        </div>
      ))}
    </div>
  );
};
